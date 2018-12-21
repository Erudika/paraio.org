---
title: Misc. utilities
category: Utilities
---

The `Utils` static class contains a variety of utility methods. These are summarized below:

### Hashing

<table class="table table-striped">
	<tbody>
		<tr><td>

`String MD5(String s)`</td></tr>
		<tr><td> Calculates the MD5 hash for a string. </td></tr>
		<tr><td>

`String bcrypt(String s)`</td></tr>
		<tr><td> Calclates the BCrypt hash for a string. Based on Spring Security. </td></tr>
		<tr><td>

`boolean bcryptMatches(String plain, String storedHash)`</td></tr>
		<tr><td> Validates a BCrypt hash. </td></tr>
	</tbody>
</table>

### Strings

<table class="table table-striped">
	<tbody>
		<tr><td>

`String stripHtml(String html)`</td></tr>
		<tr><td> Strips all HTML tags from a string leaving only the text. </td></tr>
		<tr><td>

`String markdownToHtml(String markdownString)`</td></tr>
		<tr><td> Convert a Markdown string to HTML. Based on [Txtmark](https://github.com/rjeschke/txtmark). Supports GFM syntax, tables, task lists, striketrough and emojis.</td></tr>
		<tr><td>

`String compileMustache(Map<String, Object> scope, String template)`</td></tr>
		<tr><td> Compile a Mustache template string to HTML. Based on [Mustache.java](https://github.com/spullara/mustache.java).</td></tr>
		<tr><td>

`String abbreviate(String str, int max)`</td></tr>
		<tr><td> Abbreviates a string to a given length. </td></tr>
		<tr><td>

`String stripAndTrim(String str)`</td></tr>
		<tr><td> Removes punctuation and symbols and normalizes whitespace. </td></tr>
		<tr><td>

`String noSpaces(String str, String replaceWith)`</td></tr>
		<tr><td> Spaces are replaced with something or removed completely. </td></tr>
		<tr><td>

`String formatMessage(String msg, Object... params)`</td></tr>
		<tr><td> Replaces placeholders like `{0}`, `{1}`, etc. with the corresponding objects (numbers, strings, booleans). </td></tr>
	</tbody>
</table>

### Numbers

<table class="table table-striped">
	<tbody>
		<tr><td>

`String formatPrice(double price)`</td></tr>
		<tr><td> Formats a price to a decimal with two fractional digits. </td></tr>
		<tr><td>

`double roundHalfUp(double d)`</td></tr>
		<tr><td> Rounds up a double using the "half up" method, scale is 2 fractional digits.</td></tr>
		<tr><td>

`double roundHalfUp(double d, int scale)`</td></tr>
		<tr><td> Rounds up a double using the "half up" method.</td></tr>
		<tr><td>

`String abbreviateInt(Number number, int decPlaces)`</td></tr>
		<tr><td> Rounds a number like "10000" to "10K", "1000000" to "1M", etc. </td></tr>
	</tbody>
</table>

### Dates

<table class="table table-striped">
	<tbody>
		<tr><td>

`String formatDate(Long timestamp, String format, Locale loc)`</td></tr>
		<tr><td> Formats a date according to a specific locale. </td></tr>
		<tr><td>

`String[] getMonths(Locale locale)`</td></tr>
		<tr><td> A list of the twelve months in the language set by the locale. </td></tr>
	</tbody>
</table>

### JSON

<table class="table table-striped">
	<tbody>
		<tr><td>

`P fromJSON(String json)`</td></tr>
		<tr><td> Converts a JSON string to a `ParaObject`. Requires the `type` property. Based on Jackson. </td></tr>
		<tr><td>

`String toJSON(P obj)`</td></tr>
		<tr><td> Converts a `ParaObject` to a JSON string. Based on Jackson. </td></tr>
	</tbody>
</table>

### Objects

<table class="table table-striped">
	<tbody>
		<tr><td>

`boolean typesMatch(ParaObject so)`</td></tr>
		<tr><td> Validates that an object's class matches its `type` property. </td></tr>
		<tr><td>

`Map<String, Object> getAnnotatedFields(P bean)`</td></tr>
		<tr><td> Returns a map of all fields marked with the `Stored` annotation for a given object. </td></tr>
		<tr><td>

`P setAnnotatedFields(Map<String, Object> data)`</td></tr>
		<tr><td> Reconstruct an object from a map of fields and their values. </td></tr>
		<tr><td>

`P toObject(String type)`</td></tr>
		<tr><td> Constructs a new instance of the given type (must be a known `ParaObject`). </td></tr>
		<tr><td>

`Class<? extends ParaObject> toClass(String type)`</td></tr>
		<tr><td> Returns the `Class` instance of a given type (must be a known `ParaObject`). </td></tr>
		<tr><td> `boolean isBasicType(Class<?> clazz)` </td></tr>
		<tr><td> Checks if a class is primitive, String or a primitive wrapper. </td></tr>
		<tr><td>

`String[] validateObject(ParaObject content)`</td></tr>
		<tr><td> Runs the Hibernate Validator against an object. Returns a list of errors or an empty array if that object is valid. </td></tr>
		<tr><td>

`String getNewId()`</td></tr>
		<tr><td> Generates a new `id`. Based on [Twitter's Snowflake](https://github.com/twitter/snowflake/) algorithm. You *must* set `para.worker_id` to be different on each node. </td></tr>
		<tr><td>

`String type(Class<? extends ParaObject> clazz)`</td></tr>
	</tbody>
</table>

### URLs

<table class="table table-striped">
	<tbody>
		<tr><td>

`boolean isValidURL(String url)`</td></tr>
		<tr><td> Validates a URL. </td></tr>
		<tr><td>

`String getHostFromURL(String url)`</td></tr>
		<tr><td> Returns the host name of a URL - "example.com" </td></tr>
		<tr><td>

`String getBaseURL(String url)`</td></tr>
		<tr><td> Returns the base URL, e.g. http://example.com </td></tr>
	</tbody>
</table>
