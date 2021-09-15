
//////////////////////////////////////////////////
//  THEME SELECTOR
//////////////////////////////////////////////////


export default {
    props: ['setTheme', 'themes'],

    render({ themes, setTheme }) {
        return (
            <div class="theme-selector" onclick="">
                <svg viewBox="0 0 24 24" fill="#fff"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,17.5V4.5a7.5,7.5,0,0,1,0,15Z"/></svg>
                { themes.map((theme, themeIdx) => (<div onClick={() => setTheme(themeIdx)} class={`color-selector ${theme}`}></div>))}
            </div>
        );
    }
}
