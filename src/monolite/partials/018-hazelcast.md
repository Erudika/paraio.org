---
title: Hazelcast
category: Cache
---

Hazelcast allows you to use a portion of the memory on each node for caching without having to manage a separate
caching server or cluster. Hazelcast was the default implementation of the `Cache` interface until v1.26, when it
was decoupled from Para and [moved to its own repository](https://github.com/Erudika/para-cache-hazelcast). We still
recommend the Hazelcast plugin for production use.

In Hazelcast, caches are organized by application `id` - each application has its own separate distributed map
with the same name.

These are the configuration properties for Hazelcast:

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>`para.hc.async_enabled`</td><td> Asynchronous operation when putting objects in cache. Defaults to `false`.</td></tr>
		<tr><td>`para.hc.eviction_policy`</td><td> Cache eviction policy - `LRU` or `LFU`. Defaults to `LRU`.</td></tr>
		<tr><td>`para.hc.eviction_percentage`</td><td> Cache eviction percentage. Defaults to `25` percent.</td></tr>
		<tr><td>`para.hc.ttl_seconds`</td><td> 'Time To Live' for cached objects. Defaults to `3600` seconds.</td></tr>
		<tr><td>`para.hc.max_size`</td><td> Cache size as a percentage of used heap. Defaults to `25` percent.</td></tr>
		<tr><td>`para.hc.jmx_enabled`</td><td> JMX reporting. Default is `true`. </td></tr>
		<tr><td>`para.hc.ec2_discovery_enabled`</td><td> Enables AWS EC2 auto discovery. Default is `true`.</td></tr>
		<tr><td>`para.hc.discovery_group`</td><td> Security group for cloud discovery of nodes. Default is `hazelcast`.</td></tr>
		<tr><td>`para.hc.password`</td><td> The Hazelcast cluster password. Default is `hcpasswd`.</td></tr>
		<tr><td>`para.hc.mancenter_enabled`</td><td> Enables the Hazelcast Management Center. Default is `!IN_PRODUCTION`.</td></tr>
		<tr><td>`para.hc.mancenter_url`</td><td> The URL for the Management Center server. Default is `http://localhost:8001/mancenter`.</td></tr>
	</tbody>
</table>

> For more information see the [Hazelcast docs](http://www.hazelcast.org/docs/latest/manual/html-single).
