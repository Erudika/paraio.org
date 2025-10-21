---
title: LDAP support
category: Security
---

Users can be authenticated through an LDAP server, including Active Directory. The implementation uses the UnboundID
SDK in combination with Spring Security. The user supplies a `uid` and `password` and Para connects to the LDAP server
and tries to bind that user. Then, upon successful login, a new `User` object is created and the user is signed in.
The user's profile data (email, name, uid) is read from the LDAP directory. It is important to note that emails are
**not** validated and are assumed valid.

Support for LDAP authentication is implemented by the `LdapAuthFilter`. The default URL for this filter is
`/ldap_auth`. The filter takes two query parameters `username` and `password` and answers to any HTTP method.
Example: `GET /ldap_auth?username=bob&password=secret`

These are the configuration options for this filter:

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>default value</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>

`para.security.ldap.server_url`</td><td>

`ldap://localhost:8389/`</td></tr>
		<tr><td>URL of the LDAP server, including scheme and port.</td></tr>
		<tr><td>

`para.security.ldap.base_dn`</td><td>

`dc=springframework,dc=org`</td></tr>
		<tr><td>The base DN, aka domain.</td></tr>
		<tr><td>

`para.security.ldap.bind_dn`</td><td>-</td></tr>
		<tr><td>The initial bind DN for a user with search privileges. The value of this property cannot contain whitespaces.
Those will automatically be escaped with `%20`. Usually this value is left blank.</td></tr>
		<tr><td>

`para.security.ldap.bind_pass`</td><td>-</td></tr>
		<tr><td>The password for a user with search privileges. Usually this value is left blank.</td></tr>
		<tr><td>

`para.security.ldap.user_search_base`</td><td>-</td></tr>
		<tr><td>Search base for user searches.</td></tr>
		<tr><td>

`para.security.ldap.user_search_filter`</td><td>

`(cn={0})`</td></tr>
		<tr><td>Search filter for user searches. This is combined with `user_search_base` to form the full DN path to a person in the directory.
A user search is performed when the person cannot be found directly using `user_dn_pattern` + `base_dn`.</td></tr>
		<tr><td>

`para.security.ldap.user_dn_pattern`</td><td>

`uid={0}`</td></tr>
		<tr><td>DN pattern for finding users directly. This is combined with `base_dn` to form the full DN path to a person in the directory.
This property can have multiple values separated by `|`, e.g. `uid={0}|cn={0}`.</td></tr>
		<tr><td>

`para.security.ldap.password_attribute`</td><td>

`userPassword`</td></tr>
		<tr><td>The password attribute in the directory</td></tr>
		<tr><td>

`para.security.ldap.displayname_attribute`</td><td>

`cn`</td></tr>
		<tr><td>Maps an LDAP property to the full name of the person. By default, the value of CN is used as the name of the Para user. Acceptable values are `cn`, `displayname`, `uid`, `username`, `sn`.</td></tr>
		<tr><td>

`para.security.ldap.username_as_name`</td><td>

`false`</td></tr>
		<tr><td>Use a person's username as their name</td></tr>
		<tr><td>

`para.security.ldap.active_directory_domain`</td><td>-</td></tr>
		<tr><td>The domain name for AD server. If blank (defaut) AD is disabled, unless `ad_mode_enabled` is `true`.</td></tr>
		<tr><td>

`para.security.ldap.ad_mode_enabled`</td><td>-</td></tr>
		<tr><td>Explicitly enables support for authenticating with Active Directory. If `true` AD is enabled.</td></tr>
		<tr><td>

`para.security.ldap.mods_group_node`</td><td>-</td></tr>
		<tr><td>Maps LDAP node like `cn=Mods` to Para user group `mods`.</td></tr>
		<tr><td>

`para.security.ldap.admins_group_node`</td><td>-</td></tr>
		<tr><td>Maps LDAP node like `cn=Admins` to Para user group `admins`.</td></tr>
		<tr><td>

`para.security.ldap.compare_passwords`</td><td>-</td></tr>
		<tr><td>If set to any value, will switch to password comparison strategy instead of default "bind" method.</td></tr>
	</tbody>
</table>

**Note:** Active Directory support is enabled when `active_directory_domain` is set. For AD LDAP, the search filter
defaults to `(&(objectClass=user)(userPrincipalName={0}))`. The syntax for this allows either `{0}`
(replaced with `username@domain`) or `{1}` (replaced with `username` only). For regular LDAP, only `{0}` is a valid
placeholder and it gets replaced with the person's username.

You can also configure LDAP through the [app settings API](#050-api-settings-put):
```
{
	"security.ldap.server_url": "ldap://localhost:8389/",
	"security.ldap.base_dn": "dc=springframework,dc=org",
	"security.ldap.user_dn_pattern": "uid={0}"
	...
	"signin_success": "http://success.url",
	"signin_failure": "http://failure.url"
}
```

You can also put all of the settings above in a configuration file, but this *only works* if your app is the
**root app** (see [the config](#005-config)).