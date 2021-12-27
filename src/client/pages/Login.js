import { post } from '../utils';


//////////////////////////////////////////////////
//  LOGIN
//////////////////////////////////////////////////

export default {
    props: ['setGrades', 'cachedGrades'],

    data() {
        return {
            username: {
                value: '',
                valid: true
            },
            password: {
                value: '',
                valid: true
            },
            keepLoggedIn: false,

            error: null,
            shake: false,
            loading: false
        }
    },

    render({ username, password, handleSubmit, error, shake, loading }) {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <h1>Ecole Directe</h1>

                    <input onChange={(e) => (this.username.value = e.target.value)}
                        class={`${username.value ? 'filled' : ''}${(!username.valid) ? ' invalid' : ''}`}
                        type="text" name="username" autocomplete="username" spellcheck="false" aria-label="Identifiant"/>
                    <p aria-hidden="true">Identifiant</p>

                    <input onInput={(e) => (this.password.value = e.target.value)}
                        class={`${password.value ? 'filled' : ''}${(!password.valid) ? ' invalid' : ''}`}
                        type="password" name="password" autocomplete="current-password" aria-label="Mot de passe"/>
                    <p aria-hidden="true">Mot de passe</p>

                    <div class="check">
                        <input onChange={(e) => (this.keepLoggedIn = e.target.checked)} type="checkbox" name="save" id="save"/>
                        <svg viewBox="0 0 21 21" fill="none">
                            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
                        </svg>
                    </div>
                    <label for="save">Rester connecté(e)</label>

                    <button disabled={!!loading}>Se connecter</button>
                </form>
                { error && <div class={'error' + (shake ? ' shake' : '')}>{error}</div> }
            </>
        );
    },

    methods: {
        handleSubmit(e) {
            e.preventDefault();

            const isInputValid = this.validateForm();
            if (isInputValid) this.login();
        },

        validateForm() {
            this.username.valid = !!this.username.value;
            this.password.valid = !!this.password.value;

            return this.username.valid && this.password.valid;
        },

        login() {
            const { username, password, keepLoggedIn } = this;
            const body = { username: username.value, password: password.value, keepLoggedIn };
            this.loading = true;

            post('/api/v2/login', body)
                .then(res => res.json())
                .then((json) => this.$router.push({ name: 'grades', params: { grades: JSON.stringify(json.grades) } }))

                .catch(err => {
                    this.error = err.message;

                    this.loading = false;
                    this.shake = true;
                    setTimeout(() => this.shake = false, 500);
                });
        }
    }
}
