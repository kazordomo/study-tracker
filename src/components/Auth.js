class Auth {

    //Setting/Getting/Deleting token from localStorage.

    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }
    static removeToken() {
        console.log("WOOOPS");
        localStorage.removeItem('token');
    }
    static getToken() {
        return localStorage.getItem('token');
    }

}

export default Auth;