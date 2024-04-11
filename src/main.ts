import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from '@/components/UI';
import './style.css';

const app = createApp(App);

components.forEach(component => {
  app.component(component.name, component.component);
});

app.use(router).use(store).mount('#app');
