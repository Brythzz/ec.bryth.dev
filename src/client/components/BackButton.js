
//////////////////////////////////////////////////
//  BACK BUTTON
//////////////////////////////////////////////////

export default {
    props: ['route'],

    render({ route }) {
        return (
            <router-link to={route} role="button"><svg width="42" height="42"><path d="M14.513 19.763a1.75 1.75 0 0 0 0 2.475l8.75 8.75a1.75 1.75 0 0 0 2.928-.785 1.75 1.75 0 0 0-.453-1.69L18.225 21l7.513-7.513a1.75 1.75 0 0 0-2.475-2.474z" fill="#fff"/></svg></router-link>
        );
    },
}
