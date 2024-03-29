import ThemeSelector from '../components/ThemeSelector';
import { getLocalStorageItem } from '../utils.js';


//////////////////////////////////////////////////
//  APP
//////////////////////////////////////////////////

export default {

    data() {
        return {
            themes: ['red', 'purple', 'blue', 'green', 'yellow', 'white'],
            themeId: 0,
            cachedGrades: null
        }
    },

    render({ setTheme, themes, themeId, setGrades, cachedGrades, enablePinkTheme }) {
        return (
            <main class={themes[themeId]}>
                <div class="content">
                    <router-view setGrades={setGrades} cachedGrades={cachedGrades} enablePinkTheme={enablePinkTheme} />
                    <ThemeSelector setTheme={setTheme} themes={themes} />
                </div>
                <div class="image"></div>
            </main>
        );
    },

    created() {
        const pinkTheme = getLocalStorageItem('pinkTheme');
        this.enablePinkTheme(pinkTheme);

        const themeId = getLocalStorageItem('theme') || 5;
        this.setTheme(themeId);

        this.sendConsoleMessage();
    },

    methods: {
        setTheme(themeId) {
            this.themeId = themeId;
            localStorage.setItem('theme', themeId);
        },

        enablePinkTheme(enable) {
            this.themes[1] = enable ? 'pink' : 'purple';
            if (enable) this.themeId = 1;
        },

        setGrades(grades) {
            this.cachedGrades = grades;
        },

        sendConsoleMessage() {
            const css = 'background: #e0005a; color: #fff; font-weight: bold; padding: 3px 8px; border-radius: 3px;'
            console.log('%cVersion', css, '2.4.1');
            console.log('%cTwitter', css, '@Brythzz');
            console.log('%cDiscord', css, 'bryth');
            console.log('%cImage', css + 'background: #33b878', 'https://unsplash.com/photos/Wv_YC0dRF5c');
            console.log('%cSources', css + 'background: #0d1117', 'https://github.com/Brythzz/ec.bryth.dev');
        }
    }
}
