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

The other alternative for retrieving metrics is using a new REST API at `/v1/_metrics`. A signed request to
`/v1/_metrics` will return the instantaneous metrics data in JSON format for the application that made the request.
A request path parameter `pretty` will format the response in a more human-readable format. The root application also
has an additional endpoint at `/v1/_metrics/_system` to get metrics data for the overall system (the same data that is
reported to the log file).

Additionally, JMX reporting can be enabled by setting `para.metrics.jmx_enabled = true`.
