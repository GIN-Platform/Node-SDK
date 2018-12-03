const endpoint = '/user';

export default class UserFacade {
    constructor(client) {
        this.client = client;
    }

    get(id) {
        return this.client.get(`${endpoint}`);
    }
    
    transactions(page) {
        page = Math.max(page || 1, 1);
        
        return this.client.get(`${endpoint}/transactions?page=${page}`);
    }
}