---
title: Maven
category: Getting Started
---

Para is hosted on Maven Central. To add it to your project just include this into your `pom.xml`:

```xml
<dependency>
  <groupId>com.erudika</groupId>
  <artifactId>para-server</artifactId>
  <version>{VERSION}</version>
</dependency>
```

Adding Para to your Java or JVM based application allows you to build a distributed architecture like this:

<pre>
           +---------------+
           | Load balancer |
           +-------+-------+
                   |
     +------------------ ... ----+
     |             |             |
+----+----+   +----+----+   +----+----+
| Your app|   | Your app|   | Your app|
+---------+   +---------+   +---------+ -
| Cache   |   | Cache   |   | Cache   |  \
+---------+   +---------+   +---------+   \
| Search  |   | Search  |   | Search  |    } Para
+---------+   +---------+   +---------+   /
| Database|   | Database|   | Database|  /
+---------+   +---------+   +---------+ -

  Node 1        Node 2   ...  Node N
</pre>

### Javadocs

<a href="/javadocs-core/" class="btn btn-default">para-core</a> &nbsp;
<a href="/javadocs-server/" class="btn btn-default">para-server</a> &nbsp;
<a href="/javadocs-client/" class="btn btn-default">para-client</a>