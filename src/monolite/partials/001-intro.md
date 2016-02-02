---
title: Introduction
---

Para was created because we needed a simple and flexible back-end service to support our front-end work.
We wanted to have a system that allowed us to persist objects easily to anything - RDBMS and NoSQL databases.
Our second requirement was full text search. We wanted to be able to find any persisted object quickly.

There are two ways to use Para:
- as a standalone service running inside a servlet container like Jetty or Tomcat;
- as part of your project as a Maven dependency.

Running Para as a standalone service on one or more nodes gives you scalability and allows you to support
many different clients and applications. This is done through Para's simple RESTful API which talks JSON to your clients.

And if you are building a server-side application, add Para as a dependency to quickly make your domain objects
persistable and searchable. You can still keep the RESTful API feature or turn it off completely.

### Quick start

1. [Download the WAR](https://github.com/erudika/para/releases)
2. Run it with `java -jar para-war-{VERSION}.war` - Para is now running in embedded mode, suitable for development.
3. Call `curl localhost:8080/v1/_setup` to get the access and secret keys (give it a few seconds to initialize)
4. Start using the RESTful API directly or use one of the provided client libraries below.

The Java client for Para is a separate module with these Maven coordinates:

```xml
<dependency>
  <groupId>com.erudika</groupId>
  <artifactId>para-client</artifactId>
  <version>{VERSION}</version>
</dependency>
```

In your own project you can create a new `ParaClient` instance like so:

```java
ParaClient pc = new ParaClient(accessKey, secretKey);
// for development the default endpoint is http://localhost:8080
pc.setEndpoint(paraServerURL);
// send a test request - this should return a JSON object of type 'app'
pc.me();
```

### Client libraries

<div class="btn-client-div">
	<a href="https://github.com/Erudika/para/tree/master/para-client" class="btn-client">
		<i class="devicon-java-plain-wordmark"></i>
	</a><br>
	<a href="https://github.com/Erudika/para/tree/master/para-client">para-client-java</a>
</div>

<div class="btn-client-div">
	<a href="https://github.com/Erudika/para-client-js" class="btn-client">
		<i class="devicon-nodejs-plain"></i>
	</a><br>
	<a href="https://github.com/Erudika/para-client-js">para-client-js</a>
</div>

<div class="btn-client-div">
	<a href="https://github.com/Erudika/para-client-php" class="btn-client">
		<i class="devicon-php-plain"></i>
	</a><br>
	<a href="https://github.com/Erudika/para-client-php">para-client-php</a>
</div>

<div class="btn-client-div">
	<a href="https://github.com/Erudika/para-client-csharp" class="btn-client">
		<i class="devicon-dot-net-plain-wordmark"></i>
	</a><br>
	<a href="https://github.com/Erudika/para-client-csharp">para-client-csharp</a>
</div>

<div class="btn-client-div">
	<a href="https://github.com/Erudika/para-client-android" class="btn-client">
		<i class="devicon-android-plain-wordmark"></i>
	</a><br>
	<a href="https://github.com/Erudika/para-client-csharp">para-client-android</a>
</div>
