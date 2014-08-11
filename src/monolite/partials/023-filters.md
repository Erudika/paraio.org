---
title: Filters
category: Utilities
---

There are several filters you can use to enable different features like Gzip encoding, CORS, etc.

### CORS

The CORS filter enables cross-origin requests for the Para API. It is enabled with the configuration property
`para.cors_enabled` set to `true`. The implementation is based on the open source `CORSFilter` by Ebay.

### Gzip

The `GZipServletFilter` is enabled by `para.gzip_enabled` and provides on-the-fly Gzip encoding for static resources,
as well as, the Para API JSON responses.

### Caching

The `CachingHttpHeadersFilter` is not used by Para but you can use it to enable `Cache-Control` headers for all static
resources.
