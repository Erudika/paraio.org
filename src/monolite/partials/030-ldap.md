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

These are the configuration options for this filter:

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>`para.security.ldap.server_url`</td><td>URL of the LDAP server, including scheme and port, defaults to `ldap://localhost:8389/`. </td></tr>
		<tr><td>`para.security.ldap.ldap.base_dn`</td><td>The base DN, aka domain (default is `dc=springframework,dc=org`). </td></tr>
		<tr><td>`para.security.ldap.user_search_base`</td><td>Search base for user searches (default is blank).</td></tr>
		<tr><td>`para.security.ldap.user_search_filter`</td><td>Search filter for user searches (default is `(cn={0})`). </td></tr>
		<tr><td>`para.security.ldap.user_dn_pattern`</td><td>DN pattern for finding users directly (default is `uid={0},ou=people`). </td></tr>
		<tr><td>`para.security.ldap.password_attribute`</td><td>The password attribute in the directory (default is `userPassword`). </td></tr>
		<tr><td>`para.security.ldap.active_directory_domain`</td><td> The domain name for AD server. (default is blank, AD is disabled). </td></tr>
	</tbody>
</table>

**Note:** Active Directory support is enabled when `active_directory_domain` is set.

You can configure the URLs for authentication success and failure in the configuration file (see [the config](#005-config))