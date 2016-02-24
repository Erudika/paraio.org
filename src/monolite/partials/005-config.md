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

```
para.env = "embedded"
para.print_logo = true
para.security.api_security = true
para.security.csrf_protection = true
```

> **Important:** In a production environment, set `para.app_secret_key` to some randomly generated secret string.
> This is important for securing your server because this secret key is used for signing and verifying authentication tokens.

Here's a list of all configuration properties that can be set in the config file:

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>default</th>
			<th>type</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>`para.env`									</td><td>	`embedded`</td><td>String</td></tr>
		<tr><td>`para.print_logo`						</td><td>`true`</td><td>Boolean</td></tr>
		<tr><td>`para.aws_access_key`				</td><td>-</td><td>String</td></tr>
		<tr><td>`para.aws_secret_key`				</td><td>-</td><td>String</td></tr>
		<tr><td>`para.dao`									</td><td>-</td><td>String</td></tr>
		<tr><td>`para.search`								</td><td>-</td><td>String</td></tr>
		<tr><td>`para.cache`								</td><td>-</td><td>String</td></tr>
		<tr><td>`para.aws_region`						</td><td>`eu-west-1`</td><td>String</td></tr>
		<tr><td>`para.fb_app_id`						</td><td>-</td><td>String</td></tr>
		<tr><td>`para.fb_secret`						</td><td>-</td><td>String</td></tr>
		<tr><td>`para.gp_app_id`						</td><td>-</td><td>String</td></tr>
		<tr><td>`para.gp_secret`						</td><td>-</td><td>String</td></tr>
		<tr><td>`para.in_app_id`						</td><td>-</td><td>String</td></tr>
		<tr><td>`para.in_secret`						</td><td>-</td><td>String</td></tr>
		<tr><td>`para.tw_app_id`						</td><td>-</td><td>String</td></tr>
		<tr><td>`para.tw_secret`						</td><td>-</td><td>String</td></tr>
		<tr><td>`para.gh_app_id`						</td><td>-</td><td>String</td></tr>
		<tr><td>`para.gh_secret`						</td><td>-</td><td>String</td></tr>
		<tr><td>`para.openx_api_key`				</td><td>-</td><td>String</td></tr>
		<tr><td>`para.gmaps_api_key`				</td><td>-</td><td>String</td></tr>
		<tr><td>`para.admin_ident`					</td><td>-</td><td>String</td></tr>
		<tr><td>`para.worker_id`						</td><td>`1`</td><td>String</td></tr>
		<tr><td>`para.app_name`							</td><td>`para`</td><td>String</td></tr>
		<tr><td>`para.auth_cookie`					</td><td>`[app_name]-auth`</td><td>String</td></tr>
		<tr><td>`para.returnto_cookie`			</td><td>`[app_name]-returnto`</td><td>String</td></tr>
		<tr><td>`para.support_email`				</td><td>`support@myapp.co`</td><td>String</td></tr>
		<tr><td>`para.app_secret_key`				</td><td>`b18c3f7e85b5c35d81ef6efce4870709`</td><td>String</td></tr>
		<tr><td>`para.core_package_name`		</td><td>-</td><td>String</td></tr>
		<tr><td>`para.session_timeout`			</td><td>`24 * 60 * 60` sec.</td><td>Long</td></tr>
		<tr><td>`para.jwt_expires_after`		</td><td>`7 * 24 * 60 * 60` sec.</td><td>Long</td></tr>
		<tr><td>`para.jwt_refresh_interval`	</td><td>`60 * 60` sec.</td><td>Long</td></tr>
		<tr><td>`para.request_expires_after`</td><td>`15 * 60` sec.</td><td>Long</td></tr>
		<tr><td>`para.vote_expires_after`		</td><td>`30 * 24 * 60 * 60` sec.</td><td>Long</td></tr>
		<tr><td>`para.vote_locked_after`		</td><td>`30` sec.</td><td>Long</td></tr>
		<tr><td>`para.pass_reset_timeout`		</td><td>`30 * 60` sec.</td><td>Long</td></tr>
		<tr><td>`para.cache_enabled`				</td><td>`false` || `para.env == production`</td><td>Boolean</td></tr>
		<tr><td>`para.search_enabled`				</td><td>`true`</td><td>Boolean</td></tr>
		<tr><td>`para.api_enabled`					</td><td>`true`</td><td>Boolean</td></tr>
		<tr><td>`para.cors_enabled`					</td><td>`true`</td><td>Boolean</td></tr>
		<tr><td>`para.gzip_enabled`					</td><td>`true`</td><td>Boolean</td></tr>
		<tr><td>`para.access_log_enabled`		</td><td>`true`</td><td>Boolean</td></tr>
		<tr><td>`para.read_from_index`			</td><td>`true`</td><td>Boolean</td></tr>
		<tr><td>`para.max_items_per_page`		</td><td>`30`</td><td>Integer</td></tr>
		<tr><td>`para.max_datatypes_per_app`</td><td>`256`</td><td>Integer</td></tr>
		<tr><td>`para.max_pages`						</td><td>`10000`</td><td>Integer</td></tr>
		<tr><td>`para.max_img_px`						</td><td>`1024`</td><td>Integer</td></tr>
		<tr><td>`para.max_entity_size_bytes`</td><td>`1024 * 1024`</td><td>Integer</td></tr>
		<tr><td>`para.min_password_length`	</td><td>`6`</td><td>Integer</td></tr>
		<tr><td>`para.default_separator`		</td><td>`:`</td><td>String</td></tr>
		<tr><td>`para.default_encoding`			</td><td>`UTF-8`</td><td>String</td></tr>

		<tr><td>`para.security.api_security`				</td><td> `true` </td><td> Boolean </td></tr>
		<tr><td>`para.security.csrf_protection`			</td><td> `true` </td><td> Boolean </td></tr>
		<tr><td>`para.security.csrf_cookie`					</td><td> - </td><td> String </td></tr>
		<tr><td>`para.security.protected.{name}`		</td><td> `["/{path}", "/{path}/**", ["{role}"]]` </td><td> Array </td></tr>
		<tr><td>`para.security.ignored`							</td><td> `["/{path}/**", "/{path}/**"]` </td><td> Array </td></tr>
		<tr><td>`para.security.signin`							</td><td> `/signin` </td><td> String </td></tr>
		<tr><td>`para.security.signout`							</td><td> `/signout` </td><td> String </td></tr>
		<tr><td>`para.security.access_denied`				</td><td> `/403` </td><td> String </td></tr>
		<tr><td>`para.security.returnto`						</td><td> `returnto` </td><td> String </td></tr>
		<tr><td>`para.security.signin_success`			</td><td> `/` </td><td> String </td></tr>
		<tr><td>`para.security.signout_success`			</td><td> `/signin` </td><td> String </td></tr>
		<tr><td>`para.security.signin_failure`			</td><td> `/signin` </td><td> String </td></tr>
		<tr><td>`para.security.allow_unverified_emails`	</td><td> `false` </td><td> Boolean </td></tr>

		<tr><td>`para.s3.bucket`										</td><td> `org.paraio.files` </td><td> String </td></tr>
		<tr><td>`para.s3.max_filesize_mb`						</td><td> 10 </td><td> String </td></tr>
		<tr><td>`para.localstorage.folder`					</td><td> - </td><td> String </td></tr>
		<tr><td>`para.localstorage.max_filesize_mb`	</td><td> 10 </td><td> String </td></tr>

	</tbody>
</table>

All of the above can be overridden with `System.setProperty()`.

> Para uses the excellent Config library by TypeSafe. For more information about how it works
> see the [README](https://github.com/typesafehub/config/blob/master/README.md).