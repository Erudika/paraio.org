---
title: Emails
category: REST API
path: /v1/_emails
type: POST
---

Protected endpoint for sending transactional emails to a set of recipients (max. 10 at a time).
Messages to multiple email addresses are sent as BCC.
Messages are treated as plain text by default, unless you set `plaintextOnly: false`.
Markwdown in message body is supported if you set `markdownEnabled: true`.

### Request

Accepts only a `application/json` request body. Optionally, a `file` field can be sent with Data URI encoded value.

Example JSON payload with base64 Data URI attachment:

```json
{
  "name": "Gordon Freeman",
  "subject": "Subject line",
  "message": "Hello! Sent from the *API*: `code` and [links](https://x.com)",
  "plaintextOnly": false,
  "markdownEnabled": true,
  "email": "noreply@blackmesa.gov",
  "toEmails": ["user1@domain.com", "user2@domain.com"],
  "file": "data:image/png;base64,iVBORw0KGgoA..."
}
```

#### Parameters

**No parameters**.

### Response

Returns a JSON object with the status code and a list of errors, if any.

**status codes**: 
- `200` message was sent to the recipients
- `400` bad request - missing data, message not sent
- `429` if rate limit was exceeded, message not sent

Example response - returns the result without envelope:
```js
{
  "detail": "Bad Request",
  "instance": "/v1/_emails",
  "status": 400,
  "title": "Bad Request"
}
```