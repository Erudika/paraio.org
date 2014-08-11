---
title: HumanTime
category: Utilities
---

Para includes the class `HumanTime` written by [Johann Burkard](http://johannburkard.de). This class makes it
easy to convert a timestamp to an approximation in the form of "X minutes ago".

For example you can do:

```java
HumanTime ht = Utils.getHumanTime();
// prints 15 h 45 m
String s1 = ht.approximately(56720083L);

int timeOfEvent = 1399554448;
int timeNow = System.currentTimeMillis();
// calculate elapsed time
String s2 = ht.approximately(timeNow - timeOfEvent);
System.out.println("Event happened " + s2 + " time ago");
```

> For more information about HumanTime see [the docs](http://johannburkard.de/blog/programming/java/date-formatting-parsing-humans-humantime.html).