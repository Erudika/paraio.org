---
title: User-defined classes
category: Core classes
---

Let's say you have a class `Article` in your application that you wish to persist. You first implement the `ParaObject`
interface, then add a few data fields to it. Implementing the interface is trivial as the basic functionality of
the required methods is already implemented in the `CoreUtils`.

You need to specify which fields you want to be saved by adding the `@Stored` annotation. Additionally, you can add
the `@Locked` annotation to prevent a field from being updated (i.e. it can only be set on `create()`). This is useful
for fields that contain sensitive data, which should not be modified easily.

```java
class Article implements ParaObject {
	@Stored private String title;
	@Stored private String text;
	@Stored private Map<?, ?> someCustomProperty;
}
```

When defining your custom properties (fields) you can either declare they as Java types like `List`, `Map`,
`String`, `boolean`, or use your own custom types.

You don't have to define common fields like `id` or `name` because they are already defined in the parent class.
Now you can create a new article like so:

```java
System.setProperty("para.core_package_name", "com.erudika.para.core");

Article a = new Article();
a.setTitle("Some title");
a.setText("text...");
// the article is saved and a new id is generated
String id = a.create();
```

> **Important:** Don't forget to set `para.core_package_name` to point to the package where your `ParaObject` classes are.
> Para will scan that package and will use those new definitions to serialize and deserialize objects.

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
- get it by calling `CoreUtils.getInstance().getDao()`
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
> can have any number of custom properties (fields). When doing search on custom fields, add the "properties" prefix to
> them, like `properties.myfield`.

For example, lets create another custom `Article` object through the API. We'll add to it a custom field called `author`:

```
POST /v1/articles

{
 "appid": "myapp",
 "author": "Gordon Freeman"
}
```

This creates a new `Article` and indexes all fields including the custom field `author`. To search for objects through the
API, containing the `author` field we can do a request like this:

```
GET /v1/articles/search?q=properties.author:Gordon*
```

Note that we have `q=properties.author:...` instead of `q=author:...`. This is due to the fact that custom fields are
stored in Para using a nested `Map` called `properties` (see the `Sysprop` class).