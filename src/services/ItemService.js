import { SEARCH } from './constants';
import MainService from './MainService';

class ItemService {
    constructor() {
        this.getItemsUrl = SEARCH;
    }

    getItem(itemId) {
        return MainService.get(this.getItemsUrl.replace(`{itemId}`, itemId));
    }
}

export default new ItemService();
