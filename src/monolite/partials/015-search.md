---
title: Search interface
category: Search
---

Para indexes objects based on their type. For example, a `User` objects has a `type` field with the value "user".
Most of the search methods below ask for a `type` to search for (i.e. the `type` field acts as a filter).

The `Search` interface defines the following methods used for search:

<table class="table table-striped">
	<tbody>
		<tr><td>`P findById(String id)`</td></tr><tr><td> Returns the object with the given `id` from the index or `null`.</td></tr>
		<tr><td>`List<P> findByIds(List<String> ids)`</td></tr><tr><td> Returns all objects for the given ids. </td></tr>
		<tr><td>`List<P> findNearby(String type, String query, int radius, double lat, double lng)`</td></tr><tr><td> Location-based search query.</td></tr>
		<tr><td>`List<P> findPrefix(String type, String field, String prefix)`</td></tr><tr><td> Searches for objects containing a field (property) that starts with the given prefix.</td></tr>
		<tr><td>`List<P> findNestedQuery(String type, String field, String query)`</td></tr><tr><td> Searches inside a nested field `nstd` (a list of objects).</td></tr>
		<tr><td>`List<P> findQuery(String type, String query)`</td></tr><tr><td> The main search method. Follows the Lucene query parser syntax.</td></tr>
		<tr><td>`List<P> findSimilar(String type, String filterKey, String[] fields, String liketext)`</td></tr><tr><td> "More like this" search. </td></tr>
		<tr><td>`List<P> findTagged(String type, String[] tags)`</td></tr><tr><td> Search for objects tagged with a set of tags.</td></tr>
		<tr><td>`List<P> findTags(String keyword)`</td></tr><tr><td> Shortcut method for listing all tags.</td></tr>
		<tr><td>`List<P> findTermInList(String type, String field, List<?> terms)`</td></tr><tr><td> Searches for objects containing any of the terms in the given list (matched exactly).</td></tr>
		<tr><td>`List<P> findTerms(String type, Map<String, ?> terms, boolean matchAll)`</td></tr><tr><td> Searches for objects containing all of the specified terms (matched exactly)</td></tr>
		<tr><td>`List<P> findWildcard(String type, String field, String wildcard)`</td></tr><tr><td> A wildcard query like "example*".</td></tr>
	</tbody>
</table>

All methods accept an optional `Pager` parameter for paginating and sorting the search results.

Also there are a few methods for indexing and unindexing objects but you should avoid calling them directly.
These methods are:

- `void index(ParaObject obj)`
- `void indexAll(List<P> objects)`
- `void unindex(ParaObject obj)`
- `void unindexAll(List<P> objects)`

> You should not index/unindex your objects manually - Para does this for you.