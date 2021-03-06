---
title: Utilities
category: REST API
path: /v1/utils/{method}
type: GET
---

Utility functions which can be accessed via the REST API include (listed by the method's short name):

- `newid` - calls `Utils.getNewId()`. You *must* set `para.worker_id` to be different on each node.
- `timestamp` - calls `Utils.timestamp()`
- `formatdate` - calls `Utils.formatDate(format, locale)`, additional parameters: `format` (e.g. "dd MM yyyy"), `locale`.
- `formatmessage` - calls `Utils.formatMessage(msg, params)`, additional parameters: `message` (the message to format)
- `nospaces` - calls `Utils.noSpaces(str, repl)`, additional parameters: `string` (the string to process)
- `nosymbols` - calls `Utils.stripAndTrim(str)`, additional parameters: `string` (the string to process)
- `md2html` - calls `Utils.markdownToHtml(md)`, additional parameters: `md` (a Markdown string)
- `timeago` - calls `HumanTime.approximately(delta)`, additional parameters: `delta` (time difference between now and then)

**Example:** `GET /v1/utils?method=nospaces&string=some string with spaces`

### Request

- `{method}` - the name of the method to call (one of the above)

### Response

Returns a JSON object.

- **status codes** - `200`, `400` (if no method is specified)

Example response - returns the result without envelope:
```js
"result"
```