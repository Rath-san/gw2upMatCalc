import axios from 'axios';

const MainService = axios.create({
    baseURL: 'https://www.gw2spidy.com/api/v0.9/json/'
})

export default MainService;
