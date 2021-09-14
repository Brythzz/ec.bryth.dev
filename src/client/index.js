import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { get } from 'axios';


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
        const autoLogin = document.cookie?.split(/; ?/)?.find(row => row.startsWith('id='))?.split('=')[1];

        if (autoLogin)
            get('/api/v2/grades')
                .then((res) => next({ name: 'grades', params: { grades: JSON.stringify(res.data) } }))
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
