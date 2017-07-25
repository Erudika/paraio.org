---
title: In-memory
category: Persistence
---

**Moved to [para-search-elasticsearch](https://github.com/erudika/para-search-elasticsearch) plugin, in v1.25.**

The `IndexBasedDAO` implementation relies on the search index as a persistence layer. In other words, it uses
Elasticsearch as a database.

A local Elasticsearch instance **must** be started so that Para can connect to it.

See [Elasticsearch](#014-search) for more information.

> This implementation is intended for development purposes only. When using it also make sure that you are working with
a single `App` object and its `sharingIndex` property is `false`
