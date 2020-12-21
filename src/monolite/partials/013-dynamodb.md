---
title: DynamoDB
category: Persistence
---

Para can work with DynamoDB by using the `AWSDynamoDAO` implementation. That class is responsible for connecting
to [Amazon's DynamoDB](http://aws.amazon.com/dynamodb/) server and storing/retrieving objects (items) to/from it.
All operations are carried out using the latest AWS Java SDK.

**Note:** DynamoDB doesn't support batch update requests so `AWSDynamoDAO` does not batch update requests.
It simply executes all update requests in a sequence.

The implementation adds a default prefix `para-` to DynamoDB tables, so if you have an app called "myapp" your table for
that will be called `para-myapp`.

This `DAO` implementation **supports optimistic locking** through conditional update expressions in DynamoDB.

Server-side encryption (SSE, encryption-at-rest) is enabled by default for all tables.
To switch between from AWS-owned CMK to using your account's KMS, the following property:
```
para.dynamodb.sse_enabled = true
```
When this is `true`, your account's KMS will be used for encrypting the data in the table, otherwise an AWS-owned CMK
will be used. Defaults to `false`.
**Note:** SSE will work for newly created tables only. Currently, you can't enable encryption at rest on an existing table.
After encryption at rest is enabled, it **can't** be disabled.

### Table sharing

In v1.21, we added new functionality to `AWSDynamoDAO` which enables apps to share the same table. This is useful
for certain deployment scenarios where you have a large number of apps (and tables) which are rarely accessed and have
low throughput. This makes it expensive to run Para on many DynamoDB tables which remain underutilized for long periods
of time. So with table sharing you can reduce your DynamoDB bill to a minimum by having a shared table that contains
all the objects for all those apps. You can enable this feature by setting the following in your config:
```
para.prepend_shared_appids_with_space = true
```
This will prepend the `appid` property with a space character for those apps that have `isSharingTable` set to `true`,
thus letting the `DAO` know that this app belongs to the shared table, instead of sending its data to a separate table.
The shared table name is controlled by `para.shared_table_name` and defaults to "0".

The shared table keys are a combination of `appid` and `id` (e.g. `myapp_679334060962615296`). Para will
also automatically create a global secondary index (GSI) on the shared table, with a primary key `appid` and secondary
key `timestamp`, to facilitate queries like `dao.readPage()`.

See [Modules](#006-modules) for more information about how you can override the default implementation.

> For more information about DyanamoDB see the
[documentation on AWS](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html).
