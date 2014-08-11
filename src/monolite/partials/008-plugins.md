---
title: Plugins
category: Configuration
---

Para allows you to "weave in" functionality by overriding `AOPModule`. You can intercept calls to `DAO` methods
and execute your own code.

### Custom event listeners

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
 
### Custom context initializers

Para will automatically pick up your classes which extend the `Para` class. They should be annotated
with `@Configuration`, `@EnableAutoConfiguration` and `@ComponentScan`. The `Para` class implements Spring Boot's
`WebApplicationInitializer` which creates the root application context.

In your custom initializers you have full access to the `ServletContext` and this is a good place to register
your own filters and servlets. These initializer classes also act as an alternative to
`web.xml` by providing programmatic configuration capabilities.

### Custom API resource handlers

Since version 1.7, you can register custom API resources by implementing the `CustomResourceHandler` interface.
Use the `ServiceLoader` mechanism to tell Para to load your handlers - add them to a file called
`com.erudika.para.rest.CustomResourceHandler` in `META-INF/services` where each line contains the full class name
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
