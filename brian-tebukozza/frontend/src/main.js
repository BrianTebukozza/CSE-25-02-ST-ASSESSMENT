import { createApp } from 'vue';
import './style.css';
import App from './App.vue'; // Your main App component
import { createRouter, createWebHistory } from 'vue-router';
import Ecommerce from './views/Ecommerce.vue'; // Assuming Ecommerce.vue is in src/views

// 1. Define your routes
const routes = [
  { 
    path: '/ecommerce', 
    name: 'Ecommerce',
    component: Ecommerce // Directly import and use
  },
  // You can add a redirect for the root path if needed
  { path: '/', redirect: '/ecommerce' } 
];

// 2. Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 3. Create and mount the Vue app
const app = createApp(App);
app.use(router); // Use the router
app.mount('#app');