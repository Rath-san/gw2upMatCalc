import { setup } from 'axios-cache-adapter';

const MainService = setup({
    baseURL: 'https://www.gw2spidy.com/api/v0.9/json/',
    cache: {
        maxAge: 5 * 60 * 1000
    }
});

export default MainService;
