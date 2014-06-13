---
title: Hazelcast
category: Cache
---

Para uses Hazelcast as the default implementation of the `Cache` interface. It was chosen because it provides excellent
support for distributed data structures like maps and sets. It allows us to use a portion of the memory on each node
for caching without having to manage a separate caching server or cluster.

Para organizes caches by application name - each application has its own separate distributed map with the same name.

> For more information see the [Hazelcast docs](http://www.hazelcast.org/docs/latest/manual/html-single).
