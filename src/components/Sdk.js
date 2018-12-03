import Client from "./Client";

export default class Sdk {
    getClient(apiKey) {
        return new Client({ apiKey })
    }
}