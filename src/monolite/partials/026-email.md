---
title: Email
category: Utilities
---

The `Emailer` interface has a simple API for sending email messages.

```java
public interface Emailer {
	boolean sendEmail(List<String> emails, String subject, String body);
}
```

Currently this interface is implemented by the `AWSEmailer` class which relies on the AWS Simple Email Service for
sending emails.