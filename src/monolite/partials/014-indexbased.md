---
title: In-memory
category: Persistence
---

**Moved to [para-search-elasticsearch](https://github.com/erudika/para-search-elasticsearch) plugin, in v1.25.**

When running in `embedded` mode you are actually using the `IndexBasedDAO` implementation which relies on the search
index as a persistence layer. It uses the search index as a database.

A local Elasticsearch instance is started each time Para starts and is also stopped on `Para.destroy()`.

See [Elasticsearch](#014-search) for more information.

> This implementation is intended for development purposes only. When using it also make sure that you are working with
a single `App` object and its `sharingIndex` property is `false`
