// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { HTTPValidationError } from '../models/HTTPValidationError';
import { SpeechToSpeechResponse } from '../models/SpeechToSpeechResponse';

/**
 * no description
 */
export class SpeechToSpeechApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Create Speech To Speech
     * @param voiceId 
     * @param file 
     * @param diffusionSteps 
     * @param lengthAdjust 
     * @param inferenceConfigRate 
     */
    public async createSpeechToSpeech(voiceId: number, file: HttpFile, diffusionSteps?: number, lengthAdjust?: number, inferenceConfigRate?: number, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'voiceId' is not null or undefined
        if (voiceId === null || voiceId === undefined) {
            throw new RequiredError("SpeechToSpeechApi", "createSpeechToSpeech", "voiceId");
        }


        // verify required parameter 'file' is not null or undefined
        if (file === null || file === undefined) {
            throw new RequiredError("SpeechToSpeechApi", "createSpeechToSpeech", "file");
        }





        // Path Params
        const localVarPath = '/speech-to-speech';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (voiceId !== undefined) {
            requestContext.setQueryParam("voice_id", ObjectSerializer.serialize(voiceId, "number", ""));
        }

        // Query Params
        if (diffusionSteps !== undefined) {
            requestContext.setQueryParam("diffusion_steps", ObjectSerializer.serialize(diffusionSteps, "number", ""));
        }

        // Query Params
        if (lengthAdjust !== undefined) {
            requestContext.setQueryParam("length_adjust", ObjectSerializer.serialize(lengthAdjust, "number", ""));
        }

        // Query Params
        if (inferenceConfigRate !== undefined) {
            requestContext.setQueryParam("inference_config_rate", ObjectSerializer.serialize(inferenceConfigRate, "number", ""));
        }

        // Form Params
        const useForm = canConsumeForm([
            'multipart/form-data',
        ]);

        let localVarFormParams
        if (useForm) {
            localVarFormParams = new FormData();
        } else {
            localVarFormParams = new URLSearchParams();
        }

        if (file !== undefined) {
             // TODO: replace .append with .set
             if (localVarFormParams instanceof FormData) {
                 localVarFormParams.append('file', file, file.name);
             }
        }

        requestContext.setBody(localVarFormParams);

        if(!useForm) {
            const contentType = ObjectSerializer.getPreferredMediaType([
                "multipart/form-data"
            ]);
            requestContext.setHeaderParam("Content-Type", contentType);
        }

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["APIKeyHeader"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        // Apply auth methods
        authMethod = _config.authMethods["OAuth2PasswordBearer"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class SpeechToSpeechApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createSpeechToSpeech
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createSpeechToSpeechWithHttpInfo(response: ResponseContext): Promise<HttpInfo<SpeechToSpeechResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: SpeechToSpeechResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SpeechToSpeechResponse", ""
            ) as SpeechToSpeechResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("422", response.httpStatusCode)) {
            const body: HTTPValidationError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "HTTPValidationError", ""
            ) as HTTPValidationError;
            throw new ApiException<HTTPValidationError>(response.httpStatusCode, "Validation Error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: SpeechToSpeechResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SpeechToSpeechResponse", ""
            ) as SpeechToSpeechResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
