---
title: Storage
category: Utilities
---

> This functionality is not implemented yet.

The `FileStore` interface allows you to have different storage services, like S3 or Google Drive, connected to
your application. You can save and load files from disk or cloud storage services easily.

```java
public interface FileStore {
	InputStream load(String url);
	String store(InputStream data);
}
```

Currently this interface serves as an example only. There are no implementations of it yet.