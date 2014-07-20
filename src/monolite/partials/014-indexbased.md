---
title: In-memory
category: Persistence
---

When running in `embedded` mode you are actually using the `IndexBasedDAO` implementation which relies on the search
index as a persistence layer. It uses the search index as a database.

A local Elasticsearch instance is started each time Para starts and is also stopped on `Para.destroy()`.

See [Elasticsearch](#014-search) for more information.

> This implementation is intended for development purposes only. When using it also make sure that you are working with
a single `App` object and its `shared` property is `false`
