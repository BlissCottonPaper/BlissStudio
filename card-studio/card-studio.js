"use strict";
document.getElementById('card-studio').innerHTML="<div class=\"wrap\">\n  <div class=\"studio-grid\">\n    <div class=\"controls\">\n      <div class=\"steps-nav\">\n        <button data-goto=\"0\" class=\"active\"><span class=\"n\">1</span>Paper</button>\n        <button data-goto=\"1\"><span class=\"n\">2</span>Content</button>\n        <button data-goto=\"2\"><span class=\"n\">3</span>Download</button>\n      </div>\n\n      <!-- STEP 1 -->\n      <section class=\"panel active\" id=\"panel-0\">\n        <div class=\"card-block\">\n          <h2>Start with the paper</h2>\n          <p class=\"hint\">The size is your <em>finished</em> card. Folded cards print on a larger sheet that creases down to that size.</p>\n\n          <div class=\"field\">\n            <label>Size <span style=\"text-transform:none;letter-spacing:0;font-weight:400\">(finished)</span></label>\n            <div class=\"choices toggle2\" id=\"sizeChoices\"></div>\n          </div>\n\n          <div class=\"field\">\n            <label>Format</label>\n            <div class=\"choices toggle2\" id=\"foldChoices\">\n              <button class=\"chip\" data-fold=\"flat\">Flat <small>single card</small></button>\n              <button class=\"chip\" data-fold=\"folded\">Folded <small>opens up</small></button>\n            </div>\n          </div>\n\n          <div class=\"field\">\n            <label>Orientation</label>\n            <div class=\"choices toggle2\" id=\"orientChoices\">\n              <button class=\"chip\" data-orient=\"portrait\">Portrait <small>taller than wide</small></button>\n              <button class=\"chip\" data-orient=\"landscape\">Landscape <small>wider than tall</small></button>\n            </div>\n          </div>\n\n          <div class=\"field\">\n            <label>Paper color</label>\n            <div class=\"cs-swatches\" id=\"paperSwatches\"></div>\n            <div id=\"paperStockNote\" class=\"note hidden\"></div>\n          </div>\n        </div>\n\n        <div class=\"card-block\">\n          <h2>Envelope</h2>\n          <p class=\"hint\">Add a matching envelope, or skip it.</p>\n          <div class=\"field\">\n            <div class=\"choices toggle2\">\n              <button class=\"chip sel\" data-env=\"no\">No envelope</button>\n              <button class=\"chip\" data-env=\"yes\">Add an envelope</button>\n            </div>\n          </div>\n          <div id=\"envColorField\" class=\"field hidden\">\n            <label>Envelope color <span style=\"text-transform:none;letter-spacing:0;font-weight:400\">(20 in stock)</span></label>\n            <div class=\"cs-swatches\" id=\"envSwatches\"></div>\n            <div id=\"envMatchNote\" class=\"note hidden\"></div>\n            <div id=\"envInkNote\" class=\"note hidden\"></div>\n          </div>\n        </div>\n\n        <div class=\"step-actions\"><span></span><button class=\"btn btn-primary\" data-goto=\"1\">Next: your content →</button></div>\n      </section>\n\n      <!-- STEP 2 -->\n      <section class=\"panel\" id=\"panel-1\">\n        <div class=\"card-block\">\n          <h2>Design your card</h2>\n          <p class=\"hint\" id=\"contentHint\">Type your own words, upload artwork, or start from a template.</p>\n\n          <div class=\"side-toggle hidden\" id=\"sideToggle\">\n            <button data-side=\"front\" class=\"sel\">Outside (cover)</button>\n            <button data-side=\"inside\">Inside</button>\n          </div>\n\n          <div class=\"mode-tabs\" id=\"modeTabs\">\n            <button data-mode=\"template\" class=\"sel\">Templates</button>\n            <button data-mode=\"text\">Type your own</button>\n            <button data-mode=\"upload\">Upload artwork</button>\n          </div>\n\n          <div class=\"mode-body\" id=\"mode-template\"><div class=\"tmpl-grid\" id=\"tmplGrid\"></div></div>\n\n          <div class=\"mode-body hidden\" id=\"mode-text\">\n            <div class=\"field\"><label>Your words</label><textarea id=\"textInput\" placeholder=\"Write your message…\"></textarea></div>\n            <div class=\"field\">\n              <label>Font</label>\n              <p class=\"font-note\">Filter by mood — tap as many as you like. Fonts shown match all the moods you pick. Pulled from the Bliss Envelope Studio.</p>\n              <div class=\"mood-row\" id=\"moodRow\"></div>\n              <div class=\"font-groups\" id=\"fontGroups\"></div>\n            </div>\n          </div>\n\n          <div class=\"mode-body hidden\" id=\"mode-upload\">\n            <div class=\"field\"><label>Upload a full-card graphic</label>\n              <input type=\"file\" id=\"imgInput\" accept=\"image/*\">\n              <p class=\"hint\" style=\"margin-top:8px\">Scaled to fill the card and centered. High-resolution files print best. Nothing leaves your browser.</p>\n            </div>\n            <div class=\"switch-row\" style=\"border-top:1px solid var(--bliss-border)\">\n              <div class=\"lbl\">Remove background<small>Drops the white / corner background so the art sits on the paper.</small></div>\n              <label class=\"switch\"><input type=\"checkbox\" id=\"bgRemove\"><span class=\"cs-slider\"></span></label>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"card-block\">\n          <h2>Finish</h2>\n          <div class=\"switch-row\">\n            <div class=\"lbl\">Full bleed<small>Runs color &amp; artwork off all four edges — no border on the deckle edge. Off keeps a safe margin.</small></div>\n            <label class=\"switch\"><input type=\"checkbox\" id=\"fullBleed\"><span class=\"cs-slider\"></span></label>\n          </div>\n        </div>\n\n        <div class=\"step-actions\">\n          <button class=\"btn btn-ghost\" data-goto=\"0\">← Paper</button>\n          <button class=\"btn btn-primary\" data-goto=\"2\">Next: download →</button>\n        </div>\n      </section>\n\n      <!-- STEP 3 -->\n      <section class=\"panel\" id=\"panel-2\">\n        <div class=\"card-block\">\n          <h2>Order your cards</h2>\n          <p class=\"hint\">We print your design on real Bliss cotton paper and ship it to you. Set the quantity and check out — the total shows on the next screen.</p>\n          <div id=\"foldNote\" class=\"note hidden\"><strong>Folded card:</strong> <span id=\"foldInstruction\"></span></div>\n          <div class=\"field\"><label>Quantity</label>\n            <div class=\"qty\">\n              <button type=\"button\" id=\"qtyMinus\" aria-label=\"Fewer\">−</button>\n              <input type=\"number\" id=\"qtyInput\" value=\"25\" min=\"1\" max=\"1000\">\n              <button type=\"button\" id=\"qtyPlus\" aria-label=\"More\">+</button>\n            </div>\n            <p class=\"hint\" id=\"qtyHint\" style=\"margin-top:8px\"></p>\n          </div>\n          <div class=\"field\" style=\"margin-top:12px\"><button class=\"btn btn-primary\" id=\"orderBtn\" style=\"width:100%\">Order these cards →</button></div>\n          <p class=\"hint\" id=\"orderStatus\" style=\"text-align:center\"></p>\n        </div>\n        <div class=\"card-block\">\n          <h2>Just want the file?</h2>\n          <p class=\"hint\">Download the print-ready PDF (300&nbsp;dpi, sized to the sheet, edge to edge) to print yourself or proof.</p>\n          <div class=\"field\"><label>File name</label><input type=\"text\" id=\"fileName\" placeholder=\"bliss-studio-card\"></div>\n          <div class=\"field\"><button class=\"btn btn-ghost\" id=\"downloadBtn\" style=\"width:100%\">Download print-ready PDF</button></div>\n          <p class=\"hint\" id=\"dlStatus\" style=\"text-align:center\"></p>\n        </div>\n        <div class=\"step-actions\"><button class=\"btn btn-ghost\" data-goto=\"1\">← Content</button><span></span></div>\n      </section>\n    </div>\n\n    <div class=\"preview-col\">\n      <div class=\"preview-box\">\n        <h3>Live preview</h3>\n        <p class=\"psub\" id=\"previewSpec\">—</p>\n        <div class=\"stage\">\n          <div><div class=\"face-label\" id=\"frontLabel\">Card</div><canvas id=\"cvFront\" class=\"card-shadow\"></canvas></div>\n          <div id=\"insideWrap\" class=\"hidden\"><div class=\"face-label\">Inside</div><canvas id=\"cvInside\" class=\"card-shadow\"></canvas></div>\n          <div id=\"envWrap\" class=\"hidden\"><div class=\"face-label\">Envelope</div><canvas id=\"cvEnv\" class=\"card-shadow\"></canvas></div>\n        </div>\n        <div class=\"spec-line\" id=\"specLine\"></div>\n        <div style=\"text-align:center\"><button class=\"copy-hex\" id=\"copyHex\">⧉ Copy hex for Shopify swatch</button></div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"toast\" id=\"toast\"></div>";
/* ============================================================================
   Card Studio v1 — Bliss Studio.  Client-side; canvas preview + jsPDF export.
   SIZE = the finished/closed card. A folded card prints on a bigger sheet that
   creases down to that size:
     5×7 folded  → 7×10 sheet ;  A6 folded → A5 sheet ;  RSVP folded → 5×7 sheet.
   Handmade deckle paper is never trimmed, so the PDF is the exact sheet size;
   "full bleed" = print edge-to-edge.
   ========================================================================== */

/* Finished (closed) dims, portrait base [w,h], + the sheet a folded card prints on. */
const SIZES = {
  '5x7':  { label:'5 × 7', w:5.0,  h:7.0,  foldSheet:'7×10' },
  'A6':   { label:'A6',    w:4.75, h:6.5,  foldSheet:'A5'   },
  'RSVP': { label:'RSVP',  w:3.25, h:4.75, foldSheet:'5×7'  }
};

/* Paper colors — Black removed (never printed on). */
const PAPER_COLORS = [
  ['Ivory','#f4ecdd'], ['White','#fbfaf7'], ['Oat','#e6dcc6'], ['Pistachio','#d3ddba'],
  ['Light Sage','#cdd6c2'], ['Something Blue','#c3d0d8'], ['Blush Pink','#eccdcd'],
  ['Coral Peach','#f0c6ad'], ['French Blue','#9fb2c4'], ['Beige','#e2d5bf']
];
const ENV_COLORS = [
  ['Ivory','#f4ecdd'], ['Something Blue','#c3d0d8'], ['Pistachio','#d3ddba'], ['Terracotta','#c07a54'],
  ['French Blue','#9fb2c4'], ['Dusty Rose','#cfa6a3'], ['Brick Red','#9e4a3c'], ['Beige','#e2d5bf'],
  ['Black','#211f1e'], ['Blush Pink','#eccdcd'], ['Light Sage','#cdd6c2'], ['Stone Gray','#b9b6ad'],
  ['Honey Gold','#d1a54a'], ['White','#fbfaf7'], ['Coral Peach','#f0c6ad'], ['Light Pink','#f2dbe0'],
  ['Smoky Blue','#8fa1ac'], ['Navy','#26384c'], ['Burgundy','#6d2f38'], ['Desert Sage','#b7bda6']
];
const ENV_NAMES = ENV_COLORS.map(c=>c[0]);
const ENV_DARK = ['Black','Navy','Burgundy','Brick Red'];

/* Only Ivory & White are stocked in the larger 7×10 / A5 sheets. */
function availablePaper(){
  if(state.fold==='folded' && (state.size==='5x7'||state.size==='A6')) return ['Ivory','White'];
  return PAPER_COLORS.map(c=>c[0]);
}

/* Envelope Studio font set (display fonts + moods). */
const FONTS = [
  ['Ballet',['Whimsical','Botanical']],['Monsieur La Doulaise',['Vintage','Elegant']],
  ['Marcellus',['Minimalist','Sophisticated','Elegant']],['Herr Von Muellerhoff',['Vintage','Elegant']],
  ['Italiana',['Minimalist','Sophisticated']],['Luxurious Script',['Elegant','Vintage']],
  ['Bodoni Moda',['Sophisticated','Minimalist']],['Mrs Saint Delafield',['Boho','Whimsical']],
  ['Cormorant Upright',['Botanical','Minimalist']],['Rouge Script',['Elegant','Vintage']],
  ['Petit Formal Script',['Vintage','Elegant']],['Spectral',['Minimalist','Sophisticated']],
  ['Julius Sans One',['Minimalist','Art Deco']],['Libre Baskerville',['Elegant','Minimalist','Sophisticated','Vintage']],
  ['Water Brush',['Boho','Minimalist']],['Quintessential',['Elegant','Vintage']],
  ['Italianno',['Elegant','Vintage']],['Great Vibes',['Elegant','Whimsical']],
  ['Cormorant Garamond',['Minimalist','Elegant','Sophisticated','Vintage']],['Pinyon Script',['Elegant','Vintage']],
  ['Cinzel',['Sophisticated']],['Playfair Display',['Sophisticated','Minimalist']],
  ['Parisienne',['Botanical','Whimsical']],['Alex Brush',['Coastal','Boho']],
  ['Allura',['Vintage','Elegant']],['Tangerine',['Vintage','Whimsical']],
  ['Fraunces',['Minimalist']],['Instrument Serif',['Minimalist','Sophisticated']],
  ['WindSong',['Elegant','Vintage']],['DM Serif Display',['Sophisticated']],
  ['Yellowtail',['Boho','Whimsical']],['Amatic SC',['Whimsical','Boho']],
  ['Homemade Apple',['Boho']],['Caveat',['Whimsical','Boho']],
  ['Send Flowers',['Whimsical','Botanical']],['Norican',['Botanical']],
  ['Berkshire Swash',['Botanical']],['Gilda Display',['Coastal','Elegant']],
  ['Mrs Sheppards',['Coastal']],['IM Fell English',['Vintage','Elegant']],
  ['Poiret One',['Art Deco','Minimalist']],['Limelight',['Art Deco']]
];
const MOODS = ['Elegant','Vintage','Minimalist','Sophisticated','Whimsical','Boho','Botanical','Art Deco','Coastal'];

/* Templates — designed starting points (main + optional rule + small sub). */
const FRONT_TEMPLATES = [
  { id:'blank',    name:'Blank',           main:'',                 font:'Cormorant Garamond' },
  { id:'thanks',   name:'Thank You',       main:'Thank you',        font:'Great Vibes',      sub:'WITH GRATITUDE', rule:true },
  { id:'bday',     name:'Happy Birthday',  main:'Happy\nBirthday',  font:'Caveat',           sub:'MAKE A WISH',    rule:true },
  { id:'congrats', name:'Congratulations', main:'Congratulations',  font:'Playfair Display', sub:'SO WELL DESERVED', rule:true },
  { id:'sympathy', name:'With Sympathy',   main:'With Sympathy',    font:'Cormorant Garamond', sub:'THINKING OF YOU', rule:true },
  { id:'thinking', name:'Thinking of You', main:'Thinking\nof you', font:'Parisienne' },
  { id:'hello',    name:'Hello',           main:'hello',            font:'Poiret One',       sub:'JUST BECAUSE',   rule:true }
];
const INSIDE_TEMPLATES = [
  { id:'blank', name:'Blank',       main:'',              font:'Cormorant Garamond' },
  { id:'love',  name:'With love',   main:'With love,',    font:'Great Vibes' },
  { id:'warm',  name:'Warm wishes', main:'Warm wishes,',  font:'Cormorant Garamond' }
];
function tmplSet(side){ return side==='inside'?INSIDE_TEMPLATES:FRONT_TEMPLATES; }

const DPI = 300;
const WORKER_URL = 'https://bliss-tools.still-sun-d335.workers.dev'; // Card Studio backend (swap if the Worker is named differently)

function blankFace(){ return { mode:'template', template:'blank', text:'', font:'Cormorant Garamond', image:null, rawImage:null }; }
const state = {
  size:'5x7', orientation:'portrait', fold:'flat',
  paper:'Ivory', envelope:false, envColor:'Ivory',
  fullBleed:false, qty:25, activeSide:'front', moods:new Set(),
  faces:{ front:blankFace(), inside:blankFace() }
};

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function hexOf(list,name){const f=list.find(c=>c[0]===name);return f?f[1]:'#ffffff';}
function paperHex(){return hexOf(PAPER_COLORS,state.paper);}
function envHex(){return hexOf(ENV_COLORS,state.envColor);}
function isDark(hex){const c=hex.replace('#','');const r=parseInt(c.substr(0,2),16),g=parseInt(c.substr(2,2),16),b=parseInt(c.substr(4,2),16);return (0.299*r+0.587*g+0.114*b)<128;}
function inkColor(hex){return isDark(hex)?'#f4ecdd':'#14283c';}
function slug(s){return (s||'bliss-studio-card').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,60)||'bliss-studio-card';}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2200);}
function face(){return state.faces[state.activeSide];}
// Does a face actually carry content? Drives single- vs double-sided folded pricing/print.
function faceHasContent(f,side){
  if(f.mode==='upload') return !!f.image;
  if(f.mode==='text') return !!(f.text && f.text.trim());
  const set=tmplSet(side), t=set.find(x=>x.id===f.template)||set[0];
  return !!(t.main && t.main.trim());
}
// Billing helper (for the coming checkout): sides printed = rate multiplier.
function printSides(){ return (state.fold==='folded' && faceHasContent(state.faces.inside,'inside')) ? 2 : 1; }

/* Finished (closed) card dims in the chosen orientation. */
function finishedDims(){const s=SIZES[state.size];return state.orientation==='portrait'?{w:s.w,h:s.h}:{w:s.h,h:s.w};}
/* The print-file sheet. Flat = finished; folded = finished with one edge doubled. */
function printSheet(){
  const f=finishedDims();
  if(state.fold!=='folded') return {w:f.w,h:f.h,axis:null};
  return (f.h>=f.w) ? {w:f.w*2,h:f.h,axis:'v'}   // portrait finished → book (side) fold
                    : {w:f.w,h:f.h*2,axis:'h'};   // landscape finished → top fold
}

/* ---------- drawing ---------- */
function drawImageCover(ctx,img,x,y,w,h,overscan){
  const o=overscan||0,X=x-w*o,Y=y-h*o,W=w*(1+2*o),H=h*(1+2*o);
  const ir=img.width/img.height,cr=W/H;let dw,dh; if(ir>cr){dh=H;dw=H*ir;}else{dw=W;dh=W/ir;}
  ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.drawImage(img,X+(W-dw)/2,Y+(H-dh)/2,dw,dh);ctx.restore();
}
function drawSpaced(ctx,text,cx,cy,gap){
  const chars=[...text];let total=0;for(const c of chars)total+=ctx.measureText(c).width+gap;total-=gap;
  let px=cx-total/2;const prev=ctx.textAlign;ctx.textAlign='left';
  for(const c of chars){const cw=ctx.measureText(c).width;ctx.fillText(c,px,cy);px+=cw+gap;}
  ctx.textAlign=prev;
}
function drawComposed(ctx,x,y,w,h,tpl,ink){
  const lines=(tpl.main||'').split('\n');
  const frac=state.fullBleed?0.9:0.8, safeW=w*frac, safeH=h*(state.fullBleed?0.9:0.72);
  let size=h*0.34; ctx.textAlign='center';ctx.textBaseline='middle';
  for(;size>6;size--){ctx.font=`${size}px "${tpl.font}"`;let mw=0;for(const l of lines)mw=Math.max(mw,ctx.measureText(l).width);if(mw<=safeW && size*1.18*lines.length<=safeH)break;}
  const lh=size*1.18, subSize=Math.max(9,size*0.24), ruleGap=tpl.rule?size*0.5:0, subGap=tpl.sub?subSize*2.4:0;
  const blockH=lh*lines.length+ruleGap+subGap;
  let cy=y+h/2-blockH/2+lh/2;
  ctx.fillStyle=ink;ctx.font=`${size}px "${tpl.font}"`;
  for(const l of lines){ctx.fillText(l,x+w/2,cy);cy+=lh;}
  cy-=lh/2;
  if(tpl.rule){cy+=ruleGap*0.5;const rw=Math.min(w*0.3,size*2.6);ctx.globalAlpha=.45;ctx.strokeStyle=ink;ctx.lineWidth=Math.max(1,size*0.018);ctx.beginPath();ctx.moveTo(x+w/2-rw/2,cy);ctx.lineTo(x+w/2+rw/2,cy);ctx.stroke();ctx.globalAlpha=1;cy+=ruleGap*0.5;}
  if(tpl.sub){cy+=subGap*0.55;ctx.font=`${subSize}px "Assistant"`;ctx.fillStyle=ink;ctx.textBaseline='middle';drawSpaced(ctx,tpl.sub,x+w/2,cy,subSize*0.22);}
}
function tplFor(f,side){
  if(f.mode==='template'){ const set=tmplSet(side); const t=set.find(x=>x.id===f.template)||set[0]; return {main:t.main,font:t.font,sub:t.sub,rule:t.rule}; }
  return {main:f.text,font:f.font,sub:'',rule:false};
}
function drawFace(ctx,x,y,w,h,f,paperHexVal,side){
  ctx.save();ctx.fillStyle=paperHexVal;ctx.fillRect(x,y,w,h);
  if(f.mode==='upload'&&f.image){
    if(state.fullBleed) drawImageCover(ctx,f.image,x,y,w,h,0.03);
    else { const mx=w*0.07,my=h*0.07; drawImageCover(ctx,f.image,x+mx,y+my,w-2*mx,h-2*my,0); }
    ctx.restore();return;
  }
  const tpl=tplFor(f,side);
  if((tpl.main||'').trim()) drawComposed(ctx,x,y,w,h,tpl,inkColor(paperHexVal));
  ctx.restore();
}

function renderPreviewCanvas(cv,f,side){
  const d=finishedDims(), w=d.w, h=d.h;                 // preview shows the finished/closed card
  const scale=Math.min(300/w,380/h), pw=Math.round(w*scale), ph=Math.round(h*scale), dpr=window.devicePixelRatio||1;
  cv.width=pw*dpr;cv.height=ph*dpr;cv.style.width=pw+'px';cv.style.height=ph+'px';
  const ctx=cv.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,pw,ph);
  drawFace(ctx,0,0,pw,ph,f,paperHex(),side);
  ctx.strokeStyle='rgba(20,40,60,.10)';ctx.strokeRect(0.5,0.5,pw-1,ph-1);
}
function renderEnvelope(cv){
  const d=finishedDims(); const ew=Math.max(d.w,d.h)+0.35, eh=Math.min(d.w,d.h)+0.35;
  const scale=Math.min(300/ew,220/eh), pw=Math.round(ew*scale), ph=Math.round(eh*scale), dpr=window.devicePixelRatio||1;
  cv.width=pw*dpr;cv.height=ph*dpr;cv.style.width=pw+'px';cv.style.height=ph+'px';
  const ctx=cv.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);const col=envHex();
  ctx.fillStyle=col;ctx.strokeStyle='rgba(20,40,60,.15)';ctx.fillRect(0,0,pw,ph);ctx.strokeRect(0.5,0.5,pw-1,ph-1);
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(pw/2,ph*0.62);ctx.lineTo(pw,0);ctx.closePath();
  ctx.fillStyle=isDark(col)?'rgba(255,255,255,.06)':'rgba(0,0,0,.05)';ctx.fill();ctx.stroke();
}

/* ---------- background removal ---------- */
function removeBg(img,tol){
  const c=document.createElement('canvas');c.width=img.naturalWidth||img.width;c.height=img.naturalHeight||img.height;
  const x=c.getContext('2d');x.drawImage(img,0,0,c.width,c.height);
  const d=x.getImageData(0,0,c.width,c.height),p=d.data,kr=p[0],kg=p[1],kb=p[2];
  for(let i=0;i<p.length;i+=4){const r=p[i],g=p[i+1],b=p[i+2];
    if((Math.abs(r-kr)+Math.abs(g-kg)+Math.abs(b-kb))<tol || (r>238&&g>238&&b>238)) p[i+3]=0;}
  x.putImageData(d,0,0);return c;
}
function applyBg(){const f=face();if(!f.rawImage)return;f.image=$('#bgRemove').checked?removeBg(f.rawImage,100):f.rawImage;}

/* ---------- UI ---------- */
function buildSizes(){
  const el=$('#sizeChoices');el.innerHTML='';
  for(const [key,s] of Object.entries(SIZES)){
    const b=document.createElement('button');b.className='chip'+(state.size===key?' sel':'');
    b.innerHTML=`${s.label}<small>${(+s.w)}" × ${(+s.h)}"</small>`;
    b.onclick=()=>{state.size=key;ensurePaper();refreshAll();};el.appendChild(b);
  }
  $$('#foldChoices .chip').forEach(c=>c.classList.toggle('sel',c.dataset.fold===state.fold));
  $$('#orientChoices .chip').forEach(c=>c.classList.toggle('sel',c.dataset.orient===state.orientation));
}
function buildSwatches(){
  const avail=availablePaper(); const p=$('#paperSwatches');p.innerHTML='';
  for(const [name,hex] of PAPER_COLORS){
    const on=avail.includes(name);
    const d=document.createElement('button');d.className='cs-swatch'+(state.paper===name?' sel':'')+(on?'':' off');
    d.innerHTML=`<div class="cs-dot" style="background:${hex}"></div><div class="nm">${name}</div>`;
    if(on) d.onclick=()=>{state.paper=name;syncEnvMatch();refreshAll();};
    p.appendChild(d);
  }
  const note=$('#paperStockNote');
  if(avail.length<PAPER_COLORS.length){ note.classList.remove('hidden'); note.innerHTML=`Folded ${SIZES[state.size].label} prints on a larger <strong>${SIZES[state.size].foldSheet}</strong> sheet, which we stock only in <strong>Ivory &amp; White</strong>. Want another color? Choose Flat, or pick RSVP (folds from a 5×7 sheet, stocked in every color).`; }
  else note.classList.add('hidden');

  const e=$('#envSwatches');e.innerHTML='';
  for(const [name,hex] of ENV_COLORS){
    const d=document.createElement('button');d.className='cs-swatch'+(state.envColor===name?' sel':'');
    d.innerHTML=`<div class="cs-dot" style="background:${hex}"></div><div class="nm">${name}</div>`;
    d.onclick=()=>{state.envColor=name;refreshAll();};e.appendChild(d);
  }
}
function ensurePaper(){ if(!availablePaper().includes(state.paper)){ state.paper='Ivory'; syncEnvMatch(); } }
function buildMoods(){
  const row=$('#moodRow');row.innerHTML='';
  const all=document.createElement('button');all.className='mood-chip'+(state.moods.size===0?' sel':'');
  all.textContent='All';all.onclick=()=>{state.moods.clear();buildMoods();buildFonts();};row.appendChild(all);
  for(const m of MOODS){const b=document.createElement('button');b.className='mood-chip'+(state.moods.has(m)?' sel':'');
    b.textContent=m;b.onclick=()=>{state.moods.has(m)?state.moods.delete(m):state.moods.add(m);buildMoods();buildFonts();};row.appendChild(b);}
}
function buildFonts(){
  const g=$('#fontGroups');g.innerHTML='';const sel=[...state.moods];
  const list=FONTS.filter(([n,th])=>sel.every(m=>th.includes(m)));
  if(!list.length){g.innerHTML='<div class="font-empty">No fonts match all those moods together. Drop a mood, or tap All.</div>';return;}
  for(const [n,th] of list){const b=document.createElement('button');b.className='font-opt'+(face().font===n?' sel':'');
    b.innerHTML=`<span class="samp" style="font-family:'${n}'">${n}</span><span class="meta">${th.join(' · ')}</span>`;
    b.onclick=()=>{face().font=n;buildFonts();refreshAll();};g.appendChild(b);}
}
function buildTemplates(){
  const grid=$('#tmplGrid');grid.innerHTML='';const set=tmplSet(state.activeSide);const f=face();
  for(const t of set){
    const d=document.createElement('button');d.className='tmpl'+(f.mode==='template'&&f.template===t.id?' sel':'');
    const cv=document.createElement('canvas');const dd=finishedDims();const ar=dd.w/dd.h;
    const cw=150, ch=Math.round(cw/ar); cv.width=cw;cv.height=Math.min(96,ch)||96; cv.style.height='96px';
    const ctx=cv.getContext('2d');drawFace(ctx,0,0,cv.width,cv.height,{mode:'template',template:t.id,font:t.font},paperHex(),state.activeSide);
    d.appendChild(cv);const nm=document.createElement('div');nm.className='tnm';nm.textContent=t.name;d.appendChild(nm);
    d.onclick=()=>{const ff=face();ff.mode='template';ff.template=t.id;ff.font=t.font;ff.text=t.main;ff.image=null;ff.rawImage=null;buildContent();refreshAll();};
    grid.appendChild(d);
  }
}
function buildContent(){
  const f=face();
  $$('#modeTabs button').forEach(b=>b.classList.toggle('sel',b.dataset.mode===f.mode));
  $('#mode-template').classList.toggle('hidden',f.mode!=='template');
  $('#mode-text').classList.toggle('hidden',f.mode!=='text');
  $('#mode-upload').classList.toggle('hidden',f.mode!=='upload');
  if(f.mode==='template') buildTemplates();
  if(f.mode==='text'){ $('#textInput').value=f.text; buildMoods(); buildFonts(); }
}
function syncEnvMatch(){
  const note=$('#envMatchNote');
  if(ENV_NAMES.includes(state.paper)){ state.envColor=state.paper; note.classList.add('hidden'); }
  else { note.classList.remove('hidden'); note.innerHTML=`Heads up: <strong>${state.paper}</strong> paper has no exact envelope match. Pick the closest of the 20 envelope colors — or send it without one.`; }
}

/* ---------- refresh ---------- */
function refreshAll(){
  buildSizes();buildSwatches();
  $$('[data-env]').forEach(c=>c.classList.toggle('sel',(c.dataset.env==='yes')===state.envelope));
  $('#envColorField').classList.toggle('hidden',!state.envelope);
  $('#fullBleed').checked=state.fullBleed;

  const ink=$('#envInkNote');
  if(state.envelope && ENV_DARK.includes(state.envColor)){ ink.classList.remove('hidden'); ink.innerHTML=`Note: we print CMYK (no white ink), so a dark <strong>${state.envColor}</strong> envelope can't take a printed address legibly. Fine as a color choice — just not for printed-on text.`; }
  else ink.classList.add('hidden');

  $('#sideToggle').classList.toggle('hidden',state.fold!=='folded');
  if(state.fold!=='folded') state.activeSide='front';
  $$('#sideToggle button').forEach(b=>b.classList.toggle('sel',b.dataset.side===state.activeSide));
  $('#contentHint').textContent = state.fold==='folded'
    ? 'Folded card: design the outside (cover) and the inside separately. They can mix modes.'
    : 'Type your own words, upload artwork, or start from a template.';
  buildContent();

  renderPreviewCanvas($('#cvFront'),state.faces.front,'front');
  $('#frontLabel').textContent=state.fold==='folded'?'Outside (cover)':'Card';
  $('#insideWrap').classList.toggle('hidden',state.fold!=='folded');
  if(state.fold==='folded') renderPreviewCanvas($('#cvInside'),state.faces.inside,'inside');
  $('#envWrap').classList.toggle('hidden',!state.envelope);
  if(state.envelope) renderEnvelope($('#cvEnv'));

  const s=SIZES[state.size], d=finishedDims(), ps=printSheet();
  const dbl = state.fold==='folded' && faceHasContent(state.faces.inside,'inside');
  $('#previewSpec').textContent=`${s.label} · ${state.fold} · ${state.orientation} · ${state.paper}${state.envelope?' + '+state.envColor+' envelope':''}`;
  const sides = state.fold==='folded' ? (dbl?' · double-sided':' · single-sided (blank inside)') : '';
  const base = state.fold==='folded'
    ? `Folds to ${(+d.w.toFixed(2))}" × ${(+d.h.toFixed(2))}" · prints on ${s.foldSheet}${sides}`
    : `${(+d.w.toFixed(2))}" × ${(+d.h.toFixed(2))}"`;
  $('#specLine').innerHTML=`${base} &nbsp;·&nbsp; ${state.fullBleed?'full bleed':'safe margin'} &nbsp;·&nbsp; ${DPI}&nbsp;dpi`;

  const q=state.qty||1; const qh=$('#qtyHint'); if(qh) qh.textContent = `${q} card${q>1?'s':''} · total shown at checkout`;

  $('#foldNote').classList.toggle('hidden',state.fold!=='folded');
  $('#foldInstruction').textContent = !dbl
    ? ` Prints on a ${s.foldSheet} sheet. Inside is blank, so it prints single-sided — just fold and handwrite the inside.`
    : (ps.axis==='v'
      ? ` Prints on a ${s.foldSheet} sheet. Print double-sided (flip on long edge), then fold down the middle like a book. Page 1 is the outside, page 2 the inside.`
      : ` Prints on a ${s.foldSheet} sheet. Print double-sided (flip on short edge), then fold across the middle. Page 1 is the outside, page 2 the inside.`);
}

/* ---------- navigation + events ---------- */
function goto(i){$$('.panel').forEach((p,idx)=>p.classList.toggle('active',idx===i));
  $$('.steps-nav button[data-goto]').forEach(b=>{const idx=+b.dataset.goto;b.classList.toggle('active',idx===i);b.classList.toggle('done',idx<i);});
  window.scrollTo({top:0,behavior:'smooth'});}
document.addEventListener('click',e=>{const g=e.target.closest('[data-goto]');if(g)goto(+g.dataset.goto);});
$('#foldChoices').addEventListener('click',e=>{const b=e.target.closest('[data-fold]');if(b){state.fold=b.dataset.fold;ensurePaper();refreshAll();}});
$('#orientChoices').addEventListener('click',e=>{const b=e.target.closest('[data-orient]');if(b){state.orientation=b.dataset.orient;refreshAll();}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-env]');if(b){state.envelope=b.dataset.env==='yes';if(state.envelope)syncEnvMatch();refreshAll();}});
$('#modeTabs').addEventListener('click',e=>{const b=e.target.closest('[data-mode]');if(b){face().mode=b.dataset.mode;buildContent();refreshAll();}});
$('#sideToggle').addEventListener('click',e=>{const b=e.target.closest('[data-side]');if(b){state.activeSide=b.dataset.side;refreshAll();}});
$('#textInput').addEventListener('input',e=>{face().text=e.target.value;renderPreviewCanvas(state.activeSide==='inside'?$('#cvInside'):$('#cvFront'),face(),state.activeSide);});
$('#fullBleed').addEventListener('change',e=>{state.fullBleed=e.target.checked;refreshAll();});
$('#bgRemove').addEventListener('change',()=>{applyBg();refreshAll();});
$('#imgInput').addEventListener('change',e=>{const file=e.target.files[0];if(!file)return;const img=new Image();img.onload=()=>{const f=face();f.rawImage=img;f.mode='upload';applyBg();refreshAll();};img.src=URL.createObjectURL(file);});
$('#copyHex').addEventListener('click',()=>{const hex=paperHex().toUpperCase();navigator.clipboard&&navigator.clipboard.writeText(hex);toast('Copied '+hex+' — paste into the Shopify variant swatch');});

/* ---------- export ---------- */
function renderSheet(pageW,pageH,panels){
  const cv=document.createElement('canvas');cv.width=Math.round(pageW*DPI);cv.height=Math.round(pageH*DPI);
  const ctx=cv.getContext('2d');ctx.fillStyle=paperHex();ctx.fillRect(0,0,cv.width,cv.height);
  for(const p of panels){const px=p.x*DPI,py=p.y*DPI,pw=p.w*DPI,ph=p.h*DPI;ctx.save();
    if(p.rotate){ctx.translate(px+pw/2,py+ph/2);ctx.rotate(Math.PI);drawFace(ctx,-pw/2,-ph/2,pw,ph,p.face,paperHex(),p.side);}
    else drawFace(ctx,px,py,pw,ph,p.face,paperHex(),p.side);
    ctx.restore();}
  return cv;
}
// Build the print-ready PDF (1 page flat / single-sided folded, 2 pages double-sided).
async function buildPdf(){
  const {jsPDF}=window.jspdf;const d=finishedDims();const ps=printSheet();
  await document.fonts.ready;
  const dbl = faceHasContent(state.faces.inside,'inside');
  const pages=[];
  if(state.fold!=='folded'){
    pages.push({w:d.w,h:d.h,canvas:renderSheet(d.w,d.h,[{face:state.faces.front,x:0,y:0,w:d.w,h:d.h,side:'front'}])});
  } else if(ps.axis==='v'){
    const fw=d.w,fh=d.h;
    pages.push({w:ps.w,h:ps.h,canvas:renderSheet(ps.w,ps.h,[{face:state.faces.front,x:fw,y:0,w:fw,h:fh,side:'front'}])});
    if(dbl) pages.push({w:ps.w,h:ps.h,canvas:renderSheet(ps.w,ps.h,[{face:state.faces.inside,x:fw,y:0,w:fw,h:fh,side:'inside'}])});
  } else {
    const fw=d.w,fh=d.h;
    pages.push({w:ps.w,h:ps.h,canvas:renderSheet(ps.w,ps.h,[{face:state.faces.front,x:0,y:fh,w:fw,h:fh,side:'front'}])});
    if(dbl) pages.push({w:ps.w,h:ps.h,canvas:renderSheet(ps.w,ps.h,[{face:state.faces.inside,x:0,y:fh,w:fw,h:fh,side:'inside'}])});
  }
  const first=pages[0];
  const pdf=new jsPDF({unit:'in',format:[first.w,first.h],orientation:first.w>first.h?'landscape':'portrait'});
  pages.forEach((pg,i)=>{if(i>0)pdf.addPage([pg.w,pg.h],pg.w>pg.h?'landscape':'portrait');
    pdf.addImage(pg.canvas.toDataURL('image/png'),'PNG',0,0,pg.w,pg.h,undefined,'FAST');});
  return pdf;
}
async function exportPDF(){
  const status=$('#dlStatus');status.textContent='Rendering…';
  const pdf=await buildPdf();
  const name=slug($('#fileName').value||'bliss-studio-card');
  pdf.save(name+'.pdf');
  status.textContent='Downloaded '+name+'.pdf';toast('Print-ready PDF downloaded');
}
function orderConfig(){
  return { size:state.size, fold:state.fold, orientation:state.orientation, paperColor:state.paper,
    sides:printSides(), quantity:state.qty||1,
    envelope:{ on:state.envelope, color:state.envColor },
    addressing:{ on:false } };
}
async function orderCards(){
  const btn=$('#orderBtn'), status=$('#orderStatus');
  btn.disabled=true; status.textContent='Preparing your order…';
  try{
    const pdf=await buildPdf();
    const b64=(pdf.output('datauristring').split(',')[1])||'';
    const name=slug($('#fileName').value||'bliss-studio-card');
    const r=await fetch(WORKER_URL+'/order',{ method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ name, pdfBase64:b64, config:orderConfig() }) });
    const j=await r.json().catch(()=>({ok:false,error:'bad response'}));
    if(!r.ok || !j.ok) throw new Error(j.error||('HTTP '+r.status));
    status.textContent='Taking you to checkout…';
    window.location.href=j.checkoutUrl;
  }catch(err){
    console.error(err);
    status.textContent='Could not start checkout ('+err.message+'). You can still download the PDF below.';
    btn.disabled=false;
  }
}
$('#downloadBtn').addEventListener('click',()=>{exportPDF().catch(err=>{console.error(err);$('#dlStatus').textContent='Something went wrong rendering the PDF.';});});
$('#orderBtn').addEventListener('click',orderCards);
function setQty(v){v=parseInt(v,10);if(isNaN(v))v=1;state.qty=Math.max(1,Math.min(1000,v));$('#qtyInput').value=state.qty;refreshAll();}
$('#qtyInput').addEventListener('input',e=>setQty(e.target.value));
$('#qtyMinus').addEventListener('click',()=>setQty(state.qty-1));
$('#qtyPlus').addEventListener('click',()=>setQty(state.qty+1));

/* ---------- init ---------- */
(function seed(){const f=state.faces.front;f.mode='template';f.template='thanks';f.font='Great Vibes';f.text='Thank you';})();
$('#fileName').value='bliss-studio-card';
window.addEventListener('load',()=>{document.fonts.ready.then(refreshAll);refreshAll();});
(function(){var t=document.getElementById('navToggle');if(t)t.addEventListener('click',function(){var n=document.getElementById('siteNav'),o=n.classList.toggle('open');t.setAttribute('aria-expanded',o?'true':'false');});})();

