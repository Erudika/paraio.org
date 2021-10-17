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
Para can either use the JavaMail API or AWS SES to send emails. This is used for email verification, password recovery
and notifications. Set `support_email` to be the email address used by the system. An example config for JavaMail:

```
para.emailer = "javamail"
para.support_email = "support@example.com"
para.mail.host = "smtp.example.com"
para.mail.port = 587
para.mail.username = "user@example.com"
para.mail.password = "password"
para.mail.tls = true
para.mail.ssl = false
```
Email templates can be loaded with:
```java
Emailer.class.getClassLoader().getResourceAsStream("emails/template.html")
```
Para supports basic variable substitutions through Mustache with `Utils.compileMustache(data, template)`.

Set `para.emailer = "aws"` to use the AWS Simple Email Service and comment out the `para.mail.*`
properties as they are ignored. AWS credentials are picked up from the environment, like the `AWS_PROFILE` env. variable.