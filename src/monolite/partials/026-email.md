---
title: Email & SMTP
category: Utilities
---

Para has a dedicated API endpoint for sending emails at `/v1/_emails`.
It allows you to send transactional emails with a direct API request to `/v1/_emails`, authenticated by API key or request signature.
For attaching files, add the `file` field - it must have a value encoded as Data URI.
Example JSON payload with attachment:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "toEmails": ["support@example.com"],
  "subject": "Attached message",
  "message": "See attached.",
  "plaintextOnly": true,
  "markdownEnabled": false,
  "file": "data:text/plain;base64,SGVsbG8gd29ybGQ="
}
```
**Formatting rules**

Message rendering is resolved in this order:
1. If `plaintextOnly` is `true`, HTML is stripped from `message`.
2. Otherwise, if `markdownEnabled` is `true`, Markdown is converted to HTML.
3. Otherwise, the raw `message` value is used as-is.

For public forms, formatting flags come from the stored `Form` object and override any client-provided values.

#### Programmatic access to the `Emailer` instance

The `Emailer` interface has a simple API for sending email messages.

```java
public interface Emailer {
	boolean sendEmail(List<String> emails, String subject, String body);
}
```
You can access the available emailer instance with:

```java
Para.getEmailer().sendEmail(List.of("user@domain.com"), "Hello", "How are you?");
```

There are several implementations of the `Emailer` class - one for JavaMail API and one using AWS SES to send emails (separate plugin).
Para uses the `Emailer` APi for email verification, password recovery emails and email notifications. 
Set `support_email` to be the email address used by the system. 

An example SMTP configuration for JavaMail:

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

You can switch to a different `Emailer` implementation, e.g. Amazon SES, by loading the
[para-email-ses](https://github.com/erudika/para-email-ses) plugin and setting
`para.emailer = "AWSEmailer"`. Also comment out the `para.mail.*` properties as they are ignored.
AWS credentials are picked up from the environment, like the `AWS_PROFILE` env. variable.