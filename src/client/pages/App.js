import ThemeSelector from '../components/ThemeSelector';
import { getLocalStorageJson } from '../utils';


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

    render({ setTheme, themes, themeId, setGrades, cachedGrades, updateThemes }) {
        return (
            <main class={themes[themeId]}>
                <div class="content">
                    <router-view setGrades={setGrades} cachedGrades={cachedGrades} updateThemes={updateThemes}/>
                    <ThemeSelector setTheme={setTheme} themes={themes} />
                </div>
                <div class="image"></div>
            </main>
        );
    },

    created() {
        const themeId = localStorage.getItem('theme') || 5;
        this.updateThemes()
        this.setTheme(themeId);
        
        this.sendConsoleMessage();
    },

    methods: {
        setTheme(themeId) {
            this.themeId = themeId;
            localStorage.setItem('theme', themeId);
        },

        isPinkActive() {
            return getLocalStorageJson('experiments')['pinkTheme'];
        },

        updateThemes() {
            this.themes[1] = this.isPinkActive() ? 'pink' : 'purple';
        },

        setGrades(grades) {
            this.cachedGrades = grades;
        },

        sendConsoleMessage() {
            const css = 'background: #e0005a; color: #fff; font-weight: bold; padding: 3px 8px; border-radius: 3px;'
            console.log('%cVersion', css, '2.2.1');
            console.log('%cTwitter', css, '@Brythzz');
        }
    }
}
