---
title: User-defined classes
category: Core classes
---

Let's say you have a class `Article` in your application that you wish to persist. You first implement `ParaObject`,
then add a few data fields to it. You need to specify which fields you want to be saved by adding the
`@Stored` annotation.

```java
class Article implements ParaObject {
	@Stored private String title;
	@Stored private String text;
}
```

You don't have to define common fields like `id` or `name` because they are already defined in the parent class.
Now you can create a new article like so:

```java
Article a = new Article();
a.setTitle("Some title");
a.setText("text...");
// the article is saved and a new id is generated
String id = a.create();
```

Updating and deleting is easy too:

```java
a.setTitle("A new title");
a.update();
// or
a.delete();
```

When you call `create()` Para will intercept that call and automatically index and cache the object. Calling the methods
`update()` and `delete()` also get intercepted and will update or delete that object in/from the search index and
cache respectively.

If you want to read an object, first you have to get access to the `DAO` object. You can either:
- call `Para.getDAO()`
- get it from another `ParaObject` with `pobj.getDao()`
- `@Inject` it with `Para.injectInto()`

Then you can read an object using its id:

```java
// returns a single article or null
Article readA = dao.read(id);
```

You can also define custom types of objects through the REST API by changing the `type` property on your objects.
Keep in mind that the following are reserved words and they *should not* be used for naming your types (plural form included):
**"search(es)", "util(s)"**.

> Note that you can create objects with custom types and fields [through the REST API](#036-api-create) without having
> to define them as Java classes like above. These custom objects will be based on the generic `Sysprop` class but
> can have any number of custom properties (fields).