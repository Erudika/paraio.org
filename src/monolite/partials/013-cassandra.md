---
title: Cassandra
category: Persistence
---

The Cassandra plugin adds [support for Apache Cassandra](https://github.com/Erudika/para-dao-cassandra).
The class `CassandraDAO` is a `DAO` implementation and is responsible for connecting to a [Cassandra](https://cassandra.apache.org/)
cluster and storing/retrieving objects (items) to/from it. All operations are carried out using the latest Cassandra
Java Driver by DataStax, compatible with Cassandra 3.x.

There are several configuration properties for Cassandra (these go in your `application.conf` file):

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>`para.cassandra.hosts`</td><td> Comma-separated server hostnames (contact points). Defaults to `localhost`.</td></tr>
		<tr><td>`para.cassandra.port`</td><td> The server port to connect to. Defaults to `9042`.</td></tr>
		<tr><td>`para.cassandra.keyspace`</td><td> The keyspace name that Para will use. Default is equal to `para.app_name`.</td></tr>
		<tr><td>`para.cassandra.user`</td><td> The username with access to the database. Defaults to `""`.</td></tr>
		<tr><td>`para.cassandra.password`</td><td> The password. Defaults to `""`.</td></tr>
		<tr><td>`para.cassandra.replication_factor`</td><td> Replication factor for the keyspace. Defaults to `1`.</td></tr>
	</tbody>
</table>

To get started, add the project as dependency through Maven and set the following config property, which could be a
Java system property or part of your `application.conf` file:
```
para.dao = "CassandraDAO"
```

This tells Para to switch to the `CassandraDAO` implementation instead of the default.
Alternatively you can build the plugin and and unzip the file `target/para-dao-cassandra.zip` into a `lib` folder
alongside the server WAR file `para-server.war`. Para will look for plugins inside `./lib` and pick up the Cassandra plugin.

Finally, make sure you close the client on exit:

```java
Para.addDestroyListener(new DestroyListener() {
    public void onDestroy() {
        CassandraUtils.shutdownClient();
    }
});
```
See [Plugins](#008-plugins) for more information about how you can create your own plugins.

> For more information about using Cassandra, see the [official docs](https://cassandra.apache.org/doc/latest/).
