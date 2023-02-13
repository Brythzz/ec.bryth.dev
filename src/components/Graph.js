
//////////////////////////////////////////////////
//  THEME SELECTOR
//////////////////////////////////////////////////

export default {
    props: ['value'],

    data() {
        return {
            offset: 280
        }
    },

    render({ value, offset }) {
        return (
            <svg class="circle" viewBox="0 0 100 100">
                <text text-anchor="middle" y="58.5" x="50%">{value.toFixed(2)}</text>
                <circle cx="50" cy="50" r="46" stroke="#c7b9ff" opacity=".1"/>
                <circle cx="50" cy="50" r="46" stroke="#fff" style={'stroke-dashoffset:'+offset+';'}/>
            </svg>
        );
    },

    mounted() {
        setTimeout(() => {
            this.offset = 314.16 - (this.value / 20 * 314.16);
        }, 250);
    }
}
