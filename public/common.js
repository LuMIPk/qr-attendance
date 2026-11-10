const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.setAttribute('role','status');document.body.append(t)}t.textContent=m;t.classList.remove('hide');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.add('hide'),3500)}
async function api(u,m='GET',b){const r=await fetch(u,{method:m,headers:{'Content-Type':'application/json'},body:b?JSON.stringify(b):undefined});let j={};try{j=await r.json()}catch{}
  if(r.status===401&&!u.includes('/login')){location.href='/';throw 0}if(!r.ok){toast(j.error||'Something went wrong');throw j}return j}
const act=f=>async e=>{e?.preventDefault?.();try{await f(e)}catch(x){if(x?.message)console.error(x)}};
const bar=p=>`<div class="bar ${p<75?'low':''}"><i style="width:${Math.min(100,p||0)}%"></i></div>`;
const dt=t=>t?new Date(t).toLocaleString([], {dateStyle:'medium',timeStyle:'short'}):'';
const timing=c=>[c.day,c.start_time&&c.end_time?`${c.start_time}–${c.end_time}`:'',c.room].filter(Boolean).join(' · ')||'No timing set';
async function logout(){await api('/api/logout','POST');location.href='/'}
function download(name,text){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+text],{type:'text/csv'}));a.download=name;a.click()}
function trend(pts){if(pts.length<2)return '<p class="mute">Trend appears after two sessions.</p>';const W=400,H=110,x=i=>10+i*(W-20)/(pts.length-1),y=p=>H-10-p*(H-20)/100;
  return `<svg class="trend" viewBox="0 0 ${W} ${H}" role="img" aria-label="Attendance percentage per session"><line x1="10" x2="${W-10}" y1="${y(75)}" y2="${y(75)}" stroke="var(--warn)" stroke-dasharray="4"/><polyline fill="none" stroke="var(--acc)" stroke-width="2.5" points="${pts.map((p,i)=>x(i)+','+y(p)).join(' ')}"/>${pts.map((p,i)=>`<circle cx="${x(i)}" cy="${y(p)}" r="3.5" fill="var(--acc)"/>`).join('')}</svg><p class="mute" style="margin:0;font-size:.8rem">Dashed line = 75% minimum</p>`}
