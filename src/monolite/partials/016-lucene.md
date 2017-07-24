---
title: Lucene
category: Search
---

Lucene is used as the default search engine in Para. It is a lightweight alternative to Elasticsearch for self-contained
deployments. It works great for local development and also in production.

The `Search` interface is implemented in the `LuceneSearch` class.

Keep in mind that each Para app has its own Lucene index, which is automatically created if missing. The path to where
Lucene files are stored is controlled by `para.lucene.dir` which defaults to `.` the current directory. If you set it
to `para.lucene.dir = "/home/user/lucene"` index files will be stored in `/home/users/lucene/data`.


> Read the [Lucene](http://lucene.apache.org/core/) docs for more information.
