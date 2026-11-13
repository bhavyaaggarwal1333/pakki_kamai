// Vercel serverless function: keeps your Gemini key secret on the server.
// The website calls POST /api/gemini  (same as server.js does locally).
module.exports=async function handler(req,res){
  if(req.method!=="POST")return res.status(405).send("Use POST");
  const KEY=process.env.GEMINI_API_KEY;
  if(!KEY)return res.status(500).send("GEMINI_API_KEY is not set in Vercel");
  try{
    const b=typeof req.body==="string"?JSON.parse(req.body):req.body||{};
    const model=/^gemini-[\w.-]+$/.test(b.model||"")?b.model:"gemini-2.5-flash";
    if(!b.body||JSON.stringify(b.body).length>100000)return res.status(400).send("Bad request");
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{
      method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":KEY},body:JSON.stringify(b.body)});
    res.status(r.status).setHeader("Content-Type","application/json").send(await r.text());
  }catch(e){res.status(502).send("Gemini request failed")}
};
