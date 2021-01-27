'use strict';

/**
 * This is the interface for loading and saving content
 * and should be extended so that it will use your appliction's
 * way to load and save. For example http request to server.
 */
export default class ContentSaverInterface {
    getContent() {
    }

    saveContent(content) {
    }
}
