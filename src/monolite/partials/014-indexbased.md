---
title: In-memory
category: Persistence
---

When running in `embedded` mode you are actually using the `IndexBasedDAO` implementation which relies on the search
index as a persistence layer. It stores objects in memory rather than a database and retrieves them from the search
index.

A local ElasicSearch instance is started each time Para starts and is also stopped on `Para.destroy()`.

See [ElasticSearch](#014-search) for more information.

> This implementation is intended for development purposes only.
