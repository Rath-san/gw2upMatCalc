import { SEARCH } from './constants';
import MainService from './MainService';

class ItemService {
    constructor() {
        this.getItemsUrl = SEARCH;
        this.fetchedItems = []
    }

    getItem(itemId) {
        if (this.fetchedItems.includes(itemId)) return;
        return MainService.get(this.getItemsUrl.replace(`{itemId}`, itemId));
    }
}

export default new ItemService();
