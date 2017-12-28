---
title: System metrics
category: REST API
path: /v1/_metrics/{appid}
type: GET
---

Allows the root app to access the metrics of other apps. This endpoint is only accessible with the root app's credentials.
If a normal app calls this endpoint it will return the metrics for that app, exactly like `GET /v1/_metrics`.

### Request

- `{appid}` - the `id` of an app

#### Parameters

- `pretty` - setting this will enable pretty printing

### Response

- **status codes** - `200`

Example response:
```
{
  "metrics": {
    "H2DAO.create": {
      "oneMinuteRate": 0.000029158291421501796,
      "fiveMinuteRate": 0.03418034256030498,
      "meanRate": 0.0018675416405972923,
      "fifteenMinuteRate": 0.11098870924877408,
      "count": 1,
      "snapshot": {
        "values": [
            97835393
        ],
        "min": 97835393,
        "mean": 97835393,
        "stdDev": 0,
        "max": 97835393,
        "median": 97835393,
        "75thPercentile": 97835393,
        "95thPercentile": 97835393,
        "98thPercentile": 97835393,
        "99thPercentile": 97835393,
        "999thPercentile": 97835393
      }
    }, ...
  }
}
```