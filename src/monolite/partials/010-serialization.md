---
title: Serialization
category: Core classes
---

Para handles serialization and deserialization using a combination of Jackson, BeanUtils and Java reflection.
The process happens in the `ParaObjectUtils` class, and more precisely inside two particular methods -
`setAnnotatedFields()` and `getAnnotatedFields()`.

When defining your custom classes and fields, you're free to use any Java type, primitive or your own custom classes.
Basically, any type compatible with Jackson will work with Para as well. You can also use Jackson annotations on your
fields. A common example is declaring custom serializers and deserializers:

```java
public class MyCustomClass extends Sysprop {
	@JsonSerialize(using = CatSerializer.class)
	@JsonDeserialize(using = CatDeserializer.class)
	@Stored private Cat cat;
}

Map<String, Object> properties = ParaObjectUtils.getAnnotatedFields(customClass, false);
MyCustomClass deserialized = ParaObjectUtils.setAnnotatedFields(properties);
```

Notice the `false` at the end of `getAnnotatedFields()`. It means that whenever a complex/custom type is encountered,
it **will not** be flattened to a JSON string. This allows you to persist objects in their original format or
flatten them (`true`) to JSON. This is really useful in some situations.

Once a `ParaObject` is serialized to a `Map`, each `DAO` decides how it will persist that data. Some `DAO` implementations
persist objects in two columns - `id` and `json`, containing the JSON representation of that `Map`. Others,
like `MongoDBDAO`, preserve the format of objects and they are stored as JSON documents (not a JSON string).
When you're implementing your own `DAO` classes, it's entirely up to you to decide how `ParaObjects` will be persisted.
There are absolutely no restrictions for this, as long as the data comes back as a `Map` at the point of retrieval.

It's important to mention that serialization/deserialization can happen in both the server and the client.
The Para clients will read your custom classes and serialize them to JSON before sending them to the Para server.
When you define your custom classes on the clientside, the server doesn't know about them - they are simply converted to
`Sysprop` (a container class) objects when received from the client. This, however, is only done for practical reasons
on the serverside. It does not mean that on the clientside, the objects returned from the server will be
deserialized to `Sysprop`, on the contrary, they will be deserialized to your custom classes.

### Annotations

Para uses annotations to mark what attributes of a class need to be saved. There are several annotations that Para uses
but the two main ones are `@Stored` and `@Locked`.

`@Stored` tell Para that an attribute needs to be persisted but
that field should not be declared as `transient` otherwise it will be skipped.

`@Locked` is used as a filter for those
attributes that are read-only like `type` and `id`. These are created once and never change so when calling `update()`
they will be skipped.

