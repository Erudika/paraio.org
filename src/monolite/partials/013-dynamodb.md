---
title: AWS DynamoDB
category: Persistence
---

Para uses `AWSDynmaoDAO` as the default implementation of the `DAO` interface. That class is responsible for connecting
to a [DynamoDB](http://aws.amazon.com/dynamodb/) server and storing/retrieving objects (items) to/from it.
All operations are carried out using the latest AWS Java SDK.

**Note:** DynamoDB doesn't support batch update requests so `AWSDynamoDAO` does not batch update requests. It simply executes
all update requests in a sequence.

We are planning to add more implementations of `DAO` in the future as plugins for Para. These will support both
NoSQL and relational databases.

See [Modules](#006-modules) for more information about how you can override the default implementation.

> For more information about DyanamoDB see the
[documentation on AWS](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html).
