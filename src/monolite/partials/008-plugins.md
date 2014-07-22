---
title: Plugins
category: Configuration
---

Para doesn't have a proper plugin mechanism yet but you can "weave in" functionality by overriding `AOPModule`.
You can intercept calls to `DAO` methods and execute your own code.

### Custom event listeners
Also you can override the `ParaContextListener` which is the main entry point for Para. Like the modules above, you can
implement `javax.servlet.ServletContextListener` in `META-INF/services` and create a subclass of `ParaContextListener`
which loads Para and, say, some other services for your app.

You can also register your own `InitializeListener`s and `DestroyListener`s which will execute when Para is initialized
and destroyed, respectively.

```java
// this has to be registered before Para.initialize() is called
Para.addInitListener(new Para.InitializeListener() {
	public void onInitialize() {
		// init code...
	}
});

Para.addDestroyListener(new Para.DestroyListener() {
	public void onDestroy() {
		// shutdown code...
	}
});
```
### Custom API resource handlers

Since version 1.7, you can register custom API resources by implementing the `CustomResourceHandler` interface.
Use the `ServiceLoader` mechanism to tell Para to load your handlers - add them to a file called
`com.erudika.para.rest.CustomResourceHandler` in `META-INF/services` where each line contains the full class name
of your custom resource handler class. On startup Para will load these and register them as API resource handlers.

The `CustomResourceHandler` interface is simple:

```java
public interface CustomResourceHandler {
	// the path of the resource, e.g "mystuff"
	String getRelativePath();
	// the code to handle the requests
	Response handle(ContainerRequestContext ctx);
}
```
