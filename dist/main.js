(()=>{"use strict";var n={208:(n,t,e)=>{e.d(t,{A:()=>s});var o=e(601),r=e.n(o),i=e(314),a=e.n(i)()(r());a.push([n.id,'*,\n*::before,\n*::after {\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n    display: flex;\n    background-color: rgb(109 108 98);\n    font-family: "Titillium Web", sans-serif;\n}\n\nnav {\n    position: fixed;\n    background-color: rgb(82 87 64);\n    color: #efefef;\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: auto 230px auto;\n    height: auto;\n    width: 330px;\n    overflow-y: scroll;\n    gap: 30px;\n}\n\nnav>header {\n    height: 70px;\n    background-color: rgb(156, 156, 156);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding-left: 15px;\n    padding-right: 15px;\n}\n\n\nnav input {\n    height: 30px;\n    border: none;\n    border-radius: 15px;\n    padding-left: 15px;\n    padding-right: 15px;\n    font-family: inherit;\n    flex: 1;\n}\n\nnav input::placeholder {\n    font-style: italic;\n}\n\nnav input:focus {\n    outline: none;\n}\n\n/* clears the ‘X’ from Internet Explorer */\ninput[type=search]::-ms-clear {\n    display: none;\n    width: 0;\n    height: 0;\n}\n\ninput[type=search]::-ms-reveal {\n    display: none;\n    width: 0;\n    height: 0;\n}\n\n/* clears the ‘X’ from Chrome */\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n    display: none;\n}\n\n.todo-dashboard {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    grid-template-rows: 1fr 1fr;\n    gap: 8px;\n    padding-left: 15px;\n    padding-right: 15px;\n}\n\n.task-list-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin: 0px 3px 10px;\n}\n\n.add {\n    width: 23px;\n    height: 23px;\n    border: none;\n    border-radius: 50%;\n    line-height: 23.5px;\n    cursor: pointer;\n}\n\n.list-item {\n    display: flex;\n    align-items: center;\n    padding-left: 10px;\n    padding-right: 20px;\n    gap: 17px;\n    border-bottom: 0.5px solid black;\n    transition: 0.6s;\n}\n\n#general {\n    border-bottom: 2px solid #1e1e1e;\n}\n\n.list-item span {\n    font-size: 17px;\n    font-weight: 300;\n}\n\n.list-item:hover {\n    background-color: rgb(111, 116, 91);\n}\n\n.todo-dashboard>div {\n    background-color: rgb(35, 35, 35);\n    border-radius: 15px;\n    padding: 10px;\n    align-items: center;\n\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: 1fr 1fr;\n}\n\n.todo-dashboard>div:hover {\n    background-color: rgb(26, 26, 26);\n}\n\n.selected {\n    border: 1px solid white;\n}\n\n.task-dashboard {\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: auto auto;\n    padding-left: 15px;\n    padding-right: 15px;\n}\n\n.dash-item-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    height: 100%;\n    border-bottom: 0.5px solid rgb(89, 87, 87);\n}\n\n.icon {\n    background-color: black;\n    border-radius: 50%;\n    height: 10px;\n    width: 10px;\n}\n\n.task-list {\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-auto-rows: 50px;\n    height: 325px;\n}\n\n.task-list div:last-child {\n    border-bottom: none;\n}\n\nmain {\n    background-color: rgb(109 108 97);\n    width: 100%;\n    height: 100%;\n    margin-left: 330px;\n    transform: translateX(0px);\n    transition: 1s;\n    overflow: hidden;\n    display: grid;\n    grid-template-rows: 70px 1fr;\n}\n\n#menuButton div {\n    width: 1px;\n    background-color: rgb(232, 232, 232);\n}\n\n#menuButton>div:nth-child(1) {\n    height: 90%;\n}\n\n#menuButton>div:nth-child(2) {\n    height: 80%;\n}\n\n#menuButton>div:nth-child(3) {\n    height: 70%;\n}\n\n#menuButton:hover {\n    width: 25px;\n}\n\nmain>header {\n    height: 70px;\n    background-color: #9c9c9c;\n    display: flex;\n    align-items: center;\n    padding-left: 30px;\n    padding-right: 30px;\n    justify-content: space-between;\n}\n\n.logo-container {\n    display: flex;\n    gap: 15px;\n}\n\nheader h1 {\n    font-family: "Comfortaa", sans-serif;\n}\n\n#logo {\n    width: auto;\n    height: 35px;\n    position: relative;\n    top: -5px;\n}\n\n#deleteAll {\n    height: 38px;\n    width: 103px;\n    font-family: inherit;\n    border: none;\n    border-radius: 7px;\n    background-color: #232323;\n    color: #efefef;\n    transition: 0.2s;\n    cursor: pointer;\n}\n\n#deleteAll:hover {\n    background-color: #ff3e48;\n    border: 1.5px solid black;\n}\n\n.content {\n    width: 100%;\n    height: 100%;\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: 72px auto;\n    color: #f0f0f0;\n    overflow-y: scroll;\n    padding-top: 28px;\n    row-gap: 50px;\n    box-sizing: border-box;\n    padding-bottom: 30px;\n}\n\n/*  ALL TASKS PAGE SPECIFIC STYLES */\n.tasks-container {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-auto-rows: 176px;\n    justify-items: center;\n    row-gap: 100px;\n}\n\n.tasks-container>div {\n    display: flex;\n    flex-direction: column;\n    height: 176px;\n    width: 250px;\n    background-color: #e2e2e2;\n    border-radius: 20px;\n    border: 2px solid white;\n    transition: 0.4s;\n    color: rgb(55, 55, 55);\n    justify-content: space-between;\n    box-sizing: border-box;\n}\n\n.tasks-container>div:hover {\n    background-color: #eeeeee;\n   \n}\n\n.task-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    border-bottom: 2px solid rgb(255, 255, 255);\n    padding-left: 10px;\n    padding-bottom: 2px;\n    padding-top: 2px;\n}\n\n.task-header * {\n    transition: 0.2s;\n}\n\n.task-header>span {\n    font-size: 40px;\n    color: rgb(55, 55, 55);\n    cursor: default;\n}\n\n.task-header>input {\n    font-size: 30px;\n    font-weight: 100;\n    font-family: inherit;\n    text-align: right;\n\n    background-color: rgba(255, 255, 255, 0);\n    border: none;\n    margin-right: 17px;\n    width: 178px;\n}\n\n\n\n.edit:hover {\n    cursor: pointer;\n    color: white;\n}\n\n.task-header>input:focus {\n    outline: none;\n}\n\n.tasks-container>div>section {\n    display: flex;\n    padding-left: 10px;\n    padding-right: 8px;\n    justify-content: space-between;\n    margin-bottom: 10px;\n}\n\n.todos-amount {\n    display: flex;\n    flex-direction: column;\n    border: 2px solid white;\n    border-radius: 15px;\n    height: 80px;\n    width: 70px;\n    align-items: center;\n    justify-content: space-evenly;\n}\n\n.line {\n    width: 100%;\n    height: 2px;\n    background-color: white;\n}\n\n.task-button-container {\n    align-self: end;\n    margin-bottom: -6px;\n    margin-right: 10px;\n}\n\n.task-button-container button {\n    border: none;\n    background-color: rgba(255, 255, 255, 0);\n    color: rgb(55, 55, 55);\n    cursor: pointer;\n    margin-left: 5px;\n    transition: 0.2s;\n}\n\n.task-button-container button:hover {\n    color: white;\n}\n\n.tasks-container .delete {\n    background-color: #f24a4a;\n}\n\n.tasks-container .delete:hover {\n    background-color: #f24a4a;\n}\n\n#addTask {\n    align-items: center;\n    justify-content: center;\n    color: #4c4c4c;\n    cursor: pointer;\n\n}\n\n#addTask span {\n    font-size: 50px;\n    cursor: pointer;\n}\n\n.content>header {\n    grid-column: 1 / -1;\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-template-rows: auto auto;\n}\n\n.content h1 {\n    grid-column: 1 / -1;\n    justify-self: center;\n    padding: 11px;\n    border-bottom: 1px solid;\n}\n\n.title-container {\n    grid-column: 1 / -1;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    height: 45px;\n    border-bottom: 1px solid #afafaf;\n    margin-left: 25px;\n    margin-right: 25px;\n}\n\n.title-container h2 {\n    margin-left: 10px;\n}\n\n.title-container div {\n    display: flex;\n    align-items: center;\n    gap: 17px;\n    margin-right: 7px;\n}\n\n.title-input-container {\n    position: relative;\n    width: 100%;\n}\n\n.todo-list {\n    margin-left: 25px;\n    margin-right: 25px;\n}\n\n.todo input {\n    background-color: #ffffff00;\n    color: inherit;\n    border: none;\n    font-size: 16px;\n    font-family: inherit;\n    width: 100%;\n}\n\n.todo input:focus {\n    outline: none;\n}\n\n.todo {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    transition: 0.4s;\n    margin-top: 7px;\n    height: 40px;\n    border-radius: 10px;\n    padding-left: 10px;\n    padding-right: 3px;\n    gap: 10px;\n}\n\n.todo:hover {\n    background-color: rgba(255, 255, 255, 0.201);\n}\n\n.todo div {\n    display: flex;\n    align-items: center;\n    gap: 5px;\n}\n\n.todo-title {\n    position: relative;\n}\n\n\n\n@keyframes strike {\n    0% {\n        transform: scaleX(0%);\n    }\n\n    100% {\n        transform: scaleX(100%);\n    }\n}\n\n.checkbox {\n    display: flex;\n\n    height: 13px;\n    width: 13px;\n\n    border-radius: 50%;\n\n    border: 2px solid white;\n    align-items: center;\n}\n\n.checkbox-icon {\n    height: 15px;\n    width: 15px;\n\n    border-radius: 50%;\n\n    background-color: rgba(255, 255, 255, 0);\n}\n\n.complete .checkbox-icon {\n    background-color: rgb(255, 255, 255);\n}\n\n.strikethrough {\n    position: absolute;\n    width: 100%;\n    height: 1.5px;\n    background-color: #ffffff;\n    top: 12px;\n    transform-origin: 0%;\n    animation: strike 1s forwards;\n\n}\n\n.todo button {\n    border: none;\n    background-color: #ffffff00;\n    color: #000000;\n    width: 31px;\n    height: 31px;\n    transition: 0.3s;\n    cursor: pointer;\n}\n\n.todo button:hover {\n    color: white;\n}\n\n@keyframes slideIn {\n    0% {\n        transform: scaleX(0);\n    }\n\n    100% {\n        transform: scaleX(1);\n    }\n}\n\n.modal {\n    position: fixed;\n    z-index: 1;\n    left: 0px;\n    top: 0px;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n    background-color: rgb(0, 0, 0);\n    background-color: rgba(0, 0, 0, 0.4);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    backdrop-filter: blur(10px);\n}\n\n.modal-category {\n    position: relative;\n    width: 280px;\n    height: auto;\n    border-radius: 15px;\n    padding: 15px;\n    background-color: #e2e2e2;\n    border: 2px solid white;\n\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    align-items: center;\n    gap: 16px;\n}\n\n.modal-category>header {\n    display: flex;\n    justify-content: space-between;\n    width: 100%;\n}\n\n.icons-container {\n    display: grid;\n    grid-template-columns: repeat(5, 50px);\n    grid-template-rows: repeat(2, 50px);\n    gap: 5px;\n}\n\n.icons-container>div {\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    background-color: rgba(0, 0, 0, 0.102);\n    border: 2px solid white;\n    border-radius: 15px;\n    transition: 0.5s;\n    cursor: pointer;\n}\n\n.icons-container>div>label,\n.icons-container>div>input {\n    position: absolute;\n    cursor: pointer;\n    padding: 10px;\n}\n\n.icons-container input {\n    display: none;\n}\n\n.icons-container input:checked+label {\n    color: rgb(255, 255, 255);\n}\n\n.icons-container>div:hover,\n#modalConfirm:hover {\n    background-color: rgba(255, 255, 255, 0.365);\n    cursor: pointer;\n}\n\n.icons-container>div:active {\n    background-color: rgba(194, 194, 194, 0);\n}\n\n.close {\n    position: absolute;\n    top: 3px;\n    right: 3px;\n    color: #727272;\n    float: right;\n    font-size: 28px;\n    font-weight: bold;\n}\n\n#modalConfirm {\n    border: 2px solid white;\n    background-color: #ffffff00;\n    height: 38px;\n    width: 82px;\n    border-radius: 15px;\n    font-family: inherit;\n    transition: 0.5s;\n}\n\n.close:hover,\n.close:focus {\n    color: black;\n    text-decoration: none;\n    cursor: pointer;\n}\n\n.hidden {\n    display: none;\n}\n\n@media screen and (max-width: 1230px) {\n    .tasks-container {\n        grid-template-columns: repeat(2, 1fr);\n    }\n}\n\n@media screen and (max-width: 660px) {\n    .tasks-container {\n        grid-template-columns: 1fr;\n    }\n}\n\n@media screen and (max-width: 980px) {\n    nav {\n        z-index: -1;\n    }\n\n    main {\n        margin-left: 0px;\n    }\n\n    .expand-margin {\n        margin-left: 330px;\n    }\n\n    #menuButton {\n        background-color: hsl(0, 0%, 100%);\n        position: fixed;\n        display: flex;\n        width: 15px;\n        height: 90px;\n        left: 0px;\n        top: 0px;\n        bottom: 0px;\n        margin: auto;\n        border-radius: 0px 100px 100px 0px;\n        transition: 0.6s;\n        cursor: pointer;\n        justify-content: space-evenly;\n        align-items: center;\n        transform-origin: 0%;\n        animation: slideIn 1s forwards;\n    }\n}\n',""]);const s=a},314:n=>{n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var e="",o=void 0!==t[5];return t[4]&&(e+="@supports (".concat(t[4],") {")),t[2]&&(e+="@media ".concat(t[2]," {")),o&&(e+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),e+=n(t),o&&(e+="}"),t[2]&&(e+="}"),t[4]&&(e+="}"),e})).join("")},t.i=function(n,e,o,r,i){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(o)for(var s=0;s<this.length;s++){var d=this[s][0];null!=d&&(a[d]=!0)}for(var c=0;c<n.length;c++){var l=[].concat(n[c]);o&&a[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),e&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=e):l[2]=e),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),t.push(l))}},t}},601:n=>{n.exports=function(n){return n[1]}},72:n=>{var t=[];function e(n){for(var e=-1,o=0;o<t.length;o++)if(t[o].identifier===n){e=o;break}return e}function o(n,o){for(var i={},a=[],s=0;s<n.length;s++){var d=n[s],c=o.base?d[0]+o.base:d[0],l=i[c]||0,p="".concat(c," ").concat(l);i[c]=l+1;var u=e(p),g={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==u)t[u].references++,t[u].updater(g);else{var h=r(g,o);o.byIndex=s,t.splice(s,0,{identifier:p,updater:h,references:1})}a.push(p)}return a}function r(n,t){var e=t.domAPI(t);return e.update(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap&&t.supports===n.supports&&t.layer===n.layer)return;e.update(n=t)}else e.remove()}}n.exports=function(n,r){var i=o(n=n||[],r=r||{});return function(n){n=n||[];for(var a=0;a<i.length;a++){var s=e(i[a]);t[s].references--}for(var d=o(n,r),c=0;c<i.length;c++){var l=e(i[c]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}i=d}}},659:n=>{var t={};n.exports=function(n,e){var o=function(n){if(void 0===t[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}t[n]=e}return t[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(e)}},540:n=>{n.exports=function(n){var t=document.createElement("style");return n.setAttributes(t,n.attributes),n.insert(t,n.options),t}},56:(n,t,e)=>{n.exports=function(n){var t=e.nc;t&&n.setAttribute("nonce",t)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=n.insertStyleElement(n);return{update:function(e){!function(n,t,e){var o="";e.supports&&(o+="@supports (".concat(e.supports,") {")),e.media&&(o+="@media ".concat(e.media," {"));var r=void 0!==e.layer;r&&(o+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),o+=e.css,r&&(o+="}"),e.media&&(o+="}"),e.supports&&(o+="}");var i=e.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(o,n,t.options)}(t,n,e)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)}}}},113:n=>{n.exports=function(n,t){if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}}},t={};function e(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={id:o,exports:{}};return n[o](i,i.exports,e),i.exports}e.n=n=>{var t=n&&n.__esModule?()=>n.default:()=>n;return e.d(t,{a:t}),t},e.d=(n,t)=>{for(var o in t)e.o(t,o)&&!e.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:t[o]})},e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),e.o=(n,t)=>Object.prototype.hasOwnProperty.call(n,t),(()=>{var n;e.g.importScripts&&(n=e.g.location+"");var t=e.g.document;if(!n&&t&&(t.currentScript&&(n=t.currentScript.src),!n)){var o=t.getElementsByTagName("script");if(o.length)for(var r=o.length-1;r>-1&&(!n||!/^http(s?):/.test(n));)n=o[r--].src}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=n})(),e.nc=void 0,(()=>{var n=e(72),t=e.n(n),o=e(825),r=e.n(o),i=e(659),a=e.n(i),s=e(56),d=e.n(s),c=e(540),l=e.n(c),p=e(113),u=e.n(p),g=e(208),h={};h.styleTagTransform=u(),h.setAttributes=d(),h.insert=a().bind(null,"head"),h.domAPI=r(),h.insertStyleElement=l(),t()(g.A,h),g.A&&g.A.locals&&g.A.locals,e.p;const f={};function m(n,t,e=[]){this.title=n,this.category=t,this.todos=e,this.style="default",this.sorted=!1,this.sortedTodos=null,this.id=null}function x(n,t,e,o){this.title=n,this.description=t,this.dueDate=e,this.priority=o,this.complete=!1}function b(n){const t=[];for(let e=0;e<n.length;e++){const o=n[e].getTodos();for(let n=0;n<o.length;n++)t.push(o[n])}return t}function y(n,t,e){return b(Object.values(n)).filter((n=>n[t]===e))}m.prototype={...m.prototype,setTodo:function(n){this.todos.push(n)},removeTodo:function(n){this.todos.splice(n,1)},setCategory:function(n){this.category=n},setTitle:function(n){this.title=n},setStyle:function(n){style=n},getTodos:function(){return this.todos},getCategory:function(){return this.category},getTitle:function(){return this.title},getStyle:function(){return this.style},setId:function(){this.id?console.log("task already has ID"):this.id=function(){let n=Number(localStorage.getItem("taskID"))||0;return saveToStorage("taskID",n+1),"task_"+n}()},getId:function(){return this.id},toggleSorted:function(){this.sorted?this.sorted=!1:this.sorted=!0},sortTodos:function(n){this.toggleSorted(),this.sortedTodos=this.getTodos().slice(),this.sortedTodos.sort(((t,e)=>t[n]-e[n]))}},x.prototype={...x.prototype,setTitle:function(n){n?this.title=n:console.log("todo needs validation1")},setDescription:function(n){n?this.description=n:console.log("todo needs validation2")},setDate:function(n=this.dueDate){n?this.dueDate=n:console.log("todo needs validation3")},setPriority:function(n){this.priority=n},setId:function(){this.id=function(){let n=Number(localStorage.getItem("todoID"))||0;return saveToStorage("todoID",n+1),"todo_"+n}()},toggleComplete:function(){this.complete?this.complete=!1:this.complete=!0},getDate:function(){return this.dueDate.toLocaleDateString()},getTitle:()=>(void 0).title,getDescription:()=>(void 0).description,getPriority:()=>(void 0).priority},checkStorage(),console.log(localStorage),console.log(f),function(){const n=document.querySelector("#dailyCount"),t=document.querySelector("#weeklyCount"),e=document.querySelector("#importantCount"),o=document.querySelector("#taskCount"),r=document.querySelector(".task-list"),i=document.querySelector("#menuButton"),a=document.querySelector("main");i.addEventListener("click",(()=>{a.classList.toggle("expand-margin")})),window.addEventListener("resize",(()=>{window.innerWidth>=980&&a.classList.toggle("expand-margin",!1)})),n.textContent=y(f,"dueDate",new Date((new Date).toDateString()).toISOString()).length,t.textContent=function(n){const t=b(Object.values(n)),e=new Date((new Date).toDateString()),o=new Date(e.getTime()+6048e5);return t.filter((n=>{const t=new Date(n.dueDate);return t>=e&&t<=o}))}(f).length,e.textContent=y(f,"priority","1").length,o.textContent=Object.keys(f).length,Object.values(f).forEach((n=>{const t=document.createElement("div");t.classList.add("list-item");const e=document.createElement("span");e.classList.add("material-symbols-outlined"),e.textContent=n.getCategory();const o=document.createElement("p");o.textContent=n.getTitle(),t.append(e,o),r.appendChild(t),t.addEventListener("click",(function(){(function(){const n=document.querySelector(".content");for(;n.firstChild;)n.removeChild(n.firstChild);console.log("content cleared!")})(),function(n){console.log(n)}(n)}))}))}()})()})();