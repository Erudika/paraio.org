---
title: SAML support
category: Security
---

Para can act as a SAML service provider and connect to a specified identity provider (IDP). The implementation uses
OneLogin's SAML Java Toolkit. Here's a summary of all the steps required to authenticate users with SAML:

1. Generate a X509 certificate and private key for your SP
2. Convert the private key to PKCS#8 and Base64-encode both public and private keys
3. Specify the metadata URL for your IDP in your config file
4. Register Para with your IDP as trusted SP by copying the metadata from `/saml_metadata/{appid}`
5. Send users to `/saml_auth/{appid}` and Para will take care of the rest

The SP metadata endpoint is `/saml_metadata/{appid}` where `appid` is the app id for your Para app. For example, if your
Para endpoint is `paraio.com` and your `appid` is `scoold`, then the metadata is available at
`https://paraio.com/saml_metadata/scoold` as an XML file.

SAML authentication is initiated by sending users to the Para SAML authentication endpoint `/saml_auth/{appid}`.
For example, if your Para endpoint is `paraio.com` and your `appid` is `scoold`, then the user should be sent to
`https://paraio.com/saml_auth/scoold`. Para (the service provider) will handle the request and redirect to the SAML IDP.
Finally, upon successful authentication, the user is redirected back to `https://paraio.com/saml_auth/scoold` which is
also the assertion consumer service (ACS).

**Note:** The X509 certificate and private key must be encoded as Base64 in the configuration file. Additionally,
the private key must be in the **PKCS#8 format** (`---BEGIN PRIVATE KEY---`). To convert from PKCS#1 to PKCS#8, use this:
```
openssl pkcs8 -topk8 -inform pem -nocrypt -in sp.rsa_key -outform pem -out sp.pem
```

There are lots of configuration options but Para needs only a few of those in order to successfully
authenticate with your SAML IDP (listed in the first rows below).

<table class="table table-striped">
	<thead>
		<tr>
			<th>property</th>
			<th>default value</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>

`para.security.saml.sp.entityid`</td><td>blank</td></tr>
		<tr><td> The SP `entityId`, a URL in the form of `https://paraio.com/saml_auth/{appid}`. </td></tr>
		<tr><td>

`para.security.saml.sp.assertion_consumer_service.url`</td><td>blank</td></tr>
		<tr><td> The URL where users will be redirected back to, from the IDP. Same value as the `entityId` above.</td></tr>
		<tr><td>

`para.security.saml.sp.nameidformat`</td><td>blank</td></tr>
		<tr><td> Specifies constraints on the name identifier to be used to represent the requested subject.</td></tr>
		<tr><td>

`para.security.saml.sp.x509cert`</td><td>blank</td></tr>
		<tr><td> The X509 certificate for the SP, encoded as Base64.</td></tr>
		<tr><td>

`para.security.saml.sp.privatekey`</td><td>blank</td></tr>
		<tr><td> The private key for the X509 certificate, in PKCS#8 format, encoded as Base64.</td></tr>
		<tr><td>

`para.security.saml.idp.entityid`</td><td>blank</td></tr>
		<tr><td> The IDP `entityId`, a URL in the form of `https://idphost/idp/metadata.xml`</td></tr>
		<tr><td>

`para.security.saml.idp.single_sign_on_service.url`</td><td>blank</td></tr>
		<tr><td> SSO endpoint URL of the IdP.</td></tr>
		<tr><td>

`para.security.saml.idp.x509cert`</td><td>blank</td></tr>
		<tr><td> The x509 certificate for the IDP, encoded as Base64.</td></tr>
		<tr><td>

`para.security.saml.idp.metadata_url`</td><td>blank</td></tr>
		<tr><td> The location of IDP's metadata document. Para will fetch it and the IDP will be auto-configured.</td></tr>
		<tr><td>

`para.security.saml.security.authnrequest_signed`</td><td>false</td></tr>
		<tr><td> Enables/disables signing of auth requests to the IDP.</td></tr>
		<tr><td>

`para.security.saml.security.want_messages_signed`</td><td>false</td></tr>
		<tr><td> Enables/disables signing of messages to the IDP.</td></tr>
		<tr><td>

`para.security.saml.security.want_assertions_signed`</td><td>false</td></tr>
		<tr><td> Enables/disables the requirement for signed assertions.</td></tr>
		<tr><td>

`para.security.saml.security.want_assertions_encrypted`</td><td>false</td></tr>
		<tr><td> Enables/disables the requirement for encrypted assertions.</td></tr>
		<tr><td>

`para.security.saml.security.want_nameid_encrypted`</td><td>false</td></tr>
		<tr><td> Enables/disables the requirement for encrypted `nameId`</td></tr>
		<tr><td>

`para.security.saml.security.sign_metadata`</td><td>false</td></tr>
		<tr><td> Enables/disables signing of SP's metadata.</td></tr>
		<tr><td>

`para.security.saml.security.want_xml_validation`</td><td>true</td></tr>
		<tr><td> Enables/disables XML validation by the SP.</td></tr>
		<tr><td>

`para.security.saml.security.signature_algorithm`</td><td>blank</td></tr>
		<tr><td> Algorithm that the SP will use in the signing process.</td></tr>
		<tr><td>

`para.security.saml.attributes.id`</td><td>blank</td></tr>
		<tr><td> Mapping key for the `id` attribute.</td></tr>
		<tr><td>

`para.security.saml.attributes.picture`</td><td>blank</td></tr>
		<tr><td> Mapping key for the `picture` attribute.</td></tr>
		<tr><td>

`para.security.saml.attributes.email`</td><td>blank</td></tr>
		<tr><td> Mapping key for the `email` attribute.</td></tr>
		<tr><td>

`para.security.saml.attributes.name`</td><td>blank</td></tr>
		<tr><td> Mapping key for the `name` attribute. If this is set, the values for attributes `firstname` and `lastname` below will be ignored.</td></tr>
		<tr><td>

`para.security.saml.attributes.firstname`</td><td>blank</td></tr>
		<tr><td> Mapping key for the `firstname` attribute.</td></tr>
		<tr><td>

`para.security.saml.attributes.lastname`</td><td>blank</td></tr>
		<tr><td> Mapping key for the `lastname` attribute.</td></tr>
		<tr><td>

`para.security.saml.domain`</td><td>blank</td></tr>
		<tr><td> Domain name for users who don't have a valid email.</td></tr>
	</tbody>
</table>

As a bare minimum, you should have the following SAML configuration:

```ini
# minimal setup
# IDP metadata URL, e.g. https://idphost/idp/shibboleth
para.security.saml.idp.metadata_url = ""

# SP endpoint, e.g. https://paraio.com/saml_auth/scoold
para.security.saml.sp.entityid = ""

# SP public key as Base64(x509 certificate)
para.security.saml.sp.x509cert = ""

# SP private key as Base64(PKCS#8 key)
para.security.saml.sp.privatekey = ""

# attribute mappings (usually required)
# e.g. urn:oid:0.9.2342.19200300.100.1.1
para.security.saml.attributes.id = ""
# e.g. urn:oid:0.9.2342.19200300.100.1.3
para.security.saml.attributes.email = ""
# e.g. urn:oid:2.5.4.3
para.security.saml.attributes.name = ""
```

You want to either configure `para.security.saml.attributes.name` or `para.security.saml.attributes.firstname`, but **not both**.

You can also configure the SAML authentication filter through the [app settings API](#050-api-settings-put):
```
{
	"security.saml.sp.entityid": "https://paraio.com/saml_auth/scoold",
	"security.saml.idp.metadata_url": "https://idphost/idp/shibboleth",
	"security.saml.sp.x509cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0...",
	"security.saml.sp.privatekey": "LS0tLS1CRUdJTiBQUklWQVRF...",
	...
	"signin_success": "http://success.url",
	"signin_failure": "http://failure.url"
}
```

If you want Para to generate a JWT token upon successful authentication, add the `jwt=?` parameter to your
`signin_success` url. For example `{ "signin_success": "http://success.url?jwt=?" }`.
Para will redirect the user back to your host URL with the generated access token.

You can also put all of the settings above in a configuration file, but this *only works* if your app is the
**root app** (see [the config](#005-config)).