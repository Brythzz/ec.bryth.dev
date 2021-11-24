export const getLocalStorageJson = (key) => {
    try {
        const json = localStorage.getItem(key) || '{}';
        return JSON.parse(json);
    } catch(e) {
        localStorage.setItem(key, '{}');
        return {};
    }
}