---
title: Annotations
category: Core classes
---

Para uses annotations to mark what attributes of a class need to be saved. There are several annotations that Para uses
but the two main ones are `@Stored` and `@Locked`.

`@Stored` tell Para that an attribute needs to be persisted but
that field should not be declared as `transient` otherwise it will be skipped.

`@Locked` is used as a filter for those
attributes that are read-only like `type` and `id`. These are created once and never change so when calling `update()`
they will be skipped.

`@Cached` is used internally by Para for caching and you don't need to used it in your projects.
