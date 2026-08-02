// Build the Shopify-embeddable Card Studio from the standalone card-studio/index.html.
// Emits three files served by Cloudflare Pages (studio.blisscottonpaper.com/card-studio/):
//   card-studio.css   — scoped styles (#card-studio ...) + @import fonts
//   card-studio.js    — injects the tool markup into #card-studio, then runs the tool
//   card-studio.page.html — the tiny <body> to paste/push into the Shopify page /pages/card-studio
// Update flow: edit index.html -> `node build-page.mjs` -> git push (Pages redeploys; Shopify page auto-uses new assets).
import fs from 'fs';
const DIR='/workspace/blissstudio/card-studio/';
const src=fs.readFileSync(DIR+'index.html','utf8');
const ASSET_BASE='https://studio.blisscottonpaper.com/card-studio/';
const JSPDF='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

const css=src.match(/<style>([\s\S]*?)<\/style>/)[1];
const fontHref=(src.match(/<link href="(https:\/\/fonts\.googleapis[^"]*)"/)||[])[1]||'';
let toolScript=src.match(/<script>\s*\n?"use strict"[\s\S]*?<\/script>/)[0]
  .replace(/^<script>\s*/,'').replace(/<\/script>\s*$/,'').replace(/^\s*"use strict";\s*/,'');
const wrapStart=src.indexOf('<div class="wrap">');
const wrapEnd=src.indexOf('<footer class="site-footer">');
const wrapHtml=src.slice(wrapStart,wrapEnd).trim();
const toastStr='<div class="toast" id="toast"></div>';

function split(t){const b=[];let d=0,s=0;for(let i=0;i<t.length;i++){const c=t[i];if(c==='{')d++;else if(c==='}'){d--;if(!d){b.push(t.slice(s,i+1));s=i+1;}}}return b.map(x=>x.trim()).filter(Boolean);}
const pre=b=>b.slice(0,b.indexOf('{')).trim(), bod=b=>b.slice(b.indexOf('{')+1,b.lastIndexOf('}'));
const pfx=sel=>sel.split(',').map(s=>{s=s.trim();return s?('#card-studio '+s):s;}).join(', ');
let vars='';const kf=[],out=[];
for(const blk of split(css)){const p=pre(blk);
  if(p===':root'){vars=bod(blk).trim();continue;}
  if(p.startsWith('@keyframes')){kf.push(blk);continue;}
  if(p==='body'||p==='html,body'||p==='html, body')continue;
  if(p.startsWith('@media')){out.push(p+'{'+split(bod(blk)).map(r=>pfx(pre(r))+'{'+bod(r)+'}').join('')+'}');continue;}
  out.push(pfx(p)+'{'+bod(blk)+'}');
}
const cssOut=(fontHref?`@import url('${fontHref}');\n`:'')+kf.join('\n')+`\n#card-studio{box-sizing:border-box;${vars}}\n`+out.join('\n');
fs.writeFileSync(DIR+'card-studio.css',cssOut);

const jsOut=`"use strict";\ndocument.getElementById('card-studio').innerHTML=${JSON.stringify(wrapHtml+'\n'+toastStr)};\n${toolScript}\n`;
fs.writeFileSync(DIR+'card-studio.js',jsOut);

const INTRO=`<p style="max-width:660px;margin:0 auto 16px;color:#3a5265;line-height:1.6;">Design a custom card on real Bliss cotton paper &mdash; choose your size, paper color, and your own words or uploaded artwork, then order it printed and shipped, or download a print-ready 300&nbsp;DPI PDF. Flat or folded, with a matching envelope if you like.</p>`;
const pageBody=`${INTRO}
<div id="card-studio"></div>
<link rel="stylesheet" href="${ASSET_BASE}card-studio.css">
<script src="${JSPDF}" defer></script>
<script src="${ASSET_BASE}card-studio.js" defer></script>`;
fs.writeFileSync(DIR+'card-studio.page.html',pageBody);
console.log('css',cssOut.length,'js',jsOut.length,'pageBody',pageBody.length);
