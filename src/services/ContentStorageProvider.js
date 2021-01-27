'use strict';

import ContentStorageInterface from './ContentStorageInterface.js';

/**
 * My attempt of a service provider. Contains the current method of providing content.
 * An appliction would set the provider (seems just setting the variable would work)
 * to the service that should be used to save content.
 */
export default {
    provider: new ContentStorageInterface,

    setProvider(provider) {
        this.provider = provider;
    },

    getProvier() {
        return this.provider;
    }
};
