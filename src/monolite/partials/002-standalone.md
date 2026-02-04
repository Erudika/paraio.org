---
title: Standalone mode
category: Getting Started
---

Either download the executable JAR file and run it, or build it from scratch after cloning the Para repository.
To build the "uber JAR" (fat JAR) file you need to enable it with the following Maven profiles:

```bash
mvn -Pfatjar,sql,lucene -DskipTests=true package
```

Finally, run Para server:

```bash
java -jar para-X.Y.Z.jar
```

The JAR contains an embedde server and bundles together all the necessary libraries. This is the simplest and
recommended way to run Para.

Running a standalone server allows you to build a cluster of distributed Para nodes and connect to it
through the REST API. Here's a simple diagram of this architecture:

<pre>

+-------------------------------------+
|  Your app + Para API client library |
+------------------+------------------+
                   |
+------------------+------------------+
|        REST API over HTTPS          |
+-------------------------------------+
|       Cluster Load Balancer         |
+------------------+------------------+
                   |
     +------------------ ... ----+
     |             |             |
+----+----+   +----+----+   +----+----+
| Para #1 |   | Para #2 |   | Para #N |
+---------+   +---------+   +---------+

  Node 1        Node 2   ...  Node N

</pre>

## Deploying a self-hosted environment

Para can be deployed easily to any PaaS environment like Heroku or AWS Elastic Beanstalk. The JAR file is executable
and should "just work" by setting the execution command to `java -jar para-X.Y.Z.jar`.

In a self-hosted environment where you want to manage your own SSL certificates, it is recommended to run a
reverse-proxy server like NGINX in front of Para. As an alternative you can use Apache or Lighttpd.

<details><summary><b>Example configuration for NGINX</b></summary>
<pre><code>
server_tokens off;
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options nosniff;<br>
server {
	listen 80 default_server;
	listen [::]:80 default_server;
	server_name www.domain.com domain.com;<br>
	# Redirect all HTTP requests to HTTPS with a 301 Moved Permanently response.
	return 301 https://$host$request_uri;
}<br>
server {
	listen 443 ssl http2;
	listen [::]:443 ssl http2;
	server_name www.domain.com domain.com;<br>
	# certs sent to the client in SERVER HELLO are concatenated in ssl_certificate
	ssl_certificate /path/to/signed_cert_plus_intermediates;
	ssl_certificate_key /path/to/private_key;
	ssl_session_timeout 1d;
	ssl_session_cache shared:SSL:50m;
	ssl_session_tickets off;<br>
	# modern configuration. tweak to your needs.
	ssl_protocols TLSv1.2;
	ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';
	ssl_prefer_server_ciphers on;<br>
	# HSTS (ngx_http_headers_module is required) (15768000 seconds = 6 months)
	add_header Strict-Transport-Security max-age=15768000;<br>
	# OCSP Stapling - fetch OCSP records from URL in ssl_certificate and cache them
	ssl_stapling on;
	ssl_stapling_verify on;<br>
	# Verify chain of trust of OCSP response using Root CA and Intermediate certs
	ssl_trusted_certificate /path/to/root_CA_cert_plus_intermediates;<br>
	# Cloudflare DNS
	resolver 1.1.1.1;<br>
	# Required for LE certificate enrollment using certbot
	location '/.well-known/acme-challenge' {
		default_type "text/plain";
		root /var/www/html;
	}<br>
	location / {
		proxy_pass http://localhost:8080;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto https;
		proxy_set_header Host $http_host;
	}
}
</code></pre>
</details>

As an alternative, you can enable SSL and HTTP2 directly in Para:
1. Run the script [`gencerts.sh`](https://raw.githubusercontent.com/Erudika/para/master/gencerts.sh) to generate the
required self-signed certificates
```
echo "para.local" | sudo tee -a /etc/hosts
./gencerts.sh para.local secret
```
The result of that command will be 8 files - `ParaRootCA.(crt,key,pem)`, `para.local.(crt,key,pem)` as well as a
Java Keystore file `para-keystore.p12` and a Truststore file `para-truststore.p12`.
Optionally, you can run generate the server certificates using an existing `RootCA.pem` and `RootCA.key` files like so:
```
./gencerts.sh para.local secret /path/to/ca/RootCA
```

2. Run Para using the following command which enables SSL and HTTP2:
```
java -jar -Dconfig.file=./application.conf \
 -Dserver.ssl.key-store-type=PKCS12 \
 -Dserver.ssl.key-store=para-keystore.p12 \
 -Dserver.ssl.key-store-password=secret \
 -Dserver.ssl.key-password=secret \
 -Dserver.ssl.key-alias=para \
 -Dserver.ssl.enabled=true \
 -Dserver.http2.enabled=true \
para-*.jar
```
3. Trust the root CA file `ParaRootCA.crt` by importing it in you OS keyring or browser (check Google for instructions).
4. Open `https://para.local:8000`

<br>

Para also supports mTLS (mutual authentication) for Java clients.
<details><summary>Command to enable TLS, HTTP2 and mTLS.</summary>
<pre><code>
java -jar -Dconfig.file=/para/application.conf \
 -Dserver.ssl.key-store-type=PKCS12 \
 -Dserver.ssl.key-store=para-keystore.p12 \
 -Dserver.ssl.key-store-password=secret \
 -Dserver.ssl.key-password=secret \
 -Dserver.ssl.trust-store=para-truststore.p12 \
 -Dserver.ssl.trust-store-password=secret \
 -Dserver.ssl.key-alias=para \
 -Dserver.ssl.client-auth=need \
 -Dserver.ssl.enabled=true \
 -Dserver.http2.enabled=true
para-*.jar
</code></pre>
</details>

The Para client for Java should be configured appropriately:
```
para.client.ssl_keystore = "/path/to/client-keystore.p12"
para.client.ssl_keystore_password = secret
para.client.ssl_truststore = "/path/to/client-truststore.p12"
para.client.ssl_truststore_password = secret
```

> Visit the [releases page](https://github.com/erudika/para/releases) for the latest package.

## Hosted service

Don't want to deal with servers and performance issues? We offer hosting and premium support at
[ParaIO.com](https://paraio.com) where you can try Para online with a **free developer account**.
Browse and manage your users and objects, do backups and edit permissions with a few clicks in the web console.
By upgrading to a premium account you will be able to scale you projects up and down in seconds and manage multiple apps.