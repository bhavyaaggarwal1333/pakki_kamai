/* Pakki Kamai settings. See README.md for the step-by-step Gemini setup.
   Easiest SAFE way: leave GEMINI_API_KEY empty and run "node server.js" with your key in a .env file.
   Quick test only: paste your key below (anyone who opens the page can see it, so do not publish it). */
window.PK_CONFIG={
  GEMINI_API_KEY:"",            // quick test only
  GEMINI_MODEL:"gemini-2.5-flash",
  USE_PROXY:true                // true = use server.js (/api/gemini) when it is running
};
