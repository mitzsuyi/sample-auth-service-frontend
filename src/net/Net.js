import axios from "axios";
import qs from "qs";

const formEncode = params => {
  return qs.stringify(params);
};
const handleError = function(error) {
  let message = error.message;
  if (error.response) {
    message = error.response.data.message;
  }
  this.setError(message || "Unknown error");
  return Promise.reject(message)
};
const url = base => path => `${base.replace(/\/$/, "")}/${path}`;

const beforeRequestResponse = (interceptor, setLoading, process) => {
  interceptor.use(
    function(param) {
      setLoading();
      if(process) return process(param)
      return param;
    },
    function(error) {
      setLoading();
      return Promise.reject(error);
    }
  );
};
export default class Net {
  constructor({ baseURL }) {
    this.baseURL = baseURL;
    this.url = url(baseURL);
    this.axios = axios.create();
  }
  configure({ setError, setLoading }) {
    this.setError = setError;
    if (this.onRequest) this.axios.interceptors.request.eject(this.onRequest);
    this.onRequest = beforeRequestResponse(this.axios.interceptors.request, () => {
      if (setLoading) setLoading(true);
    });
    if (this.onResponse)
      this.axios.interceptors.response.eject(this.onResponse);
    this.onResponse = beforeRequestResponse(this.axios.interceptors.response, () => {
      if (setLoading) setLoading(false);
    }, response=> response&&response.data);
  }
  post(path, params, options = {}) {
    return this.axios
      .post(this.url(path), formEncode(params), this.config(options))
      .catch(handleError.bind(this));
  }
  get(path, options = {}) {
    return this.axios
      .get(this.url(path), this.config(options))
      .catch(handleError.bind(this));
  }
  config = options => Object.assign({ crossdomain: true }, options);
}
