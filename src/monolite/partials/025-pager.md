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
List<Tag> tags = search.findTags("tag1", pager);
// the total number of tags for the query
int tagCount = pager.getCount();
```

Pager objects are used primarily in combination with search queries and allow you to limit the results of a query.