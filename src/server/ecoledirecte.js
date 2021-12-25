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

        if (!account) throw 'Identifiants invalides';
        if (account.typeCompte !== 'E') throw 'Veuillez vous connecter avec un compte élève';

        const { id, uid, prenom: name, nom: surname, nomEtablissement:school } = account;
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

        const grades = res.data.data.notes;
        if (!grades) throw res.data.message;

        return this.filterGrades(grades);
    }

    filterGrades(gradeData) {
        let grades = {
            "A001": {},
            "A002": {},
            "A003": {}
        };

        for (let grade of gradeData) {
            let value = grade.valeur.replace(',', '.');
            if (isNaN(value) || grade.nonSignificatif) continue;
            let coef = grade.coef.replace(',', '.')*1;

            if (grades[grade.codePeriode][grade.codeMatiere]) {
                grades[grade.codePeriode][grade.codeMatiere].marks.push(((value / grade.noteSur.replace(',', '.')) * 20 * coef));
                grades[grade.codePeriode][grade.codeMatiere].coef += coef;
            } else
                grades[grade.codePeriode][grade.codeMatiere] = { "marks": [(value / grade.noteSur.replace(',', '.')) * 20 * coef], "coef": coef, "name": grade.libelleMatiere };
        }

        for (let term in grades)
            for (let sub in grades[term])
                grades[term][sub] = { "value": Math.round(((grades[term][sub].marks.reduce((a,b) => a+b, 0) / grades[term][sub].coef) + Number.EPSILON) * 100) / 100, "name": grades[term][sub].name };

        return grades;
    }
}
