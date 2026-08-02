import fs from 'fs';
const F='/workspace/blissstudio/card-studio/index.html';
const src=fs.readFileSync(F,'utf8');

const css=src.match(/<style>([\s\S]*?)<\/style>/)[1];
const fontLink=(src.match(/<link href="https:\/\/fonts\.googleapis[\s\S]*?rel="stylesheet">/)||[''])[0];
const jspdf=(src.match(/<script src="https:\/\/cdnjs[\s\S]*?<\/script>/)||[''])[0];
const toolScript=src.match(/<script>\s*\n?"use strict"[\s\S]*?<\/script>/)[0];

const wrapStart=src.indexOf('<div class="wrap">');
const wrapEnd=src.indexOf('<footer class="site-footer">');
const wrapHtml=src.slice(wrapStart,wrapEnd).trim();
const toastStr='<div class="toast" id="toast"></div>';

function splitBlocks(t){const b=[];let depth=0,start=0;for(let i=0;i<t.length;i++){const c=t[i];if(c==='{')depth++;else if(c==='}'){depth--;if(depth===0){b.push(t.slice(start,i+1));start=i+1;}}}return b.map(x=>x.trim()).filter(Boolean);}
const pre=b=>b.slice(0,b.indexOf('{')).trim();
const bod=b=>b.slice(b.indexOf('{')+1,b.lastIndexOf('}'));
const pfx=sel=>sel.split(',').map(s=>{s=s.trim();return s?('#card-studio '+s):s;}).join(', ');

let vars='';const keyframes=[];const out=[];
for(const blk of splitBlocks(css)){
  const p=pre(blk);
  if(p===':root'){vars=bod(blk).trim();continue;}
  if(p.startsWith('@keyframes')){keyframes.push(blk);continue;}
  if(p==='body'||p==='html,body'||p==='html, body'){continue;}
  if(p.startsWith('@media')){
    const inner=splitBlocks(bod(blk)).map(r=>pfx(pre(r))+'{'+bod(r)+'}').join('\n    ');
    out.push(p+'{\n    '+inner+'\n  }');continue;
  }
  out.push(pfx(p)+'{'+bod(blk)+'}');
}
const scoped=keyframes.join('\n')+'\n#card-studio{box-sizing:border-box;'+vars+'}\n'+out.join('\n');

const frag=`<!-- Card Studio — Shopify page body (auto-ported from card-studio/index.html). Do not hand-edit; regenerate. -->
${fontLink}
${jspdf}
<style>
${scoped}
</style>
<div id="card-studio">
${wrapHtml}
${toastStr}
</div>
${toolScript}
`;
fs.writeFileSync('/workspace/blissstudio/card-studio/card-studio.page.html',frag);
console.log('OK length',frag.length,'| scoped rules',out.length,'| keyframes',keyframes.length,'| vars?',!!vars,'| fontLink?',!!fontLink,'| jspdf?',!!jspdf,'| scriptLen',toolScript.length);
