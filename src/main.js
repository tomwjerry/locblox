import ContentStorageLocalStorage from './services/ContentStorageLocalStorage.js';
import ContentStorageProvider from './services/ContentStorageProvider.js';
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

ContentStorageProvider.setProvider(new ContentStorageLocalStorage);

createApp(App).mount('#app');
