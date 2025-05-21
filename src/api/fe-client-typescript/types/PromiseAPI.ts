import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, PromiseConfigurationOptions } from '../configuration'
import { PromiseMiddleware, Middleware, PromiseMiddlewareWrapper } from '../middleware';

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
import { ObservableAiNodesApi } from './ObservableAPI';

import { AiNodesApiRequestFactory, AiNodesApiResponseProcessor} from "../apis/AiNodesApi";
export class PromiseAiNodesApi {
    private api: ObservableAiNodesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AiNodesApiRequestFactory,
        responseProcessor?: AiNodesApiResponseProcessor
    ) {
        this.api = new ObservableAiNodesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Register
     * @param aINode
     */
    public registerWithHttpInfo(aINode: AINode, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AINode>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.registerWithHttpInfo(aINode, observableOptions);
        return result.toPromise();
    }

    /**
     * Register
     * @param aINode
     */
    public register(aINode: AINode, _options?: PromiseConfigurationOptions): Promise<AINode> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.register(aINode, observableOptions);
        return result.toPromise();
    }

    /**
     * Unregister
     * @param aINode
     */
    public unregisterWithHttpInfo(aINode: AINode, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AINode>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.unregisterWithHttpInfo(aINode, observableOptions);
        return result.toPromise();
    }

    /**
     * Unregister
     * @param aINode
     */
    public unregister(aINode: AINode, _options?: PromiseConfigurationOptions): Promise<AINode> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.unregister(aINode, observableOptions);
        return result.toPromise();
    }


}



import { ObservableAttachmentsApi } from './ObservableAPI';

import { AttachmentsApiRequestFactory, AttachmentsApiResponseProcessor} from "../apis/AttachmentsApi";
export class PromiseAttachmentsApi {
    private api: ObservableAttachmentsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AttachmentsApiRequestFactory,
        responseProcessor?: AttachmentsApiResponseProcessor
    ) {
        this.api = new ObservableAttachmentsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Presigned Urls
     * @param presignedUrlCreate
     */
    public createPresignedUrlsWithHttpInfo(presignedUrlCreate: Array<PresignedUrlCreate>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<PresignedUrlInfo>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createPresignedUrlsWithHttpInfo(presignedUrlCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Presigned Urls
     * @param presignedUrlCreate
     */
    public createPresignedUrls(presignedUrlCreate: Array<PresignedUrlCreate>, _options?: PromiseConfigurationOptions): Promise<Array<PresignedUrlInfo>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createPresignedUrls(presignedUrlCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete Attachment
     * @param attachmentId
     */
    public deleteAttachmentWithHttpInfo(attachmentId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.deleteAttachmentWithHttpInfo(attachmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete Attachment
     * @param attachmentId
     */
    public deleteAttachment(attachmentId: number, _options?: PromiseConfigurationOptions): Promise<SimpleResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.deleteAttachment(attachmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * Link Attachments
     * @param attachmentLink
     */
    public linkAttachmentsWithHttpInfo(attachmentLink: Array<AttachmentLink>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<AttachmentPublic>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.linkAttachmentsWithHttpInfo(attachmentLink, observableOptions);
        return result.toPromise();
    }

    /**
     * Link Attachments
     * @param attachmentLink
     */
    public linkAttachments(attachmentLink: Array<AttachmentLink>, _options?: PromiseConfigurationOptions): Promise<Array<AttachmentPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.linkAttachments(attachmentLink, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Attachment
     * @param attachmentId
     */
    public readAttachmentWithHttpInfo(attachmentId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AttachmentPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readAttachmentWithHttpInfo(attachmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Attachment
     * @param attachmentId
     */
    public readAttachment(attachmentId: number, _options?: PromiseConfigurationOptions): Promise<AttachmentPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readAttachment(attachmentId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Attachments
     * @param [page] Page number
     * @param [size] Page size
     * @param [relatedObjectType]
     * @param [relatedObjectSubtype]
     * @param [filenameIlike]
     * @param [orderBy]
     * @param [search]
     */
    public readAttachmentsWithHttpInfo(page?: number, size?: number, relatedObjectType?: string, relatedObjectSubtype?: string, filenameIlike?: string, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PageAttachmentPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readAttachmentsWithHttpInfo(page, size, relatedObjectType, relatedObjectSubtype, filenameIlike, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Attachments
     * @param [page] Page number
     * @param [size] Page size
     * @param [relatedObjectType]
     * @param [relatedObjectSubtype]
     * @param [filenameIlike]
     * @param [orderBy]
     * @param [search]
     */
    public readAttachments(page?: number, size?: number, relatedObjectType?: string, relatedObjectSubtype?: string, filenameIlike?: string, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<PageAttachmentPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readAttachments(page, size, relatedObjectType, relatedObjectSubtype, filenameIlike, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Attachments For Object
     * @param relatedObjectType
     * @param relatedObjectId
     */
    public readAttachmentsForObjectWithHttpInfo(relatedObjectType: string, relatedObjectId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<AttachmentPublic>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readAttachmentsForObjectWithHttpInfo(relatedObjectType, relatedObjectId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Attachments For Object
     * @param relatedObjectType
     * @param relatedObjectId
     */
    public readAttachmentsForObject(relatedObjectType: string, relatedObjectId: number, _options?: PromiseConfigurationOptions): Promise<Array<AttachmentPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readAttachmentsForObject(relatedObjectType, relatedObjectId, observableOptions);
        return result.toPromise();
    }

    /**
     * Upload
     * @param filename
     * @param relatedObjectType
     * @param relatedObjectSubtype
     * @param file
     */
    public uploadWithHttpInfo(filename: string, relatedObjectType: string, relatedObjectSubtype: string, file: HttpFile, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AttachmentPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.uploadWithHttpInfo(filename, relatedObjectType, relatedObjectSubtype, file, observableOptions);
        return result.toPromise();
    }

    /**
     * Upload
     * @param filename
     * @param relatedObjectType
     * @param relatedObjectSubtype
     * @param file
     */
    public upload(filename: string, relatedObjectType: string, relatedObjectSubtype: string, file: HttpFile, _options?: PromiseConfigurationOptions): Promise<AttachmentPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.upload(filename, relatedObjectType, relatedObjectSubtype, file, observableOptions);
        return result.toPromise();
    }


}



import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Forgot Password
     * @param authForgotPasswordRequest
     */
    public forgotPasswordWithHttpInfo(authForgotPasswordRequest: AuthForgotPasswordRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.forgotPasswordWithHttpInfo(authForgotPasswordRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Forgot Password
     * @param authForgotPasswordRequest
     */
    public forgotPassword(authForgotPasswordRequest: AuthForgotPasswordRequest, _options?: PromiseConfigurationOptions): Promise<SimpleResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.forgotPassword(authForgotPasswordRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Google Callback
     * @param code
     * @param state
     * @param [error]
     * @param [errorDescription]
     */
    public googleCallbackWithHttpInfo(code: string, state: string, error?: string, errorDescription?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.googleCallbackWithHttpInfo(code, state, error, errorDescription, observableOptions);
        return result.toPromise();
    }

    /**
     * Google Callback
     * @param code
     * @param state
     * @param [error]
     * @param [errorDescription]
     */
    public googleCallback(code: string, state: string, error?: string, errorDescription?: string, _options?: PromiseConfigurationOptions): Promise<void> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.googleCallback(code, state, error, errorDescription, observableOptions);
        return result.toPromise();
    }

    /**
     * Google Initiate
     * @param redirectUri
     */
    public googleInitiateWithHttpInfo(redirectUri: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AuthGoogleInitiateResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.googleInitiateWithHttpInfo(redirectUri, observableOptions);
        return result.toPromise();
    }

    /**
     * Google Initiate
     * @param redirectUri
     */
    public googleInitiate(redirectUri: string, _options?: PromiseConfigurationOptions): Promise<AuthGoogleInitiateResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.googleInitiate(redirectUri, observableOptions);
        return result.toPromise();
    }

    /**
     * Google Login
     */
    public googleLoginWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.googleLoginWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Google Login
     */
    public googleLogin(_options?: PromiseConfigurationOptions): Promise<void> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.googleLogin(observableOptions);
        return result.toPromise();
    }

    /**
     * Google Verify Code
     * @param code
     * @param state
     * @param [error]
     * @param [errorDescription]
     */
    public googleVerifyCodeWithHttpInfo(code: string, state: string, error?: string, errorDescription?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Token>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.googleVerifyCodeWithHttpInfo(code, state, error, errorDescription, observableOptions);
        return result.toPromise();
    }

    /**
     * Google Verify Code
     * @param code
     * @param state
     * @param [error]
     * @param [errorDescription]
     */
    public googleVerifyCode(code: string, state: string, error?: string, errorDescription?: string, _options?: PromiseConfigurationOptions): Promise<Token> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.googleVerifyCode(code, state, error, errorDescription, observableOptions);
        return result.toPromise();
    }

    /**
     * OAuth2 compatible token login, get an access token for future requests
     * Login
     * @param username
     * @param password
     * @param [grantType]
     * @param [scope]
     * @param [clientId]
     * @param [clientSecret]
     */
    public loginWithHttpInfo(username: string, password: string, grantType?: string, scope?: string, clientId?: string, clientSecret?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Token>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.loginWithHttpInfo(username, password, grantType, scope, clientId, clientSecret, observableOptions);
        return result.toPromise();
    }

    /**
     * OAuth2 compatible token login, get an access token for future requests
     * Login
     * @param username
     * @param password
     * @param [grantType]
     * @param [scope]
     * @param [clientId]
     * @param [clientSecret]
     */
    public login(username: string, password: string, grantType?: string, scope?: string, clientId?: string, clientSecret?: string, _options?: PromiseConfigurationOptions): Promise<Token> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.login(username, password, grantType, scope, clientId, clientSecret, observableOptions);
        return result.toPromise();
    }

    /**
     * Refresh Token
     * @param refreshToken
     */
    public refreshTokenWithHttpInfo(refreshToken: RefreshToken, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Token>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.refreshTokenWithHttpInfo(refreshToken, observableOptions);
        return result.toPromise();
    }

    /**
     * Refresh Token
     * @param refreshToken
     */
    public refreshToken(refreshToken: RefreshToken, _options?: PromiseConfigurationOptions): Promise<Token> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.refreshToken(refreshToken, observableOptions);
        return result.toPromise();
    }

    /**
     * Create new user without the need to be logged in.
     * Register User
     * @param userRegister
     */
    public registerUserWithHttpInfo(userRegister: UserRegister, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.registerUserWithHttpInfo(userRegister, observableOptions);
        return result.toPromise();
    }

    /**
     * Create new user without the need to be logged in.
     * Register User
     * @param userRegister
     */
    public registerUser(userRegister: UserRegister, _options?: PromiseConfigurationOptions): Promise<UserPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.registerUser(userRegister, observableOptions);
        return result.toPromise();
    }

    /**
     * Reset Password
     * @param authResetPasswordRequest
     */
    public resetPasswordWithHttpInfo(authResetPasswordRequest: AuthResetPasswordRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.resetPasswordWithHttpInfo(authResetPasswordRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Reset Password
     * @param authResetPasswordRequest
     */
    public resetPassword(authResetPasswordRequest: AuthResetPasswordRequest, _options?: PromiseConfigurationOptions): Promise<SimpleResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.resetPassword(authResetPasswordRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Verify Reset Token
     * @param authVerifyResetTokenRequest
     */
    public verifyResetTokenWithHttpInfo(authVerifyResetTokenRequest: AuthVerifyResetTokenRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.verifyResetTokenWithHttpInfo(authVerifyResetTokenRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Verify Reset Token
     * @param authVerifyResetTokenRequest
     */
    public verifyResetToken(authVerifyResetTokenRequest: AuthVerifyResetTokenRequest, _options?: PromiseConfigurationOptions): Promise<SimpleResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.verifyResetToken(authVerifyResetTokenRequest, observableOptions);
        return result.toPromise();
    }


}



import { ObservableCallApi } from './ObservableAPI';

import { CallApiRequestFactory, CallApiResponseProcessor} from "../apis/CallApi";
export class PromiseCallApi {
    private api: ObservableCallApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CallApiRequestFactory,
        responseProcessor?: CallApiResponseProcessor
    ) {
        this.api = new ObservableCallApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Call
     * @param callCreateRequest
     */
    public createCallWithHttpInfo(callCreateRequest: CallCreateRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createCallWithHttpInfo(callCreateRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Call
     * @param callCreateRequest
     */
    public createCall(callCreateRequest: CallCreateRequest, _options?: PromiseConfigurationOptions): Promise<any> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createCall(callCreateRequest, observableOptions);
        return result.toPromise();
    }


}



import { ObservableCompaniesApi } from './ObservableAPI';

import { CompaniesApiRequestFactory, CompaniesApiResponseProcessor} from "../apis/CompaniesApi";
export class PromiseCompaniesApi {
    private api: ObservableCompaniesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CompaniesApiRequestFactory,
        responseProcessor?: CompaniesApiResponseProcessor
    ) {
        this.api = new ObservableCompaniesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Company
     * @param companyCreate
     */
    public createCompanyWithHttpInfo(companyCreate: CompanyCreate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<CompanyPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createCompanyWithHttpInfo(companyCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Company
     * @param companyCreate
     */
    public createCompany(companyCreate: CompanyCreate, _options?: PromiseConfigurationOptions): Promise<CompanyPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createCompany(companyCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Companies
     * @param [page] Page number
     * @param [size] Page size
     * @param [name]
     * @param [nameIlike]
     * @param [nameLike]
     * @param [orderBy]
     * @param [search]
     */
    public readCompaniesWithHttpInfo(page?: number, size?: number, name?: string, nameIlike?: string, nameLike?: string, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PageCompanyPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readCompaniesWithHttpInfo(page, size, name, nameIlike, nameLike, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Companies
     * @param [page] Page number
     * @param [size] Page size
     * @param [name]
     * @param [nameIlike]
     * @param [nameLike]
     * @param [orderBy]
     * @param [search]
     */
    public readCompanies(page?: number, size?: number, name?: string, nameIlike?: string, nameLike?: string, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<PageCompanyPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readCompanies(page, size, name, nameIlike, nameLike, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Company
     * @param companyId
     */
    public readCompanyWithHttpInfo(companyId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<CompanyDetail>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readCompanyWithHttpInfo(companyId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Company
     * @param companyId
     */
    public readCompany(companyId: number, _options?: PromiseConfigurationOptions): Promise<CompanyDetail> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readCompany(companyId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Company Voices
     * @param companyId
     */
    public readCompanyVoicesWithHttpInfo(companyId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<VoicePublic>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readCompanyVoicesWithHttpInfo(companyId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Company Voices
     * @param companyId
     */
    public readCompanyVoices(companyId: number, _options?: PromiseConfigurationOptions): Promise<Array<VoicePublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readCompanyVoices(companyId, observableOptions);
        return result.toPromise();
    }


}



import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Root
     */
    public rootWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.rootWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Root
     */
    public root(_options?: PromiseConfigurationOptions): Promise<any> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.root(observableOptions);
        return result.toPromise();
    }


}



import { ObservableMyApi } from './ObservableAPI';

import { MyApiRequestFactory, MyApiResponseProcessor} from "../apis/MyApi";
export class PromiseMyApi {
    private api: ObservableMyApi

    public constructor(
        configuration: Configuration,
        requestFactory?: MyApiRequestFactory,
        responseProcessor?: MyApiResponseProcessor
    ) {
        this.api = new ObservableMyApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Read My Orders
     */
    public readMyOrdersWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<OrderPublic>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readMyOrdersWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Read My Orders
     */
    public readMyOrders(_options?: PromiseConfigurationOptions): Promise<Array<OrderPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readMyOrders(observableOptions);
        return result.toPromise();
    }

    /**
     * Read My Plan
     */
    public readMyPlanWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<MyPlan>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readMyPlanWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Read My Plan
     */
    public readMyPlan(_options?: PromiseConfigurationOptions): Promise<MyPlan> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readMyPlan(observableOptions);
        return result.toPromise();
    }

    /**
     * Read My Points Logs
     */
    public readMyPointsLogsWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<PointsLogPublic>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readMyPointsLogsWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Read My Points Logs
     */
    public readMyPointsLogs(_options?: PromiseConfigurationOptions): Promise<Array<PointsLogPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readMyPointsLogs(observableOptions);
        return result.toPromise();
    }

    /**
     * Read My Voices
     */
    public readMyVoicesWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<VoicePublic>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readMyVoicesWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Read My Voices
     */
    public readMyVoices(_options?: PromiseConfigurationOptions): Promise<Array<VoicePublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readMyVoices(observableOptions);
        return result.toPromise();
    }


}



import { ObservableOrdersApi } from './ObservableAPI';

import { OrdersApiRequestFactory, OrdersApiResponseProcessor} from "../apis/OrdersApi";
export class PromiseOrdersApi {
    private api: ObservableOrdersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: OrdersApiRequestFactory,
        responseProcessor?: OrdersApiResponseProcessor
    ) {
        this.api = new ObservableOrdersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Order
     * @param orderCreateRequest
     */
    public createOrderWithHttpInfo(orderCreateRequest: OrderCreateRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<OrderCreateResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createOrderWithHttpInfo(orderCreateRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Order
     * @param orderCreateRequest
     */
    public createOrder(orderCreateRequest: OrderCreateRequest, _options?: PromiseConfigurationOptions): Promise<OrderCreateResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createOrder(orderCreateRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Order
     * @param orderId
     */
    public readOrderWithHttpInfo(orderId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<OrderDetail>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readOrderWithHttpInfo(orderId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Order
     * @param orderId
     */
    public readOrder(orderId: number, _options?: PromiseConfigurationOptions): Promise<OrderDetail> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readOrder(orderId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Orders
     * @param [page] Page number
     * @param [size] Page size
     * @param [orderBy]
     * @param [search]
     */
    public readOrdersWithHttpInfo(page?: number, size?: number, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PageOrderPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readOrdersWithHttpInfo(page, size, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Orders
     * @param [page] Page number
     * @param [size] Page size
     * @param [orderBy]
     * @param [search]
     */
    public readOrders(page?: number, size?: number, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<PageOrderPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readOrders(page, size, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Stripe Webhook
     */
    public stripeWebhookWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.stripeWebhookWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Stripe Webhook
     */
    public stripeWebhook(_options?: PromiseConfigurationOptions): Promise<any> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.stripeWebhook(observableOptions);
        return result.toPromise();
    }


}



import { ObservablePlansApi } from './ObservableAPI';

import { PlansApiRequestFactory, PlansApiResponseProcessor} from "../apis/PlansApi";
export class PromisePlansApi {
    private api: ObservablePlansApi

    public constructor(
        configuration: Configuration,
        requestFactory?: PlansApiRequestFactory,
        responseProcessor?: PlansApiResponseProcessor
    ) {
        this.api = new ObservablePlansApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Read Plans
     */
    public readPlansWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Plan>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readPlansWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Read Plans
     */
    public readPlans(_options?: PromiseConfigurationOptions): Promise<Array<Plan>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readPlans(observableOptions);
        return result.toPromise();
    }


}



import { ObservableRolesApi } from './ObservableAPI';

import { RolesApiRequestFactory, RolesApiResponseProcessor} from "../apis/RolesApi";
export class PromiseRolesApi {
    private api: ObservableRolesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: RolesApiRequestFactory,
        responseProcessor?: RolesApiResponseProcessor
    ) {
        this.api = new ObservableRolesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Read Role
     * @param roleId
     */
    public readRoleWithHttpInfo(roleId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<RolePublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readRoleWithHttpInfo(roleId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Role
     * @param roleId
     */
    public readRole(roleId: number, _options?: PromiseConfigurationOptions): Promise<RolePublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readRole(roleId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Roles
     * @param [page] Page number
     * @param [size] Page size
     * @param [name]
     * @param [nameIlike]
     * @param [nameLike]
     * @param [nameNeq]
     * @param [orderBy]
     * @param [search]
     */
    public readRolesWithHttpInfo(page?: number, size?: number, name?: string, nameIlike?: string, nameLike?: string, nameNeq?: string, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PageRolePublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readRolesWithHttpInfo(page, size, name, nameIlike, nameLike, nameNeq, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Roles
     * @param [page] Page number
     * @param [size] Page size
     * @param [name]
     * @param [nameIlike]
     * @param [nameLike]
     * @param [nameNeq]
     * @param [orderBy]
     * @param [search]
     */
    public readRoles(page?: number, size?: number, name?: string, nameIlike?: string, nameLike?: string, nameNeq?: string, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<PageRolePublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readRoles(page, size, name, nameIlike, nameLike, nameNeq, orderBy, search, observableOptions);
        return result.toPromise();
    }


}



import { ObservableSpeechToSpeechApi } from './ObservableAPI';

import { SpeechToSpeechApiRequestFactory, SpeechToSpeechApiResponseProcessor} from "../apis/SpeechToSpeechApi";
export class PromiseSpeechToSpeechApi {
    private api: ObservableSpeechToSpeechApi

    public constructor(
        configuration: Configuration,
        requestFactory?: SpeechToSpeechApiRequestFactory,
        responseProcessor?: SpeechToSpeechApiResponseProcessor
    ) {
        this.api = new ObservableSpeechToSpeechApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Speech To Speech
     * @param voiceId
     * @param file
     * @param [diffusionSteps]
     * @param [lengthAdjust]
     * @param [inferenceConfigRate]
     */
    public createSpeechToSpeechWithHttpInfo(voiceId: number, file: HttpFile, diffusionSteps?: number, lengthAdjust?: number, inferenceConfigRate?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SpeechToSpeechResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createSpeechToSpeechWithHttpInfo(voiceId, file, diffusionSteps, lengthAdjust, inferenceConfigRate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Speech To Speech
     * @param voiceId
     * @param file
     * @param [diffusionSteps]
     * @param [lengthAdjust]
     * @param [inferenceConfigRate]
     */
    public createSpeechToSpeech(voiceId: number, file: HttpFile, diffusionSteps?: number, lengthAdjust?: number, inferenceConfigRate?: number, _options?: PromiseConfigurationOptions): Promise<SpeechToSpeechResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createSpeechToSpeech(voiceId, file, diffusionSteps, lengthAdjust, inferenceConfigRate, observableOptions);
        return result.toPromise();
    }


}



import { ObservableTextToSpeechApi } from './ObservableAPI';

import { TextToSpeechApiRequestFactory, TextToSpeechApiResponseProcessor} from "../apis/TextToSpeechApi";
export class PromiseTextToSpeechApi {
    private api: ObservableTextToSpeechApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TextToSpeechApiRequestFactory,
        responseProcessor?: TextToSpeechApiResponseProcessor
    ) {
        this.api = new ObservableTextToSpeechApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Text To Speech
     * @param textToSpeechCreate
     */
    public createTextToSpeechWithHttpInfo(textToSpeechCreate: TextToSpeechCreate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<TextToSpeechResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createTextToSpeechWithHttpInfo(textToSpeechCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Text To Speech
     * @param textToSpeechCreate
     */
    public createTextToSpeech(textToSpeechCreate: TextToSpeechCreate, _options?: PromiseConfigurationOptions): Promise<TextToSpeechResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createTextToSpeech(textToSpeechCreate, observableOptions);
        return result.toPromise();
    }


}



import { ObservableUsersApi } from './ObservableAPI';

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class PromiseUsersApi {
    private api: ObservableUsersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Add User Voice
     * @param userId
     * @param userVoiceAddRequest
     */
    public addUserVoiceWithHttpInfo(userId: number, userVoiceAddRequest: UserVoiceAddRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.addUserVoiceWithHttpInfo(userId, userVoiceAddRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Add User Voice
     * @param userId
     * @param userVoiceAddRequest
     */
    public addUserVoice(userId: number, userVoiceAddRequest: UserVoiceAddRequest, _options?: PromiseConfigurationOptions): Promise<SimpleResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.addUserVoice(userId, userVoiceAddRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Assign User Voices
     * @param userId
     * @param userVoicesAssignmentRequest
     */
    public assignUserVoicesWithHttpInfo(userId: number, userVoicesAssignmentRequest: UserVoicesAssignmentRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.assignUserVoicesWithHttpInfo(userId, userVoicesAssignmentRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Assign User Voices
     * @param userId
     * @param userVoicesAssignmentRequest
     */
    public assignUserVoices(userId: number, userVoicesAssignmentRequest: UserVoicesAssignmentRequest, _options?: PromiseConfigurationOptions): Promise<SimpleResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.assignUserVoices(userId, userVoicesAssignmentRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Main User
     * @param userCreate
     */
    public createMainUserWithHttpInfo(userCreate: UserCreate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createMainUserWithHttpInfo(userCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Main User
     * @param userCreate
     */
    public createMainUser(userCreate: UserCreate, _options?: PromiseConfigurationOptions): Promise<UserPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createMainUser(userCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Sub User
     * @param userCreate
     */
    public createSubUserWithHttpInfo(userCreate: UserCreate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createSubUserWithHttpInfo(userCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Sub User
     * @param userCreate
     */
    public createSubUser(userCreate: UserCreate, _options?: PromiseConfigurationOptions): Promise<UserPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createSubUser(userCreate, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete User
     * @param userId
     */
    public deleteUserWithHttpInfo(userId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.deleteUserWithHttpInfo(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete User
     * @param userId
     */
    public deleteUser(userId: number, _options?: PromiseConfigurationOptions): Promise<SimpleResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.deleteUser(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read User
     * @param userId
     */
    public readUserWithHttpInfo(userId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readUserWithHttpInfo(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read User
     * @param userId
     */
    public readUser(userId: number, _options?: PromiseConfigurationOptions): Promise<UserPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readUser(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read User Me
     */
    public readUserMeWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readUserMeWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Read User Me
     */
    public readUserMe(_options?: PromiseConfigurationOptions): Promise<UserPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readUserMe(observableOptions);
        return result.toPromise();
    }

    /**
     * Read User Voices
     * @param userId
     */
    public readUserVoicesWithHttpInfo(userId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<VoicePublic>>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readUserVoicesWithHttpInfo(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read User Voices
     * @param userId
     */
    public readUserVoices(userId: number, _options?: PromiseConfigurationOptions): Promise<Array<VoicePublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readUserVoices(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Users
     * @param [page] Page number
     * @param [size] Page size
     * @param [username]
     * @param [usernameIlike]
     * @param [usernameLike]
     * @param [usernameNeq]
     * @param [companyId]
     * @param [orderBy]
     * @param [search]
     */
    public readUsersWithHttpInfo(page?: number, size?: number, username?: string, usernameIlike?: string, usernameLike?: string, usernameNeq?: string, companyId?: number, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PageUserPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readUsersWithHttpInfo(page, size, username, usernameIlike, usernameLike, usernameNeq, companyId, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Users
     * @param [page] Page number
     * @param [size] Page size
     * @param [username]
     * @param [usernameIlike]
     * @param [usernameLike]
     * @param [usernameNeq]
     * @param [companyId]
     * @param [orderBy]
     * @param [search]
     */
    public readUsers(page?: number, size?: number, username?: string, usernameIlike?: string, usernameLike?: string, usernameNeq?: string, companyId?: number, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<PageUserPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readUsers(page, size, username, usernameIlike, usernameLike, usernameNeq, companyId, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove User Voice
     * @param userId
     * @param voiceId
     */
    public removeUserVoiceWithHttpInfo(userId: number, voiceId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.removeUserVoiceWithHttpInfo(userId, voiceId, observableOptions);
        return result.toPromise();
    }

    /**
     * Remove User Voice
     * @param userId
     * @param voiceId
     */
    public removeUserVoice(userId: number, voiceId: number, _options?: PromiseConfigurationOptions): Promise<SimpleResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.removeUserVoice(userId, voiceId, observableOptions);
        return result.toPromise();
    }

    /**
     * Update User
     * @param userId
     * @param userUpdate
     */
    public updateUserWithHttpInfo(userId: number, userUpdate: UserUpdate, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.updateUserWithHttpInfo(userId, userUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Update User
     * @param userId
     * @param userUpdate
     */
    public updateUser(userId: number, userUpdate: UserUpdate, _options?: PromiseConfigurationOptions): Promise<UserPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.updateUser(userId, userUpdate, observableOptions);
        return result.toPromise();
    }

    /**
     * Update User Password
     * @param userId
     * @param userUpdatePassword
     */
    public updateUserPasswordWithHttpInfo(userId: number, userUpdatePassword: UserUpdatePassword, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserPublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.updateUserPasswordWithHttpInfo(userId, userUpdatePassword, observableOptions);
        return result.toPromise();
    }

    /**
     * Update User Password
     * @param userId
     * @param userUpdatePassword
     */
    public updateUserPassword(userId: number, userUpdatePassword: UserUpdatePassword, _options?: PromiseConfigurationOptions): Promise<UserPublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.updateUserPassword(userId, userUpdatePassword, observableOptions);
        return result.toPromise();
    }


}



import { ObservableVoicesApi } from './ObservableAPI';

import { VoicesApiRequestFactory, VoicesApiResponseProcessor} from "../apis/VoicesApi";
export class PromiseVoicesApi {
    private api: ObservableVoicesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: VoicesApiRequestFactory,
        responseProcessor?: VoicesApiResponseProcessor
    ) {
        this.api = new ObservableVoicesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create Voice
     * @param name
     * @param profilePicId
     * @param description
     * @param file
     * @param [quality]
     * @param [companyId]
     */
    public createVoiceWithHttpInfo(name: string, profilePicId: number, description: string, file: HttpFile, quality?: string, companyId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<VoiceActionResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createVoiceWithHttpInfo(name, profilePicId, description, file, quality, companyId, observableOptions);
        return result.toPromise();
    }

    /**
     * Create Voice
     * @param name
     * @param profilePicId
     * @param description
     * @param file
     * @param [quality]
     * @param [companyId]
     */
    public createVoice(name: string, profilePicId: number, description: string, file: HttpFile, quality?: string, companyId?: number, _options?: PromiseConfigurationOptions): Promise<VoiceActionResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.createVoice(name, profilePicId, description, file, quality, companyId, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete Voice
     * @param voiceId
     */
    public deleteVoiceWithHttpInfo(voiceId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<SimpleResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.deleteVoiceWithHttpInfo(voiceId, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete Voice
     * @param voiceId
     */
    public deleteVoice(voiceId: number, _options?: PromiseConfigurationOptions): Promise<SimpleResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.deleteVoice(voiceId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Voice
     * @param voiceId
     */
    public readVoiceWithHttpInfo(voiceId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<VoiceDetail>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readVoiceWithHttpInfo(voiceId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Voice
     * @param voiceId
     */
    public readVoice(voiceId: number, _options?: PromiseConfigurationOptions): Promise<VoiceDetail> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readVoice(voiceId, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Voices
     * @param [page] Page number
     * @param [size] Page size
     * @param [name]
     * @param [nameIlike]
     * @param [nameLike]
     * @param [orderBy]
     * @param [search]
     */
    public readVoicesWithHttpInfo(page?: number, size?: number, name?: string, nameIlike?: string, nameLike?: string, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<PageVoicePublic>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readVoicesWithHttpInfo(page, size, name, nameIlike, nameLike, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Read Voices
     * @param [page] Page number
     * @param [size] Page size
     * @param [name]
     * @param [nameIlike]
     * @param [nameLike]
     * @param [orderBy]
     * @param [search]
     */
    public readVoices(page?: number, size?: number, name?: string, nameIlike?: string, nameLike?: string, orderBy?: string, search?: string, _options?: PromiseConfigurationOptions): Promise<PageVoicePublic> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.readVoices(page, size, name, nameIlike, nameLike, orderBy, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Update Voice
     * @param voiceId
     * @param name
     * @param profilePicId
     * @param description
     * @param file
     * @param [quality]
     * @param [companyId]
     */
    public updateVoiceWithHttpInfo(voiceId: number, name: string, profilePicId: number, description: string, file: HttpFile, quality?: string, companyId?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<VoiceActionResponse>> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.updateVoiceWithHttpInfo(voiceId, name, profilePicId, description, file, quality, companyId, observableOptions);
        return result.toPromise();
    }

    /**
     * Update Voice
     * @param voiceId
     * @param name
     * @param profilePicId
     * @param description
     * @param file
     * @param [quality]
     * @param [companyId]
     */
    public updateVoice(voiceId: number, name: string, profilePicId: number, description: string, file: HttpFile, quality?: string, companyId?: number, _options?: PromiseConfigurationOptions): Promise<VoiceActionResponse> {
        let observableOptions: undefined | ConfigurationOptions
        if (_options){
	    observableOptions = {
                baseServer: _options.baseServer,
                httpApi: _options.httpApi,
                middleware: _options.middleware?.map(
                    m => new PromiseMiddlewareWrapper(m)
		),
		middlewareMergeStrategy: _options.middlewareMergeStrategy,
                authMethods: _options.authMethods
	    }
	}
        const result = this.api.updateVoice(voiceId, name, profilePicId, description, file, quality, companyId, observableOptions);
        return result.toPromise();
    }


}



