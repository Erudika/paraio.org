---
category: Getting Started
title: Standalone mode
---

There are two ways to run Para as a standalone server. The first one is by downloading the executable WAR file and executing it:

```bash
java -jar para-X.Y.Z.war
```

The WAR contains an embedded Jetty server and bundles together all the necessary libraries. This is the simplest and
recommended way to run Para.

Running a standalone server allows you to build a cluster of distributed Para nodes and connect to it
through the REST API. Here's a simple diagram of that architecture:

<pre>
+----------+ +----------+ +-----------+
|API Client| |API Client| |API Client |
+----+-----+ +-----+----+ +----+------+
     |             |           |
+----+-------------+-----------+------+
|        REST API over HTTPS          |
+----+-------------+-----------+------+
     |             |           |
+----+-------------+-----------+------+
|       Cluster Load Balancer         |
+------+------+------+------+---------+
                   |
     +------------------ ... ----+
     |             |             |
+----+----+   +----+----+   +----+----+
| Your app|   | Your app|   | Your app|
+---------+   +---------+   +---------+
| Cache   |   | Cache   |   | Cache   |  \
+---------+   +---------+   +---------+   \
| Search  |   | Search  |   | Search  |    } Para
+---------+   +---------+   +---------+   /
| Database|   | Database|   | Database|  /
+---------+   +---------+   +---------+

  Node 1        Node 2   ...  Node N

</pre>


Another option is to get the WAR file and deploy it to your favorite servlet container like Tomcat or
GlassFish, for example.

**Note:** We recommend deploying the Para at the root context `/`. You can do this by renaming the WAR file
to `ROOT.war` before deploying. See [the Config](#005-config) for more details about configuring your deployment.

> Go over to the [releases page](https://github.com/erudika/para/releases) to get the latest WAR package.