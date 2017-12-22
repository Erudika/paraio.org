---
title: Logging
category: Metrics
---

Para uses SLF4J as a logging abstraction framework, meaning you can plug in any logging implementation like Logback,
Log4j2, etc. By default Para uses Logback. To use another implementation, exclude all Logback packages from `pom.xml`
like this:
```
<dependency>
  <groupId>com.erudika</groupId>
  <artifactId>para-core</artifactId>
  <version>${para.version}</version>
  <exclusions>
    <exclusion>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-core</artifactId>
    </exclusion>
    <exclusion>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
    </exclusion>
    <exclusion>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-access</artifactId>
    </exclusion>
  </exclusions>
</dependency>
```

Logs are stored in 3 files, located in the same directory from which Para is started:

- `para.log` - main log file, also written to syslog
- `para-metrics.log` - contains all the metrics
- `para-access.log` - contains a history of requests

To change the directory where logs are stored, set the system property `para.logs_dir` to a folder of your choice
(should not end with "/"):
```
$ java -jar -Dpara.logs_dir=/var/logs/para para.war
```
