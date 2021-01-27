'use strict';

import ContentStorageInterface from './ContentStorageInterface.js';

/**
 * Example local storage implemention to load and save content in
 * local storage.
 */
export default class ContentStorageLocalStorage extends ContentStorageInterface {
    getContent() {
        // Get saved content from localStorage
        const savedContent = localStorage.getItem('savedcontent');

        // Check if there are any content
        if (savedContent) {
            // Parse it as the content is a JSON string
            const parsedContent = JSON.parse(savedContent);
            
            // Was the parse successful?
            if (parsedContent && parsedContent.length) {
                /*let contentList = [];
                for (let pc of parsedContent) {
                    this.addElement(pc.type, pc.value, pc.blocking);
                }*/

                return parsedContent;
            }
        }

        return [];
    }

    saveContent(content) {
        let listToSave = [];

        // Content is an array of vue objects, take the relevant content
        for (let cl of content) {
            listToSave.push({
                type: cl.type,
                value: cl.value,
                blocking: cl.blocking
            });
        }

        // Save relevant content in local storage
        localStorage.setItem(
            'savedcontent',
            JSON.stringify(listToSave)
        );
    }
}
