---
title: Hazelcast
category: Cache
---

Para uses Hazelcast as the default implementation of the `Cache` interface. It was chosen because it provides excellent
support for distributed data structures like maps and sets. It allows us to use a portion of the memory on each node
for caching without having to manage a separate caching server or cluster.

Para organizes caches by application name - each application has its own separate distributed map with the same name.

There are several configuration properties for Hazelcast:

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>`para.hc.eviction_policy`</td><td> Cache eviction policy - `LRU` or `LFU`. Defaults to `LRU`.</td></tr>
		<tr><td>`para.hc.eviction_percentage`</td><td> Cache eviction percentage. Defaults to `25` percent.</td></tr>
		<tr><td>`para.hc.max_size`</td><td> Cache size as a percentage of used heap. Defaults to `25` percent.</td></tr>
		<tr><td>`para.hc.jmx_enabled`</td><td> JMX reporting. Default is `true`. </td></tr>
	</tbody>
</table>

> For more information see the [Hazelcast docs](http://www.hazelcast.org/docs/latest/manual/html-single).
