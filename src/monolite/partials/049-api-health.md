---
title: Health check (public)
category: REST API
path: /v1/_health
type: GET
---

**This resource is publicly accessible without authentication.**

Displays the health status of the server. Status is updated about once every minute.

### Request

**No parameters**.

### Response

- **status codes** - `200`, `500`

Example responses:

```
{
  "message" : "healthy"
}
```

```
{
	"code": 500,
  "message" : "unhealthy"
}
```