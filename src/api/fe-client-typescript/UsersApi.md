# .UsersApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addUserVoice**](UsersApi.md#addUserVoice) | **POST** /users/{user_id}/voices | Add User Voice
[**assignUserVoices**](UsersApi.md#assignUserVoices) | **PATCH** /users/{user_id}/voices | Assign User Voices
[**createMainUser**](UsersApi.md#createMainUser) | **POST** /users/main | Create Main User
[**createSubUser**](UsersApi.md#createSubUser) | **POST** /users/sub | Create Sub User
[**deleteUser**](UsersApi.md#deleteUser) | **DELETE** /users/{user_id} | Delete User
[**readUser**](UsersApi.md#readUser) | **GET** /users/{user_id} | Read User
[**readUserMe**](UsersApi.md#readUserMe) | **GET** /users/me | Read User Me
[**readUserVoices**](UsersApi.md#readUserVoices) | **GET** /users/{user_id}/voices | Read User Voices
[**readUsers**](UsersApi.md#readUsers) | **GET** /users | Read Users
[**removeUserVoice**](UsersApi.md#removeUserVoice) | **DELETE** /users/{user_id}/voices/{voice_id} | Remove User Voice
[**updateUser**](UsersApi.md#updateUser) | **POST** /users/{user_id} | Update User
[**updateUserPassword**](UsersApi.md#updateUserPassword) | **POST** /users/{user_id}/password | Update User Password


# **addUserVoice**
> SimpleResponse addUserVoice(userVoiceAddRequest)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiAddUserVoiceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiAddUserVoiceRequest = {
  
  userId: 1,
  
  userVoiceAddRequest: {
    voiceId: 1,
  },
};

const data = await apiInstance.addUserVoice(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userVoiceAddRequest** | **UserVoiceAddRequest**|  |
 **userId** | [**number**] |  | defaults to undefined


### Return type

**SimpleResponse**

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

# **assignUserVoices**
> SimpleResponse assignUserVoices(userVoicesAssignmentRequest)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiAssignUserVoicesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiAssignUserVoicesRequest = {
  
  userId: 1,
  
  userVoicesAssignmentRequest: {
    voiceIds: [
      1,
    ],
  },
};

const data = await apiInstance.assignUserVoices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userVoicesAssignmentRequest** | **UserVoicesAssignmentRequest**|  |
 **userId** | [**number**] |  | defaults to undefined


### Return type

**SimpleResponse**

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

# **createMainUser**
> UserPublic createMainUser(userCreate)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiCreateMainUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiCreateMainUserRequest = {
  
  userCreate: {
    username: "username_example",
    cellPhone: "cellPhone_example",
    fullName: "fullName_example",
    email: "email_example",
    companyId: 1,
    password: "password_example",
  },
};

const data = await apiInstance.createMainUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userCreate** | **UserCreate**|  |


### Return type

**UserPublic**

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

# **createSubUser**
> UserPublic createSubUser(userCreate)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiCreateSubUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiCreateSubUserRequest = {
  
  userCreate: {
    username: "username_example",
    cellPhone: "cellPhone_example",
    fullName: "fullName_example",
    email: "email_example",
    companyId: 1,
    password: "password_example",
  },
};

const data = await apiInstance.createSubUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userCreate** | **UserCreate**|  |


### Return type

**UserPublic**

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

# **deleteUser**
> SimpleResponse deleteUser()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiDeleteUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiDeleteUserRequest = {
  
  userId: 1,
};

const data = await apiInstance.deleteUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**number**] |  | defaults to undefined


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

# **readUser**
> UserPublic readUser()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiReadUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiReadUserRequest = {
  
  userId: 1,
};

const data = await apiInstance.readUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**number**] |  | defaults to undefined


### Return type

**UserPublic**

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

# **readUserMe**
> UserPublic readUserMe()


### Example


```typescript
import { createConfiguration, UsersApi } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request = {};

const data = await apiInstance.readUserMe(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**UserPublic**

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

# **readUserVoices**
> Array<VoicePublic> readUserVoices()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiReadUserVoicesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiReadUserVoicesRequest = {
  
  userId: 1,
};

const data = await apiInstance.readUserVoices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**number**] |  | defaults to undefined


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

# **readUsers**
> PageUserPublic readUsers()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiReadUsersRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiReadUsersRequest = {
    // Page number (optional)
  page: 1,
    // Page size (optional)
  size: 50,
  
  username: "username_example",
  
  usernameIlike: "username__ilike_example",
  
  usernameLike: "username__like_example",
  
  usernameNeq: "username__neq_example",
  
  companyId: 1,
  
  orderBy: "order_by_example",
  
  search: "search_example",
};

const data = await apiInstance.readUsers(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | [**number**] | Page number | (optional) defaults to 1
 **size** | [**number**] | Page size | (optional) defaults to 50
 **username** | [**string**] |  | (optional) defaults to undefined
 **usernameIlike** | [**string**] |  | (optional) defaults to undefined
 **usernameLike** | [**string**] |  | (optional) defaults to undefined
 **usernameNeq** | [**string**] |  | (optional) defaults to undefined
 **companyId** | [**number**] |  | (optional) defaults to undefined
 **orderBy** | [**string**] |  | (optional) defaults to undefined
 **search** | [**string**] |  | (optional) defaults to undefined


### Return type

**PageUserPublic**

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

# **removeUserVoice**
> SimpleResponse removeUserVoice()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiRemoveUserVoiceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiRemoveUserVoiceRequest = {
  
  userId: 1,
  
  voiceId: 1,
};

const data = await apiInstance.removeUserVoice(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**number**] |  | defaults to undefined
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

# **updateUser**
> UserPublic updateUser(userUpdate)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiUpdateUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiUpdateUserRequest = {
  
  userId: 1,
  
  userUpdate: {
    companyId: 1,
    isActive: true,
    isVip: true,
  },
};

const data = await apiInstance.updateUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userUpdate** | **UserUpdate**|  |
 **userId** | [**number**] |  | defaults to undefined


### Return type

**UserPublic**

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

# **updateUserPassword**
> UserPublic updateUserPassword(userUpdatePassword)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiUpdateUserPasswordRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiUpdateUserPasswordRequest = {
  
  userId: 1,
  
  userUpdatePassword: {
    newPassword: "newPassword_example",
    confirmPassword: "confirmPassword_example",
  },
};

const data = await apiInstance.updateUserPassword(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userUpdatePassword** | **UserUpdatePassword**|  |
 **userId** | [**number**] |  | defaults to undefined


### Return type

**UserPublic**

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


