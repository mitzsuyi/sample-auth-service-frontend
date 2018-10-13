class Auth {
    isAuthenticated = false
    logout(){
      this.setAuthorization(undefined)
    }
    setAuthorization(authorization){
     this.authorization = authorization
     this.isAuthenticated = authorization !== undefined
    }
    get accessToken(){
      if (this.authorization) return this.authorization.jwt
      return undefined
    }
}
export default Auth