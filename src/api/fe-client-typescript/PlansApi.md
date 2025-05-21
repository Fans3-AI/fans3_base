# .PlansApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**readPlans**](PlansApi.md#readPlans) | **GET** /plans | Read Plans


# **readPlans**
> Array<Plan> readPlans()


### Example


```typescript
import { createConfiguration, PlansApi } from '';

const configuration = createConfiguration();
const apiInstance = new PlansApi(configuration);

const request = {};

const data = await apiInstance.readPlans(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<Plan>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


