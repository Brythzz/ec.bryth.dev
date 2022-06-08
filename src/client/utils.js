export const getLocalStorageItem = (key) => {
    try {
        const json = localStorage.getItem(key) || 'false';
        return JSON.parse(json);
    } catch(e) {
        localStorage.setItem(key, 'false');
        return false;
    }
}

export const get = async (url) => {
    const res = await fetch(url);

    if (res.status !== 200)
        throw new Error(`${res.status} ${res.statusText}`);
    
    return res.json();
}

export const post = async (url, body) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (res.status !== 200)
        throw new Error(`${await res.text()}`);
    
    return res;
}