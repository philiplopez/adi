export default class Injector {

    constructor() {
        this._cache = new Map();
    }

    get(type) {
        let instance = this._cache.get(type);
        if (instance === undefined) {
            instance = new type();
            this._cache.set(type, instance);
        }
        return instance;
    }
};