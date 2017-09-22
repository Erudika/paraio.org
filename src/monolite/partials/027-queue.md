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
}
```

Currently this interface is implemented by the `AWSQueue` class which relies on the AWS Simple Queue Service.

### AWSQueue

The AWS SQS plugin uses Amazon's SQS as a river by long polling for messages from a given queue.
This particular implementation was adapted from an earlier project called
[elasticsearch-river-amazonsqs](https://github.com/albogdano/elasticsearch-river-amazonsqs).

The code continuously pulls messages from an SQS queue. After a message is processed, it gets deleted from the queue.

Sample code:

```java
AWSQueue q = new AWSQueue("myQueue");
AWSQueueUtils.pushMessages(q.getUrl(), listOfMessages);
List<String> result = AWSQueueUtils.pullMessages(q.getUrl(), 10);
```

To configure, put this in your `application.conf`:

```ini
para.queue.polling_sleep_seconds: 60
para.queue.polling_interval_seconds: 20
```

Messages are in the following JSON format:
```json
{
	"_id": "id_OR_null",
	"_appid": "para_app_id",
	"_type": "para_data_type",
	"_data": { "key1": "value1" ...}
}
```
**Notes:**

- The fields `_id` and `_type` are required.
- If `_data` is missing the data with this id will be deleted from the index.
- If `_data` is anything other than JSON object we discard it and treat the messages as a delete request.
- If `_index` is missing it will fallback to the index that was initially configured,
otherwise the `_index` property overrides the default configuration and allows you to dynamically switch between indexes.
- If `_id` is an integer it will be converted to `String` because SQS doesn't convert integers to strings automatically.
- When the queue is empty the river will sleep for `sleep` seconds before sending a new request for messages to the queue.
Long polling is done by the Amazon SQS client using the `waitTimeSeconds` attribute which is set to `longpolling_interval` _(must be between 0 and 20)_.

