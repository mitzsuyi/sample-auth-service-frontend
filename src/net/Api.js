import Net from "./Net";
import { API_URL } from "../config/api";

export default class Api {
  constructor({ auth }) {
    this.auth = auth;
    this.net = new Net({ baseURL: API_URL });
  }
  configure({ setLoading, setError }) {
    this.net.configure({ setError, setLoading });
    return this;
  }
  getMe = () => this.get("me", this.authorization());
  login = params => this.post("access-tokens", params);
  createUser = params => this.post("users", params);
  post= (path, params, options = {}) => this.net.post(path, params, options)
  authorization= ()=>({ headers: { "x-access-token": this.auth.accessToken } })
  get=(path, options = {}) =>this.net.get(path, options)
}
