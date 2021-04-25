---
title: Webhooks
category: Core classes
---

Webhook were implemented in `v1.32.0`. The implementation is fully asynchronous and uses a queue for decoupling
the message publishing from the actual processing and delivery of payloads. There's a `LocalQueue` implementation which
holds messages in memory and a `LocalRiver` (worker) which periodically pulls messages from the queue and forwards them
to their destinations. The `AWSQueue` class implements webhooks processing based on AWS SQS queues and is recommended
for production use. Any other queue server can be potentially supported via a plugin which implements the `Queue`
interface.

To enable the webhooks functionality in Para, add `para.webhooks_enabled = true` in your `application.conf`.

The `Webhook` class is used for storing webhook metadata. Each `Webhook` object represents a destination which will
receive a POST request with a certain payload. The payload is determined by the type of event to which that webhook
is subscribed to. For example, a webhook might be a subscribed to all `update` events in Para, and also it might only
be interested in updated `user` objects. So we can register a new webhook like so:

```
POST /v1/webhooks
{
	"urlEncoded": true,
	"update": true,
	"targetUrl": "https://destination.url",
	"secret": "secret",
	"typeFilter":"user"
}
```

The `urlEncoded` parameter sets the `Content-Type` header for the payload. By default that's
`application/x-www-form-urlencoded`, but if `urlEncoded` is false, the content type will be `application/json`.

There are 6 event types: `update`, `create`, `delete`, `updateAll`, `createAll`, `deleteAll`. You can also register
webhooks which are subscribed to all events on all types in Para:
```
POST /v1/webhooks
{
	"active": true,
	"urlEncoded": true,
	"update": true,
	"create": true,
	"delete": true,
	"updateAll": true,
	"createAll": true,
	"deleteAll": true,
	"targetUrl": "https://destination.url",
	"secret": "secret",
	"typeFilter":"*"
}
```
If the typeFilter is either blank or `*`, all selected events will be sent to the destination, regardless of the object
type.

If the webhook's response code is not `2xx`, it is considered as failed. Webhooks with too many failed deliveries
(10 by default) will be disabled automatically. The number of maximum failed attemts can be adjusted like so:
```
para.max_failed_webhook_attempts = 15
```

Events are intercepted by the `WebhookIOListener` which listens for mutating `DAO` methods and after each method
invocation sends a message to the queue for all registered `Webhook` objects. Each message is signed with `HmacSHA256`
which is sent to the destination in a `X-Webhook-Signature` header. The signature takes the webhook secret and uses it
to sign only the `payload` JSON string (whitespace removed). The worker node (might be the same machine) then pulls
messages from the queue and sends them to their destinations using a `POST` request. Here's an example `POST` request:
```
POST /test HTTP/1.1
Host: parawebhooks.requestcatcher.com
Accept-Encoding: gzip,deflate
Connection: Keep-Alive
Content-Length: 327
Content-Type: application/json
User-Agent: Para Webhook Dispacher 1.32.0
X-Para-Event: update
X-Webhook-Signature: FFEma4/Uc5gGCs974cJNa873kzsumFgqPGVIGOEexmY=

{"appid":"scoold","event":"update","items":[{"id":"tag:acpi","timestamp":1486848081865,"type":"tag","appid":"scoold","updated":1561644547996,"name":"ParaObject tag:acpi","votes":2,"version":0,"stored":true,"indexed":true,"cached":true,"tag":"acpi","count":1,"objectURI":"/tags/acpi","plural":"tags"}],"timestamp":1561644548430}
```

The format of the message is this:
```
{
	"appid": "myapp",
	"event": "create",
	"timestamp": 1486848081865,
	"items": [{}, ...]
}
```

The receiving party should verify the signature of each payload by computing `Base64(HmacSHA256(payload, secret))`.

### Custom events

In addition to the standard `create`, `update`, `delete` events you can create webhooks which are subscribed to custom
events. For example you can have a webhook which is subscribed to events like `post.like` or `user.mention`. These events
are triggered from the code of your application using the Para API. Let's say we have a post which is liked by someone -
the code which handles the like event will notify Para that `post.like` has occured along with a custom payload, in this
case the post object and the object of the user who liked the post. Para will then dispatch that payload to the appropriate
target URLs (subscribers). Custom events allow you to create applications which follow the best practices of
[RESTHooks](https://resthooks.org/) and this makes it easy to integrate them with other applications (see Zapier).
Here's an example request which would trigger a custom event `post.like` via the API:

```
POST /v1/webhooks
{
	"triggeredEvent": "post.like",
	"customPayload": {
		"post_id": "5129509320",
		"title": "Hello world",
		"liked_by": {
			"user_id": "581703234",
			"name": "Gordon"
		}
	}
}
```
The response object returned from this request should be ignored.
