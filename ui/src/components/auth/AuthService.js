import axios from 'axios';

const USER_API_BASE_URL = '/oauth/token';

class AuthService {

    login(credentials){
        const formData = new FormData()
        formData.set("grant_type", "password")
        formData.set("username", credentials.username)
        formData.set("password", credentials.password)
        return axios({
            method: 'post',
            url: USER_API_BASE_URL,
            data: `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
            headers: {
                'Authorization': 'Basic YXBpQ2xpZW50OnNlY3JldA==',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
        return 'Bearer ' + this.getUserInfo().access_token;
    }

    logOut() {
        localStorage.removeItem("userInfo");
    }
}

export default new AuthService();