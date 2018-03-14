---
title: Lucene
category: Search
---

Lucene is used as the default search engine in Para. It is a lightweight alternative to Elasticsearch for self-contained
deployments. It works great for local development and also in production.

The `Search` interface is implemented in the `LuceneSearch` class and is part of the
[para-search-lucene](https://github.com/Erudika/para-search-lucene) plugin.

Keep in mind that each Para app has its own Lucene index, which is automatically created if missing. The path to where
Lucene files are stored is controlled by `para.lucene.dir` which defaults to `.` the current directory. If you set it
to `para.lucene.dir = "/home/user/lucene"` index files will be stored in `/home/users/lucene/data`.

### Search query pagination

Lucene supports two modes of pagination for query results. The standard mode works with the `page` parameter:
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
for a Lucene document - a unique, time-based `long`. You may have to rebuild your index for "search after" to work.

> Read the [Lucene](http://lucene.apache.org/core/) docs for more information.
