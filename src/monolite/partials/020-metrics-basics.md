---
title: Collecting metrics
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
This method is preferred over pulling metrics from the API, because in a distributed environment with multiple Para nodes
and load balancers it becomes cumbersome to aggregate the metrics from all nodes.

There are several configuration settings for metrics in Para:

```bash
# enable/disable the collection of metrics (default: true)
para.metrics_enabled = false
# enable/disable JMX reporting (default: false)
para.metrics.jmx_enabled = false
# The URL of the host to push metrics to (default: blank)
para.metrics.graphite.host = "localhost"
# The port number of the Graphite server
para.metrics.graphite.port = 2003
# The prefixes for applying to metric names (default: blank)
para.metrics.graphite.prefix_system = "com.erudika.para.\{{INSTANCE_ID}}"
para.metrics.graphite.prefix_apps = "com.erudika.para.\{{INSTANCE_ID}}.\{{APP_ID}}"
# The period for how often to push system metrics in seconds (default: 0, disabled)
para.metrics.graphite.period = 0
```

The variable `para.metrics.graphite.period` controls how often (in seconds) metrics data is pushed to the Graphite server.
This field controls the frequency of metrics reporting for both the system-wide metrics as well as any app-specific
metrics that are pushed to Graphite. The default value is `0`, which disables all push to Graphite. Settings this
value to a positive number (i.e. `60`) will allow for system metrics to be pushed to a Graphite server, as well as
application metrics.

System-wide metrics are only reported to a Graphite server if `para.metrics.graphite.host` is not blank
(it defaults to null). This field specifies the host of the Graphite server to push only system metrics to and
`para.metrics.graphite.port` is the corresponding port number to the host (usually `2003` for Graphite).

Graphite metrics are often prefixed by some path to distinguish application metrics from other applications pushing
to the same Graphite server. For example, you may want to prefix your Para application metrics with "com.erudika.para".
There are two fields for configuring a prefix for pushing metrics to Graphite. First, `para.metrics.graphite.prefix_apps`
indicates the prefix that should be applied when pushing the system-wide metrics. Second,
`para.metrics.graphite.prefix_apps` indicates the template prefix that should be applied when pushing a specific
application's metrics to Graphite.

It's common practice in a distributed environment to include the instance ID in the prefix for pushing metrics data.
That makes it possible to view metrics for each node in your cluster, and perform an aggregation across all nodes.
This is supported by defining the instance ID for your system in an environment variable called `para.instance_id`.
If you define `para.instance_id`, you can reference it in the `para.metrics.graphite.prefix_system` and
`para.metrics.graphite.prefix_apps` variables. To include the instance ID, simply add `\{{INSTANCE_ID}}` in your
prefix variables and Para will replace it with the contents of `para.instance_id`. For example, a system prefix
variable may be configured as follows in your application config file:

```
para.instance_id = "1234abcd"
para.metrics.graphite.prefix_system = "com.erudika.para.\{{INSTANCE_ID}}.system"
```

In `para.metrics.graphite.prefix_apps` you can use both the `{{INSTANCE_ID}}` placeholder as well as the
application's identifier placeholder - `\{{APP_ID}}`. This allows application-specific metrics to contain
the application's ID in the prefix path. For example, an application prefix variable may be configured as
follows in your application config file:

```
para.metrics.graphite.prefix_apps = "com.erudika.para.\{{INSTANCE_ID}}.\{{APP_ID}}"
```

Configuring the Graphite host settings for a specific application can be done by adding a setting to the application
(see [app settings API](#050-api-settings-get)). Para will look for an application setting by the name
"metricsGraphiteReporter" to detect application-specific Graphite settings. This setting is configured in the
form of a map with two fields: `host` (String) and `port` (int). For example, to add application-specific metrics
make a signed request to Para as follows:

```
PUT /v1/_settings/metricsGraphiteReporter
{
  "value": {
    "host": "localhost",
    "port": 2003
  }
}
```

### Running Graphite and Grafana locally

To run a local Graphite server start a docker container like [hopsoft/docker-graphite-statsd](https://github.com/hopsoft/docker-graphite-statsd)
and then run a local Grafana server using the instructions at http://docs.grafana.org/installation/docker/.

Here's how to run Graphite with a Docker command:
```bash
$ docker run -d --name graphite --restart=always -p 80:80 -p 2003-2004:2003-2004 -p 2023-2024:2023-2024 \
  -p 8125:8125/udp -p 8126:8126 hopsoft/graphite-statsd
```
Then point you browser to `http://localhost/`. Then run Grafana locally with:
```bash
$ docker run -d -p 3000:3000 -e GF_SECURITY_ADMIN_USER=admin -e GF_SECURITY_ADMIN_PASSWORD=password \
  -e GF_METRICS_GRAPHITE_ADDRESS=localhost:2003 grafana/grafana
```

Then you can login using admin/password at the login screen.

