(this.webpackJsonpcardholder=this.webpackJsonpcardholder||[]).push([[0],{14:function(e,t){let a=null;const r=async(e,t)=>{try{const l=window.location.host.includes("localhost")?"http://localhost:8888":"https://jeapis.netlify.app",i=localStorage.getItem("access_token"),d=localStorage.getItem("refresh_token");if(i&&null==a&&(a||(a=setTimeout(async()=>{await r("pushToServer"),a=null},1e3))),"pushToServer"!==e&&"deleteFromServer"!==e||i||(e="pushToServer"===e?"fetch":"delete"),"pushToServer"===e||"deleteFromServer"===e){const t=await n(),a="pushToServer"===e?await c(t):null,r=await fetch(l+"/.netlify/functions/getCardHolderData",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"pushToServer"===e?"create":"delete",access_token:i,refresh_token:d,content:a})});if(!r.ok)throw new Error("Failed to update card data. Server returned status: "+r.status);const u=await r.json();return u.content?(u.access_token?(localStorage.setItem("access_token",u.access_token),localStorage.setItem("refresh_token",u.refresh_token)):(localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token")),u.content.forEach(t=>{t.is_synced="pushToServer"===e}),await s(),o("upsert",u.content)):[]}return o(e,t)}catch(l){return o(e,t)}},o=async(e,t)=>{const a=await n();switch(e){case"upsert":Array.isArray(t)?await i(a,t):await l(a,t);break;case"delete":await l(a,t)}return(await c(a)).filter(e=>!e.is_deleted)},n=()=>new Promise((e,t)=>{const a=indexedDB.open("CardHolder",2);a.onupgradeneeded=e=>{const t=e.target.result.createObjectStore("carddetails",{keyPath:"key"});["key","color","code","validtill","cvv","name","brand","network","network_type","is_synced","is_deleted"].forEach(e=>t.createIndex(e,e,{unique:"key"===e}))},a.onsuccess=t=>e(t.target.result),a.onerror=e=>t(e.target.error)}),c=e=>new Promise((t,a)=>{const r=e.transaction(["carddetails"],"readonly").objectStore("carddetails").getAll();r.onsuccess=e=>t(e.target.result),r.onerror=e=>a(e.target.error)}),l=(e,t)=>new Promise((a,r)=>{const o=e.transaction(["carddetails"],"readwrite").objectStore("carddetails").put(t);o.onsuccess=()=>a(t),o.onerror=e=>r(e.target.error)}),i=(e,t)=>new Promise((a,r)=>{const o=e.transaction(["carddetails"],"readwrite"),n=o.objectStore("carddetails"),c=[];t.forEach(e=>{const t=n.put(e);t.onsuccess=()=>c.push(e),t.onerror=e=>console.error("Error upserting card:",e.target.error)}),o.oncomplete=()=>a(c),o.onerror=e=>r(e.target.error)}),s=async()=>new Promise(async(e,t)=>{const a=(await n()).transaction(["carddetails"],"readwrite").objectStore("carddetails").clear();a.onsuccess=()=>e("Database truncated successfully"),a.onerror=e=>t("Error opening database: "+e.target.error)});e.exports={processCardData:r,encryptData:(e,t,a)=>a.AES.encrypt(e,t).toString(),decryptData:(e,t,a)=>a.AES.decrypt(e,t).toString(a.enc.Utf8),truncateIndexedDB:s}},158:function(e,t,a){e.exports=a(199)},166:function(e,t,a){},167:function(e,t){},199:function(e,t,a){"use strict";a.r(t);var r=a(0),o=a.n(r),n=a(123),c=a.n(n),l=(a(166),a(288)),i=a(284),s=a(298),d=a(299),u=a(76),p=a(297),m=a(300),b=a(287),g=a(270),h=a(271),f=a(272),y=a(273),k=a(274),E=a(275),x=(a(82),a(124)),v=a(14),w=a(18),C=a.n(w),O=a(252),S=a(125);var j=function(e){let{show:t}=e;return o.a.createElement(i.a,{sx:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.4)",display:t?"flex":"none",justifyContent:"center",alignItems:"center",zIndex:9999}},o.a.createElement(O.a,{sx:{animationDuration:"550ms",["& ."+S.a.circle]:{strokeLinecap:"round"}},size:40,thickness:4}))},D=a(280),I=a(277);function M(e){let{backgroundColor:t,state:a,type:r,message:n,setAlertState:c}=e;return o.a.createElement(D.a,{open:a,autoHideDuration:5e3,onClose:()=>c(!1),anchorOrigin:{vertical:"top",horizontal:"center"},sx:{"& .MuiPaper-root":{background:""+t,border:"6px solid black",color:"white",fontWeight:"900","& .MuiAlert-icon":{color:"white",fontWeight:"900"},"& .MuiAlert-action":{"& .MuiIconButton-root":{color:"white",fontWeight:"900"}}}}},o.a.createElement(I.a,{onClose:()=>c(!1),severity:r},n))}var N=a(134),W=a(296),T=a(268),_=a(90);function A(e){let{onSyncComplete:t,setIsLoading:a}=e;const r=Object(_.b)({flow:"auth-code",ux_mode:"redirect",redirect_uri:window.location.href.endsWith("/")?window.location.href.substring(0,window.location.href.length-1):window.location.href,scope:"https://www.googleapis.com/auth/drive.appdata"});return o.a.createElement("div",null,o.a.createElement("div",{onClick:()=>{a(!0),localStorage.getItem("access_token")?Object(v.processCardData)("pushToServer").then(e=>{a(!1),t(!0,"success","Sync Competed")}).catch(e=>{a(!1),t(!0,"error","Issue with Sync try again later.")}):r()}},"Sync with Google Drive"))}var R=a(289),B=a(261),F=a(291),P=a(292),L=a(293),z=a(282),K=a(263),G=a(265),V=a(294),H=a(283),U=a(262),q=a(264),J=a(266);function Y(e){let{backgroundColor:t,open:a,setOpen:r}=e;return o.a.createElement(R.a,{PaperProps:{sx:{width:"340px",borderRadius:"12px",boxShadow:"8px 8px 0px "+t,border:"6px solid black","& .MuiDialogTitle-root":{fontWeight:"800",borderBottom:"2px solid black",padding:"16px"},"& .MuiDialogContent-root":{padding:"16px"},"& .MuiButton-root":{fontWeight:"800",color:"black",borderColor:"black","&:hover":{fontWeight:"800",color:"white",backgroundColor:"black",borderColor:"black"}}}},open:a,onClose:()=>r(!1),"aria-labelledby":"info-dialog-title","aria-describedby":"info-dialog-description"},o.a.createElement(B.a,{id:"info-dialog-title"},o.a.createElement(U.a,{fontSize:"small",style:{marginRight:"8px"}}),"Important Information"),o.a.createElement(F.a,null,o.a.createElement(P.a,{id:"info-dialog-description",component:"div"},o.a.createElement(L.a,null,o.a.createElement(z.a,null,o.a.createElement(K.a,null,o.a.createElement(q.a,{fontSize:"small"})),o.a.createElement(G.a,{primary:"Encrypted Storage",secondary:"All card details are securely stored in an encrypted format."})),o.a.createElement(z.a,null,o.a.createElement(K.a,null,o.a.createElement(J.a,{fontSize:"small"})),o.a.createElement(G.a,{primary:"Troubleshooting",secondary:"If you encounter persistent issues, reset the app from settings. Note: Resetting removes data from local storage but not from Google Drive if synced."}))))),o.a.createElement(V.a,null,o.a.createElement(H.a,{onClick:()=>r(!1),color:"primary",variant:"outlined",sx:{minWidth:"100px",transition:"all 0.3s","&:hover":{transform:"translateY(-2px)"}}},"Got it")))}var $=a(267);function Q(e){let{type:t,message:a,backgroundColor:n}=e;const[c,l]=Object(r.useState)(!0),s=async(e,a)=>{["escapeKeyDown","backdropClick"].includes(a)||("reset"===t?(await Object(v.truncateIndexedDB)(),localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),window.location.reload()):window.location.href="/cardholder")};return o.a.createElement(R.a,{PaperProps:{sx:{width:"340px",borderRadius:"12px",boxShadow:"8px 8px 0px "+n,border:"6px solid black","& .MuiDialogTitle-root":{fontWeight:"800",borderBottom:"2px solid black",padding:"16px"},"& .MuiDialogContent-root":{padding:"24px 16px"},"& .MuiButton-root":{fontWeight:"800",color:"black",borderColor:"black","&:hover":{fontWeight:"800",color:"white",backgroundColor:"black",borderColor:"black"}}}},open:c,onClose:s,"aria-labelledby":"error-dialog-title","aria-describedby":"error-dialog-description"},o.a.createElement(B.a,{id:"error-dialog-title"},o.a.createElement(i.a,{display:"flex",alignItems:"center"},"reset"===t?o.a.createElement(J.a,{style:{color:"black",marginRight:"8px"}}):o.a.createElement($.a,{style:{color:"black",marginRight:"8px"}}),o.a.createElement(u.a,{variant:"h6",component:"span"},"reset"===t?"App Reset":"Error Occurred"))),o.a.createElement(F.a,null,o.a.createElement(P.a,{variant:"body2",sx:{fontWeight:"600",marginTop:2}},a)),o.a.createElement(V.a,null,o.a.createElement(H.a,{onClick:s,color:"primary",variant:"outlined",startIcon:"reset"===t&&o.a.createElement(J.a,null),sx:{minWidth:"120px",transition:"all 0.3s","&:hover":{transform:"translateY(-2px)"}}},"reset"===t?"Refresh Now":"Okay")))}function X(e){let{backgroundColor:t,invokeAlert:a,setIsLoading:n,setCardsData:c,setErrorMessage:i}=e;const s=window.location.host.includes("localhost")?"386326794734-55j7cufjv2fgn75aa6d96b32i4j817o8.apps.googleusercontent.com":"386326794734-7vscbpqmdplr1grnt7ddva2c62597nut.apps.googleusercontent.com",[d,u]=Object(r.useState)(null),p=Boolean(d),m=()=>{u(null)},[b,g]=Object(r.useState)(!!localStorage.getItem("access_token")),[h,f]=Object(r.useState)(!1),[y,k]=Object(r.useState)();return o.a.createElement("div",null,o.a.createElement(l.a,{id:"basic-button",sx:{color:"white",marginLeft:"1rem","&:hover":{backgroundColor:"black"}},onClick:e=>{u(e.currentTarget)}},o.a.createElement(T.a,null)),o.a.createElement(N.a,{id:"basic-menu",anchorEl:d,open:p,onClose:m,MenuListProps:{"aria-labelledby":"basic-button"},sx:{"& .MuiPaper-root":{borderRadius:"12px",boxShadow:"8px 8px 0px "+t,border:"6px solid black"}}},b?o.a.createElement(o.a.Fragment,null,o.a.createElement(W.a,{onClick:async()=>{try{n(!0),await Object(v.processCardData)("pushToServer"),a(!0,"success","Sync Competed")}catch(e){i("Error fetching card data: "+e.message)}finally{n(!1)}}},"Sync with Google Drive"),o.a.createElement(W.a,{onClick:async()=>{try{n(!0),await Object(v.processCardData)("deleteFromServer"),g(!1),a(!0,"success","Delete From Google Drive")}catch(e){i("Error fetching card data: "+e.message)}finally{n(!1)}}},"Delete From Google Drive")):o.a.createElement(W.a,{onClick:m},o.a.createElement(_.a,{clientId:s},o.a.createElement(A,{setIsLoading:n,onSyncComplete:a}))),o.a.createElement(W.a,{onClick:()=>{f(!0)}},"App Info"),o.a.createElement(W.a,{onClick:()=>{k(!0)}},"Reset App")),o.a.createElement(Y,{backgroundColor:t,open:h,setOpen:f}),y&&o.a.createElement(Q,{type:"reset",message:"Resetting the app will delete all the app related data from local.",backgroundColor:t}))}var Z=a(276),ee=a(279);var te=e=>{let{isKeyDialogOpen:t,setIsKeyDialogOpen:a,backgroundColor:n,viewMode:c,selectedCardIndex:l,cardData:s,callback:d,setKeyDuration:p,setEncryptionKey:m}=e;const[b,g]=Object(r.useState)(""),[h,f]=Object(r.useState)(30),[y,k]=Object(r.useState)(!1),[E,x]=Object(r.useState)(""),w=o.a.useMemo(()=>Array.from({length:10},(e,t)=>({value:10*(t+1),label:10*(t+1)+"s"})),[]);return o.a.createElement(R.a,{open:t,PaperProps:{sx:{width:"340px",borderRadius:"12px",boxShadow:"8px 8px 0px "+n,border:"6px solid black","& .MuiDialogTitle-root":{fontWeight:"800"},"& .MuiDialogContent-root":{padding:"16px"},"& .MuiButton-root":{fontWeight:"800",color:"black",borderColor:"black","&:hover":{fontWeight:"800",color:"white",backgroundColor:"black"}}}}},o.a.createElement(B.a,null,"Key"),o.a.createElement(F.a,null,o.a.createElement(Z.a,{autoFocus:!0,required:!0,margin:"dense",id:"cardKey",name:"cardKey",label:"Key",type:"password",fullWidth:!0,variant:"standard",value:b,onChange:e=>{g(e.target.value)},error:y,helperText:E,sx:{"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:"black",borderWidth:"2px"},"&:hover fieldset":{borderColor:"black"},"&.Mui-focused fieldset":{borderColor:"black !important",borderWidth:"2px"}},"& .MuiInputBase-input":{color:"black",fontSize:"0.9rem",borderBottom:"2px solid black"},"& .MuiInput-root.Mui-focused::after":{borderBottom:"2px solid black"},"& .MuiInputBase-input::placeholder":{color:"black",opacity:1},"& .MuiFormLabel-root":{color:"black","&.Mui-focused":{color:"black"}},"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{boxShadow:"none"}}}),"show"===c&&o.a.createElement(i.a,{sx:{width:300,marginTop:2}},o.a.createElement(u.a,{variant:"body2",gutterBottom:!0},"Time to Destroy"),o.a.createElement(ee.a,{name:"timeToDestroy",defaultValue:30,step:10,min:10,marks:w,valueLabelDisplay:"auto",value:h,onChange:(e,t)=>f(t)})),o.a.createElement(u.a,{variant:"caption",sx:{display:"block",mt:2,color:"text.secondary",fontWeight:"800",textAlign:"center"}},"Keep this key secure. It's essential for encrypting/decrypting the data.")),o.a.createElement(V.a,null,o.a.createElement(H.a,{onClick:()=>{k(!1),a(!1)}},"Close"),o.a.createElement(H.a,{onClick:()=>b.length<10?(k(!0),void x("Minimum 10 characters required")):s&&s.code&&19!==Object(v.decryptData)(s.code,b,C.a).length?(k(!0),void x("Invalid Key")):(k(!1),x(""),"show"===c&&p(h),m(b),d(c,l),void a(!1))},"create"===c?"Add":"edit"===c?"Edit":"delete"===c?"Delete":"Show")))},ae=a(285),re=a(286),oe=a(269),ne=a(301);function ce(e){let{handleInputChange:t,label:a,placeHolder:n,cardDetails:c,errors:l}=e;const s=Object(ne.a)(ae.a)(e=>{let{theme:t,bgcolor:a}=e;return{padding:t.spacing(2),maxWidth:360,margin:"auto",backgroundColor:a,color:"white",boxShadow:"none",borderRadius:"12px"}}),d=Object(ne.a)(u.a)(e=>{let{theme:t}=e;return{marginBottom:t.spacing(.5),fontWeight:700,fontSize:"0.9rem"}}),p=Object(ne.a)(Z.a)(e=>{let{theme:t}=e;return{"& .MuiOutlinedInput-root":{borderRadius:"12px","& fieldset":{borderColor:"rgba(255, 255, 255, 0.4)"},"&:hover fieldset":{borderColor:"rgba(255, 255, 255, 0.7)"},"&.Mui-focused fieldset":{borderColor:"white"}},"& .MuiInputBase-input":{color:"white",fontSize:"0.9rem"},"& .MuiInputBase-input::placeholder":{color:"rgba(255, 255, 255, 0.5)",opacity:1},"& .MuiFormLabel-root":{color:"rgba(255, 255, 255, 0.6)","&.Mui-focused":{color:"white"}},"& .MuiFormHelperText-root":{color:"#dc5757",fontSize:"0.8rem"}}}),m=e=>{const{name:a,value:r}=e.target;let o=r;switch(a){case"code":o=r.replace(/(\d{4})(?=\d)/g,"$1 ").trim();break;case"expiry":o=r.replace(/(\d{2})(?=\d)/,"$1/")}t({target:{name:a,value:o}})},[g,h]=Object(r.useState)(null),f={code:Object(r.useRef)(null),expiry:Object(r.useRef)(null),cvv:Object(r.useRef)(null),name:Object(r.useRef)(null),brand:Object(r.useRef)(null),network:Object(r.useRef)(null),network_type:Object(r.useRef)(null)};Object(r.useEffect)(()=>{f.code.current&&f.code.current.focus()},[]);const y=e=>{h(e),f[e].current&&f[e].current.focus()};Object(r.useEffect)(()=>{g&&f[g].current&&f[g].current.focus()},[g,c]);const k=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"text";return o.a.createElement(p,{inputRef:f[e],name:e,placeholder:n[e],value:c[e],fullWidth:!0,variant:"outlined",inputProps:{maxLength:t,inputMode:a},onChange:m,onFocus:()=>y(e),errors:""!==l[e],helperText:l[e]})},E=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return o.a.createElement(Z.a,{inputRef:f[e],name:e,placeholder:n[e],value:c[e],fullWidth:!0,variant:"outlined",sx:{"& .MuiOutlinedInput-root":{borderRadius:"12px"}},inputProps:{maxLength:t},onChange:m,onFocus:()=>y(e)})};return o.a.createElement(o.a.Fragment,null,o.a.createElement(s,{bgcolor:c.color},o.a.createElement(i.a,{component:"form",noValidate:!0,autoComplete:"off"},o.a.createElement(re.a,{container:!0,spacing:2},o.a.createElement(re.a,{item:!0,xs:12},o.a.createElement(d,null,a.code),k("code",19,"numeric")),o.a.createElement(re.a,{item:!0,xs:6},o.a.createElement(d,null,a.expiry),k("expiry",5,"numeric")),o.a.createElement(re.a,{item:!0,xs:6},o.a.createElement(d,null,a.cvv),k("cvv",3,"numeric")),o.a.createElement(re.a,{item:!0,xs:12},o.a.createElement(d,null,a.name),k("name",20))))),o.a.createElement(i.a,{sx:{marginTop:"40px",maxWidth:360,margin:"auto"}},o.a.createElement(oe.a,{sx:{marginTop:"15px",marginBottom:"15px",fontWeight:"700","& .MuiDivider-wrapper":{fontWeight:"700"},"&::before, &::after":{borderTopWidth:"2px",borderTopColor:"black"}}},o.a.createElement(b.a,{label:"Optional",size:"medium"})),o.a.createElement(i.a,{component:"form",noValidate:!0,autoComplete:"off"},o.a.createElement(re.a,{container:!0,spacing:2},o.a.createElement(re.a,{item:!0,xs:12},o.a.createElement(d,null,a.brand),E("brand",12)),o.a.createElement(re.a,{item:!0,xs:6},o.a.createElement(d,null,a.network),E("network",12)),o.a.createElement(re.a,{item:!0,xs:6},o.a.createElement(d,null,a.network_type),E("network_type",12))))))}var le=a(295),ie=a(130),se=a(129),de=a.n(se);function ue(e){let{color:t,setColor:a}=e;const[r,n]=o.a.useState(null),c=Boolean(r),i=c?"simple-popover":void 0;return o.a.createElement("div",null,o.a.createElement(l.a,{sx:{textTransform:"none"},"aria-describedby":i,variant:"contained",onClick:e=>{n(e.currentTarget)}},o.a.createElement(de.a,{fontSize:"large",sx:{padding:"5px",color:"black","&:hover":{borderRadius:"20px",fontWeight:"800",color:"white",backgroundColor:"black"}}})),o.a.createElement(le.b,{id:i,open:c,anchorEl:r,onClose:()=>{n(null)},anchorOrigin:{vertical:"bottom",horizontal:"left"},disableRestoreFocus:!0},o.a.createElement(u.a,{sx:{p:2}},o.a.createElement(ie.a,{color:t,onChange:e=>a({target:{value:e,name:"color"}})}))))}function pe(e){let{backgroundColor:t,isAddCardDialogOpen:a,setIsAddCardDialogOpen:n,viewMode:c,cardsData:l,setCardsData:i,selectedCardIndex:s,encryptionKey:d,setIsLoading:u,setErrorMessage:p,setKeyDuration:m}=e;const[b,g]=Object(r.useState)({color:-1!==s?l[s].color:"black",code:-1!==s?Object(v.decryptData)(l[s].code,d,C.a):"",name:-1!==s?Object(v.decryptData)(l[s].name,d,C.a):"",cvv:-1!==s?Object(v.decryptData)(l[s].cvv,d,C.a):"",expiry:-1!==s?Object(v.decryptData)(l[s].expiry,d,C.a):"",network:-1!==s?Object(v.decryptData)(l[s].network,d,C.a):"",brand:-1!==s?Object(v.decryptData)(l[s].brand,d,C.a):"",network_type:-1!==s?Object(v.decryptData)(l[s].network_type,d,C.a):""}),[h,f]=Object(r.useState)({code:"",name:"",cvv:"",expiry:""}),y=e=>{const{name:t,value:a}=e.target;g(e=>({...e,[t]:a}))};return o.a.createElement(R.a,{open:a,PaperProps:{sx:{borderRadius:"12px",boxShadow:"8px 8px 0px "+t,border:"6px solid black","& .MuiDialogTitle-root":{fontWeight:"800"},"& .MuiDialogContent-root":{padding:"16px"},"& .MuiButton-root":{fontWeight:"800",color:"black",borderColor:"black","&:hover":{fontWeight:"800",color:"white",backgroundColor:"black"}}}}},o.a.createElement(B.a,null,o.a.createElement("span",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:"800"}},o.a.createElement("span",null,"create"===c?"Add Card":"Edit Card"),o.a.createElement(ue,{color:b.color,setColor:y}))),o.a.createElement(F.a,null,o.a.createElement(ce,{handleInputChange:y,label:{color:"Color",code:"Number",name:"Name",cvv:"CVV",expiry:"Expiry Date",network:"Network",brand:"Brand",network_type:"Network Type"},placeHolder:{color:"grey",code:"1111222233334444",name:"xyz",cvv:"123",expiry:"MM/YY",network:"Visa/Rupay",brand:"HDFC/SBI",network_type:"Credit/Debit/MasteCard"},cardDetails:b,errors:h})),o.a.createElement(V.a,null,o.a.createElement(H.a,{onClick:()=>{m(30),n(!1)}},"Close"),o.a.createElement(H.a,{onClick:()=>{let e={code:"",name:"",cvv:"",expiry:""};if(e=b.code.length<19?{...e,code:"Not valid"}:{...e,code:""},e=b.expiry.length<5?{...e,expiry:"Not valid"}:{...e,expiry:""},e=b.cvv.length<3?{...e,cvv:"Not valid"}:{...e,cvv:""},e=0===b.name.length?{...e,name:"Not valid"}:{...e,name:""},f(e),Object.keys(e).filter(t=>""!==e[t])[0])return!1;let t={key:(new Date).getTime(),code:Object(v.encryptData)(b.code,d,C.a),name:Object(v.encryptData)(b.name,d,C.a),cvv:Object(v.encryptData)(b.cvv,d,C.a),expiry:Object(v.encryptData)(b.expiry,d,C.a),brand:Object(v.encryptData)(b.brand,d,C.a),network:Object(v.encryptData)(b.network,d,C.a),network_type:Object(v.encryptData)(b.network_type,d,C.a),color:b.color,is_synced:!1,is_deleted:!1};"edit"===c&&(t={...t,key:l[s].key}),(async e=>{let t;try{u(!0);const a=await Object(v.processCardData)("upsert",e);t=a,0===a.length&&p("No data available.")}catch(a){t=[],p("Error updating card data: "+a.message)}finally{i(t),u(!1),m(30),n(!1)}})(t)}},"edit"===c?"Save":"Add")))}var me=a(131),be=a.n(me),ge=a(132),he=a.n(ge);const fe=window.location.host.includes("localhost")?"http://localhost:8888":"https://jeapis.netlify.app";var ye=function(){const[e,t]=Object(r.useState)([]),[a,n]=Object(r.useState)(-1),[c,w]=Object(r.useState)([]),[O,S]=Object(r.useState)(!1),[D,I]=Object(r.useState)(!1),[N,W]=Object(r.useState)([]),[T,_]=Object(r.useState)(""),[A,R]=Object(r.useState)(""),[B,F]=Object(r.useState)(0),[P,L]=Object(r.useState)(""),[z,K]=Object(r.useState)(!1),[G,V]=Object(r.useState)(""),[H,U]=Object(r.useState)(!1),[q,J]=Object(r.useState)("success"),[Y,$]=Object(r.useState)("none"),[Z,ee]=Object(r.useState)(!1);Object(r.useEffect)(()=>{const e=new URLSearchParams(window.location.search).get("code");e?(async e=>{try{const t=await Object(v.processCardData)("fetch");K(!0);const a=await fetch(fe+"/.netlify/functions/googleAuth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:e,content:t})}),r=await a.json();localStorage.setItem("access_token",r.response.access_token),localStorage.setItem("refresh_token",r.response.refresh_token),r.response.content&&(await Object(v.truncateIndexedDB)(),await Object(v.processCardData)("upsert",r.response.content)),window.location.href="/cardholder"}catch(t){console.error("Error fetching tokens:",t),ee(!0)}finally{K(!1)}})(e):(async()=>{let e=[];try{K(!0);const a=await Object(v.processCardData)("fetch");e=a,0===a.length&&L("No data available.")}catch(a){e=[],L("Error fetching card data: "+a.message)}finally{t(e),K(!1)}})()},[]);const ae=Object(r.useCallback)(e=>{W(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},[]),re=Object(r.useCallback)(e=>{w(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},[]),oe=Object(r.useCallback)(e=>{let{duration:t}=e;return o.a.createElement(x.a,{strokeWidth:4,size:40,isPlaying:!0,duration:t,colors:["#004777","#F7B801","#A30000","#A30000"],colorsTime:[7,5,2,0],onComplete:()=>{F(0),R(""),w([])}},e=>{let{remainingTime:t}=e;return t})},[]),ne=()=>{_("create"),ce("create",-1)},ce=Object(r.useCallback)((e,t,a)=>{_(e),n(t),A?se(e,t,a):I(!0)},[A]),le=Object(r.useCallback)((e,t,a)=>{U(e),J(t),$(a)},[]),ie=async(e,a)=>{let r;try{K(!0);let o=a[e];o.is_deleted=!0;const n=await Object(v.processCardData)("delete",o);r=n,0===n.length&&L("No data available.")}catch(o){r=[],L("Error fetching card data: "+o.message)}finally{t(r),F(30),K(!1)}},se=Object(r.useCallback)((t,a,r)=>{switch(t){case"show":re(a);break;case"create":case"edit":F(0),w([]),S(!0);break;case"delete":F(0),w([]),ie(a,r);break;case"showAll":F(0),w(Object.keys(e).map(e=>parseInt(e)));break;case"hideAll":F(0),R(""),w([]);break;default:S(!0)}},[e,re,ie]),de=Object(r.useMemo)(()=>e.filter(e=>!A||Object.keys(e).some(t=>!["color","key"].includes(t)&&Object(v.decryptData)(e[t],A,C.a).toLowerCase().includes(G.toLowerCase()))),[e,A,G]),ue=Object(r.useCallback)(t=>{let{visibleCardIndices:a,index:r,toggleCardFlip:n,handleCardAction:c}=t;return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.a,{className:"delete-icon",onClick:()=>c("delete",r,e)},o.a.createElement(be.a,null)),o.a.createElement(l.a,{className:"edit-icon",onClick:()=>c("edit",r)},o.a.createElement(g.a,null)),o.a.createElement(l.a,{className:"ai-icon",onClick:()=>c("show",r)},a.includes(r)?o.a.createElement(h.a,null):o.a.createElement(f.a,null)),o.a.createElement(l.a,{className:"flip-icon",onClick:()=>n(r)},o.a.createElement(y.a,{fontSize:"large"})),!e[r].is_synced&&o.a.createElement(l.a,{className:"sync-icon",onClick:()=>me()},o.a.createElement(he.a,null)))},[e]),me=()=>{K(!0),Object(v.processCardData)("pushToServer").then(e=>{t(e),K(!1),le(!0,"success","Sync Competed")}).catch(()=>{K(!1),le(!0,"error","Issue with Sync try again later.")})};return o.a.createElement(o.a.Fragment,null,o.a.createElement(i.a,{sx:{flexGrow:1}},o.a.createElement(s.a,{position:"fixed",sx:{backgroundColor:"#564bf5",borderBottom:"6px solid black"}},o.a.createElement(d.a,null,o.a.createElement(u.a,{variant:"h6",sx:{flexGrow:1}},"My Cards"),B>0&&A&&o.a.createElement(oe,{duration:B}),0!==e.length?A&&0===B?o.a.createElement(l.a,{sx:{color:"white",marginLeft:"1rem","&:hover":{backgroundColor:"black"}},onClick:()=>ce("hideAll")},o.a.createElement(h.a,null)):o.a.createElement(l.a,{sx:{color:"white",marginLeft:"1rem","&:hover":{backgroundColor:"black"}},onClick:()=>ce("showAll")},o.a.createElement(f.a,null)):o.a.createElement(o.a.Fragment,null),o.a.createElement(l.a,{sx:{color:"white",marginLeft:"1rem","&:hover":{backgroundColor:"black"}},onClick:()=>ne()},o.a.createElement(k.a,null)),o.a.createElement(X,{backgroundColor:"#564bf5",invokeAlert:le,setIsLoading:K,setCardsData:t,setErrorMessage:L})))),Z&&o.a.createElement(Q,{backgroundColor:"#564bf5",message:"Issue with Google Integration, Please try again later."}),0!==e.length&&o.a.createElement("div",{className:"search-bar"},o.a.createElement(p.a,{placeholder:"Search by Name, Brand, network or network type",startAdornment:o.a.createElement(o.a.Fragment,null,o.a.createElement(m.a,{position:"start",sx:{marginLeft:"10px"}},o.a.createElement(E.a,null))),value:G,onChange:e=>{A||le(!0,"warning","Click on the eye icon to decrypt and perform search"),V(e.target.value)},className:"search-input",disableUnderline:!0,sx:{fontWeight:"800",backgroundColor:"white",borderRadius:"12px",padding:"8px 12px",width:"80%",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)",border:"6px solid black",transition:"box-shadow 0.3s ease","& .MuiInputAdornment-root":{color:"black"},"&:hover, &:focus, &:focus-within, &:active":{boxShadow:"12px 12px 0px #564bf5"},"& .MuiInputAdornment-root":{color:"black"}}})),o.a.createElement("div",{className:"content",style:0===e.length?{paddingTop:"5rem"}:{}},0===e.length?o.a.createElement(u.a,{variant:"h6",sx:{flexGrow:1,justifyContent:"center",display:"flex",marginTop:"5%"}},"No data available."===P?o.a.createElement(b.a,{label:"Add Card",variant:"outlined",onClick:()=>ne(),icon:o.a.createElement(k.a,{fontSize:"large"}),size:"medium",sx:{padding:"16px 12px",fontSize:"1.5rem",border:"4px solid black",color:"black",borderRadius:"8px",boxShadow:"4px 4px 0px #564bf5",transition:"box-shadow 0.3s ease, transform 0.3s ease","&:hover":{boxShadow:"8px 8px 0px #564bf5",transform:"translate(-4px, -4px)",backgroundColor:"#3C4B1E",cursor:"pointer"}}}):P):o.a.createElement("div",{className:"cards-grid"},de.map((e,t)=>o.a.createElement("div",{key:t,className:"card-container"},o.a.createElement("div",{className:"card "+(N.includes(t)?"flipped":"")},o.a.createElement("div",{className:"card-front",style:{backgroundColor:e.color}},o.a.createElement("div",{className:"card-brand"},c.includes(t)?Object(v.decryptData)(e.brand,A,C.a):"*****"),o.a.createElement("div",{className:"card-number"},c.includes(t)?Object(v.decryptData)(e.code,A,C.a).replace(/(\d{4})(?=\d)/g,"$1 ").trim():"**** **** **** ****"),o.a.createElement("div",{className:"card-info"},o.a.createElement("div",{className:"card-name"},c.includes(t)?Object(v.decryptData)(e.name,A,C.a):"***** ********"),o.a.createElement("div",{className:"card-expiry"},c.includes(t)?Object(v.decryptData)(e.expiry,A,C.a):"**/**")),o.a.createElement(ue,{visibleCardIndices:c,index:t,toggleCardFlip:ae,handleCardAction:ce}),o.a.createElement("div",{className:"card-type"},c.includes(t)?Object(v.decryptData)(e.network,A,C.a):"**********"),o.a.createElement("div",{className:"card-label"},c.includes(t)?Object(v.decryptData)(e.network_type,A,C.a):"******")),o.a.createElement("div",{className:"card-back"},o.a.createElement("div",{className:"card-barcode"}),o.a.createElement(ue,{visibleCardIndices:c,index:t,toggleCardFlip:ae,handleCardAction:ce}),o.a.createElement("div",{className:"card-cvv"},c.includes(t)?"CVV: "+Object(v.decryptData)(e.cvv,A,C.a):"CVV: ***"))))))),D&&o.a.createElement(te,{isKeyDialogOpen:D,setIsKeyDialogOpen:I,backgroundColor:"#564bf5",selectedCardIndex:a,viewMode:T,setEncryptionKey:R,setKeyDuration:F,cardData:e[0],callback:se}),O&&o.a.createElement(pe,{backgroundColor:"#564bf5",isAddCardDialogOpen:O,setIsAddCardDialogOpen:S,viewMode:T,cardsData:e,setCardsData:t,setIsLoading:K,selectedCardIndex:a,setErrorMessage:L,encryptionKey:A,setKeyDuration:F}),o.a.createElement(M,{backgroundColor:"#564bf5",state:H,type:q,message:Y,setAlertState:U}),o.a.createElement(j,{show:z}))};const ke=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ee(e,t){navigator.serviceWorker.register(e).then(e=>{!function(e,t){e.onupdatefound=()=>{const a=e.installing;null!=a&&(a.onstatechange=()=>{"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}(e,t)}).catch(e=>{console.error("Error during service worker registration:",e)})}function xe(){"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>e.unregister()).catch(e=>{console.error(e.message)})}c.a.createRoot(document.getElementById("root")).render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(ye,null))),function(e){if("serviceWorker"in navigator){if(new URL("/cardholder",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const t="/cardholder/service-worker.js";ke?function(e,t,a){fetch(e,{headers:{"Service-Worker":"script"}}).then(r=>{const o=r.headers.get("content-type");404===r.status||o&&!o.includes("javascript")?a&&xe():Ee(e,t)}).catch(()=>{console.log("No internet connection found. App is running in offline mode.")})}(t,e,!0):Ee(t,e)})}}()},82:function(e,t,a){}},[[158,1,2]]]);