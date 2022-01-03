import { createApp } from 'vue';
import App from './App.vue';
import GridEditorSidebar from './components/Grid/GridEditorSidebar.vue';
import mitt from 'mitt';
const emitter = mitt();

export function settingPaneComponent(componentName) {
    return GridEditorSidebar;
}

const app = createApp(App);
app.provide('emitter', emitter);
app.mount('#app');
