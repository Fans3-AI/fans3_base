# .OrdersApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createOrder**](OrdersApi.md#createOrder) | **POST** /orders | Create Order
[**readOrder**](OrdersApi.md#readOrder) | **GET** /orders/{order_id} | Read Order
[**readOrders**](OrdersApi.md#readOrders) | **GET** /orders | Read Orders
[**stripeWebhook**](OrdersApi.md#stripeWebhook) | **POST** /orders/stripe-webhook | Stripe Webhook


# **createOrder**
> OrderCreateResponse createOrder(orderCreateRequest)


### Example


```typescript
import { createConfiguration, OrdersApi } from '';
import type { OrdersApiCreateOrderRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrdersApi(configuration);

const request: OrdersApiCreateOrderRequest = {
  
  orderCreateRequest: {
    planId: 1,
  },
};

const data = await apiInstance.createOrder(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **orderCreateRequest** | **OrderCreateRequest**|  |


### Return type

**OrderCreateResponse**

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

# **readOrder**
> OrderDetail readOrder()


### Example


```typescript
import { createConfiguration, OrdersApi } from '';
import type { OrdersApiReadOrderRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrdersApi(configuration);

const request: OrdersApiReadOrderRequest = {
  
  orderId: 1,
};

const data = await apiInstance.readOrder(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **orderId** | [**number**] |  | defaults to undefined


### Return type

**OrderDetail**

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

# **readOrders**
> PageOrderPublic readOrders()


### Example


```typescript
import { createConfiguration, OrdersApi } from '';
import type { OrdersApiReadOrdersRequest } from '';

const configuration = createConfiguration();
const apiInstance = new OrdersApi(configuration);

const request: OrdersApiReadOrdersRequest = {
    // Page number (optional)
  page: 1,
    // Page size (optional)
  size: 50,
  
  orderBy: "order_by_example",
  
  search: "search_example",
};

const data = await apiInstance.readOrders(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | [**number**] | Page number | (optional) defaults to 1
 **size** | [**number**] | Page size | (optional) defaults to 50
 **orderBy** | [**string**] |  | (optional) defaults to undefined
 **search** | [**string**] |  | (optional) defaults to undefined


### Return type

**PageOrderPublic**

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

# **stripeWebhook**
> any stripeWebhook()


### Example


```typescript
import { createConfiguration, OrdersApi } from '';

const configuration = createConfiguration();
const apiInstance = new OrdersApi(configuration);

const request = {};

const data = await apiInstance.stripeWebhook(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**any**

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


