/* Visitor-language preference and persistent contact controls. All translations
 * are bundled locally; customer form input is never sent for translation. */
(()=>{'use strict';
 if(window.__siteExperience||/^\/(?:admin|api|login|auth|dashboard)(?:\/|$)/.test(location.pathname))return;
 window.__siteExperience=true;
 const names={en:'English',fr:'Français',de:'Deutsch',es:'Español',nl:'Nederlands'};
 const labels={
  en:{language:'Choose language',contact:'Open WhatsApp',annual:'Annual plan',hello:'Hello',question:'I have a question about your subscriptions.',website:'Website'},
  fr:{language:'Choisir la langue',contact:'Ouvrir WhatsApp',annual:'Formule annuelle',hello:'Bonjour',question:'Je souhaite des renseignements sur vos abonnements.',website:'Site'},
  de:{language:'Sprache wählen',contact:'WhatsApp öffnen',annual:'Jahrespaket',hello:'Hallo',question:'Ich habe eine Frage zu Ihren Abonnements.',website:'Website'},
  es:{language:'Elegir idioma',contact:'Abrir WhatsApp',annual:'Plan anual',hello:'Hola',question:'Quisiera información sobre sus suscripciones.',website:'Sitio web'},
  nl:{language:'Taal kiezen',contact:'WhatsApp openen',annual:'Jaarabonnement',hello:'Hallo',question:'Ik heb een vraag over uw abonnementen.',website:'Website'}
 };
 const globe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/></svg>';
 const whatsapp='<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3a12.8 12.8 0 0 0-11 19.4L3.3 29l6.8-1.8A12.8 12.8 0 1 0 16 3Zm0 2.3a10.5 10.5 0 1 1-5.3 19.6l-.4-.2-4 .9 1-3.9-.3-.4A10.5 10.5 0 0 1 16 5.3Zm-4.5 5.1c-.3 0-.6.1-.8.4-.4.4-1.1 1.1-1.1 2.6s1.1 2.9 1.3 3.1c.2.2 2.2 3.4 5.4 4.6 2.6.9 3.2.7 3.8.6.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.7-.4l-2.2-1c-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.4-.2-1.5-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.4 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.2-.6-.5-.6-.7-.6h-.5Z"/></svg>';
 const sourceFor=new WeakMap(),attributeSources=new WeakMap(),loaded=new Map();
 let config,sourceLanguage='en',language='en',dictionary={},header,control,contact,observer,translating=false,scheduled=false;const pendingRoots=new Set();
 const normalize=s=>s.replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
 const supported=x=>Object.hasOwn(names,x);
 function translate(value){
  if(language===sourceLanguage)return value;
  const exact=dictionary[normalize(value)];if(exact)return exact;
  return value.split(/(\s[·—]\s)/).map(part=>dictionary[normalize(part)]||part).join('').replace(/\b(months|month|mois|Monate|Monat)\b/g,word=>dictionary[word]||word);
 }
 const ignored=node=>node.parentElement?.closest('script,style,noscript,code,pre,textarea,input,svg,[data-no-translate],.experience-language,.experience-whatsapp');
 function nodeTranslation(node){
  if(ignored(node)||!node.nodeValue.trim())return;
  const previous=sourceFor.get(node),current=node.nodeValue;
  const original=previous&&previous.translated===current?previous.original:current;
  const key=normalize(original),translated=translate(original);
  const value=translated===original?original:original.match(/^\s*/)[0]+translated+original.match(/\s*$/)[0];
  sourceFor.set(node,{original,translated:value});if(current!==value)node.nodeValue=value;
 }
 function attributes(el){
  if(el.closest('[data-no-translate],.experience-language,.experience-whatsapp,svg'))return;
  let record=attributeSources.get(el);if(!record){record={};attributeSources.set(el,record)}
  for(const attr of ['aria-label','placeholder','title','alt']){
   if(!el.hasAttribute(attr))continue;
   const current=el.getAttribute(attr),old=record[attr];
   const original=old&&old.translated===current?old.original:current;
   const value=translate(original);
   record[attr]={original,translated:value};if(current!==value)el.setAttribute(attr,value);
  }
 }
 function localLinks(root){
  const links=root.matches?.('a[href]')?[root]:[...root.querySelectorAll?.('a[href]')||[]];
  for(const a of links){if(a.closest('.experience-language,.experience-whatsapp,[data-no-language-link]'))continue;
   const raw=a.getAttribute('href');if(!raw||raw.startsWith('#')||/^(?:mailto:|tel:|javascript:)/i.test(raw))continue;
   let u;try{u=new URL(raw,location.href)}catch{continue}
   if(u.origin!==location.origin||/\.[a-z0-9]{2,8}$/i.test(u.pathname)||/^\/(?:api|admin|auth|login)(?:\/|$)/.test(u.pathname))continue;
   if(language===sourceLanguage)u.searchParams.delete('lang');else u.searchParams.set('lang',language);
   const value=u.pathname+u.search+u.hash;if(value!==raw)a.setAttribute('href',value);
  }
 }
 function apply(root=document.body){
  if(!root||translating)return;translating=true;observer?.disconnect();
  try{const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode())nodeTranslation(node);
   if(root.nodeType===1)attributes(root);for(const el of root.querySelectorAll?.('[aria-label],[placeholder],[title],[alt]')||[])attributes(el);
   localLinks(root);
  }finally{translating=false;observe()}
 }
 function observe(){observer?.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','title','alt','href']})}
 function schedule(records){for(const record of records){if(record.type==='childList'){for(const node of record.addedNodes)pendingRoots.add(node)}else pendingRoots.add(record.target)}if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;installHeader();markAnnual();observer?.disconnect();try{for(const root of pendingRoots){if(!root.isConnected)continue;if(root.nodeType===3)nodeTranslation(root);else if(root.nodeType===1)apply(root)}}finally{pendingRoots.clear();observe()}})}
 function closeLanguage(focus=false){if(!control)return;const menu=control.querySelector('[role=menu]');menu.hidden=true;const button=control.querySelector('.experience-language-trigger');button.setAttribute('aria-expanded','false');if(focus)button.focus()}
 function markAnnual(){
  for(const card of document.querySelectorAll('[data-billing-months="12"],.plan-long,.plan-card.featured,.price-card.featured')){
   card.classList.add('experience-annual');
   if(!card.querySelector('.experience-annual-ribbon,.best-badge,.plan-label small,[class*="-top-3"]')){const badge=document.createElement('span');badge.className='experience-annual-ribbon';badge.dataset.noTranslate='';badge.textContent=labels[language].annual;card.prepend(badge)}
  }
  for(const badge of document.querySelectorAll('.experience-annual-ribbon'))if(badge.textContent!==labels[language].annual)badge.textContent=labels[language].annual;
 }
 function updateControls(){
  if(control){control.querySelector('[data-language-code]').textContent=language.toUpperCase();control.querySelector('.experience-language-trigger').setAttribute('aria-label',labels[language].language);for(const item of control.querySelectorAll('[data-language]'))item.setAttribute('aria-checked',String(item.dataset.language===language))}
  if(contact){contact.setAttribute('aria-label',labels[language].contact);contact.title=labels[language].contact;contact.querySelector('.experience-whatsapp-label').textContent=labels[language].contact;
   const msg=`${labels[language].hello} ${config.brand}, ${labels[language].question}\n${labels[language].website}: https://${config.domain}/`;
   contact.href='https://wa.me/'+config.whatsapp+'?text='+encodeURIComponent(msg);
  }
 }
 async function setLanguage(next,{history=true}={}){
  if(!supported(next))return;
  let nextDictionary={};if(next!==sourceLanguage){try{if(!loaded.has(next))loaded.set(next,fetch('/locales/experience-'+next+'.json?v='+config.version).then(r=>{if(!r.ok)throw Error('Translation unavailable');return r.json()}));nextDictionary=await loaded.get(next)}catch{return}}
  language=next;dictionary=nextDictionary;document.documentElement.lang=next;document.documentElement.dataset.language=next;
  if(history){const u=new URL(location.href);if(next===sourceLanguage)u.searchParams.delete('lang');else u.searchParams.set('lang',next);window.history.replaceState({...window.history.state,siteLanguage:next},'',u)}
  updateControls();markAnnual();apply();closeLanguage();
  window.dispatchEvent(new CustomEvent('site:language',{detail:{language:next}}));
 }
 function installHeader(){
  const current=document.querySelector(config.headerSelector||'body header');if(!current)return;
  if(current!==header){header=current;
   const before=getComputedStyle(header),box=header.getBoundingClientRect();
   if(before.position!=='fixed'&&!header.previousElementSibling?.classList.contains('experience-header-spacer')){const space=document.createElement('div');space.className='experience-header-spacer';space.setAttribute('aria-hidden','true');space.style.height=box.height+'px';header.before(space)}
   header.classList.add('experience-sticky');
   const row=header.querySelector(config.headerRowSelector||'.header-inner,.navigation,.nav-inner')||header.firstElementChild||header;row.classList.add('experience-header-row');
   const syncHeight=()=>{const height=Math.round(header.getBoundingClientRect().height);if(height>0&&height<180){document.documentElement.style.setProperty('--experience-header-height',height+'px');const spacer=header.previousElementSibling;if(spacer?.classList.contains('experience-header-spacer'))spacer.style.height=height+'px'}};
   new ResizeObserver(syncHeight).observe(header);syncHeight();
   if(!control){control=document.createElement('div');control.className='experience-language';control.dataset.noTranslate='';control.innerHTML=`<button class="experience-language-trigger" type="button" aria-haspopup="menu" aria-expanded="false">${globe}<span data-language-code>${language.toUpperCase()}</span><span aria-hidden="true">⌄</span></button><div class="experience-language-menu" role="menu" hidden>${Object.entries(names).map(([code,name])=>`<button type="button" role="menuitemradio" aria-checked="false" data-language="${code}" lang="${code}">${name}<span aria-hidden="true">${code.toUpperCase()}</span></button>`).join('')}</div>`;
    control.querySelector('.experience-language-trigger').addEventListener('click',()=>{const b=control.querySelector('button'),menu=control.querySelector('[role=menu]'),opening=menu.hidden;menu.hidden=!opening;b.setAttribute('aria-expanded',String(opening));if(opening)menu.querySelector('[aria-checked=true]')?.focus()});
    control.addEventListener('click',e=>{const item=e.target.closest('button[data-language]');if(item&&control.contains(item))setLanguage(item.dataset.language)});
    control.addEventListener('keydown',e=>{const items=[...control.querySelectorAll('[data-language]')];if(e.key==='Escape'){e.preventDefault();closeLanguage(true)}else if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();let i=items.indexOf(document.activeElement);i=e.key==='Home'?0:e.key==='End'?items.length-1:(i+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;items[i].focus()}});
   }
   const actions=row.querySelector('.nav-actions');const menu=(actions||row).querySelector('.menu-toggle,.menu-button,.menu,[aria-controls]');
   if(menu)menu.parentElement.insertBefore(control,menu);else row.append(control);updateControls();
  }
 }
 async function init(){
  try{const r=await fetch('/site-experience.json?v=20261112hero');if(!r.ok)return;config=await r.json()}catch{return}
  sourceLanguage=config.language||document.documentElement.lang.split('-')[0]||'en';language=supported(sourceLanguage)?sourceLanguage:'en';
  window.siteExperienceTranslate=translate;
  document.documentElement.dataset.sourceLanguage=sourceLanguage;document.documentElement.style.setProperty('--experience-accent',config.accent||'#8578ff');document.documentElement.style.setProperty('--experience-accent-ink',config.accentInk||'#101522');
  installHeader();
  contact=document.createElement('a');contact.className='experience-whatsapp';contact.dataset.noTranslate='';contact.target='_blank';contact.rel='noopener noreferrer';contact.innerHTML=whatsapp+'<span class="experience-whatsapp-label"></span>';document.body.append(contact);
  updateControls();markAnnual();
  observer=new MutationObserver(records=>{const changed=records.filter(r=>!r.target.parentElement?.closest('.experience-language,.experience-whatsapp,[data-no-translate]'));if(changed.length)schedule(changed)});observe();
  document.addEventListener('pointerdown',e=>{if(control&&!control.contains(e.target))closeLanguage()});
  const onScroll=()=>header?.classList.toggle('is-scrolled',scrollY>12);window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  window.addEventListener('popstate',e=>{const q=new URLSearchParams(location.search).get('lang');setLanguage(supported(q)?q:(e.state?.siteLanguage||sourceLanguage),{history:false})});
  const preferred=new URLSearchParams(location.search).get('lang');if(supported(preferred)&&preferred!==sourceLanguage)await setLanguage(preferred,{history:false});
  document.documentElement.dataset.siteExperience='ready';
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
