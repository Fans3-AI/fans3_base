import { 
    UsersApi, VoicesApi, SpeechToSpeechApi, TextToSpeechApi, CompaniesApi, AttachmentsApi, 
    createConfiguration, AuthMethodsConfiguration ,CallApi
  } from "../api/fe-client-typescript";
  
  // 获取最新 token
  const getToken = () => localStorage.getItem("token") || "";
  const createApiInstance = <T>(ApiClass: new (config: any) => T): T => {
    const authConfig: AuthMethodsConfiguration = {
      OAuth2PasswordBearer: { accessToken: getToken() },
    };
    const config = createConfiguration({ authMethods: authConfig });
    return new ApiClass(config);
  };
  
  // 统一 API 客户端
  export const ApiClient = {
    get usersApi() { return createApiInstance(UsersApi); },
    get voicesApi() { return createApiInstance(VoicesApi); },
    get speechToSpeechApi() { return createApiInstance(SpeechToSpeechApi); },
    get textToSpeechApi() { return createApiInstance(TextToSpeechApi); },
    get companiesApi() { return createApiInstance(CompaniesApi); },
    get attachmentsApi() { return createApiInstance(AttachmentsApi); },
    get callApi() { return createApiInstance(CallApi); },
  };
  