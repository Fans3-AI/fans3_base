# .AiNodesApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**register**](AiNodesApi.md#register) | **POST** /ai-nodes/register | Register
[**unregister**](AiNodesApi.md#unregister) | **POST** /ai-nodes/unregister | Unregister


# **register**
> AINode register(aINode)


### Example


```typescript
import { createConfiguration, AiNodesApi } from '';
import type { AiNodesApiRegisterRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AiNodesApi(configuration);

const request: AiNodesApiRegisterRequest = {
  
  aINode: {
    url: "url_example",
  },
};

const data = await apiInstance.register(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **aINode** | **AINode**|  |


### Return type

**AINode**

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

# **unregister**
> AINode unregister(aINode)


### Example


```typescript
import { createConfiguration, AiNodesApi } from '';
import type { AiNodesApiUnregisterRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AiNodesApi(configuration);

const request: AiNodesApiUnregisterRequest = {
  
  aINode: {
    url: "url_example",
  },
};

const data = await apiInstance.unregister(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **aINode** | **AINode**|  |


### Return type

**AINode**

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


