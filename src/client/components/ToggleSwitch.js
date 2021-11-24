
//////////////////////////////////////////////////
//  TOGGLE SWITCH
//////////////////////////////////////////////////

export default {
    props: ['state'],

    render({ state }) {
        return (
            <div class={'switch' + (state ? ' on' : '')}></div>
        );
    }
}
