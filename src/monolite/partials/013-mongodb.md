---
title: MongoDB
category: Persistence
---

Since `v1.18.0` Para supports plugins and the the first official plugin adds [support for MongoDB](https://github.com/Erudika/para-dao-mongodb).
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
		<tr><td>`para.mongodb.host`</td><td> The hostname of the MongoDB server. Defaults to `localhost`.</td></tr>
		<tr><td>`para.mongodb.port`</td><td> The server port to connect to. Defaults to `27017`.</td></tr>
		<tr><td>`para.mongodb.database`</td><td> The database name that Para will use. Default is equal to `para.app_name`.</td></tr>
		<tr><td>`para.mongodb.user`</td><td> The username with access to the database. Defaults to `""`.</td></tr>
		<tr><td>`para.mongodb.password`</td><td> The password. Defaults to `""`.</td></tr>
	</tbody>
</table>

To get started, add the project as dependency through Maven and set the following config property, which could be a
Java system property or part of your `application.conf` file:
```
para.dao = "MongoDBDAO"
```

This tells Para to switch to the `MongoDBDAO` implementation instead of the default.
Alternatively you can build the plugin and and unzip the file `target/para-dao-mongodb.zip` into a `lib` folder
alongside the server WAR file `para-server.war`. Para will look for plugins inside `./lib` and pick up the MongoDB plugin.

Finally, make sure you close the client on exit:

```java
Para.addDestroyListener(new DestroyListener() {
    public void onDestroy() {
        MongoDBUtils.shutdownClient();
    }
});
```
See [Plugins](#008-plugins) for more information about how you can create your own plugins.

> For more information about using MongoDB, see the [official manual](https://docs.mongodb.org/manual/).
