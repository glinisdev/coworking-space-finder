import axios, { AxiosRequestConfig } from 'axios';
import { set } from 'lodash';
import type { AxiosResponse } from 'axios';

const qs = require('qs');

class ApiClient {
    // _domain = process.env.NEXT_PUBLIC_COFFICE_DOMAIN;
    _domain = 'http://localhost:3001/';

    _setApiUrl = (config: AxiosRequestConfig) => {
        const apiUrl = this._domain;

        set(config, 'url', apiUrl + config.url);

        return config;
    };

    handleSuccessResponse = (response: AxiosResponse<any>): Object => {
        if (response.data == null) {
            return {};
        }

        if (response.status >= 400) {
            return this.handleErrorResponse(response);
        }

        if (Array.isArray(response.data)) {
            return response.data;
        }

        return {
            ...response.data,
            metadata: {
                ...response.data.metadata
            },
            headers: response.headers
        };
    };

    handleErrorResponse = (response: AxiosResponse<any>): AxiosResponse<any> | Error => {
        return response;
    };

    request = async (config: AxiosRequestConfig): Promise<Object> => {
        const updatedConfig = {
            ...this._setApiUrl(config),
            paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'repeat' })
        };

        try {
            const response = await axios(updatedConfig);
            return this.handleSuccessResponse(response);
        } catch (error) {
            throw error;
        }
    };
}

export default new ApiClient();
