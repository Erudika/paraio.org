---
title: Cache interface
category: Cache
---

The `Cache` interface defines the following methods used for object caching:

<table class="table table-striped">
	<thead>
		<tr>
			<th>method</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>

`void put(String id, T object)`</td><td> Caches an object with a key equal to its `id`. Should skip `null` objects.</td></tr>
		<tr><td>

`void putAll(Map<String, T> objects)`</td><td> Caches multiple objects. Should skip `null` objects.</td></tr>
		<tr><td>

`T get(String id)`</td><td> Retrieves an object from cache. Returns `null` if the object isn't cached.</td></tr>
		<tr><td>

`Map<String, T> getAll(List<String> ids)`</td><td> Retrieves multiple objects from cache.</td></tr>
		<tr><td>

`void remove(String id)`</td><td> Removes an object from cache.</td></tr>
		<tr><td>

`void removeAll()`</td><td> Clears the cache completely.</td></tr>
		<tr><td>

`void removeAll(List<String> ids)`</td><td> Clears only the objects with the specified ids.</td></tr>
	</tbody>
</table>

> You should avoid calling cache related methods directly - Para does this for you.
