# .AuthApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**forgotPassword**](AuthApi.md#forgotPassword) | **POST** /auth/forgot-password | Forgot Password
[**googleCallback**](AuthApi.md#googleCallback) | **GET** /auth/google/callback | Google Callback
[**googleInitiate**](AuthApi.md#googleInitiate) | **GET** /auth/google/initiate | Google Initiate
[**googleLogin**](AuthApi.md#googleLogin) | **GET** /auth/google/login | Google Login
[**googleVerifyCode**](AuthApi.md#googleVerifyCode) | **GET** /auth/google/verify-code | Google Verify Code
[**login**](AuthApi.md#login) | **POST** /auth/login | Login
[**refreshToken**](AuthApi.md#refreshToken) | **POST** /auth/refresh-token | Refresh Token
[**registerUser**](AuthApi.md#registerUser) | **POST** /auth/signup | Register User
[**resetPassword**](AuthApi.md#resetPassword) | **POST** /auth/reset-password | Reset Password
[**verifyResetToken**](AuthApi.md#verifyResetToken) | **POST** /auth/verify-reset-token | Verify Reset Token


# **forgotPassword**
> SimpleResponse forgotPassword(authForgotPasswordRequest)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiForgotPasswordRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiForgotPasswordRequest = {
  
  authForgotPasswordRequest: {
    email: "email_example",
  },
};

const data = await apiInstance.forgotPassword(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authForgotPasswordRequest** | **AuthForgotPasswordRequest**|  |


### Return type

**SimpleResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **googleCallback**
> googleCallback()


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiGoogleCallbackRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiGoogleCallbackRequest = {
  
  code: "code_example",
  
  state: "state_example",
  
  error: "error_example",
  
  errorDescription: "error_description_example",
};

const data = await apiInstance.googleCallback(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **code** | [**string**] |  | defaults to undefined
 **state** | [**string**] |  | defaults to undefined
 **error** | [**string**] |  | (optional) defaults to undefined
 **errorDescription** | [**string**] |  | (optional) defaults to undefined


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**302** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **googleInitiate**
> AuthGoogleInitiateResponse googleInitiate()


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiGoogleInitiateRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiGoogleInitiateRequest = {
  
  redirectUri: "redirect_uri_example",
};

const data = await apiInstance.googleInitiate(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **redirectUri** | [**string**] |  | defaults to undefined


### Return type

**AuthGoogleInitiateResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **googleLogin**
> googleLogin()


### Example


```typescript
import { createConfiguration, AuthApi } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request = {};

const data = await apiInstance.googleLogin(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**302** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **googleVerifyCode**
> Token googleVerifyCode()


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiGoogleVerifyCodeRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiGoogleVerifyCodeRequest = {
  
  code: "code_example",
  
  state: "state_example",
  
  error: "error_example",
  
  errorDescription: "error_description_example",
};

const data = await apiInstance.googleVerifyCode(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **code** | [**string**] |  | defaults to undefined
 **state** | [**string**] |  | defaults to undefined
 **error** | [**string**] |  | (optional) defaults to undefined
 **errorDescription** | [**string**] |  | (optional) defaults to undefined


### Return type

**Token**

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

# **login**
> Token login()

OAuth2 compatible token login, get an access token for future requests

### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiLoginRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiLoginRequest = {
  
  username: "username_example",
  
  password: "password_example",
  
  grantType: "password",
  
  scope: "",
  
  clientId: "clientId_example",
  
  clientSecret: "clientSecret_example",
};

const data = await apiInstance.login(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | [**string**] |  | defaults to undefined
 **password** | [**string**] |  | defaults to undefined
 **grantType** | [**string**] |  | (optional) defaults to undefined
 **scope** | [**string**] |  | (optional) defaults to ''
 **clientId** | [**string**] |  | (optional) defaults to undefined
 **clientSecret** | [**string**] |  | (optional) defaults to undefined


### Return type

**Token**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **refreshToken**
> Token refreshToken(refreshToken)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiRefreshTokenRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiRefreshTokenRequest = {
  
  refreshToken: {
    accessToken: "accessToken_example",
  },
};

const data = await apiInstance.refreshToken(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **refreshToken** | **RefreshToken**|  |


### Return type

**Token**

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

# **registerUser**
> UserPublic registerUser(userRegister)

Create new user without the need to be logged in.

### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiRegisterUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiRegisterUserRequest = {
  
  userRegister: {
    username: "username_example",
    cellPhone: "cellPhone_example",
    fullName: "fullName_example",
    email: "email_example",
    password: "password_example",
  },
};

const data = await apiInstance.registerUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userRegister** | **UserRegister**|  |


### Return type

**UserPublic**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **resetPassword**
> SimpleResponse resetPassword(authResetPasswordRequest)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiResetPasswordRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiResetPasswordRequest = {
  
  authResetPasswordRequest: {
    email: "email_example",
    token: "token_example",
    newPassword: "newPassword_example",
    confirmPassword: "confirmPassword_example",
  },
};

const data = await apiInstance.resetPassword(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authResetPasswordRequest** | **AuthResetPasswordRequest**|  |


### Return type

**SimpleResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **verifyResetToken**
> SimpleResponse verifyResetToken(authVerifyResetTokenRequest)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiVerifyResetTokenRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiVerifyResetTokenRequest = {
  
  authVerifyResetTokenRequest: {
    email: "email_example",
    token: "token_example",
  },
};

const data = await apiInstance.verifyResetToken(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authVerifyResetTokenRequest** | **AuthVerifyResetTokenRequest**|  |


### Return type

**SimpleResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful Response |  -  |
**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


