---
title: Pager
category: Utilities
---

The `Pager` class is used for pagination. It holds data about a page request. For example you can call a search method
like this:

```java
Pager pager = new Pager();
// limit results to 5
pager.setLimit(5);
// sort by the 'tag' field
pager.setSortby("tag");
// descending order
pager.setDesc(true);
// last key special field
pager.setLastKey("1234");
List<Tag> tags = search.findTags("tag1", pager);
// the total number of tags for the query
int tagCount = pager.getCount();
```

The `Pager` class has a special string field `lastKey` for storing the last `id` for scrolling pagination queries.
Usually scrolling is used in NoSQL databases, where in order to get a page of results, you have to provide the
last key from the previous page.

**Note:** The fields `page` and `limit` are constrained by `para.max_pages = 1000` and `para.max_page_limit = 256`.
The first controls the maximum page number, and the second one sets the maximum results per page (i.e. the
maximum value which the `limit` parameter can have).

Pager objects are used primarily in combination with search queries and allow you to limit the results of a query.
When using `ParaClient` in combination with `Pager`, the client will automatically set the `pager.lastKey`
property. To use the standard pagination mode, you must explicitly set the `pager.page` property:
```java
// fetch page 1
paraClient.findQuery("*", pager);
pager.setPage(2);

// fetch page 2
paraClient.findQuery("*", pager);
pager.setPage(3);
//  and so on...
```

For "search after", or "deep" pagination the `page` property is omitted:
```java
// fetch page 1
paraClient.findQuery("*", pager);

// fetch page 2
paraClient.findQuery("*", pager);
//  and so on...
```

And here's an example for reading all object of type "cat" using deep pagination ("search after"):
```java
Pager pager = new Pager(1, "_docid", false, 10_000);
List<Cat> cats = new LinkedList<>();
List<Cat> catsPage;
do {
	catsPage = Para.getSearch().findQuery("cat", "*", pager);
	cats.addAll(catsPage);
} while (!catsPage.isEmpty());
```