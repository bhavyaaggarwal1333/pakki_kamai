# Pakki Kamai – setup guide

Open `index.html` to see the site. Hindi / Hinglish / English buttons and the A− / A+ text-size buttons are at the top.
The chat works **without** any key (simple answers). To get smart Hindi/English chat, link Gemini:

## Link Gemini – step by step
1. Open **https://aistudio.google.com/apikey** and sign in with a Google account.
2. Click **Create API key** → choose or create a project → **copy** the key (looks like `AIza...`).
3. Install **Node.js 18 or newer** from https://nodejs.org (one time).
4. In this folder, copy `.env.example` to a new file named `.env`.
5. Open `.env` and replace `paste-your-key-here` with your key. Save. (Never share this file.)
6. Open a terminal in this folder and run: `node server.js`
7. Open **http://localhost:3000** in Chrome or Edge (they support voice).
8. Press **"मदद चाहिए? वेतन से पूछें"** (bottom right) and type or press **Mic** and speak in Hindi or English.
   Buyers: on any shop press **विक्रेता से बात करें → विक्रेता से चैट करें**.
9. If it still shows only simple answers: check the key in `.env`, that the terminal says `Gemini key found`, and that you opened `localhost:3000` (not the file).

**Quick test without Node (not safe to publish):** put the key in `config.js` → `GEMINI_API_KEY`, then open `index.html`. Anyone who opens the page could see the key.

**Change model:** edit `GEMINI_MODEL` in `config.js` (default `gemini-2.5-flash`).
**Going live:** host `server.js` on any Node host (Render, Railway, etc.), set `GEMINI_API_KEY` as a secret variable there. Keep the free-tier limits in mind.

## Deploy on Vercel (recommended for going live)
The folder already contains `api/gemini.js`, which Vercel runs as a secure serverless function (so `server.js` is only for your own computer).

**Option A – with GitHub (easiest to update later)**
1. Create a free account at https://vercel.com and one at https://github.com.
2. On GitHub: **New repository** → upload all files from this folder (`index.html`, `about.html`, `i18n.js`, `dict.js`, `assistant.js`, `config.js`, `api/`, `assets/`, `vercel.json`). Do NOT upload `.env`.
3. On Vercel: **Add New → Project → Import** your repository.
4. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Root Directory: the folder that holds `index.html`.
5. Open **Environment Variables** → Name `GEMINI_API_KEY`, Value = your key from https://aistudio.google.com/apikey → **Add**.
6. Click **Deploy**. In about a minute you get a link like `https://your-project.vercel.app`.
7. Open the link, press the help button, and type or speak in Hindi/English.

**Option B – with the Vercel command line**
1. Install Node.js, then run `npm i -g vercel`.
2. In this folder run `vercel` and answer the questions (framework: Other).
3. Run `vercel env add GEMINI_API_KEY` (choose Production), paste your key.
4. Run `vercel --prod`.

**If you added the key AFTER the first deploy:** Vercel → Project → Deployments → the three dots → **Redeploy** (env variables only apply to new deploys).
**Check it works:** the chat answers in smart Hindi/English. If it gives only short fixed answers, open Vercel → Project → Logs (look for "GEMINI_API_KEY is not set") or check the key in Settings → Environment Variables.
**Keep `config.js` key empty** on Vercel; the key lives only in Vercel's settings.
**Free limits:** Gemini free keys have daily limits; for many users enable billing in Google AI Studio.

## What is new
- Every screen in Hindi, Hinglish or English (`dict.js` holds all the text – add lines as `English | हिन्दी | Hinglish`).
- Buyer side: **Contact seller** on every shop (buy for myself / big order for my shop), **My Messages** page.
- Seller side: **New Requests** shows buyer messages with one-tap replies.
- Chat: type or speak, Hindi or English, voice reply option; falls back to simple answers if Gemini is not reachable.
