---
title: Resource permissions
category: Core classes
---

When creating new users, we usually want to specify which resources they can access. This is why we added a few methods
for adding and removing resource permissions. Each app can have any number of users and each user can have a set of
permissions for a given resource. Resources are identified by name, for example the `_batch` resource would represent
requests going to `/v1/_batch`.

There are several methods and flags which control which requests can go through. These are:
- `GET`, `POST`, `PUT`, `PATCH`, `DELETE` - use these to allow a certain method explicitly
- `?` - use this to enable public (unauthenticated) access to a resource
- `-` - use this to deny all access to a resource
- `*` - wildcard, allow all request to go through

Let's look at a few example scenarios where we give users permission to access the `_batch`. We have two users - user
one with `id = 1` and user two with `id = 2`. We'll use the following methods:

```java
boolean grantResourcePermission(String subjectid, String resourcePath, EnumSet<AllowedMethods> permission);
// when not using the Java client - permission is an array of HTTP methods
boolean grantResourcePermission(String subjectid, String resourcePath, String[] permission);
boolean revokeResourcePermission(String subjectid, String resourcePath);
```

These methods allow the use of wildcards `*` for `subjectid` and `resourcePath` arguments.

**Scenario 1:** Give all users permission to `READ` - this allows them to make `GET` requests:

```java
app.grantResourcePermission("*", "_batch", AllowedMethods.READ);
```

**Scenario 2:** Give user `1` `WRITE` permissions - allow HTTP methods `POST, PUT, PATCH, DELETE`:

```java
app.grantResourcePermission("1", "_batch", AllowedMethods.WRITE);
```
Also you could grant permissions on specific objects like so:
```java
paraClient.grantResourcePermission("user1", "posts/123", AllowedMethods.DELETE);
```
This will allow `user1` to delete only the post object with an `id` of `123`.

**Scenario 3:** Give user `2` permission ot only make `POST` requests:

```java
app.grantResourcePermission("2", "_batch", AllowedMethods.POST);
```
Note that all users still have the `READ` permissions because permissions are compounded.
However, when `grantResourcePermission()` is called again on the same subject and resource, the new
permission will overwrite the old one.

**Scenario 4:** Revoke all permissions for user `1` except `READ`:

```java
app.revokeAllResourcePermissions("1");
```

**Scenario 5:** Grant full access or deny all access to everyone:
```java
app.grantResourcePermission("*", "*", AllowedMethods.ALL);
```
```java
app.grantResourcePermission("*", "*", AllowedMethods.NONE);
```
**Scenario 6:** Grant full access to user `1` but only to the objects he/she created. In this case user `1` will be able
to create, edit, delete and search `todo` objects but only those which he/she created, i.e. `creatorid == 1`.
```java
app.grantResourcePermission("1", "todo", ["*", "OWN"]);
app.grantResourcePermission("1", "todo/*", ["*", "OWN"]);
```

To get all permissions for both users call:

```java
app.getAllResourcePermissions("1", "2");
```

The default initial policy for all apps is "deny all" which means that new users won't be able to access any resources,
except their own object and child objects, unless given explicit permission to do so.

You can also create "anonymous" permissions to allow unauthenticated users to access certain resources:
```java
app.grantResourcePermission("*", "public/resource", AllowedMethods.READ, true);
```
This resource is now public but to access it you still need to specify your access key as a parameter:
```
GET /v1/public/resource?accessKey=app:myapp
```
Alternatively, on the client-side, you can set the `Authorization` header to indicate that the request is anonymous:
```
Authorization: Anonymous app:myapp
```

The special permission method `?` means that anyone can do a `GET` request on `public/resource`.

To check if user `1` is allowed to access a particular resource call:

```java
// returns 'false'
app.isAllowedTo("1", "admin", "GET");
```




