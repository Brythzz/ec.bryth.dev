import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { get } from './utils';


//////////////////////////////////////////////////
//  PAGES
//////////////////////////////////////////////////

import App from './pages/App';
import Login from './pages/Login';
import Grades from './pages/Grades';
import Settings from './pages/Settings';
import Experiments from './pages/Experiments';


//////////////////////////////////////////////////
//  ROUTES
//////////////////////////////////////////////////

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Login },
        { path: '/grades', name: 'grades', component: Grades, props: true },
        { path: '/settings', component: Settings },
        { path: '/experiments', component: Experiments },
        { path: '/:404(.*)', redirect: '/' }
    ]
});

router.beforeEach((to, _, next) => {
    if (to.path === '/') {
        // Optional chaning creates issues with older browsers
        const cookies = document.cookie.split(/; ?/);
        const uid = cookies ? cookies.find(row => row.startsWith('id=')) : null;
        const autoLogin = uid ? uid.split('=')[1] : null;

        if (autoLogin)
            get('/api/v2/grades')
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
