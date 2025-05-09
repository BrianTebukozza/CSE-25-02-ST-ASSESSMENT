import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Ecommerce.vue';


const router = createRouter({ 
    history: createWebHistory(),
    routes: [
        { path: '/ecommerce', name: 'Ecommerce', component: Ecommerce },
    ]
});



export default router;