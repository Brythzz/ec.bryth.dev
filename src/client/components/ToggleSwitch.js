
//////////////////////////////////////////////////
//  TOGGLE SWITCH
//////////////////////////////////////////////////

export default {
    props: ['state'],

    render({ state }) {
        return (
            <div role="switch" aria-checked={state} class={'switch' + (state ? ' on' : '')}></div>
        );
    }
}
