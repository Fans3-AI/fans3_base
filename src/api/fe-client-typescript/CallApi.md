# .CallApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCall**](CallApi.md#createCall) | **POST** /call | Create Call


# **createCall**
> any createCall(callCreateRequest)


### Example


```typescript
import { createConfiguration, CallApi } from '';
import type { CallApiCreateCallRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CallApi(configuration);

const request: CallApiCreateCallRequest = {
  
  callCreateRequest: {
    voiceId: 1,
    userName: "userName_example",
  },
};

const data = await apiInstance.createCall(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **callCreateRequest** | **CallCreateRequest**|  |


### Return type

**any**

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


