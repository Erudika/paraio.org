---
title: Para classes
category: Core classes
---

In the package `para.core` there are a number of core domain classes that are used throughout Para.
These are common classes like `User` and `Tag` which you can use in you application directly or extend them.

Below is a list of classes and their descriptions. All of these implement `ParaObject` which is the core interface.
It contains all core fields, getters, setters and also implements basic functionality like voting, linking and tagging.

<table class="table table-striped">
	<thead>
		<tr>
			<th>class</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr><td>`User`</td><td> Defines a basic user with a name, email, password. Used for user registration and security.</td></tr>
		<tr><td>`Address`</td><td> Defines an address with optional geographical coordinates. Used for location based searching. </td></tr>
		<tr><td>`App`</td><td> Defines an application within Para. Used only when Para is running in standalone mode. </td></tr>
		<tr><td>`Tag`</td><td> Simple tag class which contains a tag and its frequency count. Basically any Para object can be tagged. Used for searching.</td></tr>
		<tr><td>`Vote`</td><td> Defines a user vote - negative or positive. Useful for modeling posts which can be voted on. </td></tr>
		<tr><td>`Translation`</td><td> Holds a translated string. Can be used for collecting translations from users. </td></tr>
		<tr><td>`Sysprop`</td><td> **System class** used as a general-purpose data container. It's basically a map. </td></tr>
		<tr><td>`Linker`</td><td> **System class** used for implementing a many-to-many relationship between objects. </td></tr>
	</tbody>
</table>