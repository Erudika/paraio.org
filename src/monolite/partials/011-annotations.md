---
title: Annotations
category: Core classes
---

Para uses annotations to mark what attributes of a class need to be saved. There are several annotations that Para uses
but we'll focus on two on those - `@Stored` and `@Locked`.

`@Stored` tell Para that an attribute needs to be persisted but
that field should not be declared as `transient` otherwise it will be skipped.

`@Locked` is used as a filter for those
attributes that are read-only like `type` and `id`. These are created once and never change so when calling `update()`
they will be skipped.

You can also add constraints to your attributes like so:

```java
@Stored @NotBlank @Email
private String email;
```

This will tell Para to validate that field and check that it actually contains an email. If the validation fails, the
object containing that field will not be created or updated.

To manually validate an object use `Utils.validateObject(ParaObject po)`.

> Para uses [Hibernate Validator](http://hibernate.org/validator/) for data validation.
