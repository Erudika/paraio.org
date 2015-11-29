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
