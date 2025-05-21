# .VoicesApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createVoice**](VoicesApi.md#createVoice) | **POST** /voices | Create Voice
[**deleteVoice**](VoicesApi.md#deleteVoice) | **DELETE** /voices/{voice_id} | Delete Voice
[**readVoice**](VoicesApi.md#readVoice) | **GET** /voices/{voice_id} | Read Voice
[**readVoices**](VoicesApi.md#readVoices) | **GET** /voices | Read Voices
[**updateVoice**](VoicesApi.md#updateVoice) | **POST** /voices/{voice_id} | Update Voice


# **createVoice**
> VoiceActionResponse createVoice()


### Example


```typescript
import { createConfiguration, VoicesApi } from '';
import type { VoicesApiCreateVoiceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new VoicesApi(configuration);

const request: VoicesApiCreateVoiceRequest = {
  
  name: "name_example",
  
  profilePicId: 1,
  
  description: "description_example",
  
  file: { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
  
  quality: "standard",
  
  companyId: 1,
};

const data = await apiInstance.createVoice(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | [**string**] |  | defaults to undefined
 **profilePicId** | [**number**] |  | defaults to undefined
 **description** | [**string**] |  | defaults to undefined
 **file** | [**HttpFile**] |  | defaults to undefined
 **quality** | [**string**] |  | (optional) defaults to 'standard'
 **companyId** | [**number**] |  | (optional) defaults to undefined


### Return type

**VoiceActionResponse**

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

# **deleteVoice**
> SimpleResponse deleteVoice()


### Example


```typescript
import { createConfiguration, VoicesApi } from '';
import type { VoicesApiDeleteVoiceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new VoicesApi(configuration);

const request: VoicesApiDeleteVoiceRequest = {
  
  voiceId: 1,
};

const data = await apiInstance.deleteVoice(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **voiceId** | [**number**] |  | defaults to undefined


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

# **readVoice**
> VoiceDetail readVoice()


### Example


```typescript
import { createConfiguration, VoicesApi } from '';
import type { VoicesApiReadVoiceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new VoicesApi(configuration);

const request: VoicesApiReadVoiceRequest = {
  
  voiceId: 1,
};

const data = await apiInstance.readVoice(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **voiceId** | [**number**] |  | defaults to undefined


### Return type

**VoiceDetail**

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

# **readVoices**
> PageVoicePublic readVoices()


### Example


```typescript
import { createConfiguration, VoicesApi } from '';
import type { VoicesApiReadVoicesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new VoicesApi(configuration);

const request: VoicesApiReadVoicesRequest = {
    // Page number (optional)
  page: 1,
    // Page size (optional)
  size: 50,
  
  name: "name_example",
  
  nameIlike: "name__ilike_example",
  
  nameLike: "name__like_example",
  
  orderBy: "order_by_example",
  
  search: "search_example",
};

const data = await apiInstance.readVoices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | [**number**] | Page number | (optional) defaults to 1
 **size** | [**number**] | Page size | (optional) defaults to 50
 **name** | [**string**] |  | (optional) defaults to undefined
 **nameIlike** | [**string**] |  | (optional) defaults to undefined
 **nameLike** | [**string**] |  | (optional) defaults to undefined
 **orderBy** | [**string**] |  | (optional) defaults to undefined
 **search** | [**string**] |  | (optional) defaults to undefined


### Return type

**PageVoicePublic**

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

# **updateVoice**
> VoiceActionResponse updateVoice()


### Example


```typescript
import { createConfiguration, VoicesApi } from '';
import type { VoicesApiUpdateVoiceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new VoicesApi(configuration);

const request: VoicesApiUpdateVoiceRequest = {
  
  voiceId: 1,
  
  name: "name_example",
  
  profilePicId: 1,
  
  description: "description_example",
  
  file: { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
  
  quality: "standard",
  
  companyId: 1,
};

const data = await apiInstance.updateVoice(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **voiceId** | [**number**] |  | defaults to undefined
 **name** | [**string**] |  | defaults to undefined
 **profilePicId** | [**number**] |  | defaults to undefined
 **description** | [**string**] |  | defaults to undefined
 **file** | [**HttpFile**] |  | defaults to undefined
 **quality** | [**string**] |  | (optional) defaults to 'standard'
 **companyId** | [**number**] |  | (optional) defaults to undefined


### Return type

**VoiceActionResponse**

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


