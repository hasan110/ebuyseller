import axios from 'axios';
import VueCookies from 'vue-cookies'

// export let baseUrl = 'http://localhost:8000/api/';
export let baseUrl = 'https://panel.polexofficial.com/api/';

const Axios = axios.create({
    baseURL: baseUrl,
    headers: {'x-api-key': $cookies.get("SellerApiToken")}
});

export default Axios;