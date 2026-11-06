import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import fs from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4173';
await fs.mkdir('outputs', { recursive: true });
const chrome = await launch({ chromePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless=new', '--disable-gpu', '--no-first-run'] });
const results = [];
try {
  for (const name of ['mobile','desktop']) {
    const result = await lighthouse(base, { port: chrome.port, output: ['html','json'], logLevel:'error', onlyCategories:['performance','accessibility','best-practices','seo'], ...(name === 'desktop' ? {formFactor:'desktop',screenEmulation:{mobile:false,width:1440,height:1000,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1,requestLatencyMs:0,downloadThroughputKbps:0,uploadThroughputKbps:0}} : {}) });
    await fs.writeFile(`outputs/lighthouse-${name}.html`,result.report[0]);
    await fs.writeFile(`outputs/lighthouse-${name}.json`,result.report[1]);
    const l=result.lhr; const scores=Object.fromEntries(Object.entries(l.categories).map(([k,v])=>[k,Math.round(v.score*100)]));
    const metrics=Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(k=>[k,l.audits[k].displayValue]));
    const failed=Object.entries(l.audits).filter(([k,v])=>v.score!==null&&v.score<.9&&v.details).map(([id,v])=>({id,title:v.title,description:v.description}));
    results.push({name,scores,metrics,failed});console.log(JSON.stringify({name,scores,metrics}));
  }
  await fs.writeFile('outputs/performance-summary.json',JSON.stringify(results,null,2));
} finally { await chrome.kill(); }
