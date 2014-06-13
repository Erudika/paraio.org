---
title: Languages
category: I18n
---

Languages are maps of keys and values. A language file might contain all strings used by an application. Also you can
have the language loaded from a database.

The language map consists of language strings and each string has a short unique key. For example:

```
english.txt
-----------
yes = "Yes"
no  = "No"

italian.txt
-----------
yes = "Sì"
no  = "No"
```

The `LanguageUtils` class deals with the loading of languages and contains methods for working with locales.
You can set default languages, write languages to a database and load them.