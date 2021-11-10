import ThemeSelector from '../components/ThemeSelector';

//////////////////////////////////////////////////
//  APP
//////////////////////////////////////////////////


export default {

    data() {
        return {
            themes: ['red', 'purple', 'blue', 'green', 'yellow', 'white'],
            theme: '',
            cachedGrades: null
        }
    },

    render({ setTheme, themes, theme, setGrades, cachedGrades }) {
        return (
            <main class={theme}>
                <div class="content">
                    <router-view setGrades={setGrades} cachedGrades={cachedGrades}/>
                    <ThemeSelector setTheme={setTheme} themes={themes} />
                </div>
                <div class="image"></div>
            </main>
        );
    },

    created() {
        const themeId = localStorage.getItem('theme') || 5;
        this.setTheme(themeId);
        
        this.sendConsoleMessage()
    },

    methods: {
        setTheme(themeId) {
            this.theme = this.themes[themeId];
            localStorage.setItem('theme', themeId);
        },

        setGrades(grades) {
            this.cachedGrades = grades;
        },

        sendConsoleMessage() {
            const css = 'background: #e0005a; color: #fff; font-weight: bold; padding: 3px 8px; border-radius: 3px;'
            console.log('%cVersion', css, '2.1.1');
            console.log('%cTwitter', css, '@Brythzz');
        }
    }
}
