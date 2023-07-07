export const getLocalStorageItem = (key) => {
    try {
        const json = localStorage.getItem(key) || 'false';
        return JSON.parse(json);
    } catch(e) {
        localStorage.setItem(key, 'false');
        return false;
    }
}

const filterGrades = (gradeData, terms) => {
    let grades = {
        "A001": {},
        "A002": {},
        "A003": {}
    };

    for (let grade of gradeData) { // Sort grades by term and subject
        let value = grade.valeur.replace(',', '.');
        if (isNaN(value) || grade.nonSignificatif || value === '') continue;
        let coef = grade.coef.replace(',', '.')*1;

        const { codePeriode: term, codeMatiere: subject } = grade;
        const mark = (value / grade.noteSur.replace(',', '.')) * 20 * coef;

        if (!grades[term][subject]) {
            grades[term][subject] = {
                marks: [],
                coef: 0,
                name: grade.libelleMatiere
            };
        }

        grades[term][subject].marks.push(mark);
        grades[term][subject].coef += coef;
    }

    for (let term in grades) { // Calculate mean for each subject by term
        const termSubjectData = terms.find(t => t.idPeriode === term).ensembleMatieres.disciplines;

        for (let sub in grades[term]) {
            const subjectCoef = termSubjectData.find(s => s.codeMatiere === sub)?.coef ?? 1;
            const { marks, name, coef } = grades[term][sub];

            const mean = Math.round((marks.reduce((a, b) => a + b, 0) / coef) * 100) / 100;

            grades[term][sub] = {
                value: mean,
                name: name,
                coef: subjectCoef
            };
        }
    }

    return grades;
}

const baseApiUrl = 'https://api.ecoledirecte.com/v3/';

export const fetchGrades = async ({id, token}) => {
    const url     = `${baseApiUrl}eleves/${id}/notes.awp?verbe=get`;
    const body    = `data={"token": "${token}"}`;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const res = await fetch(url, { method: 'POST', headers, body });
    const data = await res.json();

    if (!data?.data?.notes) throw new Error('Impossible de récupérer les notes');

    const { notes: grades, periodes: terms } = data.data;
    if (!grades) throw new Error(data.message);

    return filterGrades(grades, terms);
}

const fetchUser = async (username, password) => {
    const url     = `${baseApiUrl}login.awp`;
    const body    = `data={"identifiant": "${username}", "motdepasse": "${password}"}`;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const res = await fetch(url, { method: 'POST', headers, body });
    const data = await res.json();

    const account = data?.data?.accounts[0];

    if (!account) throw new Error('Identifiants invalides');
    if (account.typeCompte !== 'E') throw new Error('Veuillez utiliser un compte élève');

    return { id: account.id, token: data.token };
}

export const fetchUserData = async (username, password) => {
    const user = await fetchUser(username, password);
    const grades = await fetchGrades(user);

    return { ...user, grades };
}

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
}
