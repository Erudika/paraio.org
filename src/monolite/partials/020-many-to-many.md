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

Linking and unlinking two objects is done like this:

```java
object1.link(Object2.class, object2.getId());
object1.unlink(Object2.class, object2.getId());
// delete all links to/from object1
object1.unlinkAll();
```

To check if two objects are linked use `object1.isLinked(Object2.class, object2.getId())`. Also you can count the number
of links by calling `object1.countLinks(Object2.class)`.