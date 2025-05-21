# .TextToSpeechApi

All URIs are relative to *https://backend.mindfans.ai/voice-agent/test/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createTextToSpeech**](TextToSpeechApi.md#createTextToSpeech) | **POST** /text-to-speech | Create Text To Speech


# **createTextToSpeech**
> TextToSpeechResponse createTextToSpeech(textToSpeechCreate)


### Example


```typescript
import { createConfiguration, TextToSpeechApi } from '';
import type { TextToSpeechApiCreateTextToSpeechRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TextToSpeechApi(configuration);

const request: TextToSpeechApiCreateTextToSpeechRequest = {
  
  textToSpeechCreate: {
    voiceId: 1,
    text: "text_example",
    chunkLength: 200,
    format: "wav",
    seed: 1,
    useMemoryCache: "off",
    normalize: true,
    maxNewTokens: 1024,
    topP: 0.7,
    repetitionPenalty: 1.2,
    temperature: 0.7,
  },
};

const data = await apiInstance.createTextToSpeech(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **textToSpeechCreate** | **TextToSpeechCreate**|  |


### Return type

**TextToSpeechResponse**

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


