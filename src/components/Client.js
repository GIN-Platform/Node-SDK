import UnauthorizedError from '../errors/UnauthorizedError'
import ForbiddenError from '../errors/ForbiddenError'
import ValidationError from "../errors/ValidationError";
import fetch from 'node-fetch'
import NotFoundError from "../errors/NotFoundError";
import BlockchainsFacade from "./facades/BlockchainsFacade";
import NodesFacade from "./facades/NodesFacade";
import UserFacade from "./facades/UserFacade";
import Bottleneck from "bottleneck";

const apiUrl = process.env.GIN_PLATFORM_API_URL || 'https://api.ginplatform.io';

const handleError = async (response) => {
    const techError = 'A technical error occurred';
    
    if (response.status >= 200 && response.status < 400) {
        return response.json();
    } else if (response.status === 401) {
        throw new UnauthorizedError('Unauthorized!');
    } else if (response.status === 403) {
        throw new ForbiddenError('Forbidden');
    } else if (response.status === 404) {
        throw new NotFoundError('Not Found!');
    } else if (response.status >= 400 && response.status < 500) {
        const json = await response.json();
        throw new ValidationError(json.error || techError);
    } else {
        throw new Error(techError);
    }
};

const rateLimiter = new Bottleneck({
    minTime: 500,
    maxConcurrent: 2
});

export default class Client {
    constructor(options) {
        this.apiKey = options.apiKey;
    }

    request(endpoint, method, data) {
        const options = {
            method: method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        return rateLimiter.schedule(() => fetch(apiUrl + endpoint, options)).then(handleError);
    }
    
    get(endpoint) {
        return this.request(endpoint);
    }
    
    post(endpoint, data) {
        return this.request(endpoint, 'POST', data);
    }
    
    delete(endpoint, data) {
        return this.request(endpoint, 'DELETE', data);
    }
    
    get blockchains() {
        return new BlockchainsFacade(this);
    }
    
    get nodes() {
        return new NodesFacade(this);
    }
    
    get user() {
        return new UserFacade(this);
    }
}