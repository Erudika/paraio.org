---
title: Standalone mode
category: Getting Started
---

There are two ways to run Para as a standalone server. The first one is by downloading the executable WAR file and executing it:

```bash
java -jar para-X.Y.Z.war
```

The WAR contains an embedded Jetty server and bundles together all the necessary libraries. This is the simplest and
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

## Deploying to a servlet container or a self-hosted environment

Another option is to deploy the WAR file to a servlet container like Tomcat or GlassFish, for example.

**Note:** We recommend deploying the Para at the root context `/`. You can do this by renaming the WAR file
to `ROOT.war` before deploying. See [the Config](#005-config) for more details about configuring your deployment.

Para can also be deployed easily to a PaaS environment like Heroku or AWS Elastic Beanstalk. The WAR file is executable
and should "just work" by setting the execution command to `java -jar para-X.Y.Z.war`.

In a self-hosted environment where you want to manage your own SSL certificates, it is recommended to run a
reverse-proxy server like NGINX in front of Para. As an alternative you can use Apache or Lighttpd.

<details><summary><b>Example configuration for NGINX</b></summary>
<pre><code>
server_tokens off;
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options nosniff;

server {
	listen 80 default_server;
	listen [::]:80 default_server;
	server_name www.domain.com domain.com;

	# Redirect all HTTP requests to HTTPS with a 301 Moved Permanently response.
	return 301 https://$host$request_uri;
}

server {
	listen 443 ssl http2;
	listen [::]:443 ssl http2;
	server_name www.domain.com domain.com;

	# certs sent to the client in SERVER HELLO are concatenated in ssl_certificate
	ssl_certificate /path/to/signed_cert_plus_intermediates;
	ssl_certificate_key /path/to/private_key;
	ssl_session_timeout 1d;
	ssl_session_cache shared:SSL:50m;
	ssl_session_tickets off;

	# modern configuration. tweak to your needs.
	ssl_protocols TLSv1.2;
	ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';
	ssl_prefer_server_ciphers on;

	# HSTS (ngx_http_headers_module is required) (15768000 seconds = 6 months)
	add_header Strict-Transport-Security max-age=15768000;

	# OCSP Stapling - fetch OCSP records from URL in ssl_certificate and cache them
	ssl_stapling on;
	ssl_stapling_verify on;

	# Verify chain of trust of OCSP response using Root CA and Intermediate certs
	ssl_trusted_certificate /path/to/root_CA_cert_plus_intermediates;

	# Cloudflare DNS
	resolver 1.1.1.1;

	# Required for LE certificate enrollment using certbot
	location '/.well-known/acme-challenge' {
		default_type "text/plain";
		root /var/www/html;
	}

	location / {
		proxy_pass http://localhost:8080;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $http_host;
	}
}
</pre></code>
</details>

<br>

> Visit the [releases page](https://github.com/erudika/para/releases) for the latest WAR package.

## Hosted service

Don't want to deal with servers and performance issues? We offer hosting and premium support at
[ParaIO.com](https://paraio.com) where you can try Para online with a **free developer account**.
Browse and manage your users and objects, do backups and edit permissions with a few clicks in the web console.
By upgrading to a premium account you will be able to scale you projects up and down in seconds and manage multiple apps.