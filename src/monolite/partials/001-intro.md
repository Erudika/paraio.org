---
title: Introduction
---

Para is a flexible backend service, created as an open-source project in the year 2013.
It was born out of our need to have a robust system which would allow us to persist objects easily to anything -
RDBMS, NoSQL and in-memory databases. We needed a simple solution with an API which would scale well and provide a
solid foundation for our future projects.

Para is a **3-tier backend system** with a REST API in front of it. The first tier is the **database**, the second
tier is the **search index** and the third is the **cache**. Depending on how you use it, Para can either be a
standalone backend service or a persistence framework that is part of your code base.

Para is multitenant, which means you can deploy it as a standalone service on one or more nodes and host one or more
applications on it ("apps"). An app can be a website, mobile app, desktop app or even a command-line tool.
This is made possible by the REST API which talks JSON to your apps, and with the help of the client libraries below,
it's easy to get started. If you're building an application on the JVM, you can also add Para as Maven dependency to
your project. You can still keep the REST API or turn it off completely.

### Quick start

1. [Download the WAR](https://github.com/erudika/para/releases)
2. Run it with `java -jar -Dconfig.file=./application.conf para-*.war`
3. Call `curl localhost:8080/v1/_setup` to get the access and secret keys
4. Open the [Para Web Console](https://console.paraio.org) or use one of the provided
client libraries below to connect to the API.

The root app (the initial Para app) is automatically created. If you want to create multiple apps then you must
call `Para.newApp()` or make an authenticated request to the API `GET /v1/_setup/{app_name}`.

Users are created either from Java code `new User().create()` or by making an API request to `POST /v1/jwt_auth`. See
[Sign in](#034-api-jwt-signin) or [Authentication](#033-restauth) sections for more details.

Configuration properties belong in your `application.conf` file.
Here's an example configuration for development purposes:
```
# the name of your app
para.app_name = "My App"
# or set it to 'production'
para.env = "embedded"
# allows clients to register any user with any email
para.security.allow_unverified_emails = true
# if hosting multiple apps on Para, set this to false
para.clients_can_access_root_app = true
# no need for caching in dev mode
para.cache_enabled = false
# change this to a random string
para.app_secret_key = "b8db69a24a43f2ce134909f164a45263"
# enable API request signature checking
para.security.api_security = true
```

The quickest way to interact with Para is through the [command-line tool](https://github.com/Erudika/para-cli) (CLI):
```
$ npm install -g para-cli
$ para-cli ping
$ echo "{\"type\":\"todo\", \"name\": \"buy milk\"}" > todo.json
$ para-cli create todo.json --id todo1 --encodeId false
$ para-cli read --id todo1
$ para-cli search "type:todo"
```

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
// for development the default endpoint is http://localhost:8080
pc.setEndpoint(paraServerURL);
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

Para can be compiled with JDK 6 and up, but using JDK 8+ is recommended.

To compile it you'll need Maven. Once you have it, just clone and build:

```sh
$ git clone https://github.com/erudika/para.git && cd para
$ mvn install -DskipTests=true
```
To generate the executable "uber-war" run `$ mvn package` and it will be in `./para-war/target/para-x.y.z-SNAPSHOT.war`.
Two WAR files will be generated in total - the fat one is a bit bigger in size.

To run a local instance of Para for development, use:
```sh
$ mvn spring-boot:run
```