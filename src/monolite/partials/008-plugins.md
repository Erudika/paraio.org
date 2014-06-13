---
title: Plugins
category: Configuration
---

Para doesn't have a proper plugin mechanism yet but you can "weave in" functionality by overriding `AOPModule`.
You can intercept calls to `DAO` methods and execute your own code.

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