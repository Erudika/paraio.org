---
title: Plugins
category: Configuration
---

Para will look for various plugins like `IOListener`s, `CustomResourceHandler`s, `DAO`s etc, on startup.
The folder in which plugins JARs should be placed is `./lib/`, by default, but it can be configured like so:
```
para.plugin_folder = "plugins/"
```

### `DAO`, `Search` and `Cache` plugins

In version 1.18 we expanded the support for plugins. Para can now load third-party plugins for various `DAO`
implementations, like [MongoDB](https://github.com/Erudika/para-dao-mongodb) for example. The plugin `para-dao-mongodb`
is loaded using the `ServiceLoader` mechanism from the classpath and replaces the default `AWSDynamoDAO` implementation.

To create a plugin you have to create a new project and import `para-core` with Maven and extend one of the three
interfaces - `DAO`, `Search`, `Cache`. Implement one of these interfaces and name your project by following the
convention:

- `para-dao-mydao` for `DAO` plugins,
- `para-search-mysearch` for `Search` plugins,
- `para-cache-mycache` for `Cache` plugins.

For example, the [plugin for MongoDB](https://github.com/Erudika/para-dao-mongodb) is called `para-dao-mongodb` and
implements the `DAO` interface with the MongoDB driver for Java.

You also need to create one file inside `src/main/resources/META-INF/services/` in your plugin project:

- `com.erudika.para.persistence.DAO` for `DAO` plugins,
- `com.erudika.para.search.Search` for `Search` plugins,
- `com.erudika.para.cache.Cache` for `Cache` plugins.

Inside this file you put the full class name of your implementation, for example `com.erudika.para.persistence.MyDAO`,
on one line and save the file.

To load a plugin follow these steps:

1. Place the plugin JAR in a folder called `lib` (depends on configuration) or `WEB-INF/lib` in the same folder
as the Para server or include the plugin through Maven,
2. Set the configuration property `para.dao = "MyDAO"` or `para.search = "MySearch"` or `para.cache = "MyCache"`
(use the simple class name here)
3. Start the Para server and the new plugin should be loaded

### Custom event listeners

You can also register your own `InitializeListener`s and `DestroyListener`s which will execute when Para is initialized
and destroyed, respectively.

```java
// this has to be registered before Para.initialize() is called
Para.addInitListener(new InitializeListener() {
	public void onInitialize() {
		// init code...
	}
});

Para.addDestroyListener(new DestroyListener() {
	public void onDestroy() {
		// shutdown code...
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
com.erudika.para.rest.CustomResourceHandler
```
in `META-INF/services` where each line contains the full class name
of your custom resource handler class. On startup Para will load these and register them as API resource handlers.

The `CustomResourceHandler` interface is simple:

```java
public interface CustomResourceHandler {
	// the path of the resource, e.g. "my-resource"
	String getRelativePath();
	// handle GET requests
	Response handleGet(ContainerRequestContext ctx);
	// handle PUT requests
	Response handlePut(ContainerRequestContext ctx);
	// handle POST requests
	Response handlePost(ContainerRequestContext ctx);
	// handle DELETE requests
	Response handleDelete(ContainerRequestContext ctx);
}
```

You can use `@Inject` in your custom handlers to inject any object managed by Para.
