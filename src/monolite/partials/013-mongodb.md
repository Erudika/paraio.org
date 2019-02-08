---
title: MongoDB
category: Persistence
---

Since v1.18.0 Para supports plugins and the the first official plugin adds [support for MongoDB](https://github.com/Erudika/para-dao-mongodb).
The class `MongoDBDAO` is a `DAO` implementation and is responsible for connecting to a [MongoDB](https://www.mongodb.org/)
server and storing/retrieving objects (items) to/from it. All operations are carried out using the latest MongoDB
Java Driver compatible with MongoDB 3.2.

There are several configuration properties for MongoDB (these go in your `application.conf` file):

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>

`para.mongodb.uri`</td><td> The client URI string. See
[MongoClientURI](https://mongodb.github.io/mongo-java-driver/3.4/javadoc/com/mongodb/MongoClientURI.html). Overrides
`host`, `port`, `user` and `password` if set. Defaults to blank.</td></tr>
		<tr><td>

`para.mongodb.host`</td><td> The hostname of the MongoDB server. Defaults to `localhost`.</td></tr>
		<tr><td>

`para.mongodb.port`</td><td> The server port to connect to. Defaults to `27017`.</td></tr>
		<tr><td>

`para.mongodb.database`</td><td> The database name that Para will use. Default is equal to `para.app_name`.</td></tr>
		<tr><td>

`para.mongodb.user`</td><td> The username with access to the database. Defaults to blank.</td></tr>
		<tr><td>

`para.mongodb.password`</td><td> The password. Defaults to blank.</td></tr>
		<tr><td>

`para.mongodb.ssl_enabled`</td><td> Enables the secure SSL/TLS transport. Defaults to `false`.</td></tr>
		<tr><td>

`para.mongodb.ssl_allow_all`</td><td> Allows any hostname by skipping the certificate verification. Defaults to `false`.</td></tr>
	</tbody>
</table>

The plugin is on Maven Central. Here's the Maven snippet to include in your `pom.xml`:

```xml
<dependency>
  <groupId>com.erudika</groupId>
  <artifactId>para-dao-mongodb</artifactId>
  <version>{version}</version>
</dependency>
```

Alternatively you can [download the JAR](https://github.com/Erudika/para-dao-mongodb/releases) and put it in a
`lib` folder alongside the server JAR file `para-x.y.z.jar`. Para will look for plugins inside `lib` and pick up
the plugin.

Finally, set the config property:
```
para.dao = "MongoDBDAO"
```
This could be a Java system property or part of a `application.conf` file on the classpath.
This tells Para to use the MongoDB Data Access Object (DAO) implementation instead of the default.

See [Plugins](#008-plugins) for more information about how you can create your own plugins.

> For more information about using MongoDB, see the [official manual](https://docs.mongodb.org/manual/).
