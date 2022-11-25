import axios from 'axios';
const { post } = axios;

import UserAgent from 'user-agents';
const userAgent = new UserAgent();


/////////////////////////////////////
//  ECOLE DIRECTE
/////////////////////////////////////

export default class EcoleDirecte {
    baseApiUrl = 'https://api.ecoledirecte.com/v3/';
    userAgent = userAgent.random().toString();

    /////////////////////////////////////
    //  USER
    /////////////////////////////////////

    async getUser(username, password) {
        const url     = `${this.baseApiUrl}login.awp`;
        const body    = `data={"identifiant": "${username}", "motdepasse": "${password}"}`;
        const headers = { 'User-Agent': this.userAgent, 'Content-Type': 'application/x-www-form-urlencoded' };

        const res = await post(url, body, { headers });
        const account = res.data?.data?.accounts[0];

        if (!account) throw new Error('Identifiants invalides');
        if (account.typeCompte !== 'E') throw new Error('Veuillez utiliser un compte élève');

        const { id, idLogin:uid, prenom:name, nom:surname, nomEtablissement:school } = account;
        return { id, uid, name, surname, school, token: res.data.token };
    }

    /////////////////////////////////////
    //  GRADES
    /////////////////////////////////////

    async getGrades({ id, token, ua }) {
        const url     = `${this.baseApiUrl}eleves/${id}/notes.awp?verbe=get`;
        const body    = `data={"token": "${token}"}`;
        const headers = { 'User-Agent': ua || this.userAgent, 'Content-Type': 'application/x-www-form-urlencoded' };

        const res = await post(url, body, { headers });

        if (!res.data?.data?.notes) throw new Error(`Impossible de récupérer les notes`);

        const { notes: grades, periodes: terms } = res.data.data;
        if (!grades) throw new Error(res.data.message);

        return this.filterGrades(grades, terms);
    }

    filterGrades(gradeData, terms) {
        let grades = {
            "A001": {},
            "A002": {},
            "A003": {}
        };

        for (let grade of gradeData) {
            let value = grade.valeur.replace(',', '.');
            if (isNaN(value) || grade.nonSignificatif || value === '') continue;
            let coef = grade.coef.replace(',', '.')*1;

            const { codePeriode: termCode, codeMatiere: subjectCode } = grade;

            if (grades[termCode][subjectCode]) {
                grades[termCode][subjectCode].marks.push(((value / grade.noteSur.replace(',', '.')) * 20 * coef));
                grades[termCode][subjectCode].coef += coef;
            } else
                grades[termCode][subjectCode] = {
                    marks: [(value / grade.noteSur.replace(',', '.')) * 20 * coef],
                    coef,
                    name: grade.libelleMatiere
                };
        }

        for (let term in grades) {
            const termSubjectData = terms.find(t => t.idPeriode === term).ensembleMatieres.disciplines;

            for (let sub in grades[term]) {
                const subjectCoef = termSubjectData.find(s => s.codeMatiere === sub)?.coef || 1;
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
}
