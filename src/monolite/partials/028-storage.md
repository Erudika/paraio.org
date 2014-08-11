---
title: Storage
category: Utilities
---

The `FileStore` interface allows you to have different storage services, like S3 or Google Drive, connected to
your application. You can save and load files from disk or cloud storage services easily.

```java
public interface FileStore {
	InputStream load(String path);
	String store(String path, InputStream data);
	boolean delete(String path);
}
```

### AWSFileStore

This implementation uses AWS S3 as file storage location. The location of each file is controlled by the bucket name
cofiguration property `para.s3.bucket`. There is also the `para.s3.max_filesize_mb` property which restricts the size of
the upload.

Before each upload, files are prepended a timestamp, for example `myfile.txt` becomes `1405632454930.myfile.txt`.
Currently all files are set to be stored with "Reduced Redundancy" turned on.

You can Gzip compress files before uploading uploading but you must append the `.gz` extension in order for the correct
content encoding header to be set. The extension is removed before upload.

### LocalFileStore

This implementation stores files on the local file system. The folder where files will be stored is set with the
`para.localstorage.folder` property. The maximum file size is controlled by `para.localstorage.max_filesize_mb`.