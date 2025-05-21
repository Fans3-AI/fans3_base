# .SpeechToSpeechApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSpeechToSpeech**](SpeechToSpeechApi.md#createSpeechToSpeech) | **POST** /speech-to-speech | Create Speech To Speech


# **createSpeechToSpeech**
> SpeechToSpeechResponse createSpeechToSpeech()


### Example


```typescript
import { createConfiguration, SpeechToSpeechApi } from '';
import type { SpeechToSpeechApiCreateSpeechToSpeechRequest } from '';

const configuration = createConfiguration();
const apiInstance = new SpeechToSpeechApi(configuration);

const request: SpeechToSpeechApiCreateSpeechToSpeechRequest = {
  
  voiceId: 1,
  
  file: { data: Buffer.from(fs.readFileSync('/path/to/file', 'utf-8')), name: '/path/to/file' },
  
  diffusionSteps: 30,
  
  lengthAdjust: 1.0,
  
  inferenceConfigRate: 0.7,
};

const data = await apiInstance.createSpeechToSpeech(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **voiceId** | [**number**] |  | defaults to undefined
 **file** | [**HttpFile**] |  | defaults to undefined
 **diffusionSteps** | [**number**] |  | (optional) defaults to 30
 **lengthAdjust** | [**number**] |  | (optional) defaults to 1.0
 **inferenceConfigRate** | [**number**] |  | (optional) defaults to 0.7


### Return type

**SpeechToSpeechResponse**

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


