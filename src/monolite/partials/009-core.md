---
title: Core classes
category: Core classes
---

In the package `com.erudika.para.core` there are a number of core domain classes that are used throughout Para.
These are common classes like `User` and `App` which you can use in you application directly or extend them.
You can use them for your objects but you're always free to create your own. To do that, simply `POST` a new object
with `type: mytype` through the API and your new type will be automatically registered.

**Note:** Type definitions *cannot* contain the symbols `/` and `#`.

<table class="table table-striped">
	<thead>
		<tr>
			<th>class</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>

`User`</td><td> Defines a basic user with a name, email, password. Used for user registration and security.</td></tr>
		<tr><td>

`Address`</td><td> Defines an address with optional geographical coordinates. Used for location based searching. </td></tr>
		<tr><td>

`App`</td><td> Defines an application within Para. Usually there's only one existing (root) app.</td></tr>
		<tr><td>

`Tag`</td><td> Simple tag class which contains a tag and its frequency count. Basically any Para object can be tagged. Used for searching.</td></tr>
		<tr><td>

`Vote`</td><td> Defines a user vote - negative or positive. Useful for modeling objects which can be voted on (likes, +1s, favs, etc). </td></tr>
		<tr><td>

`Translation`</td><td> Holds a translated string. Can be used for collecting translations from users. </td></tr>
		<tr><td>

`Sysprop`</td><td> **System class** used as a general-purpose data container. It's basically a map. </td></tr>
		<tr><td>

`Linker`</td><td> **System class** used for implementing a many-to-many relationship between objects. </td></tr>
		<tr><td>

`Thing`</td><td> **System class** used for storing IoT devices' state and metadata.</td></tr>
	</tbody>
</table>

### Voting

Para implements a simple voting mechanism for objects - each object can be voted up and down an has a `votes` property.
Voting is useful for many application which require sorting by user votes. When a vote is cast, a new object of type
`Vote` is created to store the vote in the database. Users have a configurable time window to amend their vote, they can
no longer vote on that particular object.
