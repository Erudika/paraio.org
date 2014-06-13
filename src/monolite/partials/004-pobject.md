---
title: The Para Object
category: Getting Started
---

Para allows you to have plain objects like this:

```java
class User {
	public String name;
	public int age;
}
```

and turn them into persistable Para objects just by adding one annotation and extending the core Para class `PObject`:

```java
class User extends PObject {
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