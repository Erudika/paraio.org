---
title: API methods
category: REST API
---

> All API methods below **require authentication** by default, unless it's written otherwise.

### Limiting which fields are returned by the API

Field limiting is supported on all requests by using the query parameter `select=xxx,yyy`.
This parameter takes a comma separated list of fields to include. For example:

```
GET /myobjects?select=id,name,my_field1,my_field2
```

<br><br>
<a href="#" class="radius collapse-expand-link">&blacktriangledown;&blacktriangle; collapse/expand all</a>