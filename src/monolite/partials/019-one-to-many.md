---
title: One-to-many
category: Linked objects
---

Object relationships are defined by the `Linkable` interface. All Para objects are linkable, meaning that they can be
related to other Para objects.

Para supports one-to-many relationships between objects with the `parentid` field. It contains the `id` of the parent
object. For example a user might be linked to their father like this:

<pre>
+--------+
| Darth  |
| id: 5  |  Parent
+---+----+
    |
+---+---------+
| Luke        |
| id: 10      |  Child
| parentid: 5 |
+-------------+
</pre>

This allows us to have a parent objects with many children which have the same `parentid` set. Now we can get all
children for a given object by calling `parent.getChildren(Class<P> clazz)`. This will return the list of objects that
have a `parentid` equal to that object's `id`. For example:

```java
// assuming we have the parent object...
User luke = parent.getChildren(User.class).get(0);
User darth = dao.read(luke.getParentid());
```
