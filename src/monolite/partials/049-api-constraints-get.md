---
title: List constraints
category: REST API
path: /v1/_constraints/{type}
type: GET
---

Returns an object containing all validation constraints for all defined types in the current app.
This information can be used to power client-side validation libraries like
[valdr](https://github.com/netceteragroup/valdr).

### Request

- `{type}` - when supplied, returns only the constraints for this type (optional). If this parameter is omitted, all
constraints for all types will be returned.

### Response

Returns a JSON object with all validation constraints for a given type. The `message` field is a
key that can be used to retrieve a localized message.

- **status codes** - `200`

Example response:
```js
{
	"User" : {
		"identifier" : {
			"required" : {
				"message" : "messages.required"
			}
		},
		"groups" : {
			"required" : {
				"message" : "messages.required"
			}
		},
		"email" : {
			"required" : {
				"message" : "messages.required"
			},
			"email" : {
				"message" : "messages.email"
			}
		}
	},
	...
}
```