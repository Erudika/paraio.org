---
title: HTML Form handling
category: REST API
path: /v1/_forms/{appid}/{formid}
type: POST
---

**This endpoint is public by default and requires no authentication.**

HTML Form handling endpoint, accepting a `multipart/form-data` request body.
Form settings are stored in a `form` object - create a form first and use the form `id` in the request.

### Request

- `appid` - the Para app identifier i.e. `myapp`.
- `formid` - `id` of an existing `form` object

Accepts only a `multipart/form-data` request body without authentication. 

Example payload:
```
POST /_forms/myapp/18359295923346 HTTP/1.1
HOST: paraio.com
Connection: Keep-Alive
Content-Type: multipart/form-data; boundary=12345

--12345
Content-Disposition: form-data; name="name"

Jane Doe
--12345
Content-Disposition: form-data; name="email"

jane@example.com
--12345
Content-Disposition: form-data; name="message"

message=Hello from the website.
--12345
Content-Disposition: form-data; name="cf-turnstile-response"

{CAPTCHA RESPONSE FROM CLIENTSIDE}
--12345
Content-Disposition: form-data; name="file" filename="filename.txt"

content of filename.txt that you upload in your form with input[type=file]
--12345
Content-Disposition: form-data; name="image" filename="picture_of_sunset.jpg"

content of picture_of_sunset.jpg ...
--12345--
```

#### Parameters

**No parameters**.

### Response

Returns a redirect code `302` with a location, specified in the field `redirectTo` of the `form` object.
If the redirect was not configured for that form, a JSON response is returned with the status code and a list of errors, if any.

**status codes**: 
- `200` message was sent to the recipients
- `302` redirect if configured
- `400` bad request - missing data
- `403` if captcha response is invalid
- `429` if rate limit was exceeded

Example response - returns the result without envelope:
```js
{
  "status": 200,
  "details": "ok"
}
```