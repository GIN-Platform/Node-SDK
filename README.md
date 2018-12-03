GIN Platform API Node.js SDK
============================

Usage
-----

The package is available in the npm registry:

```bash
npm install gin-platform-node-sdk --save
```

ES6 module system usage:

```js
import { Sdk } from 'gin-platform-node-sdk'

const sdk = new Sdk()
const apiKey = '...secret...'
const client = sdk.getClient(apiKey)

await client.blockchains.list() //get blockchains list
await client.blockchains.get('gincoin') //get the gincoin blockchain

await client.nodes.list() //get all my nodes
await client.nodes.get('replace-with-node-id') //get all my nodes
await client.nodes.create({ blockchain: 'gincoin', collateral: 1000, txid: 'tx-id-here', dedicated: true }) //create a node
await client.nodes.delete('replace-with-node-id') //delete a node

await client.user.get() //get current user's details
await client.user.transactions() //get current user's billing transactions
```

ES5 module system usage:

```js
const Sdk = require('gin-platform-node-sdk').Sdk;
const sdk = new Sdk();
```

Developement
------------
Requirements:

- Node.js >= 8
- Babel
- Mocha

```bash
npm install -g mocha babel-cli
```

Installation:

```bash
git clone https://github.com/GIN-Platform/Node-SDK.git
cd Node-SDK
npm install
npm test
```

Build NPM package:

```bash
npm run build #the distribution should be produced in the /dist directory
npm run distrib #will upload the contents of /dist to the npm registry
```