# .CompaniesApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCompany**](CompaniesApi.md#createCompany) | **POST** /companies | Create Company
[**readCompanies**](CompaniesApi.md#readCompanies) | **GET** /companies | Read Companies
[**readCompany**](CompaniesApi.md#readCompany) | **GET** /companies/{company_id} | Read Company
[**readCompanyVoices**](CompaniesApi.md#readCompanyVoices) | **GET** /companies/{company_id}/voices | Read Company Voices


# **createCompany**
> CompanyPublic createCompany(companyCreate)


### Example


```typescript
import { createConfiguration, CompaniesApi } from '';
import type { CompaniesApiCreateCompanyRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CompaniesApi(configuration);

const request: CompaniesApiCreateCompanyRequest = {
  
  companyCreate: {
    name: "name_example",
    description: "description_example",
  },
};

const data = await apiInstance.createCompany(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyCreate** | **CompanyCreate**|  |


### Return type

**CompanyPublic**

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

# **readCompanies**
> PageCompanyPublic readCompanies()


### Example


```typescript
import { createConfiguration, CompaniesApi } from '';
import type { CompaniesApiReadCompaniesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CompaniesApi(configuration);

const request: CompaniesApiReadCompaniesRequest = {
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

const data = await apiInstance.readCompanies(request);
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

**PageCompanyPublic**

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

# **readCompany**
> CompanyDetail readCompany()


### Example


```typescript
import { createConfiguration, CompaniesApi } from '';
import type { CompaniesApiReadCompanyRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CompaniesApi(configuration);

const request: CompaniesApiReadCompanyRequest = {
  
  companyId: 1,
};

const data = await apiInstance.readCompany(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | [**number**] |  | defaults to undefined


### Return type

**CompanyDetail**

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

# **readCompanyVoices**
> Array<VoicePublic> readCompanyVoices()


### Example


```typescript
import { createConfiguration, CompaniesApi } from '';
import type { CompaniesApiReadCompanyVoicesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CompaniesApi(configuration);

const request: CompaniesApiReadCompanyVoicesRequest = {
  
  companyId: 1,
};

const data = await apiInstance.readCompanyVoices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **companyId** | [**number**] |  | defaults to undefined


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
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


