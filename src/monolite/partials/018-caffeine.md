---
title: Caffeine
category: Cache
---

Caffeine is the default cache implementation since v1.26. It's built on top of the excellent Caffeine library by
Ben Manes. This cache is supports automatic eviction and TTL for each object.

There's one big cache map for all Para apps. Cached objects have keys with a unique prefix for each app. When the reaches
its maximum size, least recently used objects are evicted.
with the same name.

These are the configuration properties for Caffeine:

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>`para.caffeine.cache_size`</td><td> Maximum size for the cache map. Defaults to `10000`.</td></tr>
		<tr><td>`para.caffeine.evict_after_minutes`</td><td> Cache eviction policy - objects are evicted after this time. Defaults to `10` min.</td></tr>
	</tbody>
</table>

> For more information see the [Caffeine wiki](https://github.com/ben-manes/caffeine/wiki).
