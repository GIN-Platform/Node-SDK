export default class BadParamError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadParamError";
    }
}