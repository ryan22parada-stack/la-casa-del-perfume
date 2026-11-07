(function(){
if(window.LCSense)return;
let ctx,master;
function ac(){if(!ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;ctx=new C();master=ctx.createGain();master.gain.value=.55;const comp=ctx.createDynamicsCompressor();master.connect(comp);comp.connect(ctx.destination);}if(ctx.state==='suspended')ctx.resume();return ctx;}
function tone(f,t0,dur,o={}){const {type='sine',g=.1,att=.004,dest=master,glide}=o;const os=ctx.createOscillator(),gn=ctx.createGain();os.type=type;os.frequency.setValueAtTime(f,t0);if(glide)os.frequency.exponentialRampToValueAtTime(glide,t0+dur);gn.gain.setValueAtTime(0,t0);gn.gain.linearRampToValueAtTime(g,t0+att);gn.gain.exponentialRampToValueAtTime(.0001,t0+dur);os.connect(gn);gn.connect(dest);os.start(t0);os.stop(t0+dur+.05);}
let nb;function noise(){if(!nb){nb=ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}const s=ctx.createBufferSource();s.buffer=nb;return s;}
function swell(t,len,peak,{type='lowpass',f0=300,f1=1400,q=.7}={}){const n=noise(),f=ctx.createBiquadFilter(),g=ctx.createGain();f.type=type;f.Q.value=q;f.frequency.setValueAtTime(f0,t);f.frequency.linearRampToValueAtTime(f1,t+len*.45);f.frequency.linearRampToValueAtTime(f0,t+len);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+len*.45);g.gain.linearRampToValueAtTime(0,t+len);n.connect(f);f.connect(g);g.connect(master);n.start(t,Math.random()*1.5);n.stop(t+len+.1);}
const vib=ms=>{try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}};
// Crossmodal: fresh/citrus = high & bright, woody/amber = low & warm, sweet = round bell tones, marine = waves.
const F={
 acuatico(t){swell(t,2.6,.55);swell(t+.95,2.1,.38,{f0:250,f1:1100});tone(1568,t+1.1,1.3,{g:.012});tone(2093,t+1.5,1.1,{g:.008});},
 floral(t){[659,784,988,1319,1568].forEach((f,i)=>tone(f,t+i*.14,1.7,{type:'triangle',g:.055}));tone(330,t,2.4,{g:.03,att:.6});},
 frutal(t){[784,988,1175,1568,1175,1568,1976].forEach((f,i)=>tone(f,t+i*.1,.22,{g:.08}));},
 dulce(t){[1047,1319,1568,2093,1568,1319].forEach((f,i)=>{tone(f,t+i*.22,1.4,{g:.05});tone(f*2.76,t+i*.22,.5,{g:.008});});tone(262,t,2.4,{g:.025,att:.5});},
 citrico(t){for(let i=0;i<12;i++)tone(1800+Math.random()*2600,t+i*.07+Math.random()*.03,.35,{g:.035});swell(t,1.3,.06,{type:'highpass',f0:4000,f1:7000});},
 aromatico(t){swell(t,2.6,.18,{type:'bandpass',f0:500,f1:1800,q:1.2});tone(440,t+.3,1.9,{g:.04,att:.35});tone(659,t+.9,1.5,{g:.03,att:.3});},
 amaderado(t){const o=ctx.createOscillator(),f=ctx.createBiquadFilter(),g=ctx.createGain();o.type='sawtooth';o.frequency.value=98;f.type='lowpass';f.frequency.value=520;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.07,t+.6);g.gain.linearRampToValueAtTime(0,t+2.6);o.connect(f);f.connect(g);g.connect(master);o.start(t);o.stop(t+2.7);tone(147,t+.2,2.2,{g:.04,att:.5});for(let i=0;i<14;i++){const c=t+.2+Math.random()*2.2;swell(c,.03,.15,{type:'bandpass',f0:2500,f1:3500,q:3});}},
 oriental(t){tone(147,t,2.6,{type:'triangle',g:.05,att:.5});tone(220,t,2.6,{g:.035,att:.6});[294,349,440,523].forEach((f,i)=>tone(f,t+.25+i*.32,1.5,{g:.06,att:.01}));}
};
window.LCSense={
 haptic:vib,
 tick(d){vib(6);if(!ac())return;const t=ctx.currentTime;tone(d<0?1480:1760,t,.035,{g:.06});tone(3500,t,.012,{type:'square',g:.01});},
 select(){vib(12);if(!ac())return;const t=ctx.currentTime;tone(784,t,.18,{type:'triangle',g:.08});tone(1175,t+.06,.3,{g:.07});},
 back(){vib(8);if(!ac())return;const t=ctx.currentTime;tone(880,t,.12,{type:'triangle',g:.06});tone(587,t+.05,.2,{g:.06});},
 family(k){if(!ac())return;(F[k]||F.oriental)(ctx.currentTime+.02);}
};
function render(el){if(!window.lucide)return false;const n=el.getAttribute('name')||'Sparkles';const node=lucide.icons[n]||lucide.icons.Sparkles;const s=el.getAttribute('size')||'20';const svg=lucide.createElement(node);svg.setAttribute('width',s);svg.setAttribute('height',s);svg.setAttribute('stroke-width',el.getAttribute('stroke')||'1.5');const root=el.shadowRoot||el.attachShadow({mode:'open'});root.replaceChildren(svg);return true;}
const pending=new Set();
customElements.define('lc-icon',class extends HTMLElement{static get observedAttributes(){return['name','size','stroke']}connectedCallback(){this.style.display='inline-flex';this.style.lineHeight='0';if(!render(this))pending.add(this);}attributeChangedCallback(){if(this.isConnected&&!render(this))pending.add(this);}});
const iv=setInterval(()=>{if(window.lucide){clearInterval(iv);pending.forEach(render);pending.clear();}},60);
})();
