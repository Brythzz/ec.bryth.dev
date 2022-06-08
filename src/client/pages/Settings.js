import ToggleSwitch from '../components/ToggleSwitch';
import BackButton from '../components/BackButton';
import { getLocalStorageItem, post, get } from '../utils';


//////////////////////////////////////////////////
//  SETTINGS
//////////////////////////////////////////////////

export default {
    props: ['setGrades', 'cachedGrades', 'enablePinkTheme'],

    data() {
        return {
            showDucky: false,
            pinkTheme: false,
            isDecember: new Date().getMonth() === 11
        }
    },

    render({ logout, toggleDukcy, showDucky, togglePink, pinkTheme, cachedGrades, isDecember }) {
        if (!cachedGrades) return null;

        return (
            <>  
                <BackButton route='/grades'/>
                <div class="setting" onClick={toggleDukcy}>Gentil canard<ToggleSwitch state={showDucky}/></div>
                <div class="setting" onClick={togglePink}>Thème rose<ToggleSwitch state={pinkTheme}/></div>
                <div class="setting disconnect" onClick={logout}>Se déconnecter</div>
                <svg class={'ducky' + (showDucky ? ' shown' : '') + (pinkTheme ? ' pink' : '')} viewBox="0 0 128.598 139"><path d="M124.38 66.38c0 6.44-2.74 39.56-61.23 13.48 0 0-30.18-15.09-36.33.28-3.29 8.22-12.5 10.77-20.35 11.35q-2.49.186-4.99.14l-1.47-.04L0 .13A16.124 16.124 0 0 1 2.14 0c4.71 0 13.31 1.23 23.87 3.63 36 8.14 94.65 29.74 98.34 61.7 0 0 .03.38.03 1.05z" fill="#f3ba35"/><ellipse cx="82.516" cy="73.114" rx="4.938" ry="9.828" transform="matrix(.188787 -.982018 .982018 .188787 -4.861 140.344)" fill="#f6f8f8"/><ellipse cx="87.573" cy="73.172" rx="2.315" ry="3.774" transform="matrix(.300123 -.9539 .9539 .300123 -8.508 134.748)"/><path d="M26.01,3.63C23.3,10.21,7.47,50.33,6.47,91.49l-1.21.08-1.69.06H1.48L.01,91.59,0,.13A16.124,16.124,0,0,1,2.14,0c.167,0,.333,0,.5.01.3,0,.61.01.93.02.67.03,1.41.08,2.2.15.2.01.4.03.6.05q2.387.23,4.76.58.376.048.75.11l.42.06q.555.09,1.14.18l1.5.25a.538.538,0,0,1,.12.02q.765.135,1.56.27,2.445.45,5.12,1l1.04.22Z" fill="#f3a735"/><path d="M25.43,54.99c-.66,0-15.54.1-25.43,8.73v3.71a1.308,1.308,0,0,0,.49-.33c4.49-4.6,10.68-6.92,15.77-8.1a46.153,46.153,0,0,1,9.17-1.21,1.4,1.4,0,0,0,0-2.8Z"/><path d="M94.121 35.585l-.464 3.923a28.732 28.732 0 0 0-.041 3.228 20.675 20.675 0 0 0 .276 2.592 14.953 14.953 0 0 0 .49 2.013 10.937 10.937 0 0 0 .6 1.492 8.016 8.016 0 0 0 .6 1.03 5.287 5.287 0 0 0 .5.625 2.859 2.859 0 0 0 .292.28l.036.028c2.236 1.956 25.15 3.353 24.871-16.487.044-5.879-7.821-4.147-17.027-1.124-.016-.005-.018-.01-.017-.014a29.16 29.16 0 0 0 .336-4.277 11.065 11.065 0 0 0-.329-2.859 3.985 3.985 0 0 0-.841-1.662 2.249 2.249 0 0 0-1.2-.686 3.154 3.154 0 0 0-1.4.068 6.176 6.176 0 0 0-1.454.6 9.93 9.93 0 0 0-1.35.913c-1.975 1.363-3.185 5.05-3.878 10.317z" fill="#e1511d"/><path d="M104.229,34.03h0c12.574-4.471,12.015,1.677,12.015,1.677-.549,7.963-15.128,10.8-15.635,10.9-.014-.461-.008-11.495.265-13.412.278-1.948,1.388-6.39,2.777-7.255.016,0,.019.006.02.01a29.94,29.94,0,0,1,0,8.339c.009.014.014.015.018.013Z"/>
                    <g class={isDecember ? '' : 'hidden'} fill="#f1f2f2"><path d="M103.977,92.538c3.435,6.28,6.567,18.021,8.033,36.491,30.084-39.388,10.056-66.944,10.056-66.944Z" fill="#dd2e44"/><circle cx="111.238" cy="129.5" r="9.498"/><path d="M100.551 96.506c-2.371-.541-4.822-4.353-4.972-6.466 12.475-8.188 20.321-20.548 25.121-36.462 1.146-.458 4.309 4.535 5.925 6.59 3.875 4.932-21.236 38.8-26.074 36.338z"/></g>
                </svg>
            </>
        );
    },

    mounted() {
        if (!this.cachedGrades) {
            get('/api/v2/grades')
                .then(res => {
                    this.setGrades(res);
                })
                .catch(() => this.$router.push('/'));
        }

        this.pinkTheme = getLocalStorageItem('pinkTheme');
        this.showDucky = getLocalStorageItem('ducky');
    },

    methods: {
        logout() {
            post('/api/v2/logout')
                .then(() => this.$router.push('/'))
                .catch(console.error);
        },

        toggleDukcy() {
            this.showDucky = !this.showDucky;
            localStorage.setItem('ducky', this.showDucky);
        },

        togglePink() {
            this.pinkTheme = !this.pinkTheme;
            localStorage.setItem('pinkTheme', this.pinkTheme);
            this.enablePinkTheme(this.pinkTheme);
        }
    }
}
