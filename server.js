// Tiny local server: shows the website AND keeps your Gemini key secret.
// Run:  node server.js     (needs Node 18 or newer, no other installs)
const http=require("http"),fs=require("fs"),path=require("path");
try{fs.readFileSync(path.join(__dirname,".env"),"utf8").split(/\r?\n/).forEach(l=>{const m=l.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);if(m&&!process.env[m[1]])process.env[m[1]]=m[2].replace(/^["']|["']$/g,"")})}catch(e){}
const KEY=process.env.GEMINI_API_KEY,PORT=process.env.PORT||3000;
const T={".html":"text/html",".js":"text/javascript",".css":"text/css",".png":"image/png",".json":"application/json"};
http.createServer(async(req,res)=>{
 if(req.method==="POST"&&req.url==="/api/gemini"){
  if(!KEY){res.writeHead(500);return res.end("No GEMINI_API_KEY in .env")}
  let raw="";req.on("data",c=>{raw+=c;if(raw.length>2e5)req.destroy()});
  req.on("end",async()=>{try{const{model,body}=JSON.parse(raw);
   const m=/^[\w.-]+$/.test(model||"")?model:"gemini-2.5-flash";
   const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":KEY},body:JSON.stringify(body)});
   res.writeHead(r.status,{"Content-Type":"application/json"});res.end(await r.text())}catch(e){res.writeHead(502);res.end("Gemini request failed")}});return}
 let f=path.join(__dirname,decodeURIComponent(req.url.split("?")[0]));if(f.endsWith(path.sep)||req.url==="/")f=path.join(__dirname,"index.html");
 if(!f.startsWith(__dirname)||/\.env|server\.js/.test(f)){res.writeHead(403);return res.end()}
 fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end("Not found")}res.writeHead(200,{"Content-Type":T[path.extname(f)]||"application/octet-stream"});res.end(d)})
}).listen(PORT,()=>console.log(`Pakki Kamai running: http://localhost:${PORT}  (Gemini key ${KEY?"found":"MISSING"})`));
