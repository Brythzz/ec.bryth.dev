export const fetchExperiments = () => {
    try {
        const exp = localStorage.getItem('experiments') || '{}';
        return JSON.parse(exp);
    } catch(e) {
        localStorage.setItem('experiments', '{}');
        return {};
    }
}