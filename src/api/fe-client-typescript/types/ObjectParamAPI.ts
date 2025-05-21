import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

import { AINode } from '../models/AINode';
import { AttachmentLink } from '../models/AttachmentLink';
import { AttachmentPublic } from '../models/AttachmentPublic';
import { AuthForgotPasswordRequest } from '../models/AuthForgotPasswordRequest';
import { AuthGoogleInitiateResponse } from '../models/AuthGoogleInitiateResponse';
import { AuthResetPasswordRequest } from '../models/AuthResetPasswordRequest';
import { AuthVerifyResetTokenRequest } from '../models/AuthVerifyResetTokenRequest';
import { CallCreateRequest } from '../models/CallCreateRequest';
import { CompanyCreate } from '../models/CompanyCreate';
import { CompanyDetail } from '../models/CompanyDetail';
import { CompanyPublic } from '../models/CompanyPublic';
import { HTTPValidationError } from '../models/HTTPValidationError';
import { MyPlan } from '../models/MyPlan';
import { OrderCreateRequest } from '../models/OrderCreateRequest';
import { OrderCreateResponse } from '../models/OrderCreateResponse';
import { OrderDetail } from '../models/OrderDetail';
import { OrderPublic } from '../models/OrderPublic';
import { PageAttachmentPublic } from '../models/PageAttachmentPublic';
import { PageCompanyPublic } from '../models/PageCompanyPublic';
import { PageOrderPublic } from '../models/PageOrderPublic';
import { PageRolePublic } from '../models/PageRolePublic';
import { PageUserPublic } from '../models/PageUserPublic';
import { PageVoicePublic } from '../models/PageVoicePublic';
import { Plan } from '../models/Plan';
import { PointsLogPublic } from '../models/PointsLogPublic';
import { PresignedUrlCreate } from '../models/PresignedUrlCreate';
import { PresignedUrlInfo } from '../models/PresignedUrlInfo';
import { RefreshToken } from '../models/RefreshToken';
import { RolePublic } from '../models/RolePublic';
import { SimpleResponse } from '../models/SimpleResponse';
import { SpeechToSpeechResponse } from '../models/SpeechToSpeechResponse';
import { TextToSpeechCreate } from '../models/TextToSpeechCreate';
import { TextToSpeechResponse } from '../models/TextToSpeechResponse';
import { Token } from '../models/Token';
import { UserCreate } from '../models/UserCreate';
import { UserPublic } from '../models/UserPublic';
import { UserRegister } from '../models/UserRegister';
import { UserUpdate } from '../models/UserUpdate';
import { UserUpdatePassword } from '../models/UserUpdatePassword';
import { UserVoiceAddRequest } from '../models/UserVoiceAddRequest';
import { UserVoicesAssignmentRequest } from '../models/UserVoicesAssignmentRequest';
import { ValidationError } from '../models/ValidationError';
import { ValidationErrorLocInner } from '../models/ValidationErrorLocInner';
import { VoiceActionResponse } from '../models/VoiceActionResponse';
import { VoiceDetail } from '../models/VoiceDetail';
import { VoicePublic } from '../models/VoicePublic';

import { ObservableAiNodesApi } from "./ObservableAPI";
import { AiNodesApiRequestFactory, AiNodesApiResponseProcessor} from "../apis/AiNodesApi";

export interface AiNodesApiRegisterRequest {
    /**
     * 
     * @type AINode
     * @memberof AiNodesApiregister
     */
    aINode: AINode
}

export interface AiNodesApiUnregisterRequest {
    /**
     * 
     * @type AINode
     * @memberof AiNodesApiunregister
     */
    aINode: AINode
}

export class ObjectAiNodesApi {
    private api: ObservableAiNodesApi

    public constructor(configuration: Configuration, requestFactory?: AiNodesApiRequestFactory, responseProcessor?: AiNodesApiResponseProcessor) {
        this.api = new ObservableAiNodesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Register
     * @param param the request object
     */
    public registerWithHttpInfo(param: AiNodesApiRegisterRequest, options?: ConfigurationOptions): Promise<HttpInfo<AINode>> {
        return this.api.registerWithHttpInfo(param.aINode,  options).toPromise();
    }

    /**
     * Register
     * @param param the request object
     */
    public register(param: AiNodesApiRegisterRequest, options?: ConfigurationOptions): Promise<AINode> {
        return this.api.register(param.aINode,  options).toPromise();
    }

    /**
     * Unregister
     * @param param the request object
     */
    public unregisterWithHttpInfo(param: AiNodesApiUnregisterRequest, options?: ConfigurationOptions): Promise<HttpInfo<AINode>> {
        return this.api.unregisterWithHttpInfo(param.aINode,  options).toPromise();
    }

    /**
     * Unregister
     * @param param the request object
     */
    public unregister(param: AiNodesApiUnregisterRequest, options?: ConfigurationOptions): Promise<AINode> {
        return this.api.unregister(param.aINode,  options).toPromise();
    }

}

import { ObservableAttachmentsApi } from "./ObservableAPI";
import { AttachmentsApiRequestFactory, AttachmentsApiResponseProcessor} from "../apis/AttachmentsApi";

export interface AttachmentsApiCreatePresignedUrlsRequest {
    /**
     * 
     * @type Array&lt;PresignedUrlCreate&gt;
     * @memberof AttachmentsApicreatePresignedUrls
     */
    presignedUrlCreate: Array<PresignedUrlCreate>
}

export interface AttachmentsApiDeleteAttachmentRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof AttachmentsApideleteAttachment
     */
    attachmentId: number
}

export interface AttachmentsApiLinkAttachmentsRequest {
    /**
     * 
     * @type Array&lt;AttachmentLink&gt;
     * @memberof AttachmentsApilinkAttachments
     */
    attachmentLink: Array<AttachmentLink>
}

export interface AttachmentsApiReadAttachmentRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof AttachmentsApireadAttachment
     */
    attachmentId: number
}

export interface AttachmentsApiReadAttachmentsRequest {
    /**
     * Page number
     * Minimum: 1
     * Defaults to: 1
     * @type number
     * @memberof AttachmentsApireadAttachments
     */
    page?: number
    /**
     * Page size
     * Minimum: 1
     * Maximum: 100
     * Defaults to: 50
     * @type number
     * @memberof AttachmentsApireadAttachments
     */
    size?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AttachmentsApireadAttachments
     */
    relatedObjectType?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AttachmentsApireadAttachments
     */
    relatedObjectSubtype?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AttachmentsApireadAttachments
     */
    filenameIlike?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AttachmentsApireadAttachments
     */
    orderBy?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AttachmentsApireadAttachments
     */
    search?: string
}

export interface AttachmentsApiReadAttachmentsForObjectRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AttachmentsApireadAttachmentsForObject
     */
    relatedObjectType: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof AttachmentsApireadAttachmentsForObject
     */
    relatedObjectId: number
}

export interface AttachmentsApiUploadRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AttachmentsApiupload
     */
    filename: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AttachmentsApiupload
     */
    relatedObjectType: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AttachmentsApiupload
     */
    relatedObjectSubtype: string
    /**
     * 
     * Defaults to: undefined
     * @type HttpFile
     * @memberof AttachmentsApiupload
     */
    file: HttpFile
}

export class ObjectAttachmentsApi {
    private api: ObservableAttachmentsApi

    public constructor(configuration: Configuration, requestFactory?: AttachmentsApiRequestFactory, responseProcessor?: AttachmentsApiResponseProcessor) {
        this.api = new ObservableAttachmentsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Presigned Urls
     * @param param the request object
     */
    public createPresignedUrlsWithHttpInfo(param: AttachmentsApiCreatePresignedUrlsRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<PresignedUrlInfo>>> {
        return this.api.createPresignedUrlsWithHttpInfo(param.presignedUrlCreate,  options).toPromise();
    }

    /**
     * Create Presigned Urls
     * @param param the request object
     */
    public createPresignedUrls(param: AttachmentsApiCreatePresignedUrlsRequest, options?: ConfigurationOptions): Promise<Array<PresignedUrlInfo>> {
        return this.api.createPresignedUrls(param.presignedUrlCreate,  options).toPromise();
    }

    /**
     * Delete Attachment
     * @param param the request object
     */
    public deleteAttachmentWithHttpInfo(param: AttachmentsApiDeleteAttachmentRequest, options?: ConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        return this.api.deleteAttachmentWithHttpInfo(param.attachmentId,  options).toPromise();
    }

    /**
     * Delete Attachment
     * @param param the request object
     */
    public deleteAttachment(param: AttachmentsApiDeleteAttachmentRequest, options?: ConfigurationOptions): Promise<SimpleResponse> {
        return this.api.deleteAttachment(param.attachmentId,  options).toPromise();
    }

    /**
     * Link Attachments
     * @param param the request object
     */
    public linkAttachmentsWithHttpInfo(param: AttachmentsApiLinkAttachmentsRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<AttachmentPublic>>> {
        return this.api.linkAttachmentsWithHttpInfo(param.attachmentLink,  options).toPromise();
    }

    /**
     * Link Attachments
     * @param param the request object
     */
    public linkAttachments(param: AttachmentsApiLinkAttachmentsRequest, options?: ConfigurationOptions): Promise<Array<AttachmentPublic>> {
        return this.api.linkAttachments(param.attachmentLink,  options).toPromise();
    }

    /**
     * Read Attachment
     * @param param the request object
     */
    public readAttachmentWithHttpInfo(param: AttachmentsApiReadAttachmentRequest, options?: ConfigurationOptions): Promise<HttpInfo<AttachmentPublic>> {
        return this.api.readAttachmentWithHttpInfo(param.attachmentId,  options).toPromise();
    }

    /**
     * Read Attachment
     * @param param the request object
     */
    public readAttachment(param: AttachmentsApiReadAttachmentRequest, options?: ConfigurationOptions): Promise<AttachmentPublic> {
        return this.api.readAttachment(param.attachmentId,  options).toPromise();
    }

    /**
     * Read Attachments
     * @param param the request object
     */
    public readAttachmentsWithHttpInfo(param: AttachmentsApiReadAttachmentsRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<PageAttachmentPublic>> {
        return this.api.readAttachmentsWithHttpInfo(param.page, param.size, param.relatedObjectType, param.relatedObjectSubtype, param.filenameIlike, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Read Attachments
     * @param param the request object
     */
    public readAttachments(param: AttachmentsApiReadAttachmentsRequest = {}, options?: ConfigurationOptions): Promise<PageAttachmentPublic> {
        return this.api.readAttachments(param.page, param.size, param.relatedObjectType, param.relatedObjectSubtype, param.filenameIlike, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Read Attachments For Object
     * @param param the request object
     */
    public readAttachmentsForObjectWithHttpInfo(param: AttachmentsApiReadAttachmentsForObjectRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<AttachmentPublic>>> {
        return this.api.readAttachmentsForObjectWithHttpInfo(param.relatedObjectType, param.relatedObjectId,  options).toPromise();
    }

    /**
     * Read Attachments For Object
     * @param param the request object
     */
    public readAttachmentsForObject(param: AttachmentsApiReadAttachmentsForObjectRequest, options?: ConfigurationOptions): Promise<Array<AttachmentPublic>> {
        return this.api.readAttachmentsForObject(param.relatedObjectType, param.relatedObjectId,  options).toPromise();
    }

    /**
     * Upload
     * @param param the request object
     */
    public uploadWithHttpInfo(param: AttachmentsApiUploadRequest, options?: ConfigurationOptions): Promise<HttpInfo<AttachmentPublic>> {
        return this.api.uploadWithHttpInfo(param.filename, param.relatedObjectType, param.relatedObjectSubtype, param.file,  options).toPromise();
    }

    /**
     * Upload
     * @param param the request object
     */
    public upload(param: AttachmentsApiUploadRequest, options?: ConfigurationOptions): Promise<AttachmentPublic> {
        return this.api.upload(param.filename, param.relatedObjectType, param.relatedObjectSubtype, param.file,  options).toPromise();
    }

}

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiForgotPasswordRequest {
    /**
     * 
     * @type AuthForgotPasswordRequest
     * @memberof AuthApiforgotPassword
     */
    authForgotPasswordRequest: AuthForgotPasswordRequest
}

export interface AuthApiGoogleCallbackRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApigoogleCallback
     */
    code: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApigoogleCallback
     */
    state: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApigoogleCallback
     */
    error?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApigoogleCallback
     */
    errorDescription?: string
}

export interface AuthApiGoogleInitiateRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApigoogleInitiate
     */
    redirectUri: string
}

export interface AuthApiGoogleLoginRequest {
}

export interface AuthApiGoogleVerifyCodeRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApigoogleVerifyCode
     */
    code: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApigoogleVerifyCode
     */
    state: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApigoogleVerifyCode
     */
    error?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApigoogleVerifyCode
     */
    errorDescription?: string
}

export interface AuthApiLoginRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApilogin
     */
    username: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApilogin
     */
    password: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApilogin
     */
    grantType?: string
    /**
     * 
     * Defaults to: &#39;&#39;
     * @type string
     * @memberof AuthApilogin
     */
    scope?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApilogin
     */
    clientId?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AuthApilogin
     */
    clientSecret?: string
}

export interface AuthApiRefreshTokenRequest {
    /**
     * 
     * @type RefreshToken
     * @memberof AuthApirefreshToken
     */
    refreshToken: RefreshToken
}

export interface AuthApiRegisterUserRequest {
    /**
     * 
     * @type UserRegister
     * @memberof AuthApiregisterUser
     */
    userRegister: UserRegister
}

export interface AuthApiResetPasswordRequest {
    /**
     * 
     * @type AuthResetPasswordRequest
     * @memberof AuthApiresetPassword
     */
    authResetPasswordRequest: AuthResetPasswordRequest
}

export interface AuthApiVerifyResetTokenRequest {
    /**
     * 
     * @type AuthVerifyResetTokenRequest
     * @memberof AuthApiverifyResetToken
     */
    authVerifyResetTokenRequest: AuthVerifyResetTokenRequest
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Forgot Password
     * @param param the request object
     */
    public forgotPasswordWithHttpInfo(param: AuthApiForgotPasswordRequest, options?: ConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        return this.api.forgotPasswordWithHttpInfo(param.authForgotPasswordRequest,  options).toPromise();
    }

    /**
     * Forgot Password
     * @param param the request object
     */
    public forgotPassword(param: AuthApiForgotPasswordRequest, options?: ConfigurationOptions): Promise<SimpleResponse> {
        return this.api.forgotPassword(param.authForgotPasswordRequest,  options).toPromise();
    }

    /**
     * Google Callback
     * @param param the request object
     */
    public googleCallbackWithHttpInfo(param: AuthApiGoogleCallbackRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.googleCallbackWithHttpInfo(param.code, param.state, param.error, param.errorDescription,  options).toPromise();
    }

    /**
     * Google Callback
     * @param param the request object
     */
    public googleCallback(param: AuthApiGoogleCallbackRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.googleCallback(param.code, param.state, param.error, param.errorDescription,  options).toPromise();
    }

    /**
     * Google Initiate
     * @param param the request object
     */
    public googleInitiateWithHttpInfo(param: AuthApiGoogleInitiateRequest, options?: ConfigurationOptions): Promise<HttpInfo<AuthGoogleInitiateResponse>> {
        return this.api.googleInitiateWithHttpInfo(param.redirectUri,  options).toPromise();
    }

    /**
     * Google Initiate
     * @param param the request object
     */
    public googleInitiate(param: AuthApiGoogleInitiateRequest, options?: ConfigurationOptions): Promise<AuthGoogleInitiateResponse> {
        return this.api.googleInitiate(param.redirectUri,  options).toPromise();
    }

    /**
     * Google Login
     * @param param the request object
     */
    public googleLoginWithHttpInfo(param: AuthApiGoogleLoginRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.googleLoginWithHttpInfo( options).toPromise();
    }

    /**
     * Google Login
     * @param param the request object
     */
    public googleLogin(param: AuthApiGoogleLoginRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.googleLogin( options).toPromise();
    }

    /**
     * Google Verify Code
     * @param param the request object
     */
    public googleVerifyCodeWithHttpInfo(param: AuthApiGoogleVerifyCodeRequest, options?: ConfigurationOptions): Promise<HttpInfo<Token>> {
        return this.api.googleVerifyCodeWithHttpInfo(param.code, param.state, param.error, param.errorDescription,  options).toPromise();
    }

    /**
     * Google Verify Code
     * @param param the request object
     */
    public googleVerifyCode(param: AuthApiGoogleVerifyCodeRequest, options?: ConfigurationOptions): Promise<Token> {
        return this.api.googleVerifyCode(param.code, param.state, param.error, param.errorDescription,  options).toPromise();
    }

    /**
     * OAuth2 compatible token login, get an access token for future requests
     * Login
     * @param param the request object
     */
    public loginWithHttpInfo(param: AuthApiLoginRequest, options?: ConfigurationOptions): Promise<HttpInfo<Token>> {
        return this.api.loginWithHttpInfo(param.username, param.password, param.grantType, param.scope, param.clientId, param.clientSecret,  options).toPromise();
    }

    /**
     * OAuth2 compatible token login, get an access token for future requests
     * Login
     * @param param the request object
     */
    public login(param: AuthApiLoginRequest, options?: ConfigurationOptions): Promise<Token> {
        return this.api.login(param.username, param.password, param.grantType, param.scope, param.clientId, param.clientSecret,  options).toPromise();
    }

    /**
     * Refresh Token
     * @param param the request object
     */
    public refreshTokenWithHttpInfo(param: AuthApiRefreshTokenRequest, options?: ConfigurationOptions): Promise<HttpInfo<Token>> {
        return this.api.refreshTokenWithHttpInfo(param.refreshToken,  options).toPromise();
    }

    /**
     * Refresh Token
     * @param param the request object
     */
    public refreshToken(param: AuthApiRefreshTokenRequest, options?: ConfigurationOptions): Promise<Token> {
        return this.api.refreshToken(param.refreshToken,  options).toPromise();
    }

    /**
     * Create new user without the need to be logged in.
     * Register User
     * @param param the request object
     */
    public registerUserWithHttpInfo(param: AuthApiRegisterUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        return this.api.registerUserWithHttpInfo(param.userRegister,  options).toPromise();
    }

    /**
     * Create new user without the need to be logged in.
     * Register User
     * @param param the request object
     */
    public registerUser(param: AuthApiRegisterUserRequest, options?: ConfigurationOptions): Promise<UserPublic> {
        return this.api.registerUser(param.userRegister,  options).toPromise();
    }

    /**
     * Reset Password
     * @param param the request object
     */
    public resetPasswordWithHttpInfo(param: AuthApiResetPasswordRequest, options?: ConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        return this.api.resetPasswordWithHttpInfo(param.authResetPasswordRequest,  options).toPromise();
    }

    /**
     * Reset Password
     * @param param the request object
     */
    public resetPassword(param: AuthApiResetPasswordRequest, options?: ConfigurationOptions): Promise<SimpleResponse> {
        return this.api.resetPassword(param.authResetPasswordRequest,  options).toPromise();
    }

    /**
     * Verify Reset Token
     * @param param the request object
     */
    public verifyResetTokenWithHttpInfo(param: AuthApiVerifyResetTokenRequest, options?: ConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        return this.api.verifyResetTokenWithHttpInfo(param.authVerifyResetTokenRequest,  options).toPromise();
    }

    /**
     * Verify Reset Token
     * @param param the request object
     */
    public verifyResetToken(param: AuthApiVerifyResetTokenRequest, options?: ConfigurationOptions): Promise<SimpleResponse> {
        return this.api.verifyResetToken(param.authVerifyResetTokenRequest,  options).toPromise();
    }

}

import { ObservableCallApi } from "./ObservableAPI";
import { CallApiRequestFactory, CallApiResponseProcessor} from "../apis/CallApi";

export interface CallApiCreateCallRequest {
    /**
     * 
     * @type CallCreateRequest
     * @memberof CallApicreateCall
     */
    callCreateRequest: CallCreateRequest
}

export class ObjectCallApi {
    private api: ObservableCallApi

    public constructor(configuration: Configuration, requestFactory?: CallApiRequestFactory, responseProcessor?: CallApiResponseProcessor) {
        this.api = new ObservableCallApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Call
     * @param param the request object
     */
    public createCallWithHttpInfo(param: CallApiCreateCallRequest, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.createCallWithHttpInfo(param.callCreateRequest,  options).toPromise();
    }

    /**
     * Create Call
     * @param param the request object
     */
    public createCall(param: CallApiCreateCallRequest, options?: ConfigurationOptions): Promise<any> {
        return this.api.createCall(param.callCreateRequest,  options).toPromise();
    }

}

import { ObservableCompaniesApi } from "./ObservableAPI";
import { CompaniesApiRequestFactory, CompaniesApiResponseProcessor} from "../apis/CompaniesApi";

export interface CompaniesApiCreateCompanyRequest {
    /**
     * 
     * @type CompanyCreate
     * @memberof CompaniesApicreateCompany
     */
    companyCreate: CompanyCreate
}

export interface CompaniesApiReadCompaniesRequest {
    /**
     * Page number
     * Minimum: 1
     * Defaults to: 1
     * @type number
     * @memberof CompaniesApireadCompanies
     */
    page?: number
    /**
     * Page size
     * Minimum: 1
     * Maximum: 100
     * Defaults to: 50
     * @type number
     * @memberof CompaniesApireadCompanies
     */
    size?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof CompaniesApireadCompanies
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof CompaniesApireadCompanies
     */
    nameIlike?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof CompaniesApireadCompanies
     */
    nameLike?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof CompaniesApireadCompanies
     */
    orderBy?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof CompaniesApireadCompanies
     */
    search?: string
}

export interface CompaniesApiReadCompanyRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CompaniesApireadCompany
     */
    companyId: number
}

export interface CompaniesApiReadCompanyVoicesRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CompaniesApireadCompanyVoices
     */
    companyId: number
}

export class ObjectCompaniesApi {
    private api: ObservableCompaniesApi

    public constructor(configuration: Configuration, requestFactory?: CompaniesApiRequestFactory, responseProcessor?: CompaniesApiResponseProcessor) {
        this.api = new ObservableCompaniesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Company
     * @param param the request object
     */
    public createCompanyWithHttpInfo(param: CompaniesApiCreateCompanyRequest, options?: ConfigurationOptions): Promise<HttpInfo<CompanyPublic>> {
        return this.api.createCompanyWithHttpInfo(param.companyCreate,  options).toPromise();
    }

    /**
     * Create Company
     * @param param the request object
     */
    public createCompany(param: CompaniesApiCreateCompanyRequest, options?: ConfigurationOptions): Promise<CompanyPublic> {
        return this.api.createCompany(param.companyCreate,  options).toPromise();
    }

    /**
     * Read Companies
     * @param param the request object
     */
    public readCompaniesWithHttpInfo(param: CompaniesApiReadCompaniesRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<PageCompanyPublic>> {
        return this.api.readCompaniesWithHttpInfo(param.page, param.size, param.name, param.nameIlike, param.nameLike, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Read Companies
     * @param param the request object
     */
    public readCompanies(param: CompaniesApiReadCompaniesRequest = {}, options?: ConfigurationOptions): Promise<PageCompanyPublic> {
        return this.api.readCompanies(param.page, param.size, param.name, param.nameIlike, param.nameLike, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Read Company
     * @param param the request object
     */
    public readCompanyWithHttpInfo(param: CompaniesApiReadCompanyRequest, options?: ConfigurationOptions): Promise<HttpInfo<CompanyDetail>> {
        return this.api.readCompanyWithHttpInfo(param.companyId,  options).toPromise();
    }

    /**
     * Read Company
     * @param param the request object
     */
    public readCompany(param: CompaniesApiReadCompanyRequest, options?: ConfigurationOptions): Promise<CompanyDetail> {
        return this.api.readCompany(param.companyId,  options).toPromise();
    }

    /**
     * Read Company Voices
     * @param param the request object
     */
    public readCompanyVoicesWithHttpInfo(param: CompaniesApiReadCompanyVoicesRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<VoicePublic>>> {
        return this.api.readCompanyVoicesWithHttpInfo(param.companyId,  options).toPromise();
    }

    /**
     * Read Company Voices
     * @param param the request object
     */
    public readCompanyVoices(param: CompaniesApiReadCompanyVoicesRequest, options?: ConfigurationOptions): Promise<Array<VoicePublic>> {
        return this.api.readCompanyVoices(param.companyId,  options).toPromise();
    }

}

import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiRootRequest {
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Root
     * @param param the request object
     */
    public rootWithHttpInfo(param: DefaultApiRootRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.rootWithHttpInfo( options).toPromise();
    }

    /**
     * Root
     * @param param the request object
     */
    public root(param: DefaultApiRootRequest = {}, options?: ConfigurationOptions): Promise<any> {
        return this.api.root( options).toPromise();
    }

}

import { ObservableMyApi } from "./ObservableAPI";
import { MyApiRequestFactory, MyApiResponseProcessor} from "../apis/MyApi";

export interface MyApiReadMyOrdersRequest {
}

export interface MyApiReadMyPlanRequest {
}

export interface MyApiReadMyPointsLogsRequest {
}

export interface MyApiReadMyVoicesRequest {
}

export class ObjectMyApi {
    private api: ObservableMyApi

    public constructor(configuration: Configuration, requestFactory?: MyApiRequestFactory, responseProcessor?: MyApiResponseProcessor) {
        this.api = new ObservableMyApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Read My Orders
     * @param param the request object
     */
    public readMyOrdersWithHttpInfo(param: MyApiReadMyOrdersRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<OrderPublic>>> {
        return this.api.readMyOrdersWithHttpInfo( options).toPromise();
    }

    /**
     * Read My Orders
     * @param param the request object
     */
    public readMyOrders(param: MyApiReadMyOrdersRequest = {}, options?: ConfigurationOptions): Promise<Array<OrderPublic>> {
        return this.api.readMyOrders( options).toPromise();
    }

    /**
     * Read My Plan
     * @param param the request object
     */
    public readMyPlanWithHttpInfo(param: MyApiReadMyPlanRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<MyPlan>> {
        return this.api.readMyPlanWithHttpInfo( options).toPromise();
    }

    /**
     * Read My Plan
     * @param param the request object
     */
    public readMyPlan(param: MyApiReadMyPlanRequest = {}, options?: ConfigurationOptions): Promise<MyPlan> {
        return this.api.readMyPlan( options).toPromise();
    }

    /**
     * Read My Points Logs
     * @param param the request object
     */
    public readMyPointsLogsWithHttpInfo(param: MyApiReadMyPointsLogsRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<PointsLogPublic>>> {
        return this.api.readMyPointsLogsWithHttpInfo( options).toPromise();
    }

    /**
     * Read My Points Logs
     * @param param the request object
     */
    public readMyPointsLogs(param: MyApiReadMyPointsLogsRequest = {}, options?: ConfigurationOptions): Promise<Array<PointsLogPublic>> {
        return this.api.readMyPointsLogs( options).toPromise();
    }

    /**
     * Read My Voices
     * @param param the request object
     */
    public readMyVoicesWithHttpInfo(param: MyApiReadMyVoicesRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<VoicePublic>>> {
        return this.api.readMyVoicesWithHttpInfo( options).toPromise();
    }

    /**
     * Read My Voices
     * @param param the request object
     */
    public readMyVoices(param: MyApiReadMyVoicesRequest = {}, options?: ConfigurationOptions): Promise<Array<VoicePublic>> {
        return this.api.readMyVoices( options).toPromise();
    }

}

import { ObservableOrdersApi } from "./ObservableAPI";
import { OrdersApiRequestFactory, OrdersApiResponseProcessor} from "../apis/OrdersApi";

export interface OrdersApiCreateOrderRequest {
    /**
     * 
     * @type OrderCreateRequest
     * @memberof OrdersApicreateOrder
     */
    orderCreateRequest: OrderCreateRequest
}

export interface OrdersApiReadOrderRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof OrdersApireadOrder
     */
    orderId: number
}

export interface OrdersApiReadOrdersRequest {
    /**
     * Page number
     * Minimum: 1
     * Defaults to: 1
     * @type number
     * @memberof OrdersApireadOrders
     */
    page?: number
    /**
     * Page size
     * Minimum: 1
     * Maximum: 100
     * Defaults to: 50
     * @type number
     * @memberof OrdersApireadOrders
     */
    size?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof OrdersApireadOrders
     */
    orderBy?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof OrdersApireadOrders
     */
    search?: string
}

export interface OrdersApiStripeWebhookRequest {
}

export class ObjectOrdersApi {
    private api: ObservableOrdersApi

    public constructor(configuration: Configuration, requestFactory?: OrdersApiRequestFactory, responseProcessor?: OrdersApiResponseProcessor) {
        this.api = new ObservableOrdersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Order
     * @param param the request object
     */
    public createOrderWithHttpInfo(param: OrdersApiCreateOrderRequest, options?: ConfigurationOptions): Promise<HttpInfo<OrderCreateResponse>> {
        return this.api.createOrderWithHttpInfo(param.orderCreateRequest,  options).toPromise();
    }

    /**
     * Create Order
     * @param param the request object
     */
    public createOrder(param: OrdersApiCreateOrderRequest, options?: ConfigurationOptions): Promise<OrderCreateResponse> {
        return this.api.createOrder(param.orderCreateRequest,  options).toPromise();
    }

    /**
     * Read Order
     * @param param the request object
     */
    public readOrderWithHttpInfo(param: OrdersApiReadOrderRequest, options?: ConfigurationOptions): Promise<HttpInfo<OrderDetail>> {
        return this.api.readOrderWithHttpInfo(param.orderId,  options).toPromise();
    }

    /**
     * Read Order
     * @param param the request object
     */
    public readOrder(param: OrdersApiReadOrderRequest, options?: ConfigurationOptions): Promise<OrderDetail> {
        return this.api.readOrder(param.orderId,  options).toPromise();
    }

    /**
     * Read Orders
     * @param param the request object
     */
    public readOrdersWithHttpInfo(param: OrdersApiReadOrdersRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<PageOrderPublic>> {
        return this.api.readOrdersWithHttpInfo(param.page, param.size, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Read Orders
     * @param param the request object
     */
    public readOrders(param: OrdersApiReadOrdersRequest = {}, options?: ConfigurationOptions): Promise<PageOrderPublic> {
        return this.api.readOrders(param.page, param.size, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Stripe Webhook
     * @param param the request object
     */
    public stripeWebhookWithHttpInfo(param: OrdersApiStripeWebhookRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.stripeWebhookWithHttpInfo( options).toPromise();
    }

    /**
     * Stripe Webhook
     * @param param the request object
     */
    public stripeWebhook(param: OrdersApiStripeWebhookRequest = {}, options?: ConfigurationOptions): Promise<any> {
        return this.api.stripeWebhook( options).toPromise();
    }

}

import { ObservablePlansApi } from "./ObservableAPI";
import { PlansApiRequestFactory, PlansApiResponseProcessor} from "../apis/PlansApi";

export interface PlansApiReadPlansRequest {
}

export class ObjectPlansApi {
    private api: ObservablePlansApi

    public constructor(configuration: Configuration, requestFactory?: PlansApiRequestFactory, responseProcessor?: PlansApiResponseProcessor) {
        this.api = new ObservablePlansApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Read Plans
     * @param param the request object
     */
    public readPlansWithHttpInfo(param: PlansApiReadPlansRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<Plan>>> {
        return this.api.readPlansWithHttpInfo( options).toPromise();
    }

    /**
     * Read Plans
     * @param param the request object
     */
    public readPlans(param: PlansApiReadPlansRequest = {}, options?: ConfigurationOptions): Promise<Array<Plan>> {
        return this.api.readPlans( options).toPromise();
    }

}

import { ObservableRolesApi } from "./ObservableAPI";
import { RolesApiRequestFactory, RolesApiResponseProcessor} from "../apis/RolesApi";

export interface RolesApiReadRoleRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof RolesApireadRole
     */
    roleId: number
}

export interface RolesApiReadRolesRequest {
    /**
     * Page number
     * Minimum: 1
     * Defaults to: 1
     * @type number
     * @memberof RolesApireadRoles
     */
    page?: number
    /**
     * Page size
     * Minimum: 1
     * Maximum: 100
     * Defaults to: 50
     * @type number
     * @memberof RolesApireadRoles
     */
    size?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof RolesApireadRoles
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof RolesApireadRoles
     */
    nameIlike?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof RolesApireadRoles
     */
    nameLike?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof RolesApireadRoles
     */
    nameNeq?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof RolesApireadRoles
     */
    orderBy?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof RolesApireadRoles
     */
    search?: string
}

export class ObjectRolesApi {
    private api: ObservableRolesApi

    public constructor(configuration: Configuration, requestFactory?: RolesApiRequestFactory, responseProcessor?: RolesApiResponseProcessor) {
        this.api = new ObservableRolesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Read Role
     * @param param the request object
     */
    public readRoleWithHttpInfo(param: RolesApiReadRoleRequest, options?: ConfigurationOptions): Promise<HttpInfo<RolePublic>> {
        return this.api.readRoleWithHttpInfo(param.roleId,  options).toPromise();
    }

    /**
     * Read Role
     * @param param the request object
     */
    public readRole(param: RolesApiReadRoleRequest, options?: ConfigurationOptions): Promise<RolePublic> {
        return this.api.readRole(param.roleId,  options).toPromise();
    }

    /**
     * Read Roles
     * @param param the request object
     */
    public readRolesWithHttpInfo(param: RolesApiReadRolesRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<PageRolePublic>> {
        return this.api.readRolesWithHttpInfo(param.page, param.size, param.name, param.nameIlike, param.nameLike, param.nameNeq, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Read Roles
     * @param param the request object
     */
    public readRoles(param: RolesApiReadRolesRequest = {}, options?: ConfigurationOptions): Promise<PageRolePublic> {
        return this.api.readRoles(param.page, param.size, param.name, param.nameIlike, param.nameLike, param.nameNeq, param.orderBy, param.search,  options).toPromise();
    }

}

import { ObservableSpeechToSpeechApi } from "./ObservableAPI";
import { SpeechToSpeechApiRequestFactory, SpeechToSpeechApiResponseProcessor} from "../apis/SpeechToSpeechApi";

export interface SpeechToSpeechApiCreateSpeechToSpeechRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof SpeechToSpeechApicreateSpeechToSpeech
     */
    voiceId: number
    /**
     * 
     * Defaults to: undefined
     * @type HttpFile
     * @memberof SpeechToSpeechApicreateSpeechToSpeech
     */
    file: HttpFile
    /**
     * 
     * Defaults to: 30
     * @type number
     * @memberof SpeechToSpeechApicreateSpeechToSpeech
     */
    diffusionSteps?: number
    /**
     * 
     * Defaults to: 1.0
     * @type number
     * @memberof SpeechToSpeechApicreateSpeechToSpeech
     */
    lengthAdjust?: number
    /**
     * 
     * Defaults to: 0.7
     * @type number
     * @memberof SpeechToSpeechApicreateSpeechToSpeech
     */
    inferenceConfigRate?: number
}

export class ObjectSpeechToSpeechApi {
    private api: ObservableSpeechToSpeechApi

    public constructor(configuration: Configuration, requestFactory?: SpeechToSpeechApiRequestFactory, responseProcessor?: SpeechToSpeechApiResponseProcessor) {
        this.api = new ObservableSpeechToSpeechApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Speech To Speech
     * @param param the request object
     */
    public createSpeechToSpeechWithHttpInfo(param: SpeechToSpeechApiCreateSpeechToSpeechRequest, options?: ConfigurationOptions): Promise<HttpInfo<SpeechToSpeechResponse>> {
        return this.api.createSpeechToSpeechWithHttpInfo(param.voiceId, param.file, param.diffusionSteps, param.lengthAdjust, param.inferenceConfigRate,  options).toPromise();
    }

    /**
     * Create Speech To Speech
     * @param param the request object
     */
    public createSpeechToSpeech(param: SpeechToSpeechApiCreateSpeechToSpeechRequest, options?: ConfigurationOptions): Promise<SpeechToSpeechResponse> {
        return this.api.createSpeechToSpeech(param.voiceId, param.file, param.diffusionSteps, param.lengthAdjust, param.inferenceConfigRate,  options).toPromise();
    }

}

import { ObservableTextToSpeechApi } from "./ObservableAPI";
import { TextToSpeechApiRequestFactory, TextToSpeechApiResponseProcessor} from "../apis/TextToSpeechApi";

export interface TextToSpeechApiCreateTextToSpeechRequest {
    /**
     * 
     * @type TextToSpeechCreate
     * @memberof TextToSpeechApicreateTextToSpeech
     */
    textToSpeechCreate: TextToSpeechCreate
}

export class ObjectTextToSpeechApi {
    private api: ObservableTextToSpeechApi

    public constructor(configuration: Configuration, requestFactory?: TextToSpeechApiRequestFactory, responseProcessor?: TextToSpeechApiResponseProcessor) {
        this.api = new ObservableTextToSpeechApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Text To Speech
     * @param param the request object
     */
    public createTextToSpeechWithHttpInfo(param: TextToSpeechApiCreateTextToSpeechRequest, options?: ConfigurationOptions): Promise<HttpInfo<TextToSpeechResponse>> {
        return this.api.createTextToSpeechWithHttpInfo(param.textToSpeechCreate,  options).toPromise();
    }

    /**
     * Create Text To Speech
     * @param param the request object
     */
    public createTextToSpeech(param: TextToSpeechApiCreateTextToSpeechRequest, options?: ConfigurationOptions): Promise<TextToSpeechResponse> {
        return this.api.createTextToSpeech(param.textToSpeechCreate,  options).toPromise();
    }

}

import { ObservableUsersApi } from "./ObservableAPI";
import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";

export interface UsersApiAddUserVoiceRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiaddUserVoice
     */
    userId: number
    /**
     * 
     * @type UserVoiceAddRequest
     * @memberof UsersApiaddUserVoice
     */
    userVoiceAddRequest: UserVoiceAddRequest
}

export interface UsersApiAssignUserVoicesRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiassignUserVoices
     */
    userId: number
    /**
     * 
     * @type UserVoicesAssignmentRequest
     * @memberof UsersApiassignUserVoices
     */
    userVoicesAssignmentRequest: UserVoicesAssignmentRequest
}

export interface UsersApiCreateMainUserRequest {
    /**
     * 
     * @type UserCreate
     * @memberof UsersApicreateMainUser
     */
    userCreate: UserCreate
}

export interface UsersApiCreateSubUserRequest {
    /**
     * 
     * @type UserCreate
     * @memberof UsersApicreateSubUser
     */
    userCreate: UserCreate
}

export interface UsersApiDeleteUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApideleteUser
     */
    userId: number
}

export interface UsersApiReadUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApireadUser
     */
    userId: number
}

export interface UsersApiReadUserMeRequest {
}

export interface UsersApiReadUserVoicesRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApireadUserVoices
     */
    userId: number
}

export interface UsersApiReadUsersRequest {
    /**
     * Page number
     * Minimum: 1
     * Defaults to: 1
     * @type number
     * @memberof UsersApireadUsers
     */
    page?: number
    /**
     * Page size
     * Minimum: 1
     * Maximum: 100
     * Defaults to: 50
     * @type number
     * @memberof UsersApireadUsers
     */
    size?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApireadUsers
     */
    username?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApireadUsers
     */
    usernameIlike?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApireadUsers
     */
    usernameLike?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApireadUsers
     */
    usernameNeq?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApireadUsers
     */
    companyId?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApireadUsers
     */
    orderBy?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof UsersApireadUsers
     */
    search?: string
}

export interface UsersApiRemoveUserVoiceRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiremoveUserVoice
     */
    userId: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiremoveUserVoice
     */
    voiceId: number
}

export interface UsersApiUpdateUserRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiupdateUser
     */
    userId: number
    /**
     * 
     * @type UserUpdate
     * @memberof UsersApiupdateUser
     */
    userUpdate: UserUpdate
}

export interface UsersApiUpdateUserPasswordRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiupdateUserPassword
     */
    userId: number
    /**
     * 
     * @type UserUpdatePassword
     * @memberof UsersApiupdateUserPassword
     */
    userUpdatePassword: UserUpdatePassword
}

export class ObjectUsersApi {
    private api: ObservableUsersApi

    public constructor(configuration: Configuration, requestFactory?: UsersApiRequestFactory, responseProcessor?: UsersApiResponseProcessor) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add User Voice
     * @param param the request object
     */
    public addUserVoiceWithHttpInfo(param: UsersApiAddUserVoiceRequest, options?: ConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        return this.api.addUserVoiceWithHttpInfo(param.userId, param.userVoiceAddRequest,  options).toPromise();
    }

    /**
     * Add User Voice
     * @param param the request object
     */
    public addUserVoice(param: UsersApiAddUserVoiceRequest, options?: ConfigurationOptions): Promise<SimpleResponse> {
        return this.api.addUserVoice(param.userId, param.userVoiceAddRequest,  options).toPromise();
    }

    /**
     * Assign User Voices
     * @param param the request object
     */
    public assignUserVoicesWithHttpInfo(param: UsersApiAssignUserVoicesRequest, options?: ConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        return this.api.assignUserVoicesWithHttpInfo(param.userId, param.userVoicesAssignmentRequest,  options).toPromise();
    }

    /**
     * Assign User Voices
     * @param param the request object
     */
    public assignUserVoices(param: UsersApiAssignUserVoicesRequest, options?: ConfigurationOptions): Promise<SimpleResponse> {
        return this.api.assignUserVoices(param.userId, param.userVoicesAssignmentRequest,  options).toPromise();
    }

    /**
     * Create Main User
     * @param param the request object
     */
    public createMainUserWithHttpInfo(param: UsersApiCreateMainUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        return this.api.createMainUserWithHttpInfo(param.userCreate,  options).toPromise();
    }

    /**
     * Create Main User
     * @param param the request object
     */
    public createMainUser(param: UsersApiCreateMainUserRequest, options?: ConfigurationOptions): Promise<UserPublic> {
        return this.api.createMainUser(param.userCreate,  options).toPromise();
    }

    /**
     * Create Sub User
     * @param param the request object
     */
    public createSubUserWithHttpInfo(param: UsersApiCreateSubUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        return this.api.createSubUserWithHttpInfo(param.userCreate,  options).toPromise();
    }

    /**
     * Create Sub User
     * @param param the request object
     */
    public createSubUser(param: UsersApiCreateSubUserRequest, options?: ConfigurationOptions): Promise<UserPublic> {
        return this.api.createSubUser(param.userCreate,  options).toPromise();
    }

    /**
     * Delete User
     * @param param the request object
     */
    public deleteUserWithHttpInfo(param: UsersApiDeleteUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        return this.api.deleteUserWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * Delete User
     * @param param the request object
     */
    public deleteUser(param: UsersApiDeleteUserRequest, options?: ConfigurationOptions): Promise<SimpleResponse> {
        return this.api.deleteUser(param.userId,  options).toPromise();
    }

    /**
     * Read User
     * @param param the request object
     */
    public readUserWithHttpInfo(param: UsersApiReadUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        return this.api.readUserWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * Read User
     * @param param the request object
     */
    public readUser(param: UsersApiReadUserRequest, options?: ConfigurationOptions): Promise<UserPublic> {
        return this.api.readUser(param.userId,  options).toPromise();
    }

    /**
     * Read User Me
     * @param param the request object
     */
    public readUserMeWithHttpInfo(param: UsersApiReadUserMeRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        return this.api.readUserMeWithHttpInfo( options).toPromise();
    }

    /**
     * Read User Me
     * @param param the request object
     */
    public readUserMe(param: UsersApiReadUserMeRequest = {}, options?: ConfigurationOptions): Promise<UserPublic> {
        return this.api.readUserMe( options).toPromise();
    }

    /**
     * Read User Voices
     * @param param the request object
     */
    public readUserVoicesWithHttpInfo(param: UsersApiReadUserVoicesRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<VoicePublic>>> {
        return this.api.readUserVoicesWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * Read User Voices
     * @param param the request object
     */
    public readUserVoices(param: UsersApiReadUserVoicesRequest, options?: ConfigurationOptions): Promise<Array<VoicePublic>> {
        return this.api.readUserVoices(param.userId,  options).toPromise();
    }

    /**
     * Read Users
     * @param param the request object
     */
    public readUsersWithHttpInfo(param: UsersApiReadUsersRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<PageUserPublic>> {
        return this.api.readUsersWithHttpInfo(param.page, param.size, param.username, param.usernameIlike, param.usernameLike, param.usernameNeq, param.companyId, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Read Users
     * @param param the request object
     */
    public readUsers(param: UsersApiReadUsersRequest = {}, options?: ConfigurationOptions): Promise<PageUserPublic> {
        return this.api.readUsers(param.page, param.size, param.username, param.usernameIlike, param.usernameLike, param.usernameNeq, param.companyId, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Remove User Voice
     * @param param the request object
     */
    public removeUserVoiceWithHttpInfo(param: UsersApiRemoveUserVoiceRequest, options?: ConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        return this.api.removeUserVoiceWithHttpInfo(param.userId, param.voiceId,  options).toPromise();
    }

    /**
     * Remove User Voice
     * @param param the request object
     */
    public removeUserVoice(param: UsersApiRemoveUserVoiceRequest, options?: ConfigurationOptions): Promise<SimpleResponse> {
        return this.api.removeUserVoice(param.userId, param.voiceId,  options).toPromise();
    }

    /**
     * Update User
     * @param param the request object
     */
    public updateUserWithHttpInfo(param: UsersApiUpdateUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        return this.api.updateUserWithHttpInfo(param.userId, param.userUpdate,  options).toPromise();
    }

    /**
     * Update User
     * @param param the request object
     */
    public updateUser(param: UsersApiUpdateUserRequest, options?: ConfigurationOptions): Promise<UserPublic> {
        return this.api.updateUser(param.userId, param.userUpdate,  options).toPromise();
    }

    /**
     * Update User Password
     * @param param the request object
     */
    public updateUserPasswordWithHttpInfo(param: UsersApiUpdateUserPasswordRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        return this.api.updateUserPasswordWithHttpInfo(param.userId, param.userUpdatePassword,  options).toPromise();
    }

    /**
     * Update User Password
     * @param param the request object
     */
    public updateUserPassword(param: UsersApiUpdateUserPasswordRequest, options?: ConfigurationOptions): Promise<UserPublic> {
        return this.api.updateUserPassword(param.userId, param.userUpdatePassword,  options).toPromise();
    }

}

import { ObservableVoicesApi } from "./ObservableAPI";
import { VoicesApiRequestFactory, VoicesApiResponseProcessor} from "../apis/VoicesApi";

export interface VoicesApiCreateVoiceRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof VoicesApicreateVoice
     */
    name: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof VoicesApicreateVoice
     */
    profilePicId: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof VoicesApicreateVoice
     */
    description: string
    /**
     * 
     * Defaults to: undefined
     * @type HttpFile
     * @memberof VoicesApicreateVoice
     */
    file: HttpFile
    /**
     * 
     * Defaults to: &#39;standard&#39;
     * @type string
     * @memberof VoicesApicreateVoice
     */
    quality?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof VoicesApicreateVoice
     */
    companyId?: number
}

export interface VoicesApiDeleteVoiceRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof VoicesApideleteVoice
     */
    voiceId: number
}

export interface VoicesApiReadVoiceRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof VoicesApireadVoice
     */
    voiceId: number
}

export interface VoicesApiReadVoicesRequest {
    /**
     * Page number
     * Minimum: 1
     * Defaults to: 1
     * @type number
     * @memberof VoicesApireadVoices
     */
    page?: number
    /**
     * Page size
     * Minimum: 1
     * Maximum: 100
     * Defaults to: 50
     * @type number
     * @memberof VoicesApireadVoices
     */
    size?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof VoicesApireadVoices
     */
    name?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof VoicesApireadVoices
     */
    nameIlike?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof VoicesApireadVoices
     */
    nameLike?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof VoicesApireadVoices
     */
    orderBy?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof VoicesApireadVoices
     */
    search?: string
}

export interface VoicesApiUpdateVoiceRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof VoicesApiupdateVoice
     */
    voiceId: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof VoicesApiupdateVoice
     */
    name: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof VoicesApiupdateVoice
     */
    profilePicId: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof VoicesApiupdateVoice
     */
    description: string
    /**
     * 
     * Defaults to: undefined
     * @type HttpFile
     * @memberof VoicesApiupdateVoice
     */
    file: HttpFile
    /**
     * 
     * Defaults to: &#39;standard&#39;
     * @type string
     * @memberof VoicesApiupdateVoice
     */
    quality?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof VoicesApiupdateVoice
     */
    companyId?: number
}

export class ObjectVoicesApi {
    private api: ObservableVoicesApi

    public constructor(configuration: Configuration, requestFactory?: VoicesApiRequestFactory, responseProcessor?: VoicesApiResponseProcessor) {
        this.api = new ObservableVoicesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Voice
     * @param param the request object
     */
    public createVoiceWithHttpInfo(param: VoicesApiCreateVoiceRequest, options?: ConfigurationOptions): Promise<HttpInfo<VoiceActionResponse>> {
        return this.api.createVoiceWithHttpInfo(param.name, param.profilePicId, param.description, param.file, param.quality, param.companyId,  options).toPromise();
    }

    /**
     * Create Voice
     * @param param the request object
     */
    public createVoice(param: VoicesApiCreateVoiceRequest, options?: ConfigurationOptions): Promise<VoiceActionResponse> {
        return this.api.createVoice(param.name, param.profilePicId, param.description, param.file, param.quality, param.companyId,  options).toPromise();
    }

    /**
     * Delete Voice
     * @param param the request object
     */
    public deleteVoiceWithHttpInfo(param: VoicesApiDeleteVoiceRequest, options?: ConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        return this.api.deleteVoiceWithHttpInfo(param.voiceId,  options).toPromise();
    }

    /**
     * Delete Voice
     * @param param the request object
     */
    public deleteVoice(param: VoicesApiDeleteVoiceRequest, options?: ConfigurationOptions): Promise<SimpleResponse> {
        return this.api.deleteVoice(param.voiceId,  options).toPromise();
    }

    /**
     * Read Voice
     * @param param the request object
     */
    public readVoiceWithHttpInfo(param: VoicesApiReadVoiceRequest, options?: ConfigurationOptions): Promise<HttpInfo<VoiceDetail>> {
        return this.api.readVoiceWithHttpInfo(param.voiceId,  options).toPromise();
    }

    /**
     * Read Voice
     * @param param the request object
     */
    public readVoice(param: VoicesApiReadVoiceRequest, options?: ConfigurationOptions): Promise<VoiceDetail> {
        return this.api.readVoice(param.voiceId,  options).toPromise();
    }

    /**
     * Read Voices
     * @param param the request object
     */
    public readVoicesWithHttpInfo(param: VoicesApiReadVoicesRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<PageVoicePublic>> {
        return this.api.readVoicesWithHttpInfo(param.page, param.size, param.name, param.nameIlike, param.nameLike, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Read Voices
     * @param param the request object
     */
    public readVoices(param: VoicesApiReadVoicesRequest = {}, options?: ConfigurationOptions): Promise<PageVoicePublic> {
        return this.api.readVoices(param.page, param.size, param.name, param.nameIlike, param.nameLike, param.orderBy, param.search,  options).toPromise();
    }

    /**
     * Update Voice
     * @param param the request object
     */
    public updateVoiceWithHttpInfo(param: VoicesApiUpdateVoiceRequest, options?: ConfigurationOptions): Promise<HttpInfo<VoiceActionResponse>> {
        return this.api.updateVoiceWithHttpInfo(param.voiceId, param.name, param.profilePicId, param.description, param.file, param.quality, param.companyId,  options).toPromise();
    }

    /**
     * Update Voice
     * @param param the request object
     */
    public updateVoice(param: VoicesApiUpdateVoiceRequest, options?: ConfigurationOptions): Promise<VoiceActionResponse> {
        return this.api.updateVoice(param.voiceId, param.name, param.profilePicId, param.description, param.file, param.quality, param.companyId,  options).toPromise();
    }

}
