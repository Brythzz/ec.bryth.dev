!function(e,t){"use strict";var a={props:["setTheme","themes"],render:({themes:t,setTheme:a})=>e.createVNode("div",{class:"theme-selector",onclick:""},[e.createVNode("svg",{viewBox:"0 0 24 24",fill:"#fff"},[e.createVNode("path",{d:"M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,17.5V4.5a7.5,7.5,0,0,1,0,15Z"},null)]),t.map(((t,r)=>e.createVNode("div",{onClick:()=>a(r),class:`color-selector ${t}`},null)))])};const r=e=>{try{const t=localStorage.getItem(e)||"false";return JSON.parse(t)}catch(t){return localStorage.setItem(e,"false"),!1}},s="https://api.ecoledirecte.com/v3/",o=async({id:e,token:t})=>{const a=`${s}eleves/${e}/notes.awp?verbe=get`,r=`data={"token": "${t}"}`,o=await fetch(a,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:r}),n=await o.json();if(!n?.data?.notes)throw new Error("Impossible de récupérer les notes");const{notes:l,periodes:c}=n.data;if(!l)throw new Error(n.message);return((e,t)=>{let a={A001:{},A002:{},A003:{}};for(let t of e){let e=t.valeur.replace(",",".");if(isNaN(e)||t.nonSignificatif||""===e)continue;let r=1*t.coef.replace(",",".");const{codePeriode:s,codeMatiere:o}=t;a[s][o]?(a[s][o].marks.push(e/t.noteSur.replace(",",".")*20*r),a[s][o].coef+=r):a[s][o]={marks:[e/t.noteSur.replace(",",".")*20*r],coef:r,name:t.libelleMatiere}}for(let e in a){const r=t.find((t=>t.idPeriode===e)).ensembleMatieres.disciplines;for(let t in a[e]){const s=r.find((e=>e.codeMatiere===t))?.coef??1,{marks:o,name:n,coef:l}=a[e][t],c=Math.round(o.reduce(((e,t)=>e+t),0)/l*100)/100;a[e][t]={value:c,name:n,coef:s}}}return a})(l,c)},n=async(e,t,a)=>{const r=await(async(e,t)=>{const a=`${s}login.awp`,r=`data={"identifiant": "${e}", "motdepasse": "${t}"}`,o=await fetch(a,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:r}),n=await o.json(),l=n?.data?.accounts[0];if(!l)throw new Error("Identifiants invalides");if("E"!==l.typeCompte)throw new Error("Veuillez utiliser un compte élève");const{id:c,idLogin:d,prenom:i,nom:h,nomEtablissement:u}=l;return{id:c,uid:d,name:i,surname:h,school:u,token:n.token}})(e,t),n=await o(r);return a&&(localStorage.setItem("token",r.token),localStorage.setItem("id",r.id)),{...r,grades:n}},l=()=>{localStorage.removeItem("token"),localStorage.removeItem("id")};var c={data:()=>({themes:["red","purple","blue","green","yellow","white"],themeId:0,cachedGrades:null}),render:({setTheme:t,themes:r,themeId:s,setGrades:o,cachedGrades:n,enablePinkTheme:l})=>e.createVNode("main",{class:r[s]},[e.createVNode("div",{class:"content"},[e.createVNode(e.resolveComponent("router-view"),{setGrades:o,cachedGrades:n,enablePinkTheme:l},null),e.createVNode(a,{setTheme:t,themes:r},null)]),e.createVNode("div",{class:"image"},null)]),created(){const e=r("pinkTheme");this.enablePinkTheme(e);const t=r("theme")||5;this.setTheme(t),this.sendConsoleMessage()},methods:{setTheme(e){this.themeId=e,localStorage.setItem("theme",e)},enablePinkTheme(e){this.themes[1]=e?"pink":"purple",e&&(this.themeId=1)},setGrades(e){this.cachedGrades=e},sendConsoleMessage(){const e="background: #e0005a; color: #fff; font-weight: bold; padding: 3px 8px; border-radius: 3px;";console.log("%cVersion",e,"2.3.1"),console.log("%cTwitter",e,"@Brythzz"),console.log("%cDiscord",e,"Bryth#1086")}}},d={props:["setGrades","cachedGrades"],data:()=>({username:{value:"",valid:!0},password:{value:"",valid:!0},keepLoggedIn:!1,error:null,shake:!1,loading:!1}),render({username:t,password:a,handleSubmit:r,error:s,shake:o,loading:n}){return e.createVNode(e.Fragment,null,[e.createVNode("form",{onSubmit:r},[e.createVNode("h1",null,[e.createTextVNode("Ecole Directe")]),e.createVNode("input",{onChange:e=>this.username.value=e.target.value,class:`${t.value?"filled":""}${t.valid?"":" invalid"}`,type:"text",name:"username",autocomplete:"username",spellcheck:"false","aria-label":"Identifiant"},null),e.createVNode("p",{"aria-hidden":"true"},[e.createTextVNode("Identifiant")]),e.createVNode("input",{onInput:e=>this.password.value=e.target.value,class:`${a.value?"filled":""}${a.valid?"":" invalid"}`,type:"password",name:"password",autocomplete:"current-password","aria-label":"Mot de passe"},null),e.createVNode("p",{"aria-hidden":"true"},[e.createTextVNode("Mot de passe")]),e.createVNode("div",{class:"check"},[e.createVNode("input",{onChange:e=>this.keepLoggedIn=e.target.checked,type:"checkbox",name:"save",id:"save"},null),e.createVNode("svg",{viewBox:"0 0 21 21",fill:"none"},[e.createVNode("polyline",{points:"5 10.75 8.5 14.25 16 6"},null)])]),e.createVNode("label",{for:"save"},[e.createTextVNode("Rester connecté(e)")]),e.createVNode("button",{disabled:!!n},[e.createTextVNode("Se connecter")])]),s&&e.createVNode("div",{class:"error"+(o?" shake":"")},[s])])},methods:{handleSubmit(e){e.preventDefault();this.validateForm()&&this.login()},validateForm(){return this.username.valid=!!this.username.value,this.password.valid=!!this.password.value,this.username.valid&&this.password.valid},login(){const{username:e,password:t,keepLoggedIn:a}=this;this.loading=!0,n(e.value,t.value,a).then((e=>this.$router.push({name:"grades",params:{grades:JSON.stringify(e.grades)}}))).catch((e=>{this.error=e.message,this.loading=!1,this.shake=!0,setTimeout((()=>this.shake=!1),500)}))}}},i={props:["value"],data:()=>({offset:280}),render:({value:t,offset:a})=>e.createVNode("svg",{class:"circle",viewBox:"0 0 100 100"},[e.createVNode("text",{"text-anchor":"middle",y:"58.5",x:"50%"},[t.toFixed(2)]),e.createVNode("circle",{cx:"50",cy:"50",r:"46",stroke:"#c7b9ff",opacity:".1"},null),e.createVNode("circle",{cx:"50",cy:"50",r:"46",stroke:"#fff",style:"stroke-dashoffset:"+a+";"},null)]),mounted(){setTimeout((()=>{this.offset=314.16-this.value/20*314.16}),250)}},h={props:["cachedGrades","grades","setGrades"],data(){return{userGrades:this.grades,currentTabIndex:this.getSchoolTrimester(),tabs:["1er","2ème","3ème"]}},render({tabs:t,currentTabIndex:a,userGrades:r,renderGrades:s}){return e.createVNode(e.Fragment,null,[e.createVNode("nav",null,[e.createVNode("div",null,[t.map(((t,r)=>e.createVNode("span",{key:r,class:a===r?"active":"",onClick:()=>this.currentTabIndex=r},[t])))]),e.createVNode(e.resolveComponent("router-link"),{to:"/settings"},{default:()=>[e.createVNode("svg",{width:"42",height:"42"},[e.createVNode("path",{d:"M21.5 35a3.5 3.5 0 1 1 0-7 3.5 3.5 0 1 1 0 7zm0-10.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 1 1 0 7zm0-10.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 1 1 0 7z",fill:"#fff"},null)])]})]),!r&&e.createVNode("div",{class:"spinner"},null),r&&Object.keys(r).map(((e,t)=>s(r[e],t)))])},mounted(){this.getGrades()},methods:{getGrades(){const e=this.grades?JSON.parse(this.grades):this.cachedGrades;if(e)this.setGrades(e),this.userGrades=e;else{const e=localStorage.getItem("token"),t=localStorage.getItem("id");if(!e||!t)return this.$router.push("/");o({id:t,token:e}).then((e=>{this.setGrades(e),this.userGrades=e})).catch((()=>{l(),this.$router.push("/")}))}},getSchoolTrimester(){const e=(new Date).getMonth()+1;return e>8&&e<12?0:e>11||e<3?1:2},renderGrades(t,a){const r=Object.keys(t).filter((e=>null!==t[e].value));if(0===r.length)return this.currentTabIndex===a&&e.createVNode("p",{class:"no-content"},[e.createTextVNode("Il n'y a rien à afficher"),e.createVNode("br",null,null),e.createTextVNode("pour le moment !")]);const s=r.reduce(((e,a)=>e+t[a].value*t[a].coef),0),o=r.reduce(((e,a)=>e+t[a].coef),0);return e.createVNode("div",{style:{display:this.currentTabIndex===a?"block":"none"}},[e.createVNode(i,{value:s/o},null),r.map(((a,r)=>e.createVNode("div",{class:"grade",key:r},[e.createVNode("span",null,[this.capitalize(t[a].name)]),e.createVNode("span",null,[t[a].value])])))])},capitalize:e=>e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}},u={props:["state"],render:({state:t})=>e.createVNode("div",{role:"switch","aria-checked":t,class:"switch"+(t?" on":"")},null)},p={props:["route"],render:({route:t})=>e.createVNode(e.resolveComponent("router-link"),{to:t,role:"button"},{default:()=>[e.createVNode("svg",{width:"42",height:"42"},[e.createVNode("path",{d:"M14.513 19.763a1.75 1.75 0 0 0 0 2.475l8.75 8.75a1.75 1.75 0 0 0 2.928-.785 1.75 1.75 0 0 0-.453-1.69L18.225 21l7.513-7.513a1.75 1.75 0 0 0-2.475-2.474z",fill:"#fff"},null)])]})},m={props:["setGrades","cachedGrades","enablePinkTheme"],data:()=>({showDucky:!1,pinkTheme:!1,isDecember:11===(new Date).getMonth()}),render:({logout:t,toggleDukcy:a,showDucky:r,togglePink:s,pinkTheme:o,cachedGrades:n,isDecember:l})=>n?e.createVNode(e.Fragment,null,[e.createVNode(p,{route:"/grades"},null),e.createVNode("div",{class:"setting",onClick:a},[e.createTextVNode("Gentil canard"),e.createVNode(u,{state:r},null)]),e.createVNode("div",{class:"setting",onClick:s},[e.createTextVNode("Thème rose"),e.createVNode(u,{state:o},null)]),e.createVNode("div",{class:"setting disconnect",onClick:t},[e.createTextVNode("Se déconnecter")]),e.createVNode("svg",{class:"ducky"+(r?" shown":"")+(o?" pink":""),viewBox:"0 0 128.598 139"},[e.createVNode("path",{d:"M124.38 66.38c0 6.44-2.74 39.56-61.23 13.48 0 0-30.18-15.09-36.33.28-3.29 8.22-12.5 10.77-20.35 11.35q-2.49.186-4.99.14l-1.47-.04L0 .13A16.124 16.124 0 0 1 2.14 0c4.71 0 13.31 1.23 23.87 3.63 36 8.14 94.65 29.74 98.34 61.7 0 0 .03.38.03 1.05z",fill:"#f3ba35"},null),e.createVNode("ellipse",{cx:"82.516",cy:"73.114",rx:"4.938",ry:"9.828",transform:"matrix(.188787 -.982018 .982018 .188787 -4.861 140.344)",fill:"#f6f8f8"},null),e.createVNode("ellipse",{cx:"87.573",cy:"73.172",rx:"2.315",ry:"3.774",transform:"matrix(.300123 -.9539 .9539 .300123 -8.508 134.748)"},null),e.createVNode("path",{d:"M26.01,3.63C23.3,10.21,7.47,50.33,6.47,91.49l-1.21.08-1.69.06H1.48L.01,91.59,0,.13A16.124,16.124,0,0,1,2.14,0c.167,0,.333,0,.5.01.3,0,.61.01.93.02.67.03,1.41.08,2.2.15.2.01.4.03.6.05q2.387.23,4.76.58.376.048.75.11l.42.06q.555.09,1.14.18l1.5.25a.538.538,0,0,1,.12.02q.765.135,1.56.27,2.445.45,5.12,1l1.04.22Z",fill:"#f3a735"},null),e.createVNode("path",{d:"M25.43,54.99c-.66,0-15.54.1-25.43,8.73v3.71a1.308,1.308,0,0,0,.49-.33c4.49-4.6,10.68-6.92,15.77-8.1a46.153,46.153,0,0,1,9.17-1.21,1.4,1.4,0,0,0,0-2.8Z"},null),e.createVNode("path",{d:"M94.121 35.585l-.464 3.923a28.732 28.732 0 0 0-.041 3.228 20.675 20.675 0 0 0 .276 2.592 14.953 14.953 0 0 0 .49 2.013 10.937 10.937 0 0 0 .6 1.492 8.016 8.016 0 0 0 .6 1.03 5.287 5.287 0 0 0 .5.625 2.859 2.859 0 0 0 .292.28l.036.028c2.236 1.956 25.15 3.353 24.871-16.487.044-5.879-7.821-4.147-17.027-1.124-.016-.005-.018-.01-.017-.014a29.16 29.16 0 0 0 .336-4.277 11.065 11.065 0 0 0-.329-2.859 3.985 3.985 0 0 0-.841-1.662 2.249 2.249 0 0 0-1.2-.686 3.154 3.154 0 0 0-1.4.068 6.176 6.176 0 0 0-1.454.6 9.93 9.93 0 0 0-1.35.913c-1.975 1.363-3.185 5.05-3.878 10.317z",fill:"#e1511d"},null),e.createVNode("path",{d:"M104.229,34.03h0c12.574-4.471,12.015,1.677,12.015,1.677-.549,7.963-15.128,10.8-15.635,10.9-.014-.461-.008-11.495.265-13.412.278-1.948,1.388-6.39,2.777-7.255.016,0,.019.006.02.01a29.94,29.94,0,0,1,0,8.339c.009.014.014.015.018.013Z"},null),e.createVNode("g",{class:l?"":"hidden",fill:"#f1f2f2"},[e.createVNode("path",{d:"M103.977,92.538c3.435,6.28,6.567,18.021,8.033,36.491,30.084-39.388,10.056-66.944,10.056-66.944Z",fill:"#dd2e44"},null),e.createVNode("circle",{cx:"111.238",cy:"129.5",r:"9.498"},null),e.createVNode("path",{d:"M100.551 96.506c-2.371-.541-4.822-4.353-4.972-6.466 12.475-8.188 20.321-20.548 25.121-36.462 1.146-.458 4.309 4.535 5.925 6.59 3.875 4.932-21.236 38.8-26.074 36.338z"},null)])])]):null,mounted(){if(!this.cachedGrades){const e=localStorage.getItem("token"),t=localStorage.getItem("id");if(!e||!t)return this.$router.push("/");o({id:t,token:e}).then((e=>{this.setGrades(e)})).catch((()=>{l(),this.$router.push("/")}))}this.pinkTheme=r("pinkTheme"),this.showDucky=r("ducky")},methods:{logout(){l(),this.$router.push("/")},toggleDukcy(){this.showDucky=!this.showDucky,localStorage.setItem("ducky",this.showDucky)},togglePink(){this.pinkTheme=!this.pinkTheme,localStorage.setItem("pinkTheme",this.pinkTheme),this.enablePinkTheme(this.pinkTheme)}}};const g=t.createRouter({history:t.createWebHistory(),routes:[{path:"/",component:d},{path:"/grades",name:"grades",component:h,props:!0},{path:"/settings",component:m},{path:"/:404(.*)",redirect:"/"}]});g.beforeEach(((e,t,a)=>{if("/"===e.path){const e=document.cookie.split(/; ?/),t=e?e.find((e=>e.startsWith("id="))):null;(t?t.split("=")[1]:null)?get("/api/v2/grades").then((e=>a({name:"grades",params:{grades:JSON.stringify(e)}}))).catch((()=>a())):a()}else a()}));const f=e.createApp(c).use(g);g.isReady().then((()=>{f.mount("body")}))}(Vue,VueRouter);
