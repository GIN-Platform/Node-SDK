import 'babel-polyfill';
import assertThrowsAsync from './assertThrowsAsync';
import BlockchainsFacade from "../src/components/facades/BlockchainsFacade";
import NodesFacade from "../src/components/facades/NodesFacade";
import UserFacade from "../src/components/facades/UserFacade";

const assert = require('assert');
const GinPlatformNode = require('../src');

const sdk = new GinPlatformNode.Sdk();

describe('Sanity tests', () => {
    describe('Sdk', () => {
        it('should return an instance of Client', () =>
            assert(sdk.getClient() instanceof GinPlatformNode.Client)
        );
    });
    
    describe('Unauthenticated Client', () => {
        const client = sdk.getClient();
        
        it('should return the blockchains endpoint', async () => {
            const response = await client.request('/blockchains');
            
            assert(Array.isArray(response));
            assert(response.length > 0);
            assert(response[0].hasOwnProperty('id'));
        });
        
        it('should fail when calling authenticated endpoint without api key', async () => {
            assertThrowsAsync(() => client.request('/user'), /Unauthorized/);
        });
    });
    
    describe('Authenticated Client', () => {
        it('should throw unauthorized', async () => {
            const client = sdk.getClient('xxx');
            assertThrowsAsync(() => client.request('/user'), /Unauthorized/);
        });
        
        it('should return user data', async () => {
            const client = sdk.getClient('efc8e5c0-f674-11e8-bb9e-43f80c59952a');
            const data = await client.request('/user');
            
            assert(data.email === 'test@ginplatform.io');
        });
    });
    
    describe('Blockchains facade', () => {
        const client = sdk.getClient();
        
        it('should return the blockchains facade', async () => {
            assert(client.blockchains instanceof BlockchainsFacade);
        });
    });
    
    describe('Nodes facade', () => {
        const client = sdk.getClient();
        
        it('should return the nodes facade', async () => {
            assert(client.nodes instanceof NodesFacade);
        });
    });
    
    describe('User facade', () => {
        const client = sdk.getClient();
        
        it('should return the user facade', async () => {
            assert(client.user instanceof UserFacade);
        });
    });
});