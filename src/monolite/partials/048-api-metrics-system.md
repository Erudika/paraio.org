---
title: System metrics
category: REST API
path: /v1/_metrics/_system
type: GET
---

Displays the metrics for the whole system.

#### Parameters

- `pretty` - setting this will enable pretty printing

### Response

- **status codes** - `200`, `403`

Example response:
```
{
  "metrics": {
    "H2DAO.createAll": {
      "oneMinuteRate": 0,
      "fiveMinuteRate": 0,
      "meanRate": 0,
      "fifteenMinuteRate": 0,
      "count": 0,
      "snapshot": {
        "values": [],
        "min": 0,
        "mean": 0,
        "stdDev": 0,
        "max": 0,
        "median": 0,
        "75thPercentile": 0,
        "95thPercentile": 0,
        "98thPercentile": 0,
        "99thPercentile": 0,
        "999thPercentile": 0
      }
    }, ...
  }
}
```