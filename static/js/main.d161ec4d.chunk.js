(this.webpackJsonpcardholder=this.webpackJsonpcardholder||[]).push([[0],{145:function(e,t,a){e.exports=a(187)},15:function(e,t){e.exports={processCardData:async(e,t)=>{try{const a=window.location.host.includes("localhost")?"http://localhost:8888":"https://jeapis.netlify.app";if("true"===localStorage.getItem("googleDriveSyncEnabled")){const r=await fetch(a+"/.netlify/functions/getCardHolderData",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:e,access_token:localStorage.getItem("access_token"),refresh_token:localStorage.getItem("refresh_token"),content:t})});if(!r.ok)return Promise.reject(new Error("Failed to update card data. Server returned status: "+r.status));const n=await r.json();return n.content?("delete"===e?(localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),localStorage.removeItem("googleDriveSyncEnabled")):(localStorage.setItem("access_token",n.access_token),localStorage.setItem("refresh_token",n.refresh_token),localStorage.setItem("card_data",JSON.stringify(n.content))),Promise.resolve(n.content)):Promise.resolve([])}switch(e){case"fetch":let e=[];localStorage.hasOwnProperty("card_data")&&(e=JSON.parse(localStorage.getItem("card_data"))),localStorage.setItem("card_data",JSON.stringify(e));break;case"update":localStorage.setItem("card_data",JSON.stringify(t))}return Promise.resolve(JSON.parse(localStorage.getItem("card_data")))}catch(a){return Promise.reject(new Error("Error in updating card data: "+a.message))}},encryptData:(e,t,a)=>a.AES.encrypt(e,t).toString(),decryptData:(e,t,a)=>a.AES.decrypt(e,t).toString(a.enc.Utf8)}},153:function(e,t,a){},154:function(e,t){},187:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(112),c=a.n(o),l=(a(153),a(265)),s=a(275),i=a(276),d=a(199),u=a(269),m=a(268),p=a(252),g=a(253),b=a(254),h=a(255),f=a(256),y=(a(69),a(113)),E=a(15),v=a(17),w=a.n(v),k=a(240),x=a(114);var C=function(e){let{show:t}=e;return n.a.createElement(l.a,{sx:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.4)",display:t?"flex":"none",justifyContent:"center",alignItems:"center",zIndex:9999}},n.a.createElement(k.a,{sx:{animationDuration:"550ms",["& ."+x.a.circle]:{strokeLinecap:"round"}},size:40,thickness:4}))},S=a(261),O=a(258);function j(e){let{state:t,type:a,message:r,setAlertState:o}=e;return n.a.createElement(S.a,{open:t,autoHideDuration:5e3,onClose:()=>o(!1),anchorOrigin:{vertical:"top",horizontal:"center"}},n.a.createElement(O.a,{onClose:()=>o(!1),severity:a},r))}var D=a(120),I=a(263),N=a(245),_=a(77);function M(e){let{onSyncComplete:t,setIsLoading:a}=e;const r=Object(_.b)({flow:"auth-code",ux_mode:"redirect",redirect_uri:window.location.href.endsWith("/")?window.location.href.substring(0,window.location.href.length-1):window.location.href,scope:"https://www.googleapis.com/auth/drive.appdata"});return n.a.createElement("div",null,n.a.createElement("div",{onClick:()=>{a(!0),localStorage.getItem("access_token")?Object(E.processCardData)("fetch").then(e=>{let r=JSON.parse(localStorage.getItem("card_data"));e.length!==r.length?Object(E.processCardData)("update",r).then(e=>{a(!1),t(!0,"success","Sync Competed")}).catch(e=>{a(!1),t(!0,"error","Issue with Sync try again later.")}):(a(!1),t(!0,"success","Sync Competed"))}).catch(()=>{r()}):r()}},"Sync with Google"))}function A(e){let{invokeAlert:t,setIsLoading:a,setCardsData:o,setErrorMessage:c}=e;const l=window.location.host.includes("localhost")?"386326794734-55j7cufjv2fgn75aa6d96b32i4j817o8.apps.googleusercontent.com":"386326794734-7vscbpqmdplr1grnt7ddva2c62597nut.apps.googleusercontent.com",[s,i]=Object(r.useState)(null),d=Boolean(s),m=()=>{i(null)},[p,g]=Object(r.useState)("true"===localStorage.getItem("googleDriveSyncEnabled"));return n.a.createElement("div",null,n.a.createElement(u.a,{id:"basic-button",sx:{color:"white",marginLeft:"1rem","&:hover":{backgroundColor:"black"}},onClick:e=>{i(e.currentTarget)}},n.a.createElement(N.a,null)),n.a.createElement(D.a,{id:"basic-menu",anchorEl:s,open:d,onClose:m,MenuListProps:{"aria-labelledby":"basic-button"}},p?n.a.createElement(I.a,{onClick:async()=>{try{a(!0),await Object(E.processCardData)("delete"),g(!1)}catch(e){c("Error fetching card data: "+e.message)}finally{a(!1)}}},"Delete Data From Google Drive"):n.a.createElement(I.a,{onClick:m},n.a.createElement(_.a,{clientId:l},n.a.createElement(M,{setIsLoading:a,onSyncComplete:t})))))}var W=a(272),R=a(250),P=a(273),T=a(257),K=a(260),L=a(274),B=a(264);var F=e=>{let{isKeyDialogOpen:t,setIsKeyDialogOpen:a,backgroundColor:o,viewMode:c,cardData:s,callback:i,setKeyDuration:u,setEncryptionKey:m}=e;const[p,g]=Object(r.useState)(""),[b,h]=Object(r.useState)(30),[f,y]=Object(r.useState)(!1),[v,k]=Object(r.useState)(""),x=n.a.useMemo(()=>Array.from({length:10},(e,t)=>({value:10*(t+1),label:10*(t+1)+"s"})),[]);return n.a.createElement(W.a,{open:t,PaperProps:{sx:{width:"340px",borderRadius:"12px",boxShadow:"8px 8px 0px "+o,border:"6px solid black","& .MuiDialogTitle-root":{fontWeight:"800"},"& .MuiDialogContent-root":{padding:"16px"},"& .MuiButton-root":{fontWeight:"800",color:"black",borderColor:"black","&:hover":{fontWeight:"800",color:"white",backgroundColor:"black"}}}}},n.a.createElement(R.a,null,"Key"),n.a.createElement(P.a,null,n.a.createElement(T.a,{autoFocus:!0,required:!0,margin:"dense",id:"cardKey",name:"cardKey",label:"Key",type:"password",fullWidth:!0,variant:"standard",value:p,onChange:e=>{g(e.target.value)},error:f,helperText:v}),"show"===c&&n.a.createElement(l.a,{sx:{width:300,marginTop:2}},n.a.createElement(d.a,{variant:"body2",gutterBottom:!0},"Time to Destroy"),n.a.createElement(K.a,{name:"timeToDestroy",defaultValue:30,step:10,min:10,marks:x,valueLabelDisplay:"auto",value:b,onChange:(e,t)=>h(t)})),n.a.createElement(d.a,{variant:"caption",sx:{display:"block",mt:2,color:"text.secondary",fontWeight:"800",width:300,textAlign:"center"}},"Keep this key secure. It's essential for encrypting/decrypting the data.")),n.a.createElement(L.a,null,n.a.createElement(B.a,{onClick:()=>{y(!1),a(!1)}},"Close"),n.a.createElement(B.a,{onClick:()=>p.length<10?(y(!0),void k("Minimum 10 characters required")):s&&s.code&&19!==Object(E.decryptData)(s.code,p,w.a).length?(y(!0),void k("Invalid Key")):(y(!1),k(""),"show"===c&&u(b),m(p),i(),void a(!1))},"create"===c?"Add":"edit"===c?"Edit":"Show")))},z=a(266),J=a(267),V=a(251),G=a(277);function H(e){let{handleInputChange:t,label:a,placeHolder:o,cardDetails:c}=e;const s=Object(G.a)(z.a)(e=>{let{theme:t,bgcolor:a}=e;return{padding:t.spacing(2),maxWidth:360,margin:"auto",backgroundColor:a,color:"white",boxShadow:"none",borderRadius:"12px"}}),i=Object(G.a)(d.a)(e=>{let{theme:t}=e;return{marginBottom:t.spacing(.5),fontWeight:500,fontSize:"0.9rem"}}),u=Object(G.a)(T.a)(e=>{let{theme:t}=e;return{"& .MuiOutlinedInput-root":{borderRadius:"12px","& fieldset":{borderColor:"rgba(255, 255, 255, 0.4)"},"&:hover fieldset":{borderColor:"rgba(255, 255, 255, 0.7)"},"&.Mui-focused fieldset":{borderColor:"white"}},"& .MuiInputBase-input":{color:"white",fontSize:"0.9rem"},"& .MuiInputBase-input::placeholder":{color:"rgba(255, 255, 255, 0.5)",opacity:1},"& .MuiFormLabel-root":{color:"rgba(255, 255, 255, 0.6)","&.Mui-focused":{color:"white"}}}}),m=e=>{const{name:a,value:r}=e.target;let n=r;switch(a){case"code":n=r.replace(/\D/g,"").replace(/(\d{4})(?=\d)/g,"$1 ").trim();break;case"expiry":n=r.replace(/\D/g,"").replace(/(\d{2})(?=\d)/,"$1/").substr(0,5);break;case"cvv":n=r.replace(/\D/g,"").substr(0,3)}t({target:{name:a,value:n}})},[p,g]=Object(r.useState)(null),b={code:Object(r.useRef)(null),expiry:Object(r.useRef)(null),cvv:Object(r.useRef)(null),name:Object(r.useRef)(null),brand:Object(r.useRef)(null),network:Object(r.useRef)(null),network_type:Object(r.useRef)(null)};Object(r.useEffect)(()=>{b.code.current&&b.code.current.focus()},[]);const h=e=>{g(e),b[e].current&&b[e].current.focus()};Object(r.useEffect)(()=>{p&&b[p].current&&b[p].current.focus()},[p,c]);const f=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return n.a.createElement(u,{inputRef:b[e],name:e,placeholder:o[e],value:c[e],fullWidth:!0,type:"number",variant:"outlined",inputProps:{maxLength:t,inputMode:"numeric"},onChange:m,onFocus:()=>h(e)})},y=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return n.a.createElement(T.a,{inputRef:b[e],name:e,placeholder:o[e],value:c[e],fullWidth:!0,variant:"outlined",sx:{"& .MuiOutlinedInput-root":{borderRadius:"12px"}},inputProps:{maxLength:t},onChange:m,onFocus:()=>h(e)})};return n.a.createElement(n.a.Fragment,null,n.a.createElement(s,{bgcolor:c.color},n.a.createElement(l.a,{component:"form",noValidate:!0,autoComplete:"off"},n.a.createElement(J.a,{container:!0,spacing:2},n.a.createElement(J.a,{item:!0,xs:12},n.a.createElement(i,null,a.code),f("code",19)),n.a.createElement(J.a,{item:!0,xs:6},n.a.createElement(i,null,a.expiry),f("expiry",5)),n.a.createElement(J.a,{item:!0,xs:6},n.a.createElement(i,null,a.cvv),f("cvv",3)),n.a.createElement(J.a,{item:!0,xs:12},n.a.createElement(i,null,a.name),f("name",20))))),n.a.createElement(l.a,{sx:{marginTop:"40px",maxWidth:360,margin:"auto"}},n.a.createElement(V.a,{sx:{bgcolor:"rgba(0, 0, 0, 0.12)",marginBottom:"15px"}}),n.a.createElement(l.a,{component:"form",noValidate:!0,autoComplete:"off"},n.a.createElement(J.a,{container:!0,spacing:2},n.a.createElement(J.a,{item:!0,xs:12},n.a.createElement(i,null,a.brand,"(Optional)"),y("brand",12)),n.a.createElement(J.a,{item:!0,xs:6},n.a.createElement(i,null,a.network,"(Optional)"),y("network",12)),n.a.createElement(J.a,{item:!0,xs:6},n.a.createElement(i,null,a.network_type,"(Optional)"),y("network_type",12))))))}var U=a(270),$=a(118),q=a(117),Y=a.n(q);function Q(e){let{color:t,setColor:a}=e;const[r,o]=n.a.useState(null),c=Boolean(r),l=c?"simple-popover":void 0;return n.a.createElement("div",null,n.a.createElement(u.a,{sx:{textTransform:"none"},"aria-describedby":l,variant:"contained",onClick:e=>{o(e.currentTarget)}},n.a.createElement(Y.a,{fontSize:"large",sx:{padding:"5px",color:"black","&:hover":{borderRadius:"20px",fontWeight:"800",color:"white",backgroundColor:"black"}}})),n.a.createElement(U.b,{id:l,open:c,anchorEl:r,onClose:()=>{o(null)},anchorOrigin:{vertical:"bottom",horizontal:"left"},disableRestoreFocus:!0},n.a.createElement(d.a,{sx:{p:2}},n.a.createElement($.a,{color:t,onChange:e=>a({target:{value:e,name:"color"}})}))))}function X(e){let{backgroundColor:t,isAddCardDialogOpen:a,setIsAddCardDialogOpen:o,viewMode:c,cardsData:l,setCardsData:s,selectedCardIndex:i,encryptionKey:d,setIsLoading:u,setErrorMessage:m,setKeyDuration:p}=e;const[g,b]=Object(r.useState)({color:-1!==i?l[i].color:"black",code:-1!==i?Object(E.decryptData)(l[i].code,d,w.a):"",name:-1!==i?Object(E.decryptData)(l[i].name,d,w.a):"",cvv:-1!==i?Object(E.decryptData)(l[i].cvv,d,w.a):"",expiry:-1!==i?Object(E.decryptData)(l[i].expiry,d,w.a):"",network:-1!==i?Object(E.decryptData)(l[i].network,d,w.a):"",brand:-1!==i?Object(E.decryptData)(l[i].brand,d,w.a):"",network_type:-1!==i?Object(E.decryptData)(l[i].network_type,d,w.a):""}),h=e=>{const{name:t,value:a}=e.target;b(e=>({...e,[t]:a}))};return n.a.createElement(W.a,{open:a,PaperProps:{sx:{borderRadius:"12px",boxShadow:"8px 8px 0px "+t,border:"6px solid black","& .MuiDialogTitle-root":{fontWeight:"800"},"& .MuiDialogContent-root":{padding:"16px"},"& .MuiButton-root":{fontWeight:"800",color:"black",borderColor:"black","&:hover":{fontWeight:"800",color:"white",backgroundColor:"black"}}}}},n.a.createElement(R.a,null,n.a.createElement("span",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:"800"}},n.a.createElement("span",null,"create"===c?"Add Card":"Edit Card"),n.a.createElement(Q,{color:g.color,setColor:h}))),n.a.createElement(P.a,null,n.a.createElement(H,{handleInputChange:h,label:{color:"Color",code:"Number",name:"Name",cvv:"CVV",expiry:"Expiry Date",network:"Network",brand:"Brand",network_type:"Network Type"},placeHolder:{color:"grey",code:"1111222233334444",name:"xyz",cvv:"123",expiry:"MM/YY",network:"Visa/Rupay",brand:"HDFC/SBI",network_type:"Credit/Debit/MasteCard"},cardDetails:g})),n.a.createElement(L.a,null,n.a.createElement(B.a,{onClick:()=>{p(30),o(!1)}},"Close"),n.a.createElement(B.a,{onClick:()=>{let e,t={code:Object(E.encryptData)(g.code,d,w.a),name:Object(E.encryptData)(g.name,d,w.a),cvv:Object(E.encryptData)(g.cvv,d,w.a),expiry:Object(E.encryptData)(g.expiry,d,w.a),brand:Object(E.encryptData)(g.brand,d,w.a),network:Object(E.encryptData)(g.network,d,w.a),network_type:Object(E.encryptData)(g.network_type,d,w.a),color:g.color};"create"===c?e=[...l,t]:(e=[...l],e[i]={...e[i],...t}),(async e=>{let t=e;try{u(!0);const a=await Object(E.processCardData)("update",e);t=a,0===a.length&&m("No data available.")}catch(a){t=[],m("Error updating card data: "+a.message)}finally{s(t),u(!1),p(30),o(!1)}})(e)}},"edit"===c?"Save":"Add")))}function Z(e){let{visibleCardIndices:t,index:a,toggleCardFlip:r,handleCardAction:o}=e;return n.a.createElement(n.a.Fragment,null,n.a.createElement(u.a,{className:"edit-icon",onClick:()=>{o("edit",a)}},n.a.createElement(g.a,null)),n.a.createElement(u.a,{className:"ai-icon",onClick:()=>{o("show",a)}},t.includes(a)?n.a.createElement(b.a,null):n.a.createElement(h.a,null)),n.a.createElement(u.a,{className:"flip-icon",onClick:()=>r(a)},n.a.createElement(f.a,{fontSize:"large"})))}var ee=function(){const e=window.location.host.includes("localhost")?"http://localhost:8888":"https://jeapis.netlify.app",[t,a]=Object(r.useState)([]),[o,c]=Object(r.useState)(-1),[g,b]=Object(r.useState)([]),[h,f]=Object(r.useState)(!1),[v,k]=Object(r.useState)(!1),[x,S]=Object(r.useState)([]),[O,D]=Object(r.useState)(""),[I,N]=Object(r.useState)(""),[_,M]=Object(r.useState)(0),[W,R]=Object(r.useState)(""),[P,T]=Object(r.useState)(!1),[K,L]=Object(r.useState)(!1),[B,z]=Object(r.useState)("success"),[J,V]=Object(r.useState)("none");Object(r.useEffect)(()=>{const e=new URLSearchParams(window.location.search).get("code");e?G(e):H()},[]);const G=async t=>{try{let a=localStorage.getItem("card_data");a=a?JSON.parse(a):[],T(!0);const r=await fetch(e+"/.netlify/functions/googleAuth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:t,content:a})}),n=await r.json();localStorage.setItem("access_token",n.response.access_token),localStorage.setItem("refresh_token",n.response.refresh_token),localStorage.setItem("card_data",n.response.content),localStorage.setItem("googleDriveSyncEnabled","true")}catch(a){console.error("Error fetching tokens:",a)}finally{T(!1),window.location.href="/cardholder"}},H=async()=>{let e=[];try{T(!0);const t=await Object(E.processCardData)("fetch");e=t,0===t.length&&R("No data available.")}catch(t){e=[],R("Error fetching card data: "+t.message)}finally{a(e),T(!1)}},U=e=>S(x.includes(e)?x.filter(t=>t!==e):[...x,e]),$=e=>{b(g.includes(e)?g.filter(t=>t!==e):[...g,e])},q=Object(r.useCallback)(e=>{let{duration:t}=e;return n.a.createElement(y.a,{strokeWidth:4,size:40,isPlaying:!0,duration:t,colors:["#004777","#F7B801","#A30000","#A30000"],colorsTime:[7,5,2,0],onComplete:()=>{M(0),N(""),b([])}},e=>{let{remainingTime:t}=e;return t})},[]),Y=()=>{D("create"),Q("create",-1)},Q=(e,t)=>{switch(D(e),c(t),e){case"show":I?$(t):k(!0);break;default:I?(M(0),b([]),f(!0)):k(!0)}};return n.a.createElement(n.a.Fragment,null,n.a.createElement(l.a,{sx:{flexGrow:1}},n.a.createElement(s.a,{position:"static",sx:{backgroundColor:"#564bf5",borderBottom:"6px solid black"}},n.a.createElement(i.a,null,n.a.createElement(d.a,{variant:"h6",sx:{flexGrow:1}},"My Cards"),_>0&&I&&n.a.createElement(q,{duration:_}),n.a.createElement(u.a,{sx:{color:"white",marginLeft:"1rem","&:hover":{backgroundColor:"black"}},onClick:()=>Y()},n.a.createElement(p.a,null)),n.a.createElement(A,{invokeAlert:(e,t,a)=>{L(e),z(t),V(a)},setIsLoading:T,setCardsData:a,setErrorMessage:R})))),n.a.createElement("div",{className:"content"},0===t.length?n.a.createElement(d.a,{variant:"h6",sx:{flexGrow:1,justifyContent:"center",display:"flex"}},"No data available."===W?n.a.createElement(m.a,{label:"Add Card",variant:"outlined",onClick:()=>Y(),icon:n.a.createElement(p.a,{fontSize:"large"}),size:"medium",sx:{padding:"16px 12px",fontSize:"1.5rem",border:"4px solid black",color:"black",borderRadius:"8px",boxShadow:"4px 4px 0px #564bf5",transition:"box-shadow 0.3s ease, transform 0.3s ease","&:hover":{boxShadow:"8px 8px 0px #564bf5",transform:"translate(-4px, -4px)",backgroundColor:"#3C4B1E",cursor:"pointer"}}}):W):n.a.createElement("div",{className:"cards-grid"},t.map((e,t)=>n.a.createElement("div",{key:t,className:"card-container"},n.a.createElement("div",{className:"card "+(x.includes(t)?"flipped":"")},n.a.createElement("div",{className:"card-front",style:{backgroundColor:e.color}},n.a.createElement("div",{className:"card-brand"},g.includes(t)?Object(E.decryptData)(e.brand,I,w.a):"*****"),n.a.createElement("div",{className:"card-number"},g.includes(t)?Object(E.decryptData)(e.code,I,w.a).replace(/(\d{4})(?=\d)/g,"$1 ").trim():"**** **** **** ****"),n.a.createElement("div",{className:"card-info"},n.a.createElement("div",{className:"card-name"},g.includes(t)?Object(E.decryptData)(e.name,I,w.a):"***** ********"),n.a.createElement("div",{className:"card-expiry"},g.includes(t)?Object(E.decryptData)(e.expiry,I,w.a):"**/**")),n.a.createElement(Z,{visibleCardIndices:g,index:t,toggleCardFlip:U,handleCardAction:Q}),n.a.createElement("div",{className:"card-type"},g.includes(t)?Object(E.decryptData)(e.network,I,w.a):"**********"),n.a.createElement("div",{className:"card-label"},g.includes(t)?Object(E.decryptData)(e.network_type,I,w.a):"******")),n.a.createElement("div",{className:"card-back"},n.a.createElement("div",{className:"card-barcode"}),n.a.createElement(Z,{visibleCardIndices:g,index:t,toggleCardFlip:U,handleCardAction:Q}),n.a.createElement("div",{className:"card-cvv"},g.includes(t)?"CVV: "+Object(E.decryptData)(e.cvv,I,w.a):"CVV: ***"))))))),v&&n.a.createElement(F,{isKeyDialogOpen:v,setIsKeyDialogOpen:k,backgroundColor:"#564bf5",viewMode:O,setEncryptionKey:N,setKeyDuration:M,cardData:t[0],callback:()=>{switch(O){case"show":$(o);break;case"create":case"edit":f(!0)}}}),h&&n.a.createElement(X,{backgroundColor:"#564bf5",isAddCardDialogOpen:h,setIsAddCardDialogOpen:f,viewMode:O,cardsData:t,setCardsData:a,setIsLoading:T,selectedCardIndex:o,setErrorMessage:R,encryptionKey:I,setKeyDuration:M}),n.a.createElement(j,{state:K,type:B,message:J,setAlertState:L}),n.a.createElement("footer",{className:"footer"},n.a.createElement("p",null,"All card details are stored in an encrypted format.")),n.a.createElement(C,{show:P}))};const te=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ae(e,t){navigator.serviceWorker.register(e).then(e=>{e.onupdatefound=()=>{const a=e.installing;null!=a&&(a.onstatechange=()=>{"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(e=>{console.error("Error during service worker registration:",e)})}c.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(ee,null))),function(e){if("serviceWorker"in navigator){if(new URL("/cardholder",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const t="/cardholder/service-worker.js";te?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then(a=>{const r=a.headers.get("content-type");404===a.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then(e=>{e.unregister().then(()=>{window.location.reload()})}):ae(e,t)}).catch(()=>{console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(()=>{console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")})):ae(t,e)})}}()},69:function(e,t,a){}},[[145,1,2]]]);