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
			<th>default value</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>

`para.hc.async_enabled`</td><td>

`false`</td></tr>
		<tr><td>Asynchronous operation when putting objects in cache.</td></tr>
		<tr><td>

`para.hc.eviction_policy`</td><td>

`LRU`</td></tr>
		<tr><td>Cache eviction policy - `LRU` or `LFU`. </td></tr>
		<tr><td>

`para.hc.eviction_percentage`</td><td>

`25`</td></tr>
		<tr><td>Cache eviction percentage. </td></tr>
		<tr><td>

`para.hc.ttl_seconds`</td><td>

`3600`</td></tr>
		<tr><td>'Time To Live' for cached objects in seconds. </td></tr>
		<tr><td>

`para.hc.max_size`</td><td>

`25`</td></tr>
		<tr><td>Cache size as a percentage of used heap. </td></tr>
		<tr><td>

`para.hc.jmx_enabled`</td><td>

`true`</td></tr>
		<tr><td>Enables JMX reporting. </td></tr>
		<tr><td>

`para.hc.ec2_discovery_enabled`</td><td>

`true`</td></tr>
		<tr><td>Enables AWS EC2 auto discovery. </td></tr>
		<tr><td>

`para.hc.discovery_group`</td><td>

`hazelcast`</td></tr>
		<tr><td>Security group for cloud discovery of nodes. </td></tr>
		<tr><td>

`para.hc.password`</td><td>

`hcpasswd`</td></tr>
		<tr><td>The Hazelcast cluster password. </td></tr>
		<tr><td>

`para.hc.mancenter_enabled`</td><td>

`!IN_PRODUCTION`</td></tr>
		<tr><td>Enables the Hazelcast Management Center. </td></tr>
		<tr><td>

`para.hc.mancenter_url`</td><td>

`http://localhost:8001/mancenter`</td></tr>
		<tr><td>The URL for the Management Center server. </td></tr>
	</tbody>
</table>

In case you have enabled EC2 auto discovery, you must set `para.aws_access_key`,
`para.aws_secret_key` and `para.aws_region` accordingly.

> For more information see the [Hazelcast docs](http://www.hazelcast.org/docs/latest/manual/html-single).
