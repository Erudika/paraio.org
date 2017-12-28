---
title: Timers
category: Metrics
---

With version 1.27, a number of metrics are implemented on top of DropWizard. By default, DropWizard metrics are
captured for every application, as well as the overall system across all applications. The DropWizard `Timer` is used
to record metrics, which gives count and latency measurements. There are timers implemented on all of the following
components:

- All methods on the `DAO` interface
- All methods on the `Search` interface
- All methods on the `Cache` interface
- All REST endpoints for CRUD operations (both single and batch)
- All REST endpoints for Search operations
- All REST endpoints for Link operations
- All REST endpoints for classes implementing the `CustomResourceHandler` interface

All of the above metrics are initialized at startup for the overall system, as well as any existing applications.
A new log file output was added to print the names of the applications found during initialization, and to indicate
which one is the root app. If a new app is created, metrics are automatically initialized for this app as well.

Metrics are retrievable in two ways. First, a new log file called `para-metrics.log` is created by default. The system
metrics are written to this file at a rate of every 60 seconds by default. There is a user configurable parameter
`para.metrics.logging_rate` which will override the logging rate of the log file. If the logging rate is set to zero,
no metrics are saved to the log file.

The other alternative for retrieving metrics is by configuring Para to push them to a metrics server like Graphite.
This method is preferred over pulling metrics from the API, because in a distributed environment with multiple Para nodes,
it becomes hard to aggregate the metrics from all nodes.

There are several config settings that control the behavior of metrics pushing:
```ini
# The URL of the host to push metrics to
para.metrics.graphite.host: "localhost"
# The port number of the Graphite server
para.metrics.graphite.port: 2003
# The prefix for applying to metric names, e.g. com.erudika.para.${INSTANCE_ID}
para.metrics.graphite.prefix: "com.erudika.para.${WORKER_ID}"
# The period for how often to push system metrics in seconds (0 to disable)
para.metrics.graphite.period: 0
```
To run a local Graphite server start a docker container like [hopsoft/docker-graphite-statsd](https://github.com/hopsoft/docker-graphite-statsd)
and then run a local Grafana server using the instructions at http://docs.grafana.org/installation/docker/.

Here is an example Docker command:
```
$ docker run -d -p 3000:3000 -e GF_SECURITY_ADMIN_USER=admin -e \
  GF_SECURITY_ADMIN_PASSWORD=password -e GF_METRICS_GRAPHITE_ADDRESS=localhost:2003 grafana/grafana
```
Then you can login using admin/password at the login screen.

Additionally, JMX reporting can be enabled by setting `para.metrics.jmx_enabled = true`.
