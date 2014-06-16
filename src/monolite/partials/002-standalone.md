---
category: Getting Started
title: Standalone
---

There are two ways to run Para as a standalone server. The first one is by downloading the "fat" JAR file and executing it:

```bash
java -jar para-X.Y.Z.jar
```

The JAR contains an embedded Jetty server and bundles together all the necessary libraries. This is the simplest and
recommended way to run Para.

This mode allows you to build a distributed cluster of Para nodes and connect to it through the REST API.
Here's a simple diagram of that architecture:

<pre>
+----------+ +----------+ +----------+
|API Client| |API Client| |API Client|
+----+-----+ +----+-----+ +----+-----+
     |            |            |
+----+------------+------------+-----+
|          REST OVER HTTPS           |
+----+------------+------------+-----+
     |            |            |
+----+------------+------------+-----+
|            Para Cluster            |
+------+------+------+------+--------+
|      |      |      |      |        |
| Para | Para | Para | Para |  ...   |
| Node | Node | Node | Node |        |
|      |      |      |      |        |
+------+------+------+------+--------+ 
</pre>


The second option is to get the WAR file and deploy it to your favorite servlet container like Tomcat or
GlassFish, for example.

**Note:** We recommend deploying the Para at the root context `/`. You can do this by renaming the WAR file
to `ROOT.war` before deploying. See [the Config](#005-config) for more details about configuring your deployment.

> Go over to the [releases page](https://github.com/erudika/para/releases) to get the latest JAR or WAR packages.