import { createApp } from 'vue';
import App from './App.vue';
import GridEditorSidebar from './components/Grid/GridEditorSidebar.vue';

export function settingPaneComponent(componentName) {
    return GridEditorSidebar;
}
createApp(App).mount('#app');
