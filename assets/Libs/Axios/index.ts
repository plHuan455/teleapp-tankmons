import { sys } from "cc";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from './index.cjs';
import ENV_DATA from "../../Constants/envs";
import { authStore } from "../../Store/auth";
import { logDebug } from "../helpers";

const axiosSDKPromise = new Promise<any>((resolve, reject) => {
    if (sys.platform === sys.Platform.MOBILE_BROWSER || sys.platform === sys.Platform.DESKTOP_BROWSER) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js";
        script.async = true;
        script.onload = () => {
            const intervalId = setInterval(() => {
                if ((window as any).axios) {
                    resolve((window as any).axios);
                    clearInterval(intervalId);
                }
            }, 100);
        };
        script.onerror = () => reject(new Error("Unable to load Axios SDK, please check logs."));
        document.head.appendChild(script);
    }
});

class AxiosInstance {
  private _axios: axios.AxiosStatic
  private _err?: any
  private _axiosInstance: axios.AxiosInstance
  async init() {
    try {
      this._axios = await axiosSDKPromise
      this._axiosInstance = this._axios.create({
        baseURL: `${ENV_DATA.API_DOMAIN}/api/v1`,
      });
      
      this._axiosInstance.interceptors.request.use(
        ($config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
          if ($config.headers) {
            const token = authStore.token
            // console.log({token});
            if (token) {
              $config.headers.Authorization = `Bearer ${token}`;
            }
      
            logDebug(
              `[🚚 ${$config.method?.toUpperCase()}] -> ${$config.url}:`,
              $config.data
            )
            // if ($config.method === 'get') {
            //   $config.params = { ...$config.params, locale: window.localStorage.getItem(LOCAL_STORAGE.LANGUAGE) || 'vi' };
            // }
            // $config.headers['Content-Type'] = 'application/json';
            // $config.headers.Accept = 'application/json';
          }
          return $config;
        },
        async (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
      );
      
      this._axiosInstance.interceptors.response.use(
        async (response: AxiosResponse) => {
          const data = response.data.data
          logDebug(
            `[✅ ${response.config.method?.toUpperCase()}] -> ${response.config.url}:`,
            data,
          )
          if (response.data && response.data.success === false) {
            return Promise.reject(new Error(response.data?.message || 'Lỗi không xác định từ server'));
          }
          return data
        },
        async (err: AxiosError): Promise<AxiosError> => {
          const error =  err?.response?.data ? (err.response?.data as any) : err
          if(err?.config) {
            logDebug(
              `[💩 ${err.config.method?.toUpperCase()}] -> ${err.config.url}: ${error}`,
            )
          }
          return Promise.reject(error)
        }
      );

    } catch(err) {
      this._err = err
      logDebug(err);
    }
  }

  get method() {
    if(!this._axiosInstance) throw 'Please init axios first'
    return this._axiosInstance
  }
}

const axiosInstance = new AxiosInstance()
export default axiosInstance