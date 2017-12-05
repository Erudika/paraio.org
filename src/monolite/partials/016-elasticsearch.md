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

		<tr><td>`para.es.proxy_enabled`</td><td> Enables the Elasticsearch proxy endpoint. Default is `false`.</td></tr>
		<tr><td>`para.es.proxy_path`</td><td> The path to the proxy endpoint. Default is `_elasticsearch`.</td></tr>
		<tr><td>`para.es.restclient_scheme`</td><td> Scheme (for low-level REST client). Default is `http`.</td></tr>
		<tr><td>`para.es.restclient_host`</td><td> ES server host (for low-level REST client). Default is `localhost`.</td></tr>
		<tr><td>`para.es.restclient_port`</td><td> ES server port (for low-level REST client). Default is `9200`.</td></tr>
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

### Calling Elasticsearch through the proxy endpoint

You can directly call the Elasticsearch API through `/v1/_elasticsearch`. To enable it set `para.es.proxy_enabled = true` first.
Then you must specify the `path` parameter corresponds to the Elasticsearch API resource path. This is done for every
`GET`, `PUT`, `POST`, `PATCH` or `DELETE` request to Elasticsearch. The endpoint accepts request to either
`/v1/_elasticsearch` or `/v1/_elasticsearch/{path}` where `path` is a URL-encoded path parameter.
**Do not add query parameters to the request path with `?`, instead, pass them as a parameter map.**

```
GET /v1/_elasticsearch/_search
GET /v1/_elasticsearch/mytype%2f_search
DELETE /v1/_elasticsearch/tweet%2f1
```
`ParaClient` example:

```java
Response get = paraClient.invokeGet("_elasticsearch/" + Utils.urlEncode("tweet/_search"), params);

Response post = paraClient.invokePost("_elasticsearch/_count",
				Entity.json(Collections.singletonMap("query",
										Collections.singletonMap("term",
										Collections.singletonMap("type", "cat")))));
```
If the `path` parameter is omitted, it defaults to `_search`.

**Note:** This endpoint requires authentication and unsigned requests are not allowed. Keep in mind that all requests
to Elasticsearch are prefixed with the app identifier. For example if the app id is "app:myapp, then Para will proxy
requests to Elasticsearch at `http://eshost:9200/myapp/{path}`.

### Rebuilding indices through the Elasticsearch proxy endpoint

You can rebuild the whole app index from scratch by calling `POST /v1/_elasticsearch/reindex`. To enable it set
`para.es.proxy_reindexing_enabled = true` first. This operation executes `ElasticSearchUtils.rebuildIndex()` internally,
and returns a response indicating the number of reindexed objects and the elapsed time:

```
{
   "reindexed": 154,
   "tookMillis": 365
}
```

### Search query pagination and sorting

The Elasticsearch plugin supports two modes of pagination for query results. The standard mode works with the
`page` parameter:
```
GET /v1/users?limit=30&page=2
```
The other mode is "search after" and uses a stateless cursor to scroll through the results.
To activate "search after", append the `lastKey` query parameter to the search request like so:
```
GET /v1/users?limit=10000&sort=_docid&lastKey=835146458100404225
```
**Important:** For consistent results when doing "search after" scrolling, set `pager.setSortby("_docid")`
to sort on the `_docid` field.

The "search after" method works well for deep pagination or infinite scrolling or search results.
The `lastKey` field is returned in the body of the response for each search query. It represents the `_docid` value
for a Elasticsearch document - a unique, time-based `long`. You may have to rebuild your index for "search after" to work.

Sorting is done on the `timestamp` field by default, in `desc` (descending) order. To sort on a different field, set
`pager.setSortBy(field)`. Sorting on multiple fields is also possible by separating them with a comma. For example:
```
GET /v1/users?sort=name,timestamp
// or
pager.setSortBy("name:desc,timestamp:asc");
```

> Read the [Elasticsearch](https://www.elastic.co/guide/) docs for more information.
