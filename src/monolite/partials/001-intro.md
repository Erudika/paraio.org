---
title: Introduction
---

Para is a flexible backend service, created as an open-source project from the very beginning, in 2013.
It was born out of our need to have a robust system which would allow us to persist objects easily to anything -
RDBMS, NoSQL and in-memory databases. We needed a simple solution with an API which would scale well and provide a
solid foundation for our future projects.

Para is a **stateless, schemaless, 3-layer backend system** with a REST API in front of it.
The first layer is the **database**, the second layer is the **search index** and the third -- the **cache**.
Depending on how you use it, Para can either be a standalone backend service or a persistence
framework that is part of your code base. Each request to the API is stateless, meaning you can scale out easily.
The data model requires no schema -- it's based around plain old Java/JSON objects and is optimized for schemaless
key-value data stores, but also works with traditional databases.

Para is also **multitenant**, which means you can deploy it as a standalone service on one or more nodes and host one
or more applications on it ("apps"). An app can be a website, mobile app, desktop app or even a command-line tool.
This is made possible by the REST API which talks JSON to your apps, and with the help of the client libraries below,
it's easy to get started. If you're building an application on the JVM, you can also add Para as Maven dependency to
your project. You can still keep the REST API or turn it off completely.

### Quick start

Create a configuration file `application.conf` file in the same directory as the Para package.
Here's an example default configuration:
```bash
# the name of the root app
para.app_name = "Para"
# or set it to 'production'
para.env = "embedded"
# if true, users can be created without verifying their emails
para.security.allow_unverified_emails = false
# if hosting multiple apps on Para, set this to false
para.clients_can_access_root_app = true
# if false caching is disabled
para.cache_enabled = true
# a secret used for generating and verifying remember me tokens, JWTs. should be a long random string
para.app_secret_key = "b8db69a24a43f2ce134909f164a45263"
# enable API request signature verification
para.security.api_security = true
# the node number from 1 to 1024, used for distributed ID generation
para.worker_id = 1
```

1. [Download the JAR](https://github.com/erudika/para/releases)
2. Run it with `java -jar -Dconfig.file=./application.conf para-*.jar`
3. Call `curl localhost:8080/v1/_setup` and save the access and secret keys for the root app (important!)
4. Install `para-cli` tool for easy access `$ npm install -g para-cli`
5. Configure `para-cli` with `$ para-cli setup`
6. Create a new "child" app for regular use:
```bash
$ para-cli new-app "myapp" --name "My App" --endpoint "http://localhost:8080" \
	--accessKey "app:para" --secretKey "{root app secret}"
```
6. Open the [Para Web Console](https://console.paraio.org) or use one of the provided
client libraries below to connect to the API.

The root app (the initial Para app) is always created first. If you want to create multiple apps then you must
use [Para CLI tool](https://github.com/Erudika/para-cli) as shown above. Alternatively, you can call `Para.newApp()`
or make an authenticated request to the API `GET /v1/_setup/{app_name}`.

The quickest way to interact with Para is through the [command-line tool](https://github.com/Erudika/para-cli) (CLI):
```
$ npm install -g para-cli
# run setup and set endpoint to either 'http://localhost:8080' or 'https://paraio.com'
$ para-cli setup
$ para-cli ping
$ echo "{\"type\":\"todo\", \"name\": \"buy milk\"}" > todo.json
$ para-cli create todo.json --id todo1 --encodeId false
$ para-cli read --id todo1
$ para-cli search "type:todo"
```

Users are created either from Java code `paraClient.signIn(...)` or by making an API request to `POST /v1/jwt_auth`. See
[Sign in](#034-api-jwt-signin) or [Authentication](#033-restauth) sections for more details.

### Docker

Tagged Docker images for Para are located at `erudikaltd/para` on Docker Hub.
First, create an `application.conf` file in a directory and run this command:

```
$ docker run -ti -p 8080:8080 --rm -v para-data:/para/data \
  -v $(pwd)/application.conf:/para/application.conf \
  -e JAVA_OPTS="-Dconfig.file=/para/application.conf" erudikaltd/para
```

**Environment variables**

`JAVA_OPTS` - Java system properties, e.g. `-Dpara.port=8000`
`BOOT_SLEEP` - Startup delay, in seconds

**Plugins**

To use plugins, create a new `Dockerfile-plugins` which does a multi-stage build like so:
```
# change X.Y.Z with latest tag
FROM erudikaltd/para:vX.Y.Z-base

FROM erudikaltd/para-dao-mongodb:X.Y.Z
```

Then simply run `$ docker build -f Dockerfile-plugins -t ParaMongo`.

### Maven

The Java client for Para is a separate module with these Maven coordinates:

```xml
<dependency>
  <groupId>com.erudika</groupId>
  <artifactId>para-client</artifactId>
  <version>{VERSION}</version>
</dependency>
```

In your own project you can create a new `ParaClient` instance like so:

```java
ParaClient pc = new ParaClient(accessKey, secretKey);
// Para endpoint - http://localhost:8080 or https://paraio.com
pc.setEndpoint(paraServerURL);
// Set this to true if you want ParaClient to throw exceptions on HTTP errors
pc.throwExceptionOnHTTPError(false);
// send a test request - this should return a JSON object of type 'app'
pc.me();
```

> We've built a full-blown StackOverflow clone with Para in just about 4000 lines of code - check it out at https://scoold.com

### Client libraries

<div class="row">
  <div class="col-sm-4 text-center">
		<a href="https://github.com/Erudika/para/tree/master/para-client" class="btn-client">
			<i class="devicon-java-plain-wordmark"></i>
		</a>
	</div>
  <div class="col-sm-4 text-center">
		<a href="https://github.com/Erudika/para-client-js" class="btn-client">
			<i class="devicon-javascript-plain"></i>
		</a>
	</div>
  <div class="col-sm-4 text-center">
		<a href="https://github.com/Erudika/para-client-php" class="btn-client">
			<i class="devicon-php-plain"></i>
		</a>
	</div>
</div>
<div class="row">
	<div class="col-sm-4 text-center">
		<a href="https://github.com/Erudika/para-client-csharp" class="btn-client">
			<i class="devicon-dot-net-plain-wordmark"></i>
		</a>
	</div>
  <div class="col-sm-4 text-center">
		<a href="https://github.com/Erudika/para-client-android" class="btn-client">
			<i class="devicon-android-plain"></i>
		</a>
	</div>
  <div class="col-sm-4 text-center">
		<a href="https://github.com/Erudika/para-client-ios" class="btn-client">
			<i class="devicon-apple-original"></i>
		</a>
	</div>
</div>

### Building Para

Para can be compiled with JDK 8 and up.

To compile it you'll need Maven. Once you have it, just clone and build:

```sh
$ git clone https://github.com/erudika/para.git && cd para
$ mvn install -DskipTests=true
```
To generate the executable "uber-jar" run `$ mvn package` and it will be in `./para-jar/target/para-x.y.z-SNAPSHOT.jar`.
Two JAR files will be generated in total - the fat one is a bit bigger in size.

To run a local instance of Para for development, use:
```sh
$ mvn spring-boot:run
```
Alternatively, you can build a WAR file and deploy it to your favorite servlet container:
```
$ cd para-war && mvn package
```