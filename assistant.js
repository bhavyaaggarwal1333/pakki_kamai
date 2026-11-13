/* Pakki Kamai: language engine, text size, contact seller, Gemini chat. */
(function(){
"use strict";
try{if(!localStorage.getItem("pk_lang"))localStorage.setItem("pk_lang","hi")}catch(e){}
/* ---------- 1. Language engine (Hindi / Hinglish for every text) ---------- */
const rows=window.PK_DICT.trim().split("\n").map(l=>l.split("|")),exact=new Map(),tok=[];
rows.forEach(r=>exact.set(r[0],{hi:r[1],hn:r[2]}));
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
rows.map(r=>r).sort((a,b)=>b[0].length-a[0].length).forEach(r=>{const e=r[0];if(!/[A-Za-z₹]/.test(e))return;
 const re=new RegExp((/^[A-Za-z]/.test(e)?"(?<![A-Za-z])":"")+esc(e)+(/[A-Za-z]$/.test(e)?"(?![A-Za-z])":""),"g");tok.push([re,r])});
const memo=new Map();
function conv(s,lang){const k=lang+"\u0001"+s;if(memo.has(k))return memo.get(k);
 const lead=s.match(/^\s*/)[0],tail=s.match(/\s*$/)[0],core=s.trim();let out=core;
 const ex=exact.get(core)||(window.MP&&window.MP.get(core));
 if(ex&&ex[lang])out=ex[lang];
 else{const hold=[];tok.forEach(([re,r])=>{out=out.replace(re,()=>{hold.push(lang==="hi"?r[1]:r[2]);return"\u0002"+(hold.length-1)+"\u0003"});});
  out=out.replace(/\u0002(\d+)\u0003/g,(m,i)=>hold[+i])}
 const res=lead+out+tail;memo.set(k,res);return res}
const skip=n=>{const p=n.parentElement;return!p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName)||p.closest("[data-nt]")};
const AT=["placeholder","aria-label","title"];
window.tr=function(root){const lang=(typeof L!=="undefined")?L:"en";
 const w=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=w.nextNode()){if(skip(n))continue;const v=n.nodeValue;if(!n._pk||(v!==n._pk.t&&v!==n._pk.o))n._pk={o:v,t:v};
  const out=lang==="en"?n._pk.o:conv(n._pk.o,lang);if(v!==out)n.nodeValue=out;n._pk.t=out}
 (root||document).querySelectorAll("[placeholder],[aria-label],[title]").forEach(e=>{if(e.closest("[data-nt]"))return;e._pa=e._pa||{};
  AT.forEach(a=>{const v=e.getAttribute(a);if(v===null)return;let r=e._pa[a];if(!r||(v!==r.t&&v!==r.o))r=e._pa[a]={o:v,t:v};
   const out=lang==="en"?r.o:conv(r.o,lang);if(v!==out)e.setAttribute(a,out);r.t=out})})};
/* ---------- 2. Text size ---------- */
const SZ=[16,18,20,22,24];let zi=1;try{zi=+localStorage.getItem("pk_z");if(!(zi>=0&&zi<SZ.length))zi=1}catch(e){zi=1}
const applyZ=()=>{document.documentElement.style.setProperty("--fs",SZ[zi]+"px");try{localStorage.setItem("pk_z",zi)}catch(e){}};
/* ---------- helpers ---------- */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const LANG=()=>(typeof L!=="undefined"?L:"en");
const H=t=>String(t??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let micLang=LANG()==="en"?"en-IN":"hi-IN";
function listen(cb,btn){if(!SR){toast("Voice input needs Chrome or Edge.");return}
 const r=new SR();r.lang=micLang;r.interimResults=false;const old=btn&&btn.textContent;if(btn)btn.textContent="Listening…";
 r.onresult=e=>cb(e.results[0][0].transcript);r.onend=()=>{if(btn)btn.textContent=old};r.onerror=()=>{if(btn)btn.textContent=old};try{r.start()}catch(e){}}
/* ---------- 3. Contact seller (buyer side) ---------- */
function contactUI(id,mode,itemId){const s=ST.find(x=>x.id===id),d=$("#dlg");mode=mode||"single";
 const prods=id==="raju"?st.b2b.products.filter(p=>p.enabled&&(mode==="bulk"?p.aud!=="retail":p.aud!=="business")):[];
 const sel=prods.find(p=>p.id===itemId)||prods[0];
 d.innerHTML=`<h2>${H(s.n)}</h2><p class="fine" style="margin:4px 0 12px">${H(mk(s.m).n)}</p><p style="margin:0 0 6px"><b>What do you want?</b></p>
 <div class="seg" id="cmode" style="display:flex"><button data-m="single" class="${mode==="single"?"on":""}" style="flex:1">Buy for myself</button><button data-m="bulk" class="${mode==="bulk"?"on":""}" style="flex:1">Big order for my shop</button></div>
 <label class="fl">What item?${prods.length?`<select id="citem">${prods.map(p=>`<option value="${H(p.id)}" ${sel&&sel.id===p.id?"selected":""}>${H(p.name)} · ₹${mode==="bulk"?p.wholesale:p.retail}</option>`).join("")}</select>`:`<input type="text" id="citem" value="${H(P[s.p][0])}">`}</label>
 <label class="fl">How many?<input type="number" id="cqty" min="1" value="${mode==="bulk"?(sel?sel.min:10):1}"></label>
 <label class="fl">Your message (you can speak it)<textarea id="cmsg" rows="3"></textarea></label>
 <div class="drow"><button class="btn o" id="cmic" type="button">Speak</button><select id="cml" aria-label="Speak in:" style="width:auto"><option value="hi-IN" ${micLang==="hi-IN"?"selected":""}>Hindi</option><option value="en-IN" ${micLang==="en-IN"?"selected":""}>English</option></select></div>
 <div class="drow" style="margin-top:12px"><button class="btn g" id="csend" type="button">Send to seller</button><button class="btn" id="cchat" type="button">Chat with seller</button><button class="btn o" id="ccl" type="button">Cancel</button></div>`;
 d.showModal();
 $$("#cmode button").forEach(b=>b.onclick=()=>contactUI(id,b.dataset.m));
 $("#cml").onchange=e=>micLang=e.target.value;$("#cmic").onclick=e=>listen(t=>{$("#cmsg").value=($("#cmsg").value+" "+t).trim()},e.target);
 $("#ccl").onclick=()=>d.close();$("#cchat").onclick=()=>{d.close();openChat("seller:"+id)};
 $("#csend").onclick=()=>{const qty=Math.max(1,Math.round(+$("#cqty").value)||1),msg=$("#cmsg").value.trim();
  const pid=$("#citem").value,pr=prods.find(p=>p.id===pid),item=pr?pr.name:($("#citem").value||"").trim();
  if(!item)return toast("Please write or speak your message.");
  st.b2b.contacts.push({id:"m"+Date.now(),stall:id,type:mode,item,qty,msg,status:"New",reply:"",t:Date.now()});
  if(mode==="bulk"&&pr)st.b2b.enquiries.push({id:"e"+Date.now(),buyer:"Your Shop",product:pr.name,qty:Math.max(qty,pr.min),price:pr.wholesale,date:"Any date",note:msg,status:"New"});
  save();d.close();toast("Request sent. The seller will reply.");window.__pkRenderAll&&window.__pkRenderAll()}};
window.pkRenderBuyerMsgs=function(el){const a=st.b2b.contacts.slice().reverse();
 el.innerHTML=`<div class="page-heading"><div><h1>My Messages</h1><p class="fine">Messages you sent to sellers and their answers.</p></div></div>`+(a.length?a.map(m=>{const s=ST.find(x=>x.id===m.stall)||{n:"?"};
  return`<div class="b2b-card" style="margin-bottom:12px"><span class="b2b-pill">${m.type==="bulk"?"Shop order":"Single customer"}</span><h3>${H(s.n)}</h3><p>${H(m.item)} × ${m.qty}</p>${m.msg?`<p data-nt>“${H(m.msg)}”</p>`:""}${m.reply?`<p><b>Seller replied:</b> <span>${H(m.reply)}</span></p>`:`<p class="fine">Waiting for reply</p>`}</div>`}).join(""):`<div class="b2b-empty">No messages yet. Press Contact on a shop.</div>`)};
window.pkRenderVendorMsgs=function(el){const a=st.b2b.contacts.filter(m=>m.stall==="raju").slice().reverse(),R=["Yes, I have it","Come to my shop","Please call me","Sorry, not available"];
 el.innerHTML=`<div class="panel" style="margin-top:20px"><h2>Messages from buyers</h2>`+(a.length?a.map(m=>`<div class="msgrow"><span class="b2b-pill">${m.type==="bulk"?"Shop order":"Single customer"}</span> <b>${H(m.item)} × ${m.qty}</b>${m.msg?`<p data-nt style="margin:4px 0">“${H(m.msg)}”</p>`:""}${m.reply?`<p class="fine">You replied: <b>${H(m.reply)}</b></p>`:`<p class="fine" style="margin:6px 0 4px">Reply quickly:</p><div class="drow">${R.map(r=>`<button class="btn o" data-rp="${H(m.id)}" data-rt="${H(r)}">${r}</button>`).join("")}</div>`}</div>`).join(""):`<p class="fine">No messages from buyers yet.</p>`)+`</div>`};
/* ---------- 4. Chat (Gemini + offline fallback) ---------- */
const cfg=Object.assign({GEMINI_API_KEY:"",GEMINI_MODEL:"gemini-2.5-flash",USE_PROXY:true},window.PK_CONFIG||{});
let mode="vetan";const hist={};let busy=false;const lg=$("#log");lg.setAttribute("data-nt","");
const LN=()=>({en:"English",hi:"Hindi in Devanagari script",hn:"Hinglish (Hindi in English letters)"}[LANG()]);
function say(t,u){const d=document.createElement("div");d.className="m "+(u?"u":"b");d.textContent=t;lg.appendChild(d);lg.scrollTop=1e9;
 if(!u&&speak&&window.speechSynthesis){const x=new SpeechSynthesisUtterance(t.replace(/₹/g,"rupees "));x.lang=/[\u0900-\u097F]/.test(t)?"hi-IN":"en-IN";speechSynthesis.cancel();speechSynthesis.speak(x)}}
let speak=false;
function sysPrompt(){const base=`You are a friendly helper inside "Pakki Kamai", an app for small street vendors and shoppers in Delhi, India. Users may know little about technology or English. Use very simple, short words (maximum 3 short sentences). The user's screen language is ${LN()}; reply in the language the user writes in (Hindi in Devanagari, Hinglish, or English). If unsure, use ${LN()}. Never use jargon. Never invent facts, prices or stock that are not in the data below; if you do not know, say the seller will confirm. Only talk about this app, selling, buying, money and shops.\n`;
 if(mode==="vetan"){let r="";try{r=routes().map((x,i)=>`${i+1}. ${x.m.n} (${x.riv} rival pot sellers)`).join("; ")}catch(e){}
  return base+`You are "Vetan", helper for the seller Raju (Raju Pottery, Pitampura Haat). Data: money kept aside ₹${st.wallet}; sold this week ₹${st.wk}; weekly salary ₹${st.sal}; share kept aside ${st.share}%; safe salary about ₹${safe()}; good weeks in a row ${st.steady} of 12 (loan offers open at 12); best markets for pots: ${r}. Products: ${st.b2b.products.map(p=>`${p.name} normal ₹${p.retail}, big-order ₹${p.wholesale}, least ${p.min}, stock ${p.stock}`).join("; ")}. The app is free for sellers and buyers. Explain simply how to use: Get Paid, My Salary, My Products, New Requests, Who I Sell To.`}
 const id=mode.split(":")[1],s=ST.find(x=>x.id===id)||ST[0],m=mk(s.m);let prods="";
 if(id==="raju")prods=st.b2b.products.filter(p=>p.enabled).map(p=>`${p.name}: ${p.aud!=="business"?"normal price ₹"+p.retail:""}${p.aud!=="retail"?" big-order price ₹"+p.wholesale+" (least "+p.min+" pieces)":""}, stock ${p.stock}`).join("; ");
 return base+`You are the shop assistant of "${s.n}" (${P[s.p][0]}), at ${m.n}, open ${DL[m.d]}s, busy ${m.peak}. Items: ${prods||"details not listed; tell the buyer to press Send to seller and the seller will confirm"}. Help the buyer ask about items, prices, big orders for shops. When the buyer is ready to order, tell them to press "Send this chat to seller" or the Contact button. You cannot take payment.`}
const ext=j=>(j.candidates?.[0]?.content?.parts||[]).map(p=>p.text||"").join("").trim();
async function gemini(contents){const body={systemInstruction:{parts:[{text:sysPrompt()}]},contents,generationConfig:{temperature:.5,maxOutputTokens:400}};
 if(/2\.5/.test(cfg.GEMINI_MODEL))body.generationConfig.thinkingConfig={thinkingBudget:0};
 if(cfg.USE_PROXY&&/^https?:/.test(location.protocol)){try{const r=await fetch("/api/gemini",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:cfg.GEMINI_MODEL,body})});if(r.ok){const t=ext(await r.json());if(t)return t}}catch(e){}}
 if(cfg.GEMINI_API_KEY){const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${cfg.GEMINI_MODEL}:generateContent`,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":cfg.GEMINI_API_KEY},body:JSON.stringify(body)});if(r.ok){const t=ext(await r.json());if(t)return t}}
 throw new Error("no-ai")}
function offline(q){if(mode==="vetan")return window.pkBot?window.pkBot(q):"…";
 const id=mode.split(":")[1],l=LANG(),T=(a,b,c)=>l==="en"?a:l==="hi"?b:c;
 if(id==="raju"){const ps=st.b2b.products.filter(p=>p.enabled);
  if(/big|bulk|thok|bada|बड़ा|थोक|shop|dukaan|दुकान/i.test(q))return ps.filter(p=>p.aud!=="retail").map(p=>`${p.name}: ₹${p.wholesale} ${T("each, least","प्रति पीस, कम से कम","per piece, kam se kam")} ${p.min}`).join("\n")||T("No big orders right now.","अभी बड़े ऑर्डर नहीं हैं।","Abhi bade order nahi hain.");
  return ps.filter(p=>p.aud!=="business").map(p=>`${p.name}: ₹${p.retail}`).join("\n")+"\n"+T("Press Send to seller to order.","ऑर्डर के लिए \"विक्रेता को भेजें\" दबाएँ।","Order ke liye \"Seller ko bhejein\" dabayein.")}
 return T("Please press Send to seller. The seller will answer you.","कृपया \"विक्रेता को भेजें\" दबाएँ। विक्रेता आपको जवाब देगा।","Kripya \"Seller ko bhejein\" dabayein. Seller aapko jawab dega.")}
async function ask(t){t=t.trim();if(!t||busy)return;say(t,1);const h=hist[mode]=hist[mode]||[];h.push({role:"user",parts:[{text:t}]});busy=true;
 const w=document.createElement("div");w.className="m b";w.textContent=LANG()==="en"?"Thinking…":LANG()==="hi"?"सोच रहा हूँ…":"Soch raha hoon…";lg.appendChild(w);lg.scrollTop=1e9;
 let a;try{a=await gemini(h.slice(-12))}catch(e){a=offline(t)}
 w.remove();say(a);h.push({role:"model",parts:[{text:a}]});busy=false}
const QV=["Wallet balance","Next salary day","Where to sell tomorrow","Loan status","Is it free?"],QS=["What do you sell?","What is the price?","Can I get a big order?","Where is your shop?"];
function openChat(m){mode=m;const c=$("#chat"),l=LANG(),sellerMode=m!=="vetan";c.classList.add("on");lg.innerHTML="";
 const nm=sellerMode?(ST.find(x=>x.id===m.split(":")[1])||{}).n:"";
 $("#chat .hd b").innerHTML=sellerMode?`<span>Seller's helper</span> <span data-nt>· ${H(nm)}</span>`:`<span>Vetan · your helper</span>`;
 $("#qs").innerHTML=(sellerMode?QS:QV).map(q=>`<button>${q}</button>`).join("")+(sellerMode?`<button class="sendchat">Send this chat to seller</button>`:"");
 (hist[m]||[]).forEach(x=>say(x.parts[0].text,x.role==="user"));
 if(!(hist[m]||[]).length)say(sellerMode?(l==="en"?`Hello! I am the helper of ${nm}. Ask about items, prices or big orders. Type or speak in Hindi or English.`:l==="hi"?`नमस्ते! मैं ${nm} का सहायक हूँ। सामान, दाम या बड़े ऑर्डर के बारे में पूछिए। हिन्दी या English में लिखें या बोलें।`:`Namaste! Main ${nm} ka sahayak hoon. Saaman, daam ya bade order ke baare mein poochhiye. Hindi ya English mein likhein ya bolein.`):
  (l==="en"?"Hello! I am Vetan, your helper. Ask me anything in Hindi or English. You can type, or press Mic and speak.":l==="hi"?"नमस्ते! मैं वेतन हूँ, आपका साथी। हिन्दी या English में कुछ भी पूछिए। लिखें, या माइक दबाकर बोलें।":"Namaste! Main Vetan hoon, aapka saathi. Hindi ya English mein kuch bhi poochhiye. Likhein, ya Mic dabakar bolein."));
 tr($("#chat"))}
$("#qs").onclick=e=>{const b=e.target.closest("button");if(!b)return;
 if(b.classList.contains("sendchat")){const id=mode.split(":")[1],u=(hist[mode]||[]).filter(x=>x.role==="user").map(x=>x.parts[0].text);
  if(!u.length)return toast("Please write or speak your message.");st.b2b.contacts.push({id:"m"+Date.now(),stall:id,type:"single",item:"Chat",qty:1,msg:u.slice(-4).join(" | "),status:"New",reply:"",t:Date.now()});save();toast("Chat sent to seller");window.__pkRenderAll&&window.__pkRenderAll();return}
 ask(b.textContent)};
$("#cf").onsubmit=e=>{e.preventDefault();const v=$("#ci").value;$("#ci").value="";ask(v)};
$("#fab").onclick=()=>{const c=$("#chat");if(c.classList.contains("on")&&mode==="vetan")c.classList.remove("on");else openChat("vetan")};
$("#x").onclick=()=>$("#chat").classList.remove("on");
$("#spk").onclick=e=>{speak=!speak;e.target.textContent=speak?"Voice on":"Voice off"};
const ml=document.createElement("select");ml.id="chatml";ml.setAttribute("aria-label","Speak in:");ml.style.cssText="width:auto;padding:6px";ml.innerHTML=`<option value="hi-IN">Hindi</option><option value="en-IN">English</option>`;ml.value=micLang;ml.onchange=()=>micLang=ml.value;$("#cf").insertBefore(ml,$("#mic"));
$("#mic").onclick=e=>listen(t=>{$("#ci").value=t;ask(t);$("#ci").value=""},e.target);
/* ---------- 5. Wire-up ---------- */
document.addEventListener("click",e=>{const t=e.target.closest("[data-contact],[data-chatseller],[data-rp],.tsz button");if(!t)return;
 if(t.dataset.chatseller)openChat('seller:'+t.dataset.chatseller);if(t.dataset.contact)contactUI(t.dataset.contact,t.dataset.mode||"single",t.dataset.item);
 if(t.dataset.rp){const m=st.b2b.contacts.find(x=>x.id===t.dataset.rp);if(m){m.reply=t.dataset.rt;m.status="Replied";save();toast("Reply sent");window.__pkRenderAll&&window.__pkRenderAll()}}
 if(t.dataset.z){zi=Math.max(0,Math.min(SZ.length-1,zi+ +t.dataset.z));applyZ()}});
const lang=$(".lang");if(lang){const z=document.createElement("div");z.className="tsz";z.setAttribute("data-nt","");z.setAttribute("role","group");z.setAttribute("aria-label","Text size");z.innerHTML=`<button data-z="-1" aria-label="Smaller text">A−</button><button data-z="1" aria-label="Bigger text">A+</button>`;lang.after(z)}
applyZ();
const sl=window.setLang;if(typeof sl==="function")window.setLang=function(l,q){sl(l,q);micLang=l==="en"?"en-IN":"hi-IN";ml.value=micLang;tr()};
tr();
})();
