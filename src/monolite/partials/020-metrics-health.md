---
title: Health check
category: Metrics
---

A simple health check is mapped to `/v1/_health` which returns `200 OK` if the server is
"healthy", and `500` if it's "unhealthy". The health check is configured to simply read the
root app object from the `DAO`, `Search` and `Cache` to ensure there are active connections with each resource.
The implementation is done in a class called `HealthUtils` in the "utils" package of `para-server`.

The health check endpoint is publicly accessible so it can be easily called by any application or a load balancer.
To prevent excessive calls to the health check end point, the health check method is only allowed to run at a fixed
interval (defaults to once per minute, but can be configured using `para.health.check_interval`).

An initial health check is done on startup and a warning is printed if Para is not initialized,
which is actually just an assumption at this point. The only way to distinguish between "not initialized" and
"unhealthy" is to check for connection errors in the logs. Para starts as unhealthy, but once the root app is created,
i.e. `/v1/_setup` is called, the status is updated to "healthy".

Here's how to programmatically check the health of the system:

```java
HealthUtils.getInstance().performHealthCheck();
boolean isHealthy = HealthUtils.getInstance().isHealty();
```

To disable health checking, set `para.health_check_enabled = false`.