---
title: Many-to-many
category: Linked objects
---

Many-to-many relationships are implemented in Para with `Linker` objects. This object contains information
about a link between two objects. This is simply the `id` and `type` of both objects. Linker objects are just regular
Para objects - they can be persisted, indexed and cached.

<pre>
+--------+
|  tag1  |
+---+----+
    |
+---+------------+
|post:10:tag:tag1|  Linker
+---+------------+
    |
+---+------+
|  Post1   |
|  id:10   |
+----------+
</pre>

**Note:** The following methods are only used when creating "many-to-many" links.
Linking and unlinking two objects, `object1` and `object2`, is done like this:

```java
object1.link(object2.getType(), object2.getId());
object1.unlink(object2.getType(), object2.getId());
// delete all links to/from object1
object1.unlinkAll();
```

To check if two objects are linked use:
```java
object1.isLinked(object2.getType(), object2.getId())
```
Also you can count the number of links by calling:
```java
object1.countLinks(object2.getType())
```

Finally, to read all objects that are linked to `object1`, use:

```java
object1.getLinkedObjects(object2.getType(), Pager... pager);
```