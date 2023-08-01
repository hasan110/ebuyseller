import axios from 'axios';
import VueCookies from 'vue-cookies'

// export let baseUrl = 'http://localhost:8000/api/';
export let baseUrl = 'https://panel.polexofficial.com/api/';

const Axios = axios.create({
    baseURL: baseUrl,
    headers: {'api_token': $cookies.get("SellerApiToken")}
});

export default Axios;