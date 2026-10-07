# TechLink Innovations | SmartStep AI Leather Shoe

**Smart Steps. Better Health.**

A demo website for the **SmartStep AI Leather Shoe**, a prototype smart leather shoe concept designed to monitor foot pressure, temperature and movement, with AI-based pattern detection for potential early warnings.

> **Important:** This is a **prototype / demo**. It is not a medical device, is not medically certified or clinically proven, and does not provide a medical diagnosis. All dashboard values are **simulated demo data**.

## Project structure

```
index.html   - page structure and content
style.css    - design, layout, animations, responsive rules
script.js    - interactions and the simulated dashboard
README.md    - this file
```

No build step, no backend, no paid APIs, no external files. Everything works offline.

## Run locally

Double-click `index.html`, or drag it into your browser. That is all.

## Create a GitHub repository

1. Sign in at [github.com](https://github.com) (create a free account if needed).
2. Click the **+** icon (top right) and choose **New repository**.
3. Name it, for example `techlink-smartstep`.
4. Choose **Public** (required for free GitHub Pages on most accounts).
5. Tick **Add a README file** only if you do NOT plan to upload this README. Otherwise leave it unticked.
6. Click **Create repository**.

## Upload the files

**Option A: in the browser (easiest)**

1. Open your new repository.
2. Click **Add file** then **Upload files**.
3. Drag in `index.html`, `style.css`, `script.js` and `README.md`. All files must be at the top level of the repository (not inside a folder).
4. Write a message such as "Add SmartStep demo website" and click **Commit changes**.

**Option B: with Git**

```bash
cd path/to/your/project-folder
git init
git add .
git commit -m "Add SmartStep demo website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/techlink-smartstep.git
git push -u origin main
```

## Enable GitHub Pages

1. In the repository, open **Settings**.
2. In the left menu, click **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to `/ (root)`, then click **Save**.
5. Wait one to two minutes and refresh. GitHub shows your live address:

   `https://YOUR-USERNAME.github.io/techlink-smartstep/`

Share that link with lecturers, judges and partners. Any later change you commit is published automatically.

## Customising

Search `index.html` for text in **[square brackets]**. These are placeholders for:

- Team member names, roles and bios
- Email, phone, institution, social media
- Verified statistics and market data (with sources)

Do not add figures you cannot source.

## Replacing demo data with real sensor data

The dashboard is built as a small pipeline: **reading in -> analysis -> display**. Only the first step is simulated.

In `script.js`:

- `generateReading()` creates simulated readings every second.
- `processReading(reading)` analyses a reading and updates the whole dashboard.
- `computeScore()` is a simple illustrative rule, not a validated model.

A reading has this shape (pressure values are a 0 to 100 relative index):

```js
{
  temp: 34.8,                                   // degrees Celsius
  L: { toe: 28, fore: 48, mid: 24, heel: 45 },  // left foot zones
  R: { toe: 29, fore: 47, mid: 25, heel: 44 },  // right foot zones
  activity: 'Walking'
}
```

**Step 1: get real data into the browser.** Typical routes for a prototype:

- **Bluetooth Low Energy:** the shoe's microcontroller (for example an ESP32 or nRF52) sends readings, and the page connects using the browser's Web Bluetooth API (Chrome/Edge, requires HTTPS, which GitHub Pages provides).
- **Wi-Fi / small server:** the microcontroller posts readings to a lightweight server (or a free cloud service), and the page fetches them with `fetch()` or WebSockets.
- **Serial / USB:** for lab testing, the Web Serial API can read data from a connected board.

**Step 2: pass each reading to the dashboard.** A public hook is already included:

```js
SmartStepDemo.ingest({
  temp: 35.1,
  L: { toe: 30, fore: 52, mid: 26, heel: 47 },
  R: { toe: 31, fore: 50, mid: 25, heel: 46 },
  activity: 'Walking'
});
```

**Step 3: replace the scoring rule.** Swap `computeScore()` for the output of a model trained on real, properly collected data, and validate it with healthcare professionals before making any health claims.

**Before real use with people**, plan for: sensor calibration, ethical approval for data collection, data privacy and consent, and the relevant medical-device regulations in Kenya and elsewhere.

## Disclaimer

SmartStep AI Leather Shoe is a concept and prototype shown for demonstration. It is designed to monitor and provide a potential early warning. It is **not** a medical diagnosis and does not replace advice from a qualified health professional.

&copy; TechLink Innovations
