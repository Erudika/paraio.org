---
title: Resource permissions
category: Core classes
---

When creating new users, we usually want to specify which resources they can access. This is why we added a few methods
for adding and removing resource permissions. Each app can have any number of users and each user can have a set of
permissions for a given resource. Resources are identified by name, for example the `_batch` resource would represent
requests going to `/v1/_batch`.

Let's look at a few example scenarios where we give users permission to access the `_batch`. We have two users - user
one with `id = 1` and user two with `id = 2`. We'll use the following methods:

```java
boolean grantResourcePermission(String subjectid, String resourceName, EnumSet<AllowedMethods> permission);

boolean revokeResourcePermission(String subjectid, String resourceName);
```

These methods allow the use of wildcards `*` for `subjectid` and `resourceName` arguments.

**Scenario 1:** Give all users permission to `READ` - this allows them to make `GET` requests:

```java
app.grantResourcePermission("*", "_batch", AllowedMethods.READ);
```

**Scenario 2:** Give user `1` `WRITE` permissions - allow HTTP methods `POST, PUT, PATCH, DELETE`:

```java
app.grantResourcePermission("1", "_batch", AllowedMethods.WRITE);
```

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

To get all permissions for both users call:

```java
app.getAllResourcePermissions("1", "2");
```

The default initial policy for all apps is "deny all" which means that new users won't be able to access any resources
unless given explicit permission to do so.

To check if user `1` is allowed to access a particular resource call:

```java
// returns 'false'
app.isAllowedTo("1", "admin", "GET");
```




