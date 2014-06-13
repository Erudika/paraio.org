---
title: Modules
category: Configuration
---

These are the core modules defined in Para:

- `PersistenceModule` - defines the core persistence class implementation
- `SearchModule` - defines the core search class implementation
- `CacheModule` - defines the core cache class implementation
- `EmailModule` - defines an email service implementation for sending emails
- `AOPModule` - manages the indexing and caching aspects of Para objects
- `I18nModule` - defines a currency converter service implementation
- `QueueModule` - defines a queue service implementation
- `StorageModule` - defines a file storage service, e.g. S3 (*not implemented yet*)

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

**Note:** Modules cannot be overridden when Para is running in standalone mode.

> Para uses [Google Guice](https://code.google.com/p/google-guice/) v3 as its module manager and DI system.