import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { fetchGrades } from './utils';

//////////////////////////////////////////////////
//  PAGES
//////////////////////////////////////////////////

import App from './pages/App';
import Login from './pages/Login';
import Grades from './pages/Grades';
import Settings from './pages/Settings';


//////////////////////////////////////////////////
//  ROUTES
//////////////////////////////////////////////////

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Login },
        { path: '/grades', name: 'grades', component: Grades, props: true },
        { path: '/settings', component: Settings },
        { path: '/:404(.*)', redirect: '/' }
    ]
});

router.beforeEach((to, _, next) => {
    if (to.path === '/') {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');

        if (id && token)
            fetchGrades({ id, token })
                .then((res) => next({ name: 'grades', params: { grades: JSON.stringify(res) } }))
                .catch(() => next());
        else next();
    }
    else next();
});


//////////////////////////////////////////////////
//  MAIN
//////////////////////////////////////////////////

const app = createApp(App).use(router);

router.isReady().then(() => {
    app.mount('body');
});
