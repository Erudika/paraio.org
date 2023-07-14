---
title: Para Configuration
category: Configuration
---

Once deployed, Para will initialize itself by loading the default configuration file `reference.conf`.
To load your own configuration you need to set one of the following system properties:

- `config.resource` specifies a resource name - not a basename, i.e. 'application.conf' and not 'application'
- `config.file` specifies a filesystem path, again it should include the file extension
- `config.url` specifies the URL from which to load the config file

You need to set these properties before calling `Para.initialize()` or at the startup of your servlet container.
If you have a file called `application.conf` or `application.json` on the classpath, Para will pick it up automatically.

Here's a sample `application.conf` file:

```bash
para.env = "production"
para.print_logo = true
para.port = 8080
```

The configuration logic is to read system properties first, then environment properties and finally check the config file.
So the order of precedence is as follows:
```
System.getProperty() > System.getenv() > application.conf
```

Note that environment properties containing `.` (dots) are invalid and will be replaced with `_` (underscore).
For example, the environment property `$para_env` is equivalent to `para.env` in the config file.

> **Important:** In a production environment, set `para.app_secret_key` to some randomly generated secret string.
> This is important for securing your server because this secret key is used for signing and verifying authentication tokens.

List of ALL Para configuration properties

<details><summary><b>List of ALL Para configuration properties</b></summary>


## Core

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.app_name`<br>The formal name of the web application. | `para` | `String`|
|`para.context_path` <kbd>requires restart</kbd><br>The context path (subpath) of the web application, defaults to the root path `/`. | ` ` | `String`|
|`para.port` <kbd>requires restart</kbd><br>The network port of this Para server. Port number should be a number above `1024`. | `8080` | `Integer`|
|`para.dao` <kbd>requires restart</kbd><br>Selects the `DAO` implementation at runtime. Can be `AWSDynamoDAO`, `MongoDBDAO`, `CassandraDAO`, etc. Each implementation has its own configuration properties. | `H2DAO` | `String`|
|`para.search` <kbd>requires restart</kbd><br>Selects the `Search` implementation at runtime. Can be `LuceneSearch`, `ElasticSearch`, etc. | `LuceneSearch` | `String`|
|`para.cache` <kbd>requires restart</kbd><br>Selects the `Cache` implementation at runtime. Can be one of `CaffeineSearch`, `HazelcastCache`. | `CaffeineSearch` | `String`|
|`para.q` <kbd>requires restart</kbd><br>Selects the `Queue` implementation at runtime. Can be one of `LocalQueue`, `AWSQueue`. | `LocalQueue` | `String`|
|`para.fs` <kbd>requires restart</kbd><br>Selects the `FileStore` implementation at runtime. Can be one of `LocalFileStore`, `AWSFileStore`. | `LocalFileStore` | `String`|
|`para.emailer`<br>Selects the `Emailer` implementation at runtime. Can be one of `AWSEmailer`, `JavaMailEmailer`, `NoopEmailer`.  | `NoopEmailer` | `String`|
|`para.search_enabled`<br>Enable/disable full-text search functionality. | `true` | `Boolean`|
|`para.cache_enabled`<br>Enable/disable object caching. Enabled in `production` mode by default. | `false` | `Boolean`|
|`para.webhooks_enabled`<br>Enable/disable webhooks functionality using `Webhook` objects. Requires a queue. | `false` | `Boolean`|
|`para.api_enabled`<br>Enable/disable the Para RESTful API. | `false` | `Boolean`|
|`para.cluster_name`<br>The name of the Para cluster. Used by some of the plugins to isolate deployments. | `para-prod` | `String`|
|`para.core_package_name`<br>The package path (e.g. `org.company.app.core`) where all domain classes are defined. Specify this when integrating your app with Para core/client, to get deserialization working. | ` ` | `String`|
|`para.admin_ident`<br>The identifier of the first administrator (can be email or social login ID). | ` ` | `String`|
|`para.worker_id`<br>Node number, 1 to 128. Used mainly for ID generation.Each instance of Para should have a unique worker id. | `1` | `String`|
|`para.executor_threads`<br>The number of threads to use for the `ExecutorService` thread pool. | `2` | `Integer`|
|`para.max_failed_webhook_attempts`<br>The number of maximum failed webhook delivery attemts. Webhooks with too many failed deliveries will be disabled automatically. | `10` | `Integer`|
|`para.reindex_batch_size`<br>Controls the number of documents to reindex in a single batch. By default is equal to page size for reading the docs from DB. | `100` | `Integer`|
|`para.sync_index_with_db`<br>Enable/disable the data synchronization between database and search index. | `true` | `Boolean`|
|`para.read_from_index`<br>Enable/disable reading data from search index instead of database. Used for data recovery. | `false` | `Boolean`|
|`para.max_datatypes_per_app`<br>Maximum number of data types which can be defined in each Para app. | `256` | `Integer`|
|`para.max_entity_size_bytes`<br>Maximum size (in bytes) of incoming JSON payload entities in requests to the API. | `1048576` | `Integer`|
|`para.health.check_interval`<br>The health check interval, in seconds. | `60` | `Integer`|
|`para.health_check_enabled`<br>Enable/disable the health check functionality in Para. | `true` | `Boolean`|

## Basic Authentication

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.fb_app_id`<br>Facebook OAuth2 app ID. | ` ` | `String`|
|`para.fb_secret`<br>Facebook app secret key. | ` ` | `String`|
|`para.gp_app_id`<br>Google OAuth2 app ID. | ` ` | `String`|
|`para.gp_secret`<br>Google app secret key. | ` ` | `String`|
|`para.in_app_id`<br>LinkedIn OAuth2 app ID. | ` ` | `String`|
|`para.in_secret`<br>LinkedIn app secret key. | ` ` | `String`|
|`para.tw_app_id`<br>Twitter OAuth app ID. | ` ` | `String`|
|`para.tw_secret`<br>Twitter app secret key. | ` ` | `String`|
|`para.gh_app_id`<br>GitHub OAuth2 app ID. | ` ` | `String`|
|`para.gh_secret`<br>GitHub app secret key. | ` ` | `String`|
|`para.ms_app_id`<br>Microsoft OAuth2 app ID. | ` ` | `String`|
|`para.ms_secret`<br>Microsoft app secret key. | ` ` | `String`|
|`para.ms_tenant_id`<br>Microsoft OAuth2 tenant ID. | `common` | `String`|
|`para.az_app_id`<br>Amazon OAuth2 app ID. | ` ` | `String`|
|`para.az_secret`<br>Amazon app secret key. | ` ` | `String`|
|`para.sl_app_id`<br>Slack OAuth2 app ID. | ` ` | `String`|
|`para.sl_secret`<br>Slack app secret key. | ` ` | `String`|
|`para.mm_app_id`<br>Mattermost OAuth2 app ID. | ` ` | `String`|
|`para.mm_secret`<br>Mattermost app secret key. | ` ` | `String`|

## Security

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.cors_enabled`<br>Enable/disable the CORS filter. It adds CORS headers to API responses. | `true` | `Boolean`|
|`para.security.csrf_protection`<br>Enable/disable CSRF protection which checks for valid CSRF tokens in write requests. | `true` | `Boolean`|
|`para.security.csrf_cookie`<br>The name of the CSRF cookie. | `para-csrf-token` | `String`|
|`para.auth_cookie`<br>The name of the authorization cookie. | `para-auth` | `String`|
|`para.request_expires_after`<br>Expiration period for signed API request, in seconds. | `900` | `Integer`|
|`para.jwt_expires_after`<br>Expiration period for JWTs (access token), in seconds. | `86400` | `Integer`|
|`para.jwt_refresh_interval`<br>JWT refresh interval, after which a new token is issued, in seconds. | `3600` | `Integer`|
|`para.id_token_expires_after`<br>Expiration period for short-lived ID tokens, in seconds. | `60` | `Integer`|
|`para.session_timeout`<br>Expiration period for the login session, in seconds. | `86400` | `Integer`|
|`para.min_password_length`<br>The minimum length of user passwords. | `8` | `Integer`|
|`para.pass_reset_timeout`<br>The time window in which passwords can be reset, in seconds. After that the token in the email expires. | `1800` | `Integer`|
|`para.max_pass_matching_attemts`<br>The maximum number of passord matching attempts for user accounts per time unit. After that the account is locked and user cannot login until the lock has expired. | `20` | `Integer`|
|`para.pass_matching_lock_period_hours`<br>The time to force a user to wait until they can try to log back in, in hours. | `1` | `Integer`|
|`para.returnto_cookie`<br>The name of the cookie used to remember which URL the user requested and will be redirected to after login. | `para-returnto` | `String`|
|`para.support_email`<br>The email of the webmaster/support team. Para will send emails to this email. | `support@myapp.co` | `String`|
|`para.security.allow_unverified_emails`<br>Enable/disable email verification after the initial user registration. Users with unverified emails won't be able to sign in, unless they use a social login provider. | `false` | `Boolean`|
|`para.security.protected`<br>Protects a named resource by requiring users to authenticated before accessing it. A protected resource has a `{name}` and value like this `[\"/{path}\", \"/{path}/**\", [\"{role}\" or {http_method}]]`. The value is an array of relative paths which are matche by an ANT pattern matcher. This array can contain a subarray which lists all the HTTP methods that require authentication and the user roles that are allowed to access this particular resource. No HTTP methods means that all requests to this resource require authentication. | ` ` | `ConfigObject`|
|`para.security.signin`<br>The path to the login page. | `/signin` | `String`|
|`para.security.signin_success`<br>The default page to send users to when they login. | `/` | `String`|
|`para.security.signin_failure`<br>The default page to send users to when login fails. | `/signin?error` | `String`|
|`para.security.signout`<br>The path to the logout page. | `/signout` | `String`|
|`para.security.signout_success`<br>The default page to send users to when they logout. | `/signin` | `String`|
|`para.security.access_denied`<br>The path to redirect to when 403 code is returned. | `/403` | `String`|
|`para.security.returnto`<br>The path to return to when an authentication request succeeds. | `returnto` | `String`|
|`para.security.remember_me` <kbd>deprecated</kbd><br>Enable/disable remember me functionality. | `true` | `Boolean`|
|`para.app_secret_key` <kbd>deprecated</kbd><br>Salt. | `md5('paraseckey')` | `String`|

## River & Queue

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.default_queue_name`<br>The name of the queue used by Para. | `para-default` | `String`|
|`para.queue_link_enabled`<br>Enable/disable polling the queue for message. This controls the 'river' feature in Para. | `false` | `Boolean`|
|`para.queue.polling_sleep_seconds`<br> | `60` | `Integer`|
|`para.queue.polling_interval_seconds`<br>The polling interval of the Para river, in seconds. Polls queue for messages. | `10` | `Integer`|
|`para.river.max_indexing_retries`<br>The maximum number of attempts at reading an object from database and indexing it, when the operation was received from the queue. | `5` | `Integer`|
|`para.indexing_sync_interval_sec`<br>The time interval between the sending of each batch of index synchronization messages to the queue, in seconds. | `10` | `Integer`|

## Metrics

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.metrics_enabled`<br>Enable/disable the built-in metrics around CRUD methods. | `true` | `Boolean`|
|`para.metrics.logging_rate`<br>The rate at which the metrics logger will write to file, in seconds. | `60` | `Integer`|
|`para.metrics.graphite.host`<br>The URL of the Graphite host to push metrics to. | ` ` | `String`|
|`para.metrics.graphite.port`<br>The port number of the Graphite server. | `2003` | `Integer`|
|`para.metrics.graphite.prefix_system`<br> | ` ` | `String`|
|`para.metrics.graphite.prefix_apps`<br>The prefix to apply to metric names, e.g. `com.erudika.para.{{INSTANCE_ID}}`. | ` ` | `String`|
|`para.metrics.graphite.period`<br>The period for how often to push system metrics in seconds. Disabled by default. | `0` | `Integer`|
|`para.metrics.jmx_enabled`<br>Enable/disable JMX reporting for all metrics. | `false` | `Boolean`|

## LDAP Authentication

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.security.ldap.password_param`<br>LDAP password parameter name. | `password` | `String`|
|`para.security.ldap.username_param`<br>LDAP username parameter name. | `username` | `String`|

## File Storage

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.s3.bucket`<br>The S3 bucket where files will be stored by `FileStore` implementations. | `org.paraio.us-east-1` | `String`|
|`para.s3.max_filesize_mb`<br>Maximum file size for files uploaded to S3, in megabytes. | `10` | `Integer`|
|`para.localstorage.folder`<br>The local folder for file storage, when `LocalFileStore` is used. | ` ` | `String`|
|`para.localstorage.max_filesize_mb`<br>Maximum file size for files stored locally, in megabytes. | `10` | `Integer`|

## Para Client

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.client.ssl_protocols`<br>SSL protocols allowed for a successul connection. | `TLSv1.3` | `String`|
|`para.client.ssl_keystore`<br>The SSL key store location. This contains the certificates used by the Para client. | ` ` | `String`|
|`para.client.ssl_keystore_password`<br>The SSL key store password. | ` ` | `String`|
|`para.client.ssl_truststore`<br>The SSL trust store location. This contains the certificates and CAs which the client trusts. | ` ` | `String`|
|`para.user_agent_id_enabled`<br>Enable/disable `User-Agent` header in Para client. | `true` | `Boolean`|

## Elasticsearch Search

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.es.flavor`<br>Eleasticsearch flavor - either `elasticsearch` or `opensearch`. | `elasticsearch` | `String`|
|`para.es.shards`<br>The number of shards per index. Used when creating the root app index. | `2` | `Integer`|
|`para.es.shards_for_child_apps`<br>The number of shards per index for a child apps. | `1` | `Integer`|
|`para.es.replicas`<br>The number of copies to store of the root index. | `0` | `Integer`|
|`para.es.replicas_for_child_apps`<br>The number of copies to store of each child app index. | `0` | `Integer`|
|`para.es.use_nested_custom_fields`<br>Switches between normal indexing and indexing with nested key/value objects for custom properties. When this is `false` (normal mode), Para objects will be indexed without modification but this could lead to a field mapping explosion and crash the ES cluster. | `false` | `Boolean`|
|`para.es.async_enabled`<br>Enable/disable asynchronous operations when indexing/unindexing. | `false` | `Boolean`|
|`para.es.bulk.flush_immediately`<br>Eanble/disable immediately flushing the requests in `BulkProcessor`, concurrently (in another thread). | `true` | `Boolean`|
|`para.es.restclient_scheme`<br>The scheme to use when connecting to the Elasticsearch server - `http` or `https`. | `http` | `String`|
|`para.es.restclient_host`<br>The ES server hostname. | `localhost` | `String`|
|`para.es.restclient_port`<br>The ES server port number. | `9200` | `Integer`|
|`para.es.sign_requests_to_aws`<br>Enable/disable request signing using the AWS V4 algorithm. For use with Amazon OpenSearch. | `false` | `Boolean`|
|`para.es.restclient_context_path`<br>The context path where ES is deployed, if any. | ` ` | `String`|
|`para.es.auto_expand_replicas`<br>Automatically make a replica copy of the index to the number of nodes specified. | `0-1` | `String`|
|`para.es.root_index_sharing_enabled`<br>Enable/disable root index sharing by child apps configured with `isSharingIndex = true`. | `false` | `Boolean`|
|`para.es.track_total_hits`<br>Makes ES track the actual number of hits, even if they are more than the 10000.  | `true` | `Boolean`|
|`para.es.aws_region`<br>The AWS region where ES is deployed. Used for calculating request signatures. | `eu-west-1` | `String`|
|`para.es.basic_auth_login`<br>The username to use for authentication with ES. | ` ` | `String`|
|`para.es.basic_auth_password`<br>The password to use for authentication with ES. | ` ` | `String`|
|`para.es.bulk.size_limit_mb`<br>`BulkProcessor` flush threshold, in megabytes. | `5` | `Integer`|
|`para.es.bulk.action_limit`<br>`BulkProcessor` flush threshold in terms of batch size. | `1000` | `Integer`|
|`para.es.bulk.concurrent_requests`<br>`BulkProcessor` number of concurrent requests (0 means synchronous execution). | `1` | `Integer`|
|`para.es.bulk.flush_interval_ms`<br>`BulkProcessor` flush interval, in milliseconds. | `5000` | `Integer`|
|`para.es.bulk.backoff_initial_delay_ms`<br>`BulkProcessor` inital backoff delay, in milliseconds. | `50` | `Integer`|
|`para.es.bulk.max_num_retries`<br>`BulkProcessor` number of retries. | `8` | `Integer`|
|`para.es.proxy_enabled`<br>Enable/disable the Elasticsearch proxy endpoint. | `false` | `Boolean`|
|`para.es.proxy_path`<br>The path to the ES proxy endpoint. | `_elasticsearch` | `String`|
|`para.es.proxy_reindexing_enabled`<br>Enable/disable rebuilding indices through the Elasticsearch proxy endpoint. | `false` | `Boolean`|

## Lucene Search

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.lucene.dir`<br>The data folder where Lucene stores its indexes. | `./` | `String`|

## MongoDB DAO

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.mongodb.uri`<br>The MongoDB URI string - verrides host, port, user and password if set. | ` ` | `String`|
|`para.mongodb.database`<br>The database name that Para will use. The database should exist before starting Para. | `para` | `String`|
|`para.mongodb.host`<br>The hostname of the MongoDB server. | `localhost` | `String`|
|`para.mongodb.port`<br>The MongoDB server port. | `27017` | `Integer`|
|`para.mongodb.user`<br>The username with access to the MongoDB database. | ` ` | `String`|
|`para.mongodb.password`<br>The MongoDB user's password. | ` ` | `String`|
|`para.mongodb.ssl_enabled`<br>Enable/disable the SSL/TLS transport layer. | `false` | `Boolean`|
|`para.mongodb.ssl_allow_all`<br>Allows a connection to any host over SSL by ignoring the certificate validation. | `false` | `Boolean`|

## SQL DAO

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.db.hostname`<br>The hostname of the H2 server. Setting this will enable H2’s “server mode” and start a TCP server. | ` ` | `String`|
|`para.db.dir`<br>The data directory for storing H2 databases. | `./data` | `String`|
|`para.db.user`<br>The username with access to the H2 database. | `para` | `String`|
|`para.db.tcpServer`<br>Parameters for the H2 TCP server. | ` ` | `String`|
|`para.sql.url`<br>The server URL to connect to, *without* the `jdbc:` prefix. | ` ` | `String`|
|`para.sql.driver`<br>The fully-qualified class name for your SQL driver. | ` ` | `String`|
|`para.sql.user`<br>The username with access to the database. | `user` | `String`|
|`para.sql.password`<br>The database user's password. | `secret` | `String`|

## Cassandra DAO

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.cassandra.hosts`<br>Comma-separated Cassandra server hosts (contact points). | `localhost` | `String`|
|`para.cassandra.keyspace`<br>The name of the Cassandra keyspace to use. | `para` | `String`|
|`para.cassandra.user`<br>The Cassandra username with access to the database. | ` ` | `String`|
|`para.cassandra.password`<br>The password for the Cassandra user. | ` ` | `String`|
|`para.cassandra.port`<br>The Cassandra server port to connect to. | `9042` | `Integer`|
|`para.cassandra.replication_factor`<br>Replication factor for the Cassandra keyspace. | `1` | `Integer`|
|`para.cassandra.ssl_enabled`<br>Enable/disable the SSL/TLS transport in Cassandra client. | `false` | `Boolean`|
|`para.cassandra.ssl_protocols`<br>The protocols allowed for successful connection to Cassandra cluster. | `TLSv1.3` | `String`|
|`para.cassandra.ssl_keystore`<br>Cassandra client key store, containing the certificates to use. | ` ` | `String`|
|`para.cassandra.ssl_keystore_password`<br>Password for the Cassandra client key store. | ` ` | `String`|
|`para.cassandra.ssl_truststore`<br>Cassandra client trust store, containing trusted certificates and CAs. | ` ` | `String`|
|`para.cassandra.ssl_truststore_password`<br>Password for the Cassandra trust store. | ` ` | `String`|

## AWS DynamoDB DAO

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.dynamodb.sse_enabled`<br>Enable/disable SSE (encryption-at-rest) using own KMS, instead of AWS-owned CMK for all newly created DynamoDB tables. | `false` | `Boolean`|
|`para.dynamodb.replica_regions`<br>Toggles global table settings for the specified regions. | ` ` | `String`|
|`para.dynamodb.backups_enabled`<br>Enable/disable point-in-time backups in DynamoDB. | `false` | `Boolean`|
|`para.dynamodb.provisioned_mode_enabled`<br>Enable/disable provisioned billing as an alternative to on-demand billing in DynamoDB. | `false` | `Boolean`|
|`para.dynamodb.max_read_capacity`<br>The maximum read capacity when creating a table with provisioned mode enabled. | `10` | `Integer`|
|`para.dynamodb.max_write_capacity`<br>The maximum write capacity when creating a table with provisioned mode enabled. | ` ` | `Integer`|

## Caffeine Cache

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.caffeine.evict_after_minutes`<br>Cache eviction policy - objects are evicted from Caffeine cache after this time. | `10` | `Integer`|
|`para.caffeine.cache_size`<br>Maximum size for the Caffeine cache map. | `10000` | `Integer`|

## Hazelcast Cache

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.hc.async_enabled`<br>Enable/disable asynchronous operations in the Hazelcast client. | `true` | `Boolean`|
|`para.hc.ttl_seconds`<br>Time-to-live value (how long the objects stay cached) for cached objects, in seconds. | `3600` | `Integer`|
|`para.hc.ec2_discovery_enabled`<br>Enable/disable EC2 auto-discovery feature when deploying to AWS. | `true` | `Boolean`|
|`para.hc.aws_access_key`<br>The AWS access key to use if EC2 auto-discovery is enabled in Hazelcast. | ` ` | `String`|
|`para.hc.aws_secret_key`<br>The AWS secret key to use if EC2 auto-discovery is enabled in Hazelcast. | ` ` | `String`|
|`para.hc.aws_region`<br>The AWS region to use if EC2 auto-discovery is enabled in Hazelcast. | ` ` | `String`|
|`para.hc.discovery_group`<br>EC2 security group for cloud discovery of Hazelcast nodes. | `hazelcast` | `String`|
|`para.hc.max_size`<br>Maximum number of objects to keep in Hazelcast cache. | `5000` | `Integer`|
|`para.hc.eviction_policy`<br>Hazelcast cache eviction policy - `LRU` or `LFU`. | `LRU` | `String`|

## Miscellaneous

| Property key & Description | Default Value | Type |
|  ---                       | ---           | ---  |
|`para.max_items_per_page`<br>Maximum results per page - limits the number of items to show in search results. | `30` | `Integer`|
|`para.max_pages`<br>Pagination limit - sets the highest page number possible. | `1000` | `Integer`|
|`para.max_page_limit`<br>Pagination limit - sets the maximum value for the `limit` request parameter, when it is used. | `256` | `Integer`|
|`para.access_log_enabled`<br>Enable/disable the Para access log. | `true` | `Boolean`|
|`para.shared_table_name`<br>The name of the shared database table, used by shared apps. | `0` | `String`|
|`para.fail_on_write_errors`<br>Enable/disable throwing an exception when a write operation fails with errors. | `true` | `Boolean`|
|`para.import_batch_size`<br>The maximum number of objects to import, in each batch, when restoring data from backup. | `100` | `Integer`|
|`para.gzip_enabled`<br>Enable/disable the GZIP filter for compressing API response entities. | `false` | `Boolean`|
|`para.debug_request_signatures`<br>Enable/disable debuging info for each AWS V4 request signature. | `false` | `Boolean`|
|`para.vote_expires_after`<br>Vote expiration timeout, in seconds. Users can vote again on the same content after this period has elapsed. Default is 30 days. | `2592000` | `Integer`|
|`para.vote_locked_after`<br>Vote locking period, in seconds. Vote cannot be changed after this period has elapsed. Default is 30 sec. | `30` | `Integer`|
|`para.plugin_folder`<br>The folder from which Para will load its JAR plugin files. | `lib/` | `String`|
|`para.prepend_shared_appids_with_space`<br>**For internal use only!** Prepends `appid` fields with a space for all shared apps. | `false` | `Boolean`|
|`para.print_version`<br>Enable/disable version number printing in Para logs. | `true` | `Boolean`|
|`para.print_logo`<br>Enable/disable printing the Para ASCII logo on startup. | `true` | `Boolean`|
|`para.markdown_soft_break`<br>Sets the Markdown soft break character. | `<br>` | `String`|
|`para.markdown_allowed_follow_domains`<br>A whitelist of domains, links to which will be allowed to be followed by web crawlers (comma-separated list). | ` ` | `String`|
|`para.aws_ses_region`<br>AWS region to use in the `AWSEmailer` implementation. | `eu-west-1` | `String`|
|`para.pidfile_enabled`<br>Enable/disable PID file generation on startup. | `true` | `Boolean`|
|`para.default_separator`<br>String separator - default is colon `:`. | `:` | `String`|
|`para.default_encoding`<br>Default character encoding - `UTF-8`. | `UTF-8` | `String`|

</details>
<br>

All configuration properties can be overridden using system properties, e.g. `System.setProperty("para.port", "8081")`,
or `-Dpara.port=8081` or using ENV variables `export para_port=8081`.

> Para uses the excellent [Config library](https://github.com/typesafehub/config/) by TypeSafe.
> For more information about how it works, see the README for it.