# .MyApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**readMyOrders**](MyApi.md#readMyOrders) | **GET** /my/orders | Read My Orders
[**readMyPlan**](MyApi.md#readMyPlan) | **GET** /my/plan | Read My Plan
[**readMyPointsLogs**](MyApi.md#readMyPointsLogs) | **GET** /my/points-logs | Read My Points Logs
[**readMyVoices**](MyApi.md#readMyVoices) | **GET** /my/voices | Read My Voices


# **readMyOrders**
> Array<OrderPublic> readMyOrders()


### Example


```typescript
import { createConfiguration, MyApi } from '';

const configuration = createConfiguration();
const apiInstance = new MyApi(configuration);

const request = {};

const data = await apiInstance.readMyOrders(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<OrderPublic>**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readMyPlan**
> MyPlan readMyPlan()


### Example


```typescript
import { createConfiguration, MyApi } from '';

const configuration = createConfiguration();
const apiInstance = new MyApi(configuration);

const request = {};

const data = await apiInstance.readMyPlan(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**MyPlan**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readMyPointsLogs**
> Array<PointsLogPublic> readMyPointsLogs()


### Example


```typescript
import { createConfiguration, MyApi } from '';

const configuration = createConfiguration();
const apiInstance = new MyApi(configuration);

const request = {};

const data = await apiInstance.readMyPointsLogs(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<PointsLogPublic>**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **readMyVoices**
> Array<VoicePublic> readMyVoices()


### Example


```typescript
import { createConfiguration, MyApi } from '';

const configuration = createConfiguration();
const apiInstance = new MyApi(configuration);

const request = {};

const data = await apiInstance.readMyVoices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<VoicePublic>**

### Authorization

[APIKeyHeader](README.md#APIKeyHeader), [OAuth2PasswordBearer](README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


