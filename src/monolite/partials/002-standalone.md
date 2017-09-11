---
title: Standalone mode
category: Getting Started
---

There are two ways to run Para as a standalone server. The first one is by downloading the executable WAR file and executing it:

```bash
java -jar para-X.Y.Z.war
```

The WAR contains an embedded Jetty server and bundles together all the necessary libraries. This is the simplest and
recommended way to run Para.

Running a standalone server allows you to build a cluster of distributed Para nodes and connect to it
through the REST API. Here's a simple diagram of this architecture:

<pre>

+-------------------------------------+
|  Your app + Para API client library |
+------------------+------------------+
                   |
+------------------+------------------+
|        REST API over HTTPS          |
+-------------------------------------+
|       Cluster Load Balancer         |
+------------------+------------------+
                   |
     +------------------ ... ----+
     |             |             |
+----+----+   +----+----+   +----+----+
| Para #1 |   | Para #2 |   | Para #N |
+---------+   +---------+   +---------+

  Node 1        Node 2   ...  Node N

</pre>

## Deploying to a servlet container

Another option is to deploy the WAR file to a servlet container like Tomcat or GlassFish, for example.

**Note:** We recommend deploying the Para at the root context `/`. You can do this by renaming the WAR file
to `ROOT.war` before deploying. See [the Config](#005-config) for more details about configuring your deployment.

> Check the [releases page](https://github.com/erudika/para/releases) for the latest WAR package.