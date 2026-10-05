---
title: Plugins
category: Configuration
---

Para will look for various plugins like `IOListener`s, `CustomResourceHandler`s, `DAO`s etc, on startup.
The folder in which plugins JARs should be placed is `./lib/`, by default, but it can be configured like so:
```
para.plugin_folder = "plugins/"
```

### Official plugins

Para ships with ten official plugins:

| Plugin                      | Type        | Configuration property |
|-----------------------------|-------------|------------------------|
| `para-dao-sql`              | `DAO`       | `para.dao`             |
| `para-dao-mongodb`          | `DAO`       | `para.dao`             |
| `para-dao-cassandra`        | `DAO`       | `para.dao`             |
| `para-dao-dynamodb`         | `DAO`       | `para.dao`             |
| `para-search-lucene`        | `Search`    | `para.search`          |
| `para-search-elasticsearch` | `Search`    | `para.search`          |
| `para-cache-hazelcast`      | `Cache`     | `para.cache`           |
| `para-storage-s3`           | `FileStore` | `para.fs`              |
| `para-queue-sqs`            | `Queue`     | `para.q`               |
| `para-email-ses`            | `Emailer`   | `para.emailer`         |

Plugins are **thin JARs**, published to Maven Central. Each one carries a manifest of its own runtime
dependencies in `META-INF/para/plugin-deps.txt`, so installing a plugin means downloading the JAR plus
that list of dependencies. Every downloaded artifact is verified against the SHA-256 checksum published
by Maven Central before it is written to disk. If no SHA-256 exists, SHA-1 is accepted and a warning is
logged; if neither is published, the artifact is rejected rather than installed unverified.

Two plugins are baked into the default Para release: `para-dao-sql` and `para-search-lucene`. All the
others can be installed at runtime through the [plugin API](#plugin-api) below.

#### Installing a plugin

```console
$ curl -X POST https://localhost:8080/v1/_plugins/para-dao-mongodb/install
{"installed":true,"artifactId":"para-dao-mongodb","version":"1.52.1","dependencies":4,
 "newlyDownloaded":4,"restartRequired":true,"message":"Plugin installed. Restart Para to load it."}
```

Optionally, the payload may specify a version:

```console
$ curl -X POST -H 'Content-Type: application/json' \
    -d '{"version":"1.52.1"}' \
    https://localhost:8080/v1/_plugins/para-dao-mongodb/install
```

Use `GET /v1/_plugins/{artifactId}/preview` to find out what an install would fetch, without writing
anything to disk. This is what a confirmation prompt in an admin UI should call.

> **Important:** Para must be **restarted** after installing or removing a plugin. The plugin
classloader is built once during startup and cached, so a running server does not pick up new JARs.

> **Security:** All `/v1/*` paths require an authenticated user. To restrict plugin management to
administrators, add the path to `security.protected`:
```
para.security.protected = {
    "/v1/_plugins/**" = [{role = "ROOT"}]
}
```

### JDBC drivers

JDBC drivers are **not** plugins and are not published to Maven Central, so the plugin API cannot
install them. Which driver you need depends on your database. Drop the JAR into the plugin folder, or
into `lib/` next to the Para JAR:

```
lib/mysql-connector-j-9.1.0.jar
```

For this to work the Para process must put that folder on the classpath:

```console
java -Dloader.path=lib -jar para.jar
```

`-Dloader.path` is honoured only by Spring Boot's `PropertiesLauncher`. The official Para release JAR
is built with it, so the flag works out of the box. The Docker image sets `JAVA_OPTS=-Dloader.path=lib`
and the Helm chart sets `-Dloader.path=/para/lib` for the same reason. If you build Para yourself,
build with the `fatjar` Maven profile, which uses `layout=ZIP` and therefore `PropertiesLauncher`:

```console
mvn -Pfatjar,sql,lucene -DskipTests=true package
```

If you use `JarLauncher` instead, `lib/` is ignored and `Class.forName()` on a driver class will fail
with `ClassNotFoundException`.

### Writing your own plugin

In version 1.18 we expanded the support for plugins. Para can load third-party plugins for various
`DAO` implementations, like [MongoDB](https://github.com/Erudika/para-dao-mongodb) for example. The
plugin `para-dao-mongodb` is loaded using the `ServiceLoader` mechanism from the classpath and replaces
the default `AWSDynamoDAO` implementation.

To create a plugin you have to create a new project and import `para-core` with Maven and extend one of
the three interfaces - `DAO`, `Search`, `Cache`. Implement one of these interfaces and name your project
by following the convention:

- `para-dao-mydao` for `DAO` plugins,
- `para-search-mysearch` for `Search` plugins,
- `para-cache-mycache` for `Cache` plugins.

For example, the [plugin for MongoDB](https://github.com/Erudika/para-dao-mongodb) is called `para-dao-mongodb` and
implements the `DAO` interface with the MongoDB driver for Java.

You also need to create one file inside `src/main/resources/META-INF/services/` in your plugin project,
named after the interface it implements:

- `com.erudika.para.core.persistence.DAO` for `DAO` plugins,
- `com.erudika.para.core.search.Search` for `Search` plugins,
- `com.erudika.para.core.cache.Cache` for `Cache` plugins,
- `com.erudika.para.core.storage.FileStore` for `FileStore` plugins,
- `com.erudika.para.core.queue.Queue` for `Queue` plugins,
- `com.erudika.para.core.email.Emailer` for `Emailer` plugins.

Inside this file you put the full class name of your implementation, for example
`com.erudika.para.server.persistence.MyDAO`, on one line and save the file. A single plugin may register
several implementations; `para-dao-sql` for instance registers both `H2DAO` and `SqlDAO`.

Do **not** use `maven-shade-plugin`. A shaded JAR is 30 to 65 MB and cannot be installed by the plugin
API, because it has no readable dependency manifest. Instead, ship a thin JAR and let the plugin API
resolve dependencies. To make your plugin installable through the API, have
`maven-dependency-plugin` write the dependency list into your JAR:

```xml
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-dependency-plugin</artifactId>
	<version>3.9.0</version>
	<executions>
		<execution>
			<id>write-plugin-deps</id>
			<phase>generate-resources</phase>
			<goals>
				<goal>list</goal>
			</goals>
			<configuration>
				<includeScope>runtime</includeScope>
				<outputFile>${project.build.outputDirectory}/META-INF/para/plugin-deps.txt</outputFile>
				<outputAbsoluteArtifactFilename>false</outputAbsoluteArtifactFilename>
			</configuration>
		</execution>
	</executions>
</plugin>
```

Declare `para-core` with `<scope>provided</scope>`. It is supplied by the Para server, and the resolver
must never download a second copy of it.

To load your own plugin, follow these steps:

1. Publish the plugin JAR to Maven Central, or place it, plus its dependencies, in the plugin folder
(`lib/` by default) or `WEB-INF/lib` next to the Para server,
2. Set the configuration property to the simple class name, for example `para.dao = "MyDAO"`,
`para.search = "MySearch"` or `para.cache = "MyCache"`,
3. Start the Para server and the new plugin should be loaded.

> **Important:** Each plugin must implement and register a `DestroyListener` on initialization where all resources
(connections, streams, pools) should be properly released and closed. Using `Runtime.getRuntime().addShutdownHook()` is
**not** recommended because in some cases that method is not executed.

### Plugin API

| Method   | Path                                | Description                                                     |
|----------|-------------------------------------|-----------------------------------------------------------------|
| `GET`    | `/v1/_plugins`                       | Lists official plugins with type, config key, installed, selected |
| `GET`    | `/v1/_plugins/installed`             | Lists every JAR in the plugin folder                            |
| `GET`    | `/v1/_plugins/{artifactId}/preview`  | Reports the dependencies and download size of a plugin          |
| `POST`   | `/v1/_plugins/{artifactId}/install`  | Downloads and verifies a plugin and its dependencies            |
| `DELETE` | `/v1/_plugins/{artifactId}/{version}`| Removes a plugin JAR                                             |

`GET /v1/_plugins` returns one entry per plugin:

```json
{
  "para-dao-mongodb": {
    "artifactId": "para-dao-mongodb",
    "name": "MongoDB",
    "description": "MongoDB document store DAO",
    "type": "DAO",
    "implementationClasses": ["MongoDBDAO"],
    "configKey": "dao",
    "installed": false,
    "selected": false
  }
}
```

Use `configKey` and `implementationClasses` to tell the user what to set in `application.conf`. For
example, installing `para-dao-mongodb` and then selecting it means setting `para.dao = "MongoDBDAO"`
and restarting.

### Custom event listeners

To register your own `InitializeListener`s and `DestroyListener`s add the following code to one of your constructors
or inside a static block in one of your classes:

```java
// this has to be registered before Para.initialize() is called
Para.addInitListener(new InitializeListener() {
	public void onInitialize() {
		// TODO: do stuff on initialization...
	}
});

Para.addDestroyListener(new DestroyListener() {
	public void onDestroy() {
		// TODO: release resources...
	}
});
```
### Custom I/O listeners

An I/O listener is a callback function which is executed after an input/output (CRUD) operation. After a call is made to
one of the `DAO` methods like `read()`, `update()`, etc., all registered listeners are notified and called.
It is recommended that the code inside these listeners is asynchronous or less CPU intensive so it does not slow down
the calls to `DAO`.

```java
Para.addIOListener(new IOListener() {
	public void onPreInvoke(Method method, Object[] args) {
		// do something before the CRUD operation...
	}
	public void onPostInvoke(Method method, Object result) {
		// do something with the result...
	}
});
```

### Custom listeners for app events

These listeners can be registered to execute code when an app is created or deleted. This is useful when we need to
do additional operations like creating DB tables and/or creating indexes for the new app. Also we might want to clean up
those after the app is deleted. Example:

```java
App.addAppCreatedListener(new AppCreatedListener() {
	public void onAppCreated(App app) {
		if (app != null) {
			createTable(app.getAppIdentifier());
		}
	}
});

App.addAppDeletedListener(new AppDeletedListener() {
	public void onAppDeleted(App app) {
		if (app != null) {
			deleteTable(app.getAppIdentifier());
		}
	}
});
```
Additionally, you can listen for changes to the custom app settings with these two event listeners:
```
App.addAppSettingAddedListener(new AppSettingAddedListener() {
	public void onSettingAdded(App app, String settingKey, Object settingValue) {
		if (app != null) {
			// trigger something
		}
	}
});

App.addAppSettingRemovedListener(new AppSettingRemovedListener() {
	public void onSettingRemoved(App app, String settingKey) {
		if (app != null) {
			// trigger something else
		}
	}
});
```

### Custom context initializers

Para will automatically pick up your classes which extend the `Para` class. They should be annotated
with `@Configuration`, `@EnableAutoConfiguration` and `@ComponentScan`. The `Para` class implements Spring Boot's
`WebApplicationInitializer` which creates the root application context.

In your custom initializers you have full access to the `ServletContext` and this is a good place to register
your own filters and servlets. These initializer classes also act as an alternative to
`web.xml` by providing programmatic configuration capabilities.

### Custom API resource handlers

Since version 1.7, you can register custom API resources by implementing the `CustomResourceHandler` interface.
Use the `ServiceLoader` mechanism to tell Para to load your handlers - add them to a file named:
```
com.erudika.para.core.rest.CustomResourceHandler
```
in `META-INF/services` where each line contains the full class name
of your custom resource handler class. On startup Para will load these and register them as API resource handlers.

The `CustomResourceHandler` interface is simple:

```java
public interface CustomResourceHandler { }
```
Here's an example of a custom REST resource handler:

```java
@RestController
@RequestMapping(value = "/myresource", produces = "application/json")
public class MyCustomResource implements CustomResourceHandler {
	@GetMapping("/test")
	public Map test() {
		return Map.of("body", "json");
	}
}
```


You can use `@Inject` in your custom handlers to inject any object managed by Para.
