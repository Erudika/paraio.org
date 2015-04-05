---
title: Elasticsearch
category: Search
---

Elasticsearch is used as the default search engine in Para. The `Search` interface is implemented in the `Elasticsearch`
class.

There are several configuration properties for Elasticsearch:

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>`para.es.async_enabled`</td><td> Asynchronous operation when indexing/unindexing. Defaults to `false`.</td></tr>
		<tr><td>`para.es.cors_enabled`</td><td> Enable CORS for HTTP requests to Elasticsearch. Default is `false` only if running in production.</td></tr>
		<tr><td>`para.es.discovery_type`</td><td> Discovery mechanism when running in production. Default is `ec2`.</td></tr>
		<tr><td>`para.es.local_node`</td><td> Run locally on the JVM. Default is `true`.</td></tr>
		<tr><td>`para.es.data_node`</td><td> Allow the current node to store index data. Default is `true`.</td></tr>
		<tr><td>`para.es.shards`</td><td> The number of shards per index. Used when creating an new index. Default is `5`.</td></tr>
		<tr><td>`para.es.replicas`</td><td> The number of copies of an index. Default is `0`.</td></tr>
		<tr><td>`para.es.dir`</td><td> The directory where Elasticsearch will store data, logs etc. Default is `/var/lib/elasticsearch`.</td></tr>
	</tbody>
</table>

> Para relies heavily of [Elasticsearch](http://www.elasticsearch.org/guide) for indexing and full text search.
