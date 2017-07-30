---
title: Elasticsearch
category: Search
---

**Now part of the [para-search-elasticsearch](https://github.com/erudika/para-search-elasticsearch) plugin (v1.25).**

Elasticsearch is the right choice as the search engine for Para in production. It supports Elasticsearch v5 and
uses the TCP `TransportClient` by default. Support for the high-level REST HTTP client is expected when ES v6 is released.

The `Search` interface is implemented in the `ElasticSearch` class.

There are several configuration properties for Elasticsearch (these go in your `application.conf` file):

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>`para.cluster_name`</td><td> Elasticsearch cluster name. Default is `para-prod` when running in production.</td></tr>
		<tr><td>`para.es.async_enabled`</td><td> Asynchronous operation when indexing/unindexing. Defaults to `false`.</td></tr>
		<tr><td>`para.es.shards`</td><td> The number of shards per index. Used when creating an new index. Default is `5`.</td></tr>
		<tr><td>`para.es.replicas`</td><td> The number of copies of an index. Default is `0`.</td></tr>
		<tr><td>`para.es.auto_expand_replicas`</td><td> Automatically make a replica copy of the index to the number of nodes specified. Default is `0-1`.</td></tr>
		<tr><td>`para.es.use_transportclient`</td><td> Use `TransportClient` to connect to a remote ES node. If `false`, the REST client will be used. Default is `true`.</td></tr>
		<tr><td>`para.es.transportclient_host`</td><td> The hostname of the Elasticsearch instance or cluster head node to connect to. Default is `localhost`.</td></tr>
		<tr><td>`para.es.transportclient_port`</td><td> The port of the Elasticsearch instance or cluster head node to connect to. Default is `9300`.</td></tr>
	</tbody>
</table>

The plugin is on Maven Central. Here's the Maven snippet to include in your `pom.xml`:

```xml
<dependency>
  <groupId>com.erudika</groupId>
  <artifactId>para-search-elasticsearch</artifactId>
  <version>{version}</version>
</dependency>
```
Alternatively you can download the JAR from the "Releases" tab above put it in a `lib` folder alongside the server
WAR file `para-x.y.z.war`. Para will look for plugins inside `lib` and pick up the Elasticsearch plugin.

Finally, set the config property:
```
para.search = "ElasticSearch"
```
This could be a Java system property or part of a `application.conf` file on the classpath.
This tells Para to use the Elasticsearch implementation instead of the default (Lucene).

> Read the [Elasticsearch](https://www.elastic.co/guide/) docs for more information.
