---
title: Modules
category: Configuration
---

In the `para-server` package, there are several core modules:

- `PersistenceModule` - defines the core persistence class implementation
- `SearchModule` - defines the core search class implementation
- `CacheModule` - defines the core cache class implementation
- `EmailModule` - defines an email service implementation for sending emails
- `AOPModule` - manages the indexing and caching aspects of Para objects
- `I18nModule` - defines a currency converter service implementation
- `QueueModule` - defines a queue service implementation
- `StorageModule` - defines a file storage service, e.g. Amazon S3

You can override all of the above using the `ServiceLoader` mechanism in Java like so:

1. Create a file `com.google.inject.Module` inside the `META-INF/services` folder
2. Then add the full class names of all your modules, one on each line
3. Para will load these modules on startup use them instead of the default ones

For example, let's say you want to implement a new `PersistenceModule` which connects to MySQL.
You can define it like so:

```java
class MySqlModule extends AbstractModule {
	protected void configure() {
		bind(DAO.class).to(MySqlDAO.class).asEagerSingleton();
	}
}
```
Then implement the `DAO` interface in your class `MySqlDAO` so that it connects to a MySQL server and stores and loads objects.
Finally write the full class name `com.company.MySqlModule` to the file `com.google.inject.Module` and Para will use this
module as its default persistence module.

You can also override modules programmatically like this:

```java
ParaServer.initialize(Modules.override(ParaServer.getCoreModules()).with(new Module() {
	public void configure(Binder binder) {
		binder.bind(DAO.class).to(MyDAO.class).asEagerSingleton();
		binder.bind(Cache.class).to(MyCache.class).asEagerSingleton();
		binder.bind(Search.class).to(MySearch.class).asEagerSingleton();
	}
}));
```

Also, you could start Para with the default modules like this:

```java
// Initialize Para and call each `listener.onInitialize()`
ParaServer.initialize();

// Finally, destroy all resources by calling each `listener.onDestroy()`
ParaServer.destroy();
```

If you're defining your own custom classes, don't forget to set:
```
System.setProperty("para.core_package_name", "com.company.myapp.core");
```

There are two additional methods `Para.initialize()` and `Para.destroy()` which are now part of `para-core`. The
difference between these and the ones above is:

- `Para.initialize()` - invokes all registered `InitializeListener` instances and prints out logo to console;
- `ParaServer.initialize() - loads all Guice modules, binds them and injects concrete types into each
`InitializeListener`, then calls `Para.initialize()`;

- `Para.destroy()` - invokes all registered `DestroyListener` instances and prints out a log message;
- `ParaServer.destroy()` - injects concrete types into each `DestroyListener` and calls `Para.destroy()`.


> Para uses [Google Guice](https://github.com/google/guice) as its module manager and DI system.