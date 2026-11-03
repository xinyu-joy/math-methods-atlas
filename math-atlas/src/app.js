(()=>{
 'use strict';
 const toast=document.querySelector('[data-toast]');let toastTimer;
 function notify(message){if(!toast)return;toast.textContent=message;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.hidden=true},3500)}
 async function copy(text,button){
  try{if(!navigator.clipboard)throw new Error('clipboard unavailable');await navigator.clipboard.writeText(text);notify('链接已复制，可以直接分享。')}
  catch{let field=document.querySelector('.copy-fallback');if(!field){field=document.createElement('input');field.className='copy-fallback';field.readOnly=true;field.setAttribute('aria-label','复制此链接');button.insertAdjacentElement('afterend',field)}field.value=text;field.focus();field.select();notify('请复制已选中的链接。')}
 }
 document.querySelectorAll('[data-copy-link]').forEach(button=>button.addEventListener('click',()=>copy(location.href,button)));
 const form=document.querySelector('[data-search-form]');if(!form)return;
 const search=document.querySelector('#search');
 const subject=document.querySelector('#subject');const problem=document.querySelector('#problem');const status=document.querySelector('#status');const sort=document.querySelector('#sort');
 const grid=document.querySelector('[data-results]');const cards=[...grid.querySelectorAll('[data-method]')];
 const count=document.querySelector('[data-count]');const empty=document.querySelector('[data-empty]');
 const normal=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function restore(){const p=new URLSearchParams(location.search);search.value=p.get('q')||'';for(const [name,element] of [['subject',subject],['problem',problem],['status',status],['sort',sort]]){const v=p.get(name)||'';element.value=[...element.options].some(o=>o.value===v)?v:''}}
 function apply(writeUrl=true){
  const terms=normal(search.value.trim()).split(/\s+/).filter(Boolean);
  let n=0;
  const ordered=[...cards].sort((a,b)=>sort.value==='name'?a.dataset.name.localeCompare(b.dataset.name,'zh-CN'):sort.value==='evidence'?(Number(b.dataset.checked)-Number(a.dataset.checked)||a.dataset.method.localeCompare(b.dataset.method)):sort.value==='id'?a.dataset.method.localeCompare(b.dataset.method):Number(a.dataset.order)-Number(b.dataset.order));
  for(const card of ordered){const match=terms.every(t=>normal(card.dataset.search).includes(t))&&(!subject.value||card.dataset.subjects.split(';').includes(subject.value))&&(!problem.value||card.dataset.problem===problem.value)&&(!status.value||card.dataset.checked===(status.value==='checked'?'1':'0'));card.hidden=!match;if(match)n++;grid.appendChild(card)}
  count.textContent=String(n);empty.hidden=n!==0;grid.hidden=n===0;
  if(writeUrl){const p=new URLSearchParams();for(const [name,value] of [['q',search.value.trim()],['subject',subject.value],['problem',problem.value],['status',status.value],['sort',sort.value]])if(value)p.set(name,value);history.replaceState(null,'',location.pathname+(p.size?'?'+p.toString():'')+location.hash)}
 }
 let debounce;search.addEventListener('input',()=>{clearTimeout(debounce);debounce=setTimeout(()=>apply(),100)});
 form.addEventListener('submit',e=>{e.preventDefault();clearTimeout(debounce);apply();document.querySelector('#catalog').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});
 for(const element of [subject,problem,status,sort])element.addEventListener('change',()=>apply());
 document.querySelectorAll('[data-reset]').forEach(b=>b.addEventListener('click',()=>{search.value='';subject.value='';problem.value='';status.value='';sort.value='';apply()}));
 document.querySelectorAll('[data-query]').forEach(b=>b.addEventListener('click',()=>{search.value=b.dataset.query;apply();document.querySelector('#catalog').scrollIntoView({block:'start'})}));
 window.addEventListener('popstate',()=>{restore();apply(false)});
 restore();apply(false);
})();
