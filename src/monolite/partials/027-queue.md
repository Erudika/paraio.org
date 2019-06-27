---
title: Queue
category: Utilities
---

The `Queue` interface is another simple API for pushing and pulling messages to and from a queue.

```java
public interface Queue {
	String pull();
	void push(String task);
	String getName();
	void setName(String name);
	void startPolling();
	void stopPolling();
}
```

Currently this interface is implemented by the `AWSQueue` class which relies on the AWS Simple Queue Service, and by
`LocalQueue` which is based on a `ConcurrentLinkedQueue`.

### AWSQueue

The AWS SQS plugin uses Amazon's SQS as a river by long polling for messages from a given queue.
This particular implementation was adapted from an earlier project called
[elasticsearch-river-amazonsqs](https://github.com/albogdano/elasticsearch-river-amazonsqs).

The code continuously pulls messages from an SQS queue. After a message is processed, it gets deleted from the queue.
To enable this functionality, set `para.queue_link_enabled = true` in the Para configuration file.

Sample code:

```java
AWSQueue q = new AWSQueue("myQueue");
AWSQueueUtils.pushMessages(q.getUrl(), listOfMessages);
List<String> result = AWSQueueUtils.pullMessages(q.getUrl(), 10);
```

To configure, put this in your `application.conf`:

```bash
para.queue.polling_sleep_seconds: 60
para.queue.polling_interval_seconds: 20
```

Messages are in the same format as all other Para objects (see `Sysprop`):
```json
{
	"id": "id_OR_null",
	"appid": "para_app_id",
	"type": "para_data_type",
	"properties": { "key1": "value1" ...}
}
```
**Notes:**

- If a `'_delete': true` field exists, the object in the message will be deleted.
- If `'_create': true` field exists, the object will be recreated, overwriting anything with the same `id`.

When the queue is empty the river will sleep for `sleep` seconds before sending a new request for messages to the queue.
Long polling is done by the Amazon SQS client using the `waitTimeSeconds` attribute which is set to `longpolling_interval` _(must be between 0 and 20)_.

### LocalQueue

This queue implementation is good for local development, testing and single-machine Para servers. It uses an in-memory
queue which is not persisted in any way.
