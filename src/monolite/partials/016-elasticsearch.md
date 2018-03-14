---
title: Elasticsearch
category: Search
---

**Now part of the [para-search-elasticsearch](https://github.com/erudika/para-search-elasticsearch) plugin (v1.25).**

Elasticsearch is the right choice as the search engine for Para in production. It supports Elasticsearch v6+ and
uses either the TCP `TransportClient` or the high level REST client (default).

> Use of the transport client is no longer recommended as it will be deprecated in Elasticsearch 7.x.

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
		<tr><td>`para.es.use_nested_custom_fields`</td><td> Switches between "normal" and "nested" indexing modes. Defaults to `false`.</td></tr>
		<tr><td>`para.es.async_enabled`</td><td> Asynchronous operation when indexing/unindexing. Defaults to `false`.</td></tr>
		<tr><td>`para.es.shards`</td><td> The number of shards per index. Used when creating an new index. Default is `5`.</td></tr>
		<tr><td>`para.es.replicas`</td><td> The number of copies of an index. Default is `0`.</td></tr>
		<tr><td>`para.es.auto_expand_replicas`</td><td> Automatically make a replica copy of the index to the number of nodes specified. Default is `0-1`.</td></tr>
		<tr><td>`para.es.use_transportclient`</td><td> Use `TransportClient` to connect to a remote ES node. If `false`, the REST client will be used. Default is `false`.</td></tr>
		<tr><td>`para.es.restclient_scheme`</td><td> Scheme (for REST client). Default is `https` in production, `http` otherwise.</td></tr>
		<tr><td>`para.es.restclient_host`</td><td> ES server host (for REST client). Default is `localhost`.</td></tr>
		<tr><td>`para.es.restclient_port`</td><td> ES server port (for REST client). Default is `9200`.</td></tr>
		<tr><td>`para.es.transportclient_host`</td><td> The hostname of the Elasticsearch instance or cluster head node to connect to. Default is `localhost`.</td></tr>
		<tr><td>`para.es.transportclient_port`</td><td> The port of the Elasticsearch instance or cluster head node to connect to. Default is `9300`.</td></tr>

		<tr><td>`para.es.sign_requests_to_aws`</td><td> If enabled, requests will be signed using the AWS V4 algorithm. Default is `false`.</td></tr>
		<tr><td>`para.es.aws_region`</td><td> Used only for the purposes of signing requests to AWS. Default is `null`.</td></tr>
		<tr><td>`para.es.proxy_enabled`</td><td> Enables the Elasticsearch proxy endpoint. Default is `false`.</td></tr>
		<tr><td>`para.es.proxy_path`</td><td> The path to the proxy endpoint. Default is `_elasticsearch`.</td></tr>
		<tr><td>`para.es.root_index_sharing_enabled`</td><td> Enable/disable root index sharing by child apps with `isSharingIndex` set to `true`. Default is `false`.</td></tr>
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

### Indexing modes

This plugin has two indexing modes: **normal** and **nested**. The nested mode was added after v1.28 to protect against
a possible [mapping explosion](https://discuss.elastic.co/t/can-nested-fields-prevent-mapping-explosion/95464) which
happens when there are lots of objects with lots of different custom properties in them. This overloads the Elasticsearch
index metadata and can crash the whole cluster. This indexing mode affects only custom properties in `Sysprop` objects.

The old "normal" mode is suitable for most Para deployments, with just a few tenants or a single tenant
(one app per server). In this mode, Para objects are indexed without modification (all data types are preserved)
but this could lead to a mapping explosion.

The nested data structure for these two indexing modes is shown below:
```
// NORMAL MODE                   // NESTED MODE
{                                {
  "id": "123",                     "id": "123",
  "appid": "para",                 "appid": "para",
  "type": "custom",                "type": "custom",
  "properties": {                  "properties": [
    "key1": "value1",                {"k": "key1",         "v": "value1"},
    "key2": {                        {"k": "key2-subkey1", "v": "subValue1"},
      "subkey1": "subValue1"         {"k": "numericKey3",  "vn": 5}
    },                             ],
    "numericKey3": 5               "_properties": "{\"key1\":\"value1\"}..."
  }                              }
}
```

Switching to the new nested indexing mode is done with the configuration property:
```
para.es.es.use_nested_custom_fields = true
```

Another benefit, when using the "nested" mode, is the support for nested queries in query strings.
This is a really useful feature which, at the time of writing this, has not yet been implemented in Elasticsearch
(issue [elastic/elasticsearch#11322](https://github.com/elastic/elasticsearch/issues/11322)). Even better, you can
query objects within nested arrays with pinpoint precision, e.g. `?q=properties.nestedArray[2].key:value`.
A nested query string query is detected if it contains a field with prefix `properties.*`.
Examples of query string queries:
```
/v1/search?q=term AND properties.owner.age:[* TO 34]
/v1/search?q=properties.owner.name:alice OR properties.owner.pets[1].name=whiskers
```

### Calling Elasticsearch through the proxy endpoint

You can directly call the Elasticsearch API through `/v1/_elasticsearch`. To enable it, set `para.es.proxy_enabled = true`.
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

The response object will be transformed to be compatible with Para clients an looks like this:

```js
{
	"page":0,
	"totalHits":3,
	"items":[{...}]
}
```

If you wish to get the raw query response from Elasticsearch, add the parameter `getRawResponse=true` to the requst
path and also URL-encode it:
```
GET /v1/_elasticsearch/mytype%2f_search%3FgetRawResponse%3Dtrue
```
Equivalently, the same can be done by adding the query parameter using `ParaClient`:
```
MultivaluedHashMap<String, String> params = new MultivaluedHashMap<>();
params.putSingle("getRawRequest", "true");
paraClient.invokeGet("_elasticsearch/" + Utils.urlEncode("mytype/_search"), params);
```

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
to sort on the `_docid` field. Additionally, there's a limit to the result window imposed by Elasticsearch
of maximum 10000 documents. See the [docs for `index.max_result_window`](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules.html#dynamic-index-settings).

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

### Shared indices with alias routing

The plugin also supports index sharing, whereby the root app index is shared with other apps which are created with the
flag `app.isSharingIndex = true`. This feature is enabled with `para.es.root_index_sharing_enabled = true` and it is off
by default. When the root index is created with sharing enabled, a special alias is created for it that contains a
routing field which sends all documents of a child app to a particular shard, while providing total isolation between
apps. This is useful when there are lots of smaller apps with just a few hundred documents each and we want to avoid the
overhead of one index per app.

> Read the [Elasticsearch](https://www.elastic.co/guide/) docs for more information.
