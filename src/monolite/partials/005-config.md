---
title: The Config
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
para.env = "embedded"
para.print_logo = true
para.security.api_security = true
para.security.csrf_protection = true
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

Here's a list of all configuration properties that can be set in the config file:

<table class="table table-striped">
	<thead>
		<tr>
			<th>Configuration Property</th>
			<th>Default Value</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>

`para.env`									</td><td>	`embedded`</td></tr>
		<tr><td>Enables/disables certain features, depending on the environment. Can be "production", "development", "embedded".  </td><td></td></tr>
		<tr><td>

`para.dao`									</td><td>-</td></tr>
		<tr><td>Selects the `DAO` implementation at runtime. Can be `AWSDynamoDAO` or	"dynamodb", "MongoDBDAO",
		"CassandraDAO", etc. Each implementation has its own configuration properties. Defaults to `H2DAO`. </td><td></td></tr>
		<tr><td>

`para.search`								</td><td>-</td></tr>
		<tr><td>Selects the `Search` implementation at runtime. Defaults to `LuceneSearch`.</td><td></td></tr>
		<tr><td>

`para.cache`								</td><td>-</td></tr>
		<tr><td>Selects the `Cache` implementation at runtime. Defaults to `CaffeineCache`.</td><td></td></tr>
		<tr><td>

`para.worker_id`						</td><td>

`1`</td></tr>
		<tr><td>Node number, 1 to 128. Used for ID generation. Each instance of Para **must** have a different worker id. </td><td></td></tr>
		<tr><td>

`para.app_name`							</td><td>

`para`</td></tr>
		<tr><td>The name of the root app - the main app which is used for initializing Para. </td><td></td></tr>
		<tr><td>

`para.context_path`				</td><td>-</td></tr>
		<tr><td>Context path for the server, relative to the root `/`. By default, Para is deployed to the root context path under `/`. </td><td></td></tr>
		<tr><td>

`para.app_secret_key`				</td><td>md5('paraseckey')</td></tr>
		<tr><td>Para secret key. Set this to a long secure random string. Used for salting other secrets and tokens and for generating and verifying JWTs, remember me tokens, etc.. </td><td></td></tr>
		<tr><td>

`para.core_package_name`		</td><td>-</td></tr>
		<tr><td>The name of the Java package which contains your domain (core) classes. </td><td></td></tr>
		<tr><td>

`para.max_items_per_page`		</td><td>

`30`</td></tr>
		<tr><td>The default page size - maximum number of results that will be returned in a search query. </td><td></td></tr>
		<tr><td>

`para.max_pages`						</td><td>

`1000`</td></tr>
		<tr><td>The maximum value for the `?page` parameter, which can be specified in a search query. </td><td></td></tr>
		<tr><td>

`para.max_page_limit`						</td><td>

`256`</td></tr>
		<tr><td>The maximum value for the `?limit` request parameter, when it is set. </td><td></td></tr>
		<tr><td>

`para.max_datatypes_per_app`</td><td>

`256`</td></tr>
		<tr><td>The maximum number of custom types an app can have. </td><td></td></tr>
		<tr><td>

`para.max_entity_size_bytes`</td><td>

`1024 * 1024`</td></tr>
		<tr><td>The size of the request payload. Requests with payloads larger than this will be denied. </td><td></td></tr>
		<tr><td>

`para.min_password_length`	</td><td>

`6`</td></tr>
		<tr><td>The minimum length of passwords. </td><td></td></tr>
		<tr><td>

`para.aws_access_key`				</td><td>-</td></tr>
		<tr><td>**Deprecated.** Use credential profiles.</td><td></td></tr>
		<tr><td>

`para.aws_secret_key`				</td><td>-</td></tr>
		<tr><td>**Deprecated.** Use credential profiles.</td><td></td></tr>
		<tr><td>

`para.fb_app_id`						</td><td>-</td></tr>
		<tr><td>Facebook app id (for OAuth authentication).</td><td></td></tr>
		<tr><td>

`para.fb_secret`						</td><td>-</td></tr>
		<tr><td>Facebook app secret. </td><td></td></tr>
		<tr><td>

`para.gp_app_id`						</td><td>-</td></tr>
		<tr><td>Google+ app id (for OAuth authentication). </td><td></td></tr>
		<tr><td>

`para.gp_secret`						</td><td>-</td></tr>
		<tr><td>Google+ app secret. </td><td></td></tr>
		<tr><td>

`para.in_app_id`						</td><td>-</td></tr>
		<tr><td>LinkedIn app id (for OAuth authentication) </td><td></td></tr>
		<tr><td>

`para.in_secret`						</td><td>-</td></tr>
		<tr><td>LinkedIn app secret. </td><td></td></tr>
		<tr><td>

`para.tw_app_id`						</td><td>-</td></tr>
		<tr><td>Twitter app id (for authentication). </td><td></td></tr>
		<tr><td>

`para.tw_secret`						</td><td>-</td></tr>
		<tr><td>Twitter app secret. </td><td></td></tr>
		<tr><td>

`para.gh_app_id`						</td><td>-</td></tr>
		<tr><td>GitHub app id (for OAuth authentication). </td><td></td></tr>
		<tr><td>

`para.gh_secret`						</td><td>-</td></tr>
		<tr><td>GitHub app secret. </td><td></td></tr>
		<tr><td>

`para.ms_app_id`						</td><td>-</td></tr>
		<tr><td>Microsoft app id (for OAuth authentication). </td><td></td></tr>
		<tr><td>

`para.ms_secret`						</td><td>-</td></tr>
		<tr><td>Microsoft app secret. </td><td></td></tr>
		<tr><td>

`para.admin_ident`					</td><td>-</td></tr>
		<tr><td>This is the identifier that will be used by the first admin user. It can be the email which the admin
		user will use to login or a social id in the form of `prefix:social_id`, e.g. `fb:12345`. It is used to assign
		administrative privileges to the user with that identifier.</td><td></td></tr>
		<tr><td>

`para.print_logo`						</td><td>

`true`</td></tr>
		<tr><td>If `true`, the Para ASCII logo and version will be displayed on startup.</td><td></td></tr>
		<tr><td>

`para.auth_cookie`					</td><td>

`[app_name]-auth`</td></tr>
		<tr><td>The name of the authorization cookie. Changes depending on the app name.</td><td></td></tr>
		<tr><td>

`para.returnto_cookie`			</td><td>

`[app_name]-returnto`</td></tr>
		<tr><td>The name of the cookie used to remember which URL the user requested and will be redirected to after login. </td><td></td></tr>
		<tr><td>

`para.support_email`				</td><td>

`support@myapp.co`</td></tr>
		<tr><td>The email of the webmaster/support team. Para will send emails to this email.</td><td></td></tr>
		<tr><td>

`para.session_timeout`			</td><td>

`24 * 60 * 60` sec.</td></tr>
		<tr><td>The lifetime of the login session, in seconds. </td><td></td></tr>
		<tr><td>

`para.jwt_expires_after`		</td><td>

`7 * 24 * 60 * 60` sec.</td></tr>
		<tr><td>JWT token validity period, in seconds. </td><td></td></tr>
		<tr><td>

`para.jwt_refresh_interval`	</td><td>

`60 * 60` sec.</td></tr>
		<tr><td>JWT refresh interval, after which a new token is issued. </td><td></td></tr>
		<tr><td>

`para.request_expires_after`</td><td>

`15 * 60` sec.</td></tr>
		<tr><td>Expiration of signed API request, in seconds. </td><td></td></tr>
		<tr><td>

`para.vote_expires_after`		</td><td>

`30 * 24 * 60 * 60` sec.</td></tr>
		<tr><td>After this period has elapsed, you can vote again on the same object.</td><td></td></tr>
		<tr><td>

`para.vote_locked_after`		</td><td>

`30` sec.</td></tr>
		<tr><td>Vote locking mechanism - locks vote change after X seconds.  </td><td></td></tr>
		<tr><td>

`para.pass_reset_timeout`		</td><td>

`30 * 60` sec.</td></tr>
		<tr><td>The time window in which passwords can be reset, in seconds. After that the token in the email expires. </td><td></td></tr>
		<tr><td>

`para.api_enabled`					</td><td>

`true`</td></tr>
		<tr><td>Enable/disable the REST API. </td><td></td></tr>
		<tr><td>

`para.cache_enabled`				</td><td>

`false` || `para.env == production`</td></tr>
		<tr><td>Enable/disable object caching in Para. </td><td></td></tr>
		<tr><td>

`para.search_enabled`				</td><td>

`true`</td></tr>
		<tr><td>Enable/disable object indexing in Para. </td><td></td></tr>
		<tr><td>

`para.webhooks_enabled`					</td><td>

`false`</td></tr>
		<tr><td>Enable/disable the webhooks functionality around `Webhook` objects. </td><td></td></tr>
		<tr><td>

`para.iot_enabled`					</td><td>

`false`</td></tr>
		<tr><td>Enable/disable the IoT functionality around `Thing` objects. </td><td></td></tr>
		<tr><td>

`para.metrics_enabled`	</td><td> `true` </td></tr>
		<tr><td>Enable/disable all metrics. </td><td></td></tr>
		<tr><td>

`para.health_check_enabled`	</td><td> `true` </td></tr>
		<tr><td>Enable/disable regular health checks. </td><td></td></tr>
		<tr><td>

`para.cors_enabled`					</td><td>

`true`</td></tr>
		<tr><td>Enable/disable the CORS filter. It adds CORS headers to API responses.</td><td></td></tr>
		<tr><td>

`para.gzip_enabled`					</td><td>

`true`</td></tr>
		<tr><td>Enable/disable the GZIP filter. It compresses API responses, only.</td><td></td></tr>
		<tr><td>

`para.access_log_enabled`		</td><td>

`true`</td></tr>
		<tr><td>Enable/disable the access log file. </td><td></td></tr>
		<tr><td>

`para.read_from_index`			</td><td>

`true`</td></tr>
		<tr><td>Enable/disable reading objects from index instead of the database. This will bypass the database.
		Useful for local testing/development or to recover objects that were lost/deleted from the database. </td><td></td></tr>
		<tr><td>

`para.queue_link_enabled`		</td><td>

`false`</td></tr>
		<tr><td>Enable/disable polling the default queue for objects to be imported into Para. </td><td></td></tr>
		<tr><td>

`para.default_queue_name`		</td><td>

`para-default`</td></tr>
		<tr><td>The default queue name (optional). </td><td></td></tr>
		<tr><td>

`para.shared_table_name`		</td><td>

`0`</td></tr>
		<tr><td>The name of the table which is shared by apps with `isSharingTable` set to `true`. </td><td></td></tr>
		<tr><td>

`para.prepend_shared_appids_with_space`		</td><td>

`false`</td></tr>
		<tr><td>Enable/disable table sharing functionality by prepending the `appid` with a space. `DAO` implementations
		can detect that and switch tables based on it. </td><td></td></tr>
		<tr><td>

`para.security.api_security`				</td><td> `true` </td></tr>
		<tr><td>Enable/disable the API security mechanism. If `false`, the API endpoint will **not** check request
		signatures and all requests will go through. **For development only**.</td><td></td></tr>
		<tr><td>

`para.security.csrf_protection`			</td><td> `true` </td></tr>
		<tr><td>Enable/disable CSRF protection which checks for valid CSRF tokens in write requests. </td><td></td></tr>
		<tr><td>

`para.security.csrf_cookie`					</td><td> `para-csrf-token` </td></tr>
		<tr><td>The name of the CSRF cookie.</td><td></td></tr>
		<tr><td>

`para.security.protected.{name}`		</td><td> - </td></tr>
		<tr><td>Protects a named resource by requiring users to authenticated before accessing it.
		A protected resource has a `{name}` and value like this `["/{path}", "/{path}/**", ["{role}" or {http_method}]]`.
		The value is an array of relative paths which are matche by an ANT pattern matcher. This array can contain a subarray
		which lists all the HTTP methods that require authentication and the user roles that are allowed to access
		this particular resource. No HTTP methods means that all requests to this resource require authentication.</td><td></td></tr>
		<tr><td>

`para.security.ignored`							</td><td> `["/{path}/**", "/{path}/**"]` </td></tr>
		<tr><td>These are the resource paths that will be explicitly public and not require authentication. </td><td></td></tr>
		<tr><td>

`para.security.signin`							</td><td> `/signin` </td></tr>
		<tr><td>The path to the login page. </td><td></td></tr>
		<tr><td>

`para.security.signout`							</td><td> `/signout` </td></tr>
		<tr><td>The path to the logout page. </td><td></td></tr>
		<tr><td>

`para.security.access_denied`				</td><td> `/403` </td></tr>
		<tr><td>The path to redirect to when 403 code is returned. </td><td></td></tr>
		<tr><td>

`para.security.returnto`						</td><td> `returnto` </td></tr>
		<tr><td>The path to return to when an authentication request succeeds. </td><td></td></tr>
		<tr><td>

`para.security.signin_success`			</td><td> `/` </td></tr>
		<tr><td>The default page to send users to when they login. </td><td></td></tr>
		<tr><td>

`para.security.signout_success`			</td><td> `/signin` </td></tr>
		<tr><td>The default page to send users to when they logout.</td><td></td></tr>
		<tr><td>

`para.security.signin_failure`			</td><td> `/signin` </td></tr>
		<tr><td>The default page to send users to when login fails. </td><td></td></tr>
		<tr><td>

`para.security.allow_unverified_emails`	</td><td> `false` </td></tr>
		<tr><td>Enable/disable user email verification. When `false` user accounts are locked until
		the user checks their email and confirms it. </td><td></td></tr>
		<tr><td>

`para.security.admins_have_full_api_access`			</td><td> `true` </td></tr>
		<tr><td>If set to `false` admin users will be subject to standard resource permissions when accessing the API.
		This is applicable when `paraClient.signIn()` is used. By default, they have unlimited access. </td><td></td></tr>
		<tr><td>

`para.debug_request_signatures`										</td><td> `false` </td></tr>
		<tr><td>Prints out the request signature (AWS V4) for each request, both the incoming signature from clients
		and the one calculated by the server. </td><td></td></tr>
		<tr><td>

`para.s3.bucket`										</td><td> `org.paraio.files` </td></tr>
		<tr><td>The S3 bucket where files will be stored by `FileStore` implementations. </td><td></td></tr>
		<tr><td>

`para.s3.max_filesize_mb`						</td><td> 10 </td></tr>
		<tr><td>Max filesize for files uploaded to S3, in megabytes. </td><td></td></tr>
		<tr><td>

`para.localstorage.folder`					</td><td> - </td></tr>
		<tr><td>The local folder for file storage. </td><td></td></tr>
		<tr><td>

`para.localstorage.max_filesize_mb`	</td><td> 10 </td></tr>
		<tr><td>Max filesize for files stored locally, in megabytes. </td><td></td></tr>
		<tr><td>

`para.logs_dir`	</td><td> `.` </td></tr>
		<tr><td>The directory where Para logs will be stored. If not specified, logs are stored in the current directory. </td><td></td></tr>
		<tr><td>

`para.metrics.logging_rate`	</td><td> 60 </td></tr>
		<tr><td>The rate at which the metrics logger will write to file, in seconds. </td><td></td></tr>
		<tr><td>

`para.metrics.jmx_enabled`	</td><td> `false` </td></tr>
		<tr><td>Enable/disable JMX reporting for all metrics. </td><td></td></tr>
		<tr><td>

`para.health.check_interval`	</td><td> 60 </td></tr>
		<tr><td>Health check inverval, in seconds. </td><td></td></tr>
		<tr><td>

`para.reindex_batch_size`	</td><td> `pager.getLimit()` </td></tr>
		<tr><td>Controls the number of documents to reindex in a single batch. By default is equal to page size for
		reading the docs from DB.</td><td></td></tr>
	</tbody>
</table>

All of the above can be overridden with `System.setProperty()`.

> Para uses the excellent [Config library](https://github.com/typesafehub/config/) by TypeSafe.
> For more information about how it works, see the README for it.