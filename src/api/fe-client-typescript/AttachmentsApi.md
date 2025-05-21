# .AttachmentsApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createPresignedUrls**](AttachmentsApi.md#createPresignedUrls) | **POST** /attachments/presigned-urls | Create Presigned Urls
[**deleteAttachment**](AttachmentsApi.md#deleteAttachment) | **DELETE** /attachments/{attachment_id} | Delete Attachment
[**linkAttachments**](AttachmentsApi.md#linkAttachments) | **POST** /attachments/link | Link Attachments
[**readAttachment**](AttachmentsApi.md#readAttachment) | **GET** /attachments/{attachment_id} | Read Attachment
[**readAttachments**](AttachmentsApi.md#readAttachments) | **GET** /attachments | Read Attachments
[**readAttachmentsForObject**](AttachmentsApi.md#readAttachmentsForObject) | **GET** /attachments/{related_object_type}/{related_object_id} | Read Attachments For Object
[**upload**](AttachmentsApi.md#upload) | **POST** /attachments/upload | Upload


# **createPresignedUrls**
> Array<PresignedUrlInfo> createPresignedUrls(presignedUrlCreate)


### Example


```typescript
import { createConfiguration, AttachmentsApi } from '';
import type { AttachmentsApiCreatePresignedUrlsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AttachmentsApi(configuration);

const request: AttachmentsApiCreatePresignedUrlsRequest = {
  
  presignedUrlCreate: [
    {
      filename: "filename_example",
      relatedObjectType: "relatedObjectType_example",
      relatedObjectSubtype: "relatedObjectSubtype_example",
    },
  ],
};

const data = await apiInstance.createPresignedUrls(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **presignedUrlCreate** | **Array<PresignedUrlCreate>**|  |


### Return type

**Array<PresignedUrlInfo>**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteAttachment**
> SimpleResponse deleteAttachment()


### Example


```typescript
import { createConfiguration, AttachmentsApi } from '';
import type { AttachmentsApiDeleteAttachmentRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AttachmentsApi(configuration);

const request: AttachmentsApiDeleteAttachmentRequest = {
  
  attachmentId: 1,
};

const data = await apiInstance.deleteAttachment(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **attachmentId** | [**number**] |  | defaults to undefined


### Return type

**SimpleResponse**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **linkAttachments**
> Array<AttachmentPublic> linkAttachments(attachmentLink)


### Example


```typescript
import { createConfiguration, AttachmentsApi } from '';
import type { AttachmentsApiLinkAttachmentsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AttachmentsApi(configuration);

const request: AttachmentsApiLinkAttachmentsRequest = {
  
  attachmentLink: [
    {
      id: 1,
      relatedObjectType: "relatedObjectType_example",
      relatedObjectSubtype: "relatedObjectSubtype_example",
      relatedObjectId: 1,
    },
  ],
};

const data = await apiInstance.linkAttachments(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **attachmentLink** | **Array<AttachmentLink>**|  |


### Return type

**Array<AttachmentPublic>**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readAttachment**
> AttachmentPublic readAttachment()


### Example


```typescript
import { createConfiguration, AttachmentsApi } from '';
import type { AttachmentsApiReadAttachmentRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AttachmentsApi(configuration);

const request: AttachmentsApiReadAttachmentRequest = {
  
  attachmentId: 1,
};

const data = await apiInstance.readAttachment(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **attachmentId** | [**number**] |  | defaults to undefined


### Return type

**AttachmentPublic**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readAttachments**
> PageAttachmentPublic readAttachments()


### Example


```typescript
import { createConfiguration, AttachmentsApi } from '';
import type { AttachmentsApiReadAttachmentsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AttachmentsApi(configuration);

const request: AttachmentsApiReadAttachmentsRequest = {
    // Page number (optional)
  page: 1,
    // Page size (optional)
  size: 50,
  
  relatedObjectType: "related_object_type_example",
  
  relatedObjectSubtype: "related_object_subtype_example",
  
  filenameIlike: "filename__ilike_example",
  
  orderBy: "order_by_example",
  
  search: "search_example",
};

const data = await apiInstance.readAttachments(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | [**number**] | Page number | (optional) defaults to 1
 **size** | [**number**] | Page size | (optional) defaults to 50
 **relatedObjectType** | [**string**] |  | (optional) defaults to undefined
 **relatedObjectSubtype** | [**string**] |  | (optional) defaults to undefined
 **filenameIlike** | [**string**] |  | (optional) defaults to undefined
 **orderBy** | [**string**] |  | (optional) defaults to undefined
 **search** | [**string**] |  | (optional) defaults to undefined


### Return type

**PageAttachmentPublic**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readAttachmentsForObject**
> Array<AttachmentPublic> readAttachmentsForObject()


### Example


```typescript
import { createConfiguration, AttachmentsApi } from '';
import type { AttachmentsApiReadAttachmentsForObjectRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AttachmentsApi(configuration);

const request: AttachmentsApiReadAttachmentsForObjectRequest = {
  
  relatedObjectType: "related_object_type_example",
  
  relatedObjectId: 1,
};

const data = await apiInstance.readAttachmentsForObject(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **relatedObjectType** | [**string**] |  | defaults to undefined
 **relatedObjectId** | [**number**] |  | defaults to undefined


### Return type

**Array<AttachmentPublic>**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **upload**
> AttachmentPublic upload()


### Example


```typescript
import { createConfiguration, AttachmentsApi } from '';
import type { AttachmentsApiUploadRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AttachmentsApi(configuration);

const request: AttachmentsApiUploadRequest = {
  
  filename: "filename_example",
  
  relatedObjectType: "relatedObjectType_example",
  
  relatedObjectSubtype: "relatedObjectSubtype_example",
  
  file: { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
};

const data = await apiInstance.upload(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **filename** | [**string**] |  | defaults to undefined
 **relatedObjectType** | [**string**] |  | defaults to undefined
 **relatedObjectSubtype** | [**string**] |  | defaults to undefined
 **file** | [**HttpFile**] |  | defaults to undefined


### Return type

**AttachmentPublic**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


