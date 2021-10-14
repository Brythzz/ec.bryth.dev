!function(e,t,a){"use strict";var s={props:["setTheme","themes"],render:({themes:t,setTheme:a})=>e.createVNode("div",{class:"theme-selector",onclick:""},[e.createVNode("svg",{viewBox:"0 0 24 24",fill:"#fff"},[e.createVNode("path",{d:"M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,17.5V4.5a7.5,7.5,0,0,1,0,15Z"},null)]),t.map(((t,s)=>e.createVNode("div",{onClick:()=>a(s),class:`color-selector ${t}`},null)))])},r={data:()=>({themes:["red","purple","blue","green","yellow","white"],theme:"",cachedGrades:null}),render:({setTheme:t,themes:a,theme:r,setGrades:o,cachedGrades:l})=>e.createVNode("main",{class:r},[e.createVNode("div",{class:"content"},[e.createVNode(e.resolveComponent("router-view"),{setGrades:o,cachedGrades:l},null),e.createVNode(s,{setTheme:t,themes:a},null)]),e.createVNode("div",{class:"image"},null)]),created(){const e=localStorage.getItem("theme")||5;this.setTheme(e),this.sendConsoleMessage()},methods:{setTheme(e){this.theme=this.themes[e],localStorage.setItem("theme",e)},setGrades(e){this.cachedGrades=e},sendConsoleMessage(){const e="background: #e0005a; color: #fff; font-weight: bold; padding: 3px 8px; border-radius: 3px;";console.log("%cVersion",e,"2.0.0"),console.log("%cTwitter",e,"@Brythzz")}}},o={props:["setGrades","cachedGrades"],data:()=>({username:{value:"",valid:!0},password:{value:"",valid:!0},keepLoggedIn:!1,error:null,shake:!1,loading:!1}),render({username:t,password:a,handleSubmit:s,error:r,shake:o,loading:l}){return e.createVNode(e.Fragment,null,[e.createVNode("form",{onSubmit:s},[e.createVNode("h1",null,[e.createTextVNode("Ecole Directe")]),e.createVNode("input",{onChange:e=>this.username.value=e.target.value,class:`${t.value?"filled":""}${t.valid?"":" invalid"}`,type:"text",name:"username",autocomplete:"username"},null),e.createVNode("p",null,[e.createTextVNode("Identifiant")]),e.createVNode("input",{onInput:e=>this.password.value=e.target.value,class:`${a.value?"filled":""}${a.valid?"":" invalid"}`,type:"password",name:"password",autocomplete:"current-password"},null),e.createVNode("p",null,[e.createTextVNode("Mot de passe")]),e.createVNode("div",{class:"check"},[e.createVNode("input",{onChange:e=>this.keepLoggedIn=e.target.checked,type:"checkbox",name:"save"},null),e.createVNode("svg",{viewBox:"0 0 21 21",fill:"none"},[e.createVNode("polyline",{points:"5 10.75 8.5 14.25 16 6"},null)])]),e.createVNode("label",{for:"save"},[e.createTextVNode("Rester connecté(e)")]),e.createVNode("button",{disabled:!!l},[e.createTextVNode("Se connecter")])]),r&&e.createVNode("div",{class:"error"+(o?" shake":"")},[r])])},methods:{handleSubmit(e){e.preventDefault();this.validateForm()&&this.login()},validateForm(){return this.username.valid=!!this.username.value,this.password.valid=!!this.password.value,this.username.valid&&this.password.valid},login(){const{username:e,password:t,keepLoggedIn:s}=this,r={username:e.value,password:t.value,keepLoggedIn:s};this.loading=!0,a.post("/api/v2/login",r).then((e=>this.$router.push({name:"grades",params:{grades:JSON.stringify(e.data.grades)}}))).catch((e=>{this.error=e.response.data,this.loading=!1,this.shake=!0,setTimeout((()=>this.shake=!1),500)}))}}},l={props:["value"],data:()=>({offset:280}),render:({value:t,offset:a})=>e.createVNode("svg",{class:"circle",viewBox:"0 0 100 100"},[e.createVNode("text",{"text-anchor":"middle",y:"58.5",x:"50%"},[t.toFixed(2)]),e.createVNode("circle",{cx:"50",cy:"50",r:"46",stroke:"#c7b9ff",opacity:".1"},null),e.createVNode("circle",{cx:"50",cy:"50",r:"46",stroke:"#fff",style:"stroke-dashoffset:"+a+";"},null)]),mounted(){setTimeout((()=>{this.offset=314.16-this.value/20*314.16}),250)}};const n=()=>{try{const e=localStorage.getItem("experiments")||"{}";return JSON.parse(e)}catch(e){return localStorage.setItem("experiments","{}"),{}}};var d={props:["cachedGrades","grades","setGrades"],data(){return{userGrades:this.grades,currentTabIndex:this.getSchoolTrimester(),tabs:["1er","2ème","3ème"],hideCs:!1}},render({tabs:t,currentTabIndex:a,userGrades:s,renderGrades:r}){return e.createVNode(e.Fragment,null,[e.createVNode("nav",null,[e.createVNode("div",null,[t.map(((t,s)=>e.createVNode("span",{key:s,class:a===s?"active":"",onClick:()=>this.currentTabIndex=s},[t])))]),e.createVNode(e.resolveComponent("router-link"),{to:"/settings"},{default:()=>[e.createVNode("svg",{width:"42",height:"42"},[e.createVNode("path",{d:"M21.5 35a3.5 3.5 0 1 1 0-7 3.5 3.5 0 1 1 0 7zm0-10.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 1 1 0 7zm0-10.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 1 1 0 7z",fill:"#fff"},null)])]})]),!s&&e.createVNode("div",{class:"spinner"},null),s&&Object.keys(s).map(((e,t)=>r(s[e],t)))])},mounted(){this.getGrades(),this.hideCs=n().ignoreCs},methods:{getGrades(){const e=this.grades?JSON.parse(this.grades):this.cachedGrades;e?(this.setGrades(e),this.userGrades=e):a.get("/api/v2/grades").then((e=>{this.userGrades=e.data,this.setGrades(e.data)})).catch((()=>this.$router.push("/")))},getSchoolTrimester(){const e=(new Date).getMonth()+1;return e>8&&e<12?0:e>11&&e<3?1:2},renderGrades(t,a){const s=Object.keys(t);if(0===s.length)return this.currentTabIndex===a&&e.createVNode("p",{class:"no-content"},[e.createTextVNode("Il n'y a rien à afficher"),e.createVNode("br",null,null),e.createTextVNode("pour le moment !")]);let r=s.reduce(((e,a)=>e+t[a].value),0),o=s.length;return this.hideCs&&(r-=t.NSINF.value,o-=1),this.currentTabIndex===a&&e.createVNode(e.Fragment,null,[e.createVNode(l,{value:r/o},null),Object.keys(t).map(((a,s)=>e.createVNode("div",{class:"grade",key:s},[e.createVNode("span",{class:this.hideCs&&"NSINF"===a?"strike":""},[this.capitalize(t[a].name)]),e.createVNode("span",null,[t[a].value])])))])},capitalize:e=>e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}},c={props:["state"],render:({state:t})=>e.createVNode("div",{class:"switch"+(t?" on":"")},null)},i={props:["route"],render:({route:t})=>e.createVNode(e.resolveComponent("router-link"),{to:t},{default:()=>[e.createVNode("svg",{width:"42",height:"42"},[e.createVNode("path",{d:"M14.513 19.763a1.75 1.75 0 0 0 0 2.475l8.75 8.75a1.75 1.75 0 0 0 2.928-.785 1.75 1.75 0 0 0-.453-1.69L18.225 21l7.513-7.513a1.75 1.75 0 0 0-2.475-2.474z",fill:"#fff"},null)])]})},h={props:["setGrades","cachedGrades"],data:()=>({showDucky:!1,experimentsTab:!1}),render:({logout:t,toggleDukcy:a,showDucky:s,experimentsTab:r})=>e.createVNode(e.Fragment,null,[e.createVNode(i,{route:"/grades"},null),e.createVNode("div",{class:"setting",onClick:a},[e.createTextVNode("Gentil canard"),e.createVNode(c,{state:s},null)]),r&&e.createVNode(e.resolveComponent("router-link"),{to:"/experiments",class:"setting"},{default:()=>[e.createTextVNode("Expériences")]}),e.createVNode("div",{class:"setting disconnect",onClick:t},[e.createTextVNode("Se déconnecter")]),e.createVNode("svg",{class:"ducky"+(s?" shown":""),viewBox:"0 0 124.38 91.639"},[e.createVNode("path",{d:"M124.38 66.38c0 6.44-2.74 39.56-61.23 13.48 0 0-30.18-15.09-36.33.28-3.29 8.22-12.5 10.77-20.35 11.35a53.99 53.99 0 0 1-4.99.14l-1.47-.04L0 .13A15.943 15.943 0 0 1 2.14 0c4.71 0 13.31 1.23 23.87 3.63 36 8.14 94.65 29.74 98.34 61.7 0 0 .03.38.03 1.05z",fill:"#f3ba35"},null),e.createVNode("ellipse",{cx:"82.516",cy:"73.114",rx:"4.938",ry:"9.828",transform:"matrix(.188787 -.982018 .982018 .188787 -4.861 140.343)",fill:"#f6f8f8"},null),e.createVNode("ellipse",{cx:"87.573",cy:"73.171",rx:"2.315",ry:"3.774",transform:"matrix(.300123 -.9539 .9539 .300123 -8.507 134.747)"},null),e.createVNode("path",{d:"M26.01 3.63C23.3 10.21 7.47 50.33 6.47 91.49l-1.21.08-1.69.06H1.48l-1.47-.04L0 .13A15.943 15.943 0 0 1 2.14 0a8.51 8.51 0 0 1 .5.01c.3 0 .61.01.93.02.67.03 1.41.08 2.2.15.2.01.4.03.6.05a93.68 93.68 0 0 1 4.76.58 19.36 19.36 0 0 1 .75.11l.42.06q.555.09 1.14.18l1.5.25a.5.5 0 0 1 .12.02q.765.135 1.56.27 2.445.45 5.12 1l1.04.22 3.23.71z",fill:"#f3a735"},null),e.createVNode("path",{d:"M25.43,54.99c-.66,0-15.54.1-25.43,8.73v3.71a1.328,1.328,0,0,0,.49-.33c4.49-4.6,10.68-6.92,15.77-8.1a46.089,46.089,0,0,1,9.17-1.21,1.4,1.4,0,0,0,0-2.8Z"},null),e.createVNode("path",{d:"M94.121,35.585l-.464,3.923a28.729,28.729,0,0,0-.041,3.228,20.675,20.675,0,0,0,.276,2.592,14.99,14.99,0,0,0,.49,2.013,10.989,10.989,0,0,0,.6,1.492,8.016,8.016,0,0,0,.6,1.03,5.455,5.455,0,0,0,.5.625,2.859,2.859,0,0,0,.292.28l.036.028c2.236,1.956,25.15,3.353,24.871-16.487.044-5.879-7.821-4.147-17.027-1.124-.016-.005-.018-.01-.017-.014a29.16,29.16,0,0,0,.336-4.277,11.065,11.065,0,0,0-.329-2.859,3.979,3.979,0,0,0-.841-1.662,2.249,2.249,0,0,0-1.2-.686,3.14,3.14,0,0,0-1.4.068,6.134,6.134,0,0,0-1.454.6,9.839,9.839,0,0,0-1.35.913c-1.975,1.363-3.185,5.05-3.878,10.317Z",fill:"#e1511d"},null),e.createVNode("path",{d:"M104.229,34.03h0c12.574-4.471,12.015,1.677,12.015,1.677-.549,7.963-15.128,10.8-15.635,10.9-.014-.461-.008-11.495.265-13.412.278-1.948,1.388-6.39,2.777-7.255.016,0,.019.006.02.01a29.94,29.94,0,0,1,0,8.339c.009.014.014.015.018.013Z"},null)])]),mounted(){this.experimentsTab=Object.keys(n()).length>0},methods:{logout(){a.post("/api/v2/logout").then((()=>this.$router.push("/"))).catch(console.error)},toggleDukcy(){this.showDucky=!this.showDucky}}};const u=["ignoreCs"];var p={data:()=>({activeExperiments:null}),render:({activeExperiments:t,toggleExperiment:a})=>e.createVNode(e.Fragment,null,[e.createVNode(i,{route:"/settings"},null),t&&u.map(((s,r)=>e.createVNode("div",{class:"setting",key:r,onClick:()=>a(s)},[s,e.createVNode(c,{state:t[s]},null)])))]),created(){this.activeExperiments=n()},methods:{toggleExperiment(e){const t=this.activeExperiments[e];this.activeExperiments[e]=!t,localStorage.setItem("experiments",JSON.stringify({...this.activeExperiments,[e]:!t}))}}};const m=t.createRouter({history:t.createWebHistory(),routes:[{path:"/",component:o},{path:"/grades",name:"grades",component:d,props:!0},{path:"/settings",component:h},{path:"/experiments",component:p},{path:"/:404(.*)",redirect:"/"}]});m.beforeEach(((e,t,s)=>{if("/"===e.path){const e=document.cookie?.split(/; ?/)?.find((e=>e.startsWith("id=")))?.split("=")[1];e?a.get("/api/v2/grades").then((e=>s({name:"grades",params:{grades:JSON.stringify(e.data)}}))).catch((()=>s())):s()}else s()}));const g=e.createApp(r).use(m);m.isReady().then((()=>{g.mount("body")}))}(Vue,VueRouter,axios);
