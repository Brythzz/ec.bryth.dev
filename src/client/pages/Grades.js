import Graph from '../components/Graph';
import { get } from '../utils';


//////////////////////////////////////////////////
//  GRADES
//////////////////////////////////////////////////

export default {
    props: ['cachedGrades', 'grades', 'setGrades'],

    data() {
        return {
            userGrades: this.grades,
            currentTabIndex: this.getSchoolTrimester(),
            tabs: ['1er', '2ème', '3ème'],
        }
    },

    render({ tabs, currentTabIndex, userGrades, renderGrades }) {
        return (
            <>
                <nav>
                    <div>{ tabs.map((tab, tabIdx) => <span key={tabIdx} class={(currentTabIndex === tabIdx) ? 'active' : ''} onClick={() => this.currentTabIndex = tabIdx}>{tab}</span>) }</div>
                    <router-link to='/settings'><svg width="42" height="42"><path d="M21.5 35a3.5 3.5 0 1 1 0-7 3.5 3.5 0 1 1 0 7zm0-10.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 1 1 0 7zm0-10.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 1 1 0 7z" fill="#fff"/></svg></router-link>
                </nav>
                { !userGrades && <div class="spinner"></div> }
                { userGrades && Object.keys(userGrades).map((t, tIdx) => renderGrades(userGrades[t], tIdx)) }
            </>
        );
    },

    mounted() {
        this.getGrades();
    },

    methods: {
        getGrades() {
            const grades = this.grades ? JSON.parse(this.grades) : this.cachedGrades;

            if (!grades)
                get('/api/v2/grades')
                    .then(res => {
                        this.setGrades(res)
                        this.userGrades = res;
                    })
                    .catch(() => this.$router.push('/'));

            else {
                this.setGrades(grades);
                this.userGrades = grades;
            }
        },

        getSchoolTrimester() {
            const date = new Date();
            const month = date.getMonth() + 1;

            const isFirstTrimester = month > 8 && month < 12;
            const isSecondTrimester = month > 11 || month < 3;

            if (isFirstTrimester) return 0;
            if (isSecondTrimester) return 1;
            return 2;
        },

        renderGrades(grades, tIdx) {
            const keys = Object.keys(grades).filter(key => grades[key].value !== null);

            if (keys.length === 0)
                return (this.currentTabIndex === tIdx) && <p class="no-content">Il n'y a rien à afficher<br/>pour le moment !</p>;

            const sum = keys.reduce((sum, key) => sum + grades[key].value * grades[key].coef, 0);
            const len = keys.reduce((len, key) => len + grades[key].coef, 0);

            return (
                <div style={{ display: (this.currentTabIndex === tIdx ? 'block' : 'none') }}>
                    <Graph value={sum/len} />
                    { keys.map((subject, idx) =>
                        <div class="grade" key={idx}>
                            <span>{this.capitalize(grades[subject].name)}</span>
                            <span>{grades[subject].value}</span>
                        </div>
                    ) }
                </div>
            )
        },

        capitalize(str) {
            return str
                ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                : '';
        }
    }
}
