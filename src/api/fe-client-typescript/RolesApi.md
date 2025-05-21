# .RolesApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**readRole**](RolesApi.md#readRole) | **GET** /roles/{role_id} | Read Role
[**readRoles**](RolesApi.md#readRoles) | **GET** /roles | Read Roles


# **readRole**
> RolePublic readRole()


### Example


```typescript
import { createConfiguration, RolesApi } from '';
import type { RolesApiReadRoleRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RolesApi(configuration);

const request: RolesApiReadRoleRequest = {
  
  roleId: 1,
};

const data = await apiInstance.readRole(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **roleId** | [**number**] |  | defaults to undefined


### Return type

**RolePublic**

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

# **readRoles**
> PageRolePublic readRoles()


### Example


```typescript
import { createConfiguration, RolesApi } from '';
import type { RolesApiReadRolesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new RolesApi(configuration);

const request: RolesApiReadRolesRequest = {
    // Page number (optional)
  page: 1,
    // Page size (optional)
  size: 50,
  
  name: "name_example",
  
  nameIlike: "name__ilike_example",
  
  nameLike: "name__like_example",
  
  nameNeq: "name__neq_example",
  
  orderBy: "order_by_example",
  
  search: "search_example",
};

const data = await apiInstance.readRoles(request);
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
 **nameNeq** | [**string**] |  | (optional) defaults to undefined
 **orderBy** | [**string**] |  | (optional) defaults to undefined
 **search** | [**string**] |  | (optional) defaults to undefined


### Return type

**PageRolePublic**

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


