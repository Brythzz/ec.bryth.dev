import ToggleSwitch from '../components/ToggleSwitch';
import BackButton from '../components/BackButton';
import { fetchExperiments } from '../utils';


//////////////////////////////////////////////////
//  EXPERIMENTS
//////////////////////////////////////////////////

// Add new experiments here
const experiments = ['ignoreCs'];

export default {
    data() {
        return {
            activeExperiments: null
        }
    },

    render({ activeExperiments, toggleExperiment }) {
        return (
            <>
                <BackButton route="/settings"/>
                {activeExperiments && experiments.map((exp, expIdx) =>
                    <div class="setting" key={expIdx} onClick={() => toggleExperiment(exp)}>{exp}<ToggleSwitch state={activeExperiments[exp]}/></div>)
                }
            </>
        );
    },
    
    created() {
        this.activeExperiments = fetchExperiments();
    },

    methods: {
        toggleExperiment(experimentName) {
            const isEnabled = this.activeExperiments[experimentName];
            this.activeExperiments[experimentName] = !isEnabled;
            localStorage.setItem('experiments', JSON.stringify({ ...this.activeExperiments, [experimentName]: !isEnabled }));
        }
    }
}
