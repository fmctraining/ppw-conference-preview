/* PPW contact popup — Web3Forms.
   TO GO LIVE: paste your Web3Forms access key(s) below.
   - One central inbox: set KEYS.default only (every form goes there; the subject says who it was for).
   - Route to each person: also set KEYS.megan / KEYS.tyree / KEYS.elise (a separate free key per email).
   Until at least KEYS.default is set, the buttons keep working as normal mailto links (no change for visitors). */
const KEYS = {
  default: "27e761cd-a9a3-49c5-9b3f-4b4d6e0e1ccf",   // PPW (syvonnek@fmctraining.com)
  megan:   "",   // optional — meganb@fmctraining.com key
  tyree:   "",   // optional — tyreep@fmctraining.com key
  elise:   ""    // optional — eliseo@fmctraining.com key
};

const PEOPLE = {
  proposal: { name: "Megan Belka", role: "Event & Projects Manager", key: "megan", title: "Request a proposal" },
  megan:    { name: "Megan Belka", role: "Event & Projects Manager", key: "megan", title: "Sponsorship & partnerships" },
  tyree:    { name: "Tyree Peters", role: "Marketing Manager",        key: "tyree", title: "Press & marketing" },
  elise:    { name: "Elise O'Brien", role: "Global Events & Operations", key: "elise", title: "Get in touch" }
};

(function(){
  if(!KEYS.default && !KEYS.megan && !KEYS.tyree && !KEYS.elise) return; // not activated yet → mailto stays
  const keyFor = who => KEYS[PEOPLE[who].key] || KEYS.default;

  const css = `
  .cm-ov{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;padding:40px 18px;
    background:rgba(4,7,13,.82);backdrop-filter:blur(6px);overflow:auto}
  .cm-ov.open{display:flex}
  .cm-card{position:relative;width:100%;max-width:440px;margin:auto;background:linear-gradient(180deg,#121b2e,#0d1526);
    border:1px solid rgba(255,255,255,.12);border-radius:18px;box-shadow:0 30px 80px rgba(0,0,0,.6);padding:40px 30px 30px;
    font-family:"Poppins",system-ui,sans-serif;color:#eef2fb}
  .cm-x{position:absolute;top:14px;right:16px;width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,255,255,.12);
    background:rgba(255,255,255,.05);color:#aeb9d4;font-size:16px;display:flex;align-items:center;justify-content:center;cursor:pointer}
  .cm-logo{display:block;height:56px;width:auto;max-width:80%;margin:16px auto 26px}
  .cm-card h3{text-align:center;font-size:20px;font-weight:800;margin:0 0 22px}
  .cm-f{margin-bottom:15px}
  .cm-f label{display:block;font-size:12px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;color:#7c8bab;margin:0 0 6px}
  .cm-f label i{color:#87dffa;font-weight:400;font-style:normal}
  .cm-f label .o{color:#7c8bab;text-transform:none;font-weight:500;letter-spacing:0}
  .cm-f input,.cm-f select,.cm-f textarea{width:100%;background:#0b1220;border:1px solid rgba(255,255,255,.12);border-radius:10px;
    color:#eef2fb;font-family:inherit;font-size:14px;padding:11px 13px;box-sizing:border-box}
  .cm-f input::placeholder,.cm-f textarea::placeholder{color:#54627e}
  .cm-f input:focus,.cm-f select:focus,.cm-f textarea:focus{outline:none;border-color:rgba(135,223,250,.5)}
  .cm-f textarea{min-height:74px;resize:vertical}
  .cm-chips{display:flex;flex-wrap:wrap;gap:7px}
  .cm-chip{font-size:12.5px;padding:7px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.12);color:#aeb9d4;cursor:pointer;user-select:none}
  .cm-chip.on{background:rgba(91,141,239,.16);border-color:rgba(91,141,239,.5);color:#bcd3ff}
  .cm-send{width:100%;margin-top:8px;background:linear-gradient(100deg in oklch,oklch(86% .10 225),oklch(80% .12 288));
    color:#04121a;font-weight:800;font-size:14.5px;border:0;border-radius:999px;padding:13px;cursor:pointer;box-shadow:0 10px 26px rgba(91,141,239,.35)}
  .cm-send[disabled]{opacity:.6;cursor:default}
  .cm-route{text-align:center;color:#7c8bab;font-size:11.5px;margin-top:12px}
  .cm-ok{text-align:center;padding:20px 0 8px}
  .cm-ok .t{font-size:18px;font-weight:800;margin:12px 0 6px}
  .cm-ok .s{color:#aeb9d4;font-size:14px}`;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  const ov=document.createElement('div'); ov.className='cm-ov'; ov.innerHTML='<div class="cm-card"></div>'; document.body.appendChild(ov);
  const card=ov.querySelector('.cm-card');
  const close=()=>{ov.classList.remove('open');};
  ov.addEventListener('click',e=>{if(e.target===ov)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});

  function open(who){
    const p=PEOPLE[who]; const isProp=who==='proposal';
    card.innerHTML=`<div class="cm-x">&times;</div>
      <img class="cm-logo" src="ppw-assets/ppw-global-logo.webp" alt="Post Production World Conference">
      <h3>${p.title}</h3>
      <form class="cm-form">
        <div class="cm-f"><label>Name <i>*</i></label><input name="name" required placeholder="Your name"></div>
        ${isProp?'<div class="cm-f"><label>Company <i>*</i></label><input name="company" required placeholder="Company / organization"></div>':''}
        <div class="cm-f"><label>Email <i>*</i></label><input type="email" name="email" required placeholder="you@email.com"></div>
        ${isProp?`<div class="cm-f"><label>Regions of interest <span class="o">(optional)</span></label>
          <div class="cm-chips">${['Las Vegas','New York','London','Mumbai','All / Global'].map(r=>`<span class="cm-chip" data-r="${r}">${r}</span>`).join('')}</div>
          <input type="hidden" name="regions"></div>`:''}
        <div class="cm-f"><label>Message <span class="o">(optional)</span></label><textarea name="message" placeholder="${isProp?'What are you hoping to achieve?':'How can we help?'}"></textarea></div>
        <input type="hidden" name="access_key" value="${keyFor(who)}">
        <input type="hidden" name="subject" value="PPW ${p.title} · via ppw-conference.com">
        <input type="hidden" name="from_name" value="PPW Website">
        <button class="cm-send" type="submit">${isProp?'Send proposal request':'Send message'}</button>
      </form>`;
    card.querySelector('.cm-x').onclick=close;
    card.querySelectorAll('.cm-chip').forEach(c=>c.onclick=()=>{c.classList.toggle('on');
      card.querySelector('[name=regions]').value=[...card.querySelectorAll('.cm-chip.on')].map(x=>x.dataset.r).join(', ');});
    const form=card.querySelector('.cm-form');
    form.onsubmit=async e=>{e.preventDefault();
      const btn=form.querySelector('.cm-send'); btn.disabled=true; btn.textContent='Sending…';
      try{
        const r=await fetch('https://api.web3forms.com/submit',{method:'POST',body:new FormData(form)});
        const j=await r.json();
        if(j.success){ card.innerHTML=`<div class="cm-x">&times;</div><div class="cm-ok"><div class="t">Thanks, message sent.</div><div class="s">${p.name} will be in touch soon.</div></div>`; card.querySelector('.cm-x').onclick=close; }
        else throw new Error(j.message||'failed');
      }catch(err){ btn.disabled=false; btn.textContent='Try again'; }
    };
    ov.classList.add('open');
  }

  document.querySelectorAll('[data-contact]').forEach(el=>{
    el.addEventListener('click',e=>{ const who=el.getAttribute('data-contact'); if(PEOPLE[who] && keyFor(who)){ e.preventDefault(); open(who); } });
  });
})();
