---
title: Validations
category: Core classes
---

Para supports JSR-303 validation annotations and also allows you to define validation constraints in two different ways.
One way is to attach annotations to fields in Java classes. The other way is by using the constraints API to add
validation constraints to any object, be it core or user-defined. This method is more flexible as it allows you to
validate any property of any object.

The built-in constraints are: `required`, `min`, `max`, `size`, `email`,
`digits`, `pattern`, `false`, `true`, `future`, `past`, `url`.

**Note:** Objects are validated on `create()` and `update()` operations only.

### Annotation-based validation constraints

You can use any of the JSR 303 annotations specified by the `javax.validation.constraints` package, part of Java EE.
Example:

```java
@Stored @NotBlank @Email
private String email;
```

This will tell Para to validate that field and check that it actually contains an email. If the validation fails, the
object containing that field will not be created or updated.

### User-defined validation constraints

Annotations work fine for most objects but are less useful when we want to define objects through the API.
For this purpose we can use the constraints API:

```java
boolean addValidationConstraint(String type, String field, Constraint c);

boolean removeValidationConstraint(String type, String field, String constraintName);
```

To create a constraint you can use the static methods provided by the `Constraint` class. For example calling
`Constraint.email()` will return a new constraint object for checking email addresses.

We can use these methods to define constraints on custom types and fields that are not yet defined or are created by
the API.

To manually validate an object you can use:
```java
String[] errors = ValidationUtils.validateObject(App app, ParaObject po);
```
Or through `ParaClient`:

```java
// return a JSON object with all validation constraints
paraClient.validationConstraints();
```

The returned string array contains 0 elements if the `po` is valid or a list of errors that were encountered on validation.

### Integration with the client-side

You can easily implement client-side validation by getting the JSON object containing all validation constraints for
all Para classes.

```java
String jsonValidations = ValidationUtils.getAllValidationConstraints(App app);
```

This returned JSON is in the following format (note that type names are all in lowercase):

```js
'user': {
	'email': {
		'email': {
			'message': 'messages.email'
		},
		'required': {
			'message': 'messages.required'
		}
	},
	'identifier': {
		'required': {
			'message': 'messages.required'
		}
	}
	...
},
...
```

This format used by the excellent JavaScript validation tool [Valdr](https://github.com/netceteragroup/valdr) but can
easily be integrated with other client-side validators.


> Para uses [Hibernate Validator](http://hibernate.org/validator/) for data validation.
