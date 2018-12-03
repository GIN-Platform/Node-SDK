import BadParamError from "../../errors/BadParamError";

const endpoint = '/blockchains';

const validateId = (id) => {
    if (!id) {
        throw new BadParamError('Invalid blockchain ID');
    }
};

export default class BlockchainsFacade {
    constructor(client) {
        this.client = client;
    }
    
    list() {
        return this.client.get(endpoint);
    }
    
    get(id) {
        validateId(id);
        return this.client.get(`${endpoint}/${id}`);
    }
}