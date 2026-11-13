/* Shared language engine: English / Hindi / Hinglish. [key, en, hi, hinglish]; en=0 means same as key */
const D=[
["Problem",0,"समस्या","Samasya"],["Three jobs",0,"तीन काम","Teen kaam"],["Hands-on example",0,"व्यावहारिक उदाहरण","Hands-on example"],["Why us",0,"हम क्यों","Hum kyon"],["Business",0,"व्यवसाय","Business"],["Pilot",0,"पायलट","Pilot"],
["PROMISE TO THE BEARER",0,"धारक को वचन","DHARAK KO VACHAN"],["Pakki",0,"पक्की","Pakki"],["Kamai",0,"कमाई","Kamai"],
["A steady weekly salary for people who have no employer.",0,"उन लोगों के लिए हर हफ़्ते की पक्की तनख़्वाह, जिनका कोई मालिक नहीं।","Unke liye har hafte ki pakki salary, jinka koi employer nahi."],
["Open the working app",0,"चलता हुआ ऐप खोलें","Chalta hua app kholo"],["How it works",0,"यह कैसे काम करता है","Yeh kaise kaam karta hai"],
["Paisa aata hai. Par pakka kuch nahi.","Money comes in. But nothing is certain.","पैसा आता है, पर पक्का कुछ नहीं।","Paisa aata hai. Par pakka kuch nahi."],
["Payments are digital, but the worker still lives like a cash worker: no salary, no history, no guidance.",0,"पेमेंट डिजिटल हो गए, पर कामगार अब भी नक़द वाले मज़दूर जैसा जीता है: न तनख़्वाह, न इतिहास, न मार्गदर्शन।","Payment digital ho gaye, par worker ab bhi cash wale mazdoor jaisa jeeta hai: na salary, na history, na guidance."],
["Income swings",0,"आमदनी का उतार-चढ़ाव","Income ka utaar-chadhaav"],["Market by guesswork",0,"अंदाज़े से बाज़ार","Andaze se market"],["No proof of work",0,"काम का कोई सबूत नहीं","Kaam ka koi proof nahi"],["Data goes to waste",0,"डेटा बेकार जाता है","Data waste ho jaata hai"],
["The numbers",0,"आँकड़े","Aankde"],
["Every payment does three jobs",0,"हर पेमेंट तीन काम करता है","Har payment teen kaam karta hai"],
["Delivered by voice note on WhatsApp in Hindi, English or Hinglish. No new app to learn.",0,"हिंदी, अंग्रेज़ी या हिंग्लिश में WhatsApp वॉइस नोट से। सीखने के लिए कोई नया ऐप नहीं।","Hindi, English ya Hinglish mein WhatsApp voice note se. Seekhne ke liye koi naya app nahi."],
["Where to sell",0,"कहाँ बेचें","Kahan bechein"],["Fixed weekly salary",0,"हर हफ़्ते तय तनख़्वाह","Har hafte fixed salary"],["A record lenders trust",0,"ऐसा रिकॉर्ड जिस पर कर्ज़ देने वाले भरोसा करें","Aisa record jis par lender bharosa kare"],
["The loop that keeps turning",0,"चलता रहने वाला चक्र","Chalta rehne wala loop"],
["Hands-on example: Raju’s four weeks",0,"व्यावहारिक उदाहरण: राजू के चार हफ़्ते","Hands-on example: Raju ke chaar hafte"],
["Share held back",0,"रोकी गई हिस्सेदारी","Roka gaya hissa"],["Weekly salary",0,"साप्ताहिक तनख़्वाह","Weekly salary"],
["What exists, and what it misses",0,"जो मौजूद है, और जो छूट जाता है","Jo maujood hai, aur jo chhoot jaata hai"],
["Worker pays nothing. Partners pay.",0,"कामगार कुछ नहीं देता। पार्टनर देते हैं।","Worker kuch nahi deta. Partners dete hain."],
["Start small, aim wide",0,"छोटे से शुरू, बड़ा लक्ष्य","Chhote se shuru, bada lakshya"],
["100 vendors. 10 markets. 8 weeks.",0,"100 विक्रेता। 10 बाज़ार। 8 हफ़्ते।","100 vendors. 10 bazaar. 8 hafte."],
["Vendor dashboard",0,"विक्रेता डैशबोर्ड","Vendor dashboard"],["Consumer dashboard",0,"ग्राहक डैशबोर्ड","Customer dashboard"],["About us",0,"हमारे बारे में","Hamare baare mein"],
["Prototype · demo data · saved in this browser",0,"प्रोटोटाइप · डेमो डेटा · इसी ब्राउज़र में सेव","Prototype · demo data · isi browser mein save"],
["Reset demo",0,"डेमो रीसेट करें","Demo reset karo"],["Your Pakki QR",0,"आपका पक्की QR","Aapka Pakki QR"],["Receive",0,"पाएँ","Receive"],
["Salary settings",0,"तनख़्वाह सेटिंग","Salary settings"],["Share held back from each payment",0,"हर पेमेंट से रोकी गई हिस्सेदारी","Har payment se roka gaya hissa"],
["Run Sunday payout",0,"रविवार का भुगतान चलाएँ","Sunday payout chalao"],["Last 8 weeks",0,"पिछले 8 हफ़्ते","Pichhle 8 hafte"],["Where to sell next",0,"अगली बार कहाँ बेचें","Agli baar kahan bechein"],
["Pakki Kamai Passbook",0,"पक्की कमाई पासबुक","Pakki Kamai Passbook"],["Ratings from real payers",0,"असली भुगतानकर्ताओं की रेटिंग","Asli payers ki ratings"],
["Wallet balance",0,"वॉलेट बैलेंस","Wallet balance"],["Sales this week",0,"इस हफ़्ते की बिक्री","Is hafte ki sales"],["Next salary",0,"अगली तनख़्वाह","Agli salary"],["Steady weeks",0,"पक्के हफ़्ते","Pakke hafte"],
["Find a stall you can trust",0,"भरोसेमंद स्टॉल ढूँढें","Bharosemand stall dhundho"],["Best rated",0,"सबसे अच्छी रेटिंग","Best rated"],["Most reviewed",0,"सबसे ज़्यादा रिव्यू","Sabse zyada reviews"],["Open today",0,"आज खुला","Aaj khula"],["Saved stalls",0,"सेव किए स्टॉल","Saved stalls"],["Your payments",0,"आपके पेमेंट","Aapke payments"],["All",0,"सभी","Sab"],
["Pay and rate",0,"पेमेंट करें और रेट करें","Pay karo aur rate karo"],["Ask Vetan",0,"वेतन से पूछें","Vetan se poochho"],["Vetan · your salary friend",0,"वेतन · आपका तनख़्वाह साथी","Vetan · aapka salary dost"],
["Close",0,"बंद करें","Band karo"],["Send",0,"भेजें","Bhejo"],["Mic",0,"माइक","Mic"],["Voice off",0,"आवाज़ बंद","Voice off"],["Voice on",0,"आवाज़ चालू","Voice on"],
["Type or speak (Hindi / English)",0,"लिखें या बोलें (हिंदी / English)","Likhein ya bolein (Hindi / English)"],["Try: terracotta pots, chai, sabzi, tailor…",0,"आज़माएँ: मटके, चाय, सब्ज़ी, दर्ज़ी…","Try karo: matka, chai, sabzi, tailor…"],
["Namaste! Main Vetan hoon. Hindi ya English mein poochiye. Mic dabakar bol bhi sakte hain.","Hello! I’m Vetan. Ask me in Hindi or English. You can also tap the mic and speak.","नमस्ते! मैं वेतन हूँ। हिंदी या English में पूछिए। माइक दबाकर बोल भी सकते हैं।","Namaste! Main Vetan hoon. Hindi ya English mein poochiye. Mic dabakar bol bhi sakte hain."]
];
const LS={en:"English",hi:"हिन्दी",hn:"Hinglish"};let L="en";
const MP=new Map(D.map(r=>[r[0],{en:r[1]||r[0],hi:r[2],hn:r[3]}]));
function tr(root){const w=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT);let n;
while(n=w.nextNode()){if(n._o===undefined)n._o=n.nodeValue.trim();const m=MP.get(n._o);if(m){const v=m[L],cur=n.nodeValue.trim();if(v&&cur!==v)n.nodeValue=n.nodeValue.replace(cur,v)}}
(root||document).querySelectorAll?.("[placeholder]").forEach(e=>{if(e._p===undefined)e._p=e.placeholder;const m=MP.get(e._p);if(m)e.placeholder=m[L]})}
let busy=false;const mo=new MutationObserver(()=>{if(busy)return;busy=true;mo.disconnect();tr();mo.observe(document.body,{childList:true,subtree:true,characterData:true});busy=false});
function setLang(l,quiet){L=l;document.documentElement.lang=l=="en"?"en":"hi";try{localStorage.setItem("pk_lang",l)}catch(e){}
document.querySelectorAll(".lang button").forEach(b=>{b.classList.toggle("on",b.dataset.l==l);b.setAttribute("aria-pressed",b.dataset.l==l)});tr();
const fr=document.getElementById("aboutFrame");if(fr&&fr.contentWindow)fr.contentWindow.postMessage({lang:l},"*")}
addEventListener("message",e=>{if(e.data&&e.data.lang&&LS[e.data.lang])setLang(e.data.lang)});
addEventListener("DOMContentLoaded",()=>{let l="en";try{l=new URLSearchParams(location.search).get("lang")||localStorage.getItem("pk_lang")||"en"}catch(e){}
document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>setLang(b.dataset.l));setLang(LS[l]?l:"en");mo.observe(document.body,{childList:true,subtree:true,characterData:true})});
