---
title: Advanced search
category: REST API
path: /v1/{search}
type: GET
---

Performs a search query.

### Queries

The `querytype` parameter switches between the different query types. If this parameter is missing
then the generic `findQuery()` method will be executed by default.

#### `id` query
This executes the method `findById()` with these **parameters**:
- `id` - the id to search for

<hr>

#### `ids` query
This executes the method `findByIds()` with these **parameters**:
- `ids` - a list of ids to search for

<hr>

#### `nearby` query
This executes the method `findNearby()` with these **parameters**:
- `latlng` - latitude and longitude of the center of the search perimeter
- `radius` - radius of the search perimeter in kilometers.

<hr>

#### `prefix` query
This executes the method `findPrefix()` with these **parameters**:
- `field` - the field to search on
- `prefix` - the prefix

<hr>

#### `similar` query
This executes the method `findSimilar()` with these **parameters**:
- `fields` - a list of fields (example: `?fields=field1&fields=field2`)
- `filterid` - an id filter; excludes a particular object from the results
- `like` - the source text to use for comparison

<hr>

#### `tagged` query
This executes the method `findTagged()` with these **parameters**:
- `tags` - a list of tags (example: `?tags=tag1&tags=tag2`)

<hr>

#### `in` query
This executes the method `findTermInList()` with these **parameters**:
- `field` - the field to search on
- `terms` - a list of terms (values)

<hr>

#### `terms` query
This executes the method `findTerms()` with these **parameters**:
- `matchall` - if `true` executes an `AND` query, otherwise an `OR` query
- `terms` - a list of `field:term` pairs (example: `?terms=field1:term1&terms=field2:term2`)
- `count` - if present will return the number of results only and not the objects

<hr>

#### `wildcard` query
This executes the method `findWildcard()` with these **parameters**:
- `field` - the field to search on

<hr>

#### `count` query
This executes the method `getCount()` with **no parameters**.

### Request parameters

- `q` - a search query string (optional). Defaults to `*` (all).
- `type` - the type of objects to search for (optional).
- `querytype` - the type of query to execute (optional). One of: `id`, `nearby`, `similar`
`prefix`, `tagged`, `in`, `terms`, `wildcard`, `count`. (see [Search](#015-search))
- `desc` - sort order - `true` for descending (optional). Default is `true`.
- `sort` - the field to sort by (optional).
- `page` - starting page for results (optional). (note: page size is 30 items by default)

### Response

- **status codes** - `200`

Example response for counting all objects (just three for this example):
```js
{
	"totalHits":3,
	"items":[
	]
}
```