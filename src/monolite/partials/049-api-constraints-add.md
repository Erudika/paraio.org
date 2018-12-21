---
title: Add constraint
category: REST API
path: /v1/_constraints/{type}/{field}/{cname}
type: PUT
---

Adds a new validation constraint to the list of constraints for the given field and type.

### Request

- **body** - the JSON payload of the constraint (see the table below)
- `{type}` - the object type to which the constraint applies (required)
- `{field}` - the name of the field to which the constraint applies (required)
- `{cname}` - the constraint name (required), one of the following:

 <table class="table table-striped">
	<thead>
		<tr>
			<th>Name</th>
			<th>Payload (example)</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>

`required`</td><td>none</td>
		</tr>
		<tr>
			<td>

`email`</td><td>none</td>
		</tr>
		<tr>
			<td>

`false`</td><td>none</td>
		</tr>
		<tr>
			<td>

`true`</td><td>none</td>
		</tr>
		<tr>
			<td>

`past`</td><td>none</td>
		</tr>
		<tr>
			<td>

`present`</td><td>none</td>
		</tr>
		<tr>
			<td>

`url`</td><td>none</td>
		</tr>
		<tr>
			<td>

`min`</td><td>

`{ "value": 123 }`</td>
		</tr>
		<tr>
			<td>

`max`</td><td>

`{ "value": 123 }`</td>
		</tr>
		<tr>
			<td>

`size`</td><td>

`{ "min": 123, "max": 456 }`</td>
		</tr>
		<tr>
			<td>

`digits`</td><td>

`{ "integer": 4, "fraction": 2 }`</td>
		</tr>
		<tr>
			<td>

`pattern`</td><td>

`{ "value": "^[a-zA-Z]+$" }`</td>
		</tr>
	</tbody>
</table>

### Response

Returns a JSON object containing the validation constraints for the given type.

- **status codes** - `200`, `400`

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