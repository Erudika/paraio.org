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