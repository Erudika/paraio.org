---
title: Advanced search
category: REST API
path: /v1/search/{querytype}
type: GET
---

Executes a search query.

**Note:** custom fields must be used in search queries as `properties.myfield`.

### Request

- `{querytype}` - the type of query to execute (optional), use one of types below:

The `querytype` parameter switches between the different query types. If this parameter is missing
then the generic `findQuery()` method will be executed by default.

#### `id` query
Finds the object with the given `id` from the index or `null`.
This executes the method `findById()` with these **parameters**:
- `id` - the id to search for

<hr>

#### `ids` query
Finds all objects matchings the given ids.
This executes the method `findByIds()` with these **parameters**:
- `ids` - a list of ids to search for

<hr>

#### `nested` query
Searches through objects in a nested field named `nstd`. Used internally for joining search queries on linked objects.
This executes the method `findNestedQuery()` with these **parameters**:

- `q` - a search query string
- `field` - the name of the field to target within a nested object
- `type` - a type to search for

<hr>

#### `nearby` query
Location-based search query. Relies on `Address` objects for coordinates.
This executes the method `findNearby()` with these **parameters**:
- `latlng` - latitude and longitude of the center of the search perimeter
- `radius` - radius of the search perimeter in kilometers.

<hr>

#### `prefix` query
Searches for objects containing a field (property) that starts with the given prefix.
This executes the method `findPrefix()` with these **parameters**:
- `field` - the field to search on
- `prefix` - the prefix

<hr>

#### `similar` query
"More like this" search query.
This executes the method `findSimilar()` with these **parameters**:
- `fields` - a list of fields, for example:
```
GET /v1/search/similar?fields=field1&fields=field2
```
- `filterid` - an id filter; excludes a particular object from the results
- `like` - the source text to use for comparison

<hr>

#### `tagged` query
Search for objects tagged with a set of tags.
This executes the method `findTagged()` with these **parameters**:
- `tags` - a list of tags, for example:
```
GET /v1/search/tagged?tags=tag1&tags=tag2
```

<hr>

#### `in` query
Searches for objects containing any of the terms in the given list (matched exactly).
This executes the method `findTermInList()` with these **parameters**:
- `field` - the field to search on
- `terms` - a list of terms (values)

<hr>

#### `terms` query
Searches for objects containing all of the specified terms (matched exactly)
This executes the method `findTerms()` with these **parameters**:
- `matchall` - if `true` executes an `AND` query, otherwise an `OR` query
- `terms` - a list of `field:term` pairs, for example:
```
GET /v1/search/terms?terms=field1:term1&terms=field2:term2
```
- `count` - if present will return 0 objects but the "totalHits" field will contain the total number of results found
that match the given terms.

Since v1.9, the terms query supports ranges. For example if you have a pair like `'age':25` and you want to
find objects with higher `age` value, you can modify the key to have a relational operator `'age >':25`. You can
use the `>, <, >=, <=` operators by appending them to the keys of the terms map.

<hr>

#### `wildcard` query
A wildcard query like "example\*".
This executes the method `findWildcard()` with these **parameters**:
- `field` - the field to search on

<hr>

#### `count` query
Returns the total number of results that would be returned by a query.
This executes the method `getCount()` and has **no additional parameters**.


### Request parameters

- `q` - a search query string (optional). Defaults to `*` (all).
- `type` - the type of objects to search for (optional).
`prefix`, `tagged`, `in`, `terms`, `wildcard`, `count`. (see [Search](#015-search))
- `desc` - sort order - `true` for descending (optional). Default is `true`.
- `sort` - the field to sort by (optional).
- `page` - starting page for results (optional). (note: page size is 30 items by default)
- `limit` - the number of results to return

### Response

- **status codes** - `200`

Example response for counting all objects (just three for this example):
```js
{
	"page":0,
	"totalHits":3,
	"items":[
	]
}
```