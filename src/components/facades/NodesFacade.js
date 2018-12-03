import BadParamError from "../../errors/BadParamError";

const endpoint = '/nodes';
const uuidValidator = require('uuid-validate');

const validateId = (id) => {
    if (!id || !uuidValidator(id)) {
        throw new BadParamError('Invalid node ID');
    }
};

export default class NodesFacade {
    constructor(client) {
        this.client = client;
    }

    list() {
        return this.client.get(endpoint);
    }

    create(data) {
        return this.client.post(`${endpoint}`, data);
    }

    get(id) {
        validateId(id);
        return this.client.get(`${endpoint}/${id}`);
    }

    update(id, data) {
        validateId(id);
        return this.client.post(`${endpoint}/${id}`, data);
    }

    delete(id) {
        validateId(id);
        return this.client.delete(`${endpoint}/${id}`);
    }

    upgrade(id) {
        validateId(id);
        return this.client.post(`${endpoint}/${id}/upgrade`);
    }

    downgrade(id) {
        validateId(id);
        return this.client.post(`${endpoint}/${id}/downgrade`);
    }

    rebuild(id) {
        validateId(id);
        return this.client.post(`${endpoint}/${id}/rebuild`);
    }

    rewards(id, page) {
        validateId(id);
        page = Math.max(page || 1, 1);
        
        return this.client.get(`${endpoint}/${id}/rewards?page=${page}`);
    }
}