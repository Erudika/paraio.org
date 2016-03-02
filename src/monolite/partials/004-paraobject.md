---
title: The ParaObject interface
category: Getting Started
---

All domain classes in Para implement the `ParaObject` interface which gives objects basic common properties like
`id`, `timestamp`, `name`, etc. Let's say you have a plain old Java object like this:

```java
class User {
	public String name;
	public int age;
}
```

and you want to turn it into persistable Para objects. You can do it by just adding one annotation and
implementing `ParaObject`:

```java
class User implements ParaObject {
	@Stored public String name;
	@Stored public int age;
}
```

This allows you do call `create()`, `update()`, `delete()` on that object **and** enables search indexing automatically.
Now you can do:

```java
User u = new User();
u.setName("Gordon Freeman");
u.setAge(40);
// generates a new id and persists the object
String id = u.create();
```

Once the objects is created and persisted we can search for it like this:

```java
// returns a list of users found
List<User> users = Para.getSearch().findQuery(u.getType(), "freeman");
```

And here's what a Para object looks like as JSON when returned from the REST API:

```json
{
  "id" : "572040968316915712",
  "timestamp" : 1446469779546,
  "type" : "user",
  "appid" : "para",
  "updated" : 1446469780024,
  "name" : "Gordon Freeman",
  "votes" : 0,
  "identifier" : "fb:1000123456789",
  "groups" : "admins",
  "active" : true,
  "email" : "g.freeman@blackmesa.com",
  "objectURI" : "/users/572040968316915712",
  "plural" : "users"
}
```

### Implementing your own `ParaObject` classes

There was a question about how to implement `ParaObject` and where to start from. First of all, there is no need to write
your own custom classes if you're going to be using them for simple stuff. So step one is to take a look at the generic
class called `Sysprop`. Look at the [source code on GitHub](https://github.com/Erudika/para/blob/master/para-core/src/main/java/com/erudika/para/core/Sysprop.java).
It's pretty simple and implements all of `ParaObject`'s methods. Then you have to decide if you can work with that
generic class or not. If you really need custom properties and methods then that class is a good starting point.
Just copy the getters and setters and add your own fields and methods.

Another option is to extend `Sysprop` like so:

```java
public class MyParaObject extends Sysprop implements ParaObject {
	// 'implements' is redundant here

	@Stored
	public String myCustomField;
	// get & set...
}
```

This is a quick way of having your own classes that work with Para and it spares you the writing of all the boilerplate code.
You can later override the parent methods, for example if you need to execute some custom code on `create()`:

```java
@Override
public String create() {
	// TODO; write your own code here
	return dao.create(getAppid(), this); // this writes to DB
}
```

### Fine-tuning backend operations

From version 1.18 `ParaObject`s have three new flags - `stored`, `indexed` and `cached`. These flags turn on and off
the three main operations - persistence, indexing and caching. Developers can choose to switch off caching on a number
of objects that change very often, for example. Also some objects my be hidden from search by setting the `indexed: false`
flag. And finally you can turn off persistence completely with `stored: false` and thus have objects that
live only in memory (and search index) but are never stored in the database.