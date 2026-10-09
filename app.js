// TechLanka Hub tutorial library update.
// Replace the existing app.js with this file. Other files stay unchanged.
const tutorials = [
 {id:"pc-parts-overview",icon:"🖥️",tag:"Beginner",title:"Computer එකක ප්‍රධාන කොටස්",level:"Beginner",time:"8 min",desc:"CPU, motherboard, RAM, storage, GPU සහ PSU එකිනෙකට සම්බන්ධ වෙන්නේ කොහොමද කියලා ඉගෙනගන්න.",url:"https://www.youtube.com/results?search_query=computer+parts+explained+Sinhala"},
 {id:"cpu-basics",icon:"🧠",tag:"CPU",title:"CPU එකක් තෝරන්නේ කොහොමද?",level:"Beginner",time:"10 min",desc:"Cores, threads, clock speed, socket සහ generation ගැන මූලික දැනුම.",url:"https://www.youtube.com/results?search_query=CPU+basics+Sinhala"},
 {id:"gpu-basics",icon:"🎮",tag:"GPU",title:"Graphics Card (GPU) Guide",level:"Beginner",time:"12 min",desc:"VRAM, gaming performance, connectors සහ GPU එකට ගැළපෙන PSU එක තෝරාගැනීම.",url:"https://www.youtube.com/results?search_query=GPU+guide+Sinhala"},
 {id:"ram-guide",icon:"⚡",tag:"RAM",title:"RAM capacity සහ speed",level:"Beginner",time:"9 min",desc:"8GB/16GB/32GB, DDR4 vs DDR5, dual-channel සහ motherboard compatibility.",url:"https://www.youtube.com/results?search_query=RAM+DDR4+DDR5+Sinhala"},
 {id:"ssd-guide",icon:"💾",tag:"Storage",title:"SSD, HDD සහ NVMe",level:"Beginner",time:"8 min",desc:"Windows drive එකක් සහ games/files සඳහා storage එකක් තෝරාගන්න.",url:"https://www.youtube.com/results?search_query=SSD+NVMe+HDD+Sinhala"},
 {id:"motherboard-guide",icon:"🧩",tag:"Motherboard",title:"Motherboard එක තෝරාගැනීම",level:"Intermediate",time:"12 min",desc:"CPU socket, chipset, RAM type, M.2 slots සහ form factor පරීක්ෂා කරන්න.",url:"https://www.youtube.com/results?search_query=motherboard+guide+Sinhala"},
 {id:"psu-guide",icon:"🔌",tag:"Power",title:"PSU wattage සහ safety",level:"Beginner",time:"10 min",desc:"Power supply wattage, connectors, quality සහ GPU power needs තේරුම් ගන්න.",url:"https://www.youtube.com/results?search_query=PC+power+supply+PSU+guide+Sinhala"},
 {id:"pc-build",icon:"🛠️",tag:"PC Build",title:"PC එකක් assemble කරමු",level:"Intermediate",time:"20 min",desc:"Case preparation, CPU, cooler, RAM, motherboard, storage සහ cable management.",url:"https://www.youtube.com/results?search_query=PC+building+Sinhala"},
 {id:"bios-boot",icon:"⚙️",tag:"Setup",title:"First boot සහ BIOS setup",level:"Intermediate",time:"12 min",desc:"First power-on, BIOS screen, boot drive සහ operating system install කිරීමට පෙර checks.",url:"https://www.youtube.com/results?search_query=BIOS+setup+PC+Sinhala"},
 {id:"no-display",icon:"🔧",tag:"Troubleshooting",title:"PC එක ON වෙනවා, display නැද්ද?",level:"Intermediate",time:"10 min",desc:"Monitor input, display cable, RAM reseat සහ GPU output වැනි safe checks.",url:"https://www.youtube.com/results?search_query=PC+no+display+troubleshooting+Sinhala"},
 {id:"overheating",icon:"🌡️",tag:"Troubleshooting",title:"PC එක overheat වෙනවාද?",level:"Intermediate",time:"11 min",desc:"Airflow, fan direction, dust cleaning සහ CPU temperature ගැන ඉගෙනගන්න.",url:"https://www.youtube.com/results?search_query=PC+overheating+fix+Sinhala"},
 {id:"upgrade-planning",icon:"📈",tag:"Upgrade",title:"පරණ PC එක upgrade කරමු",level:"Intermediate",time:"10 min",desc:"Budget එකට ගැළපෙන CPU/GPU/RAM/SSD upgrade priority එක සැලසුම් කරන්න.",url:"https://www.youtube.com/results?search_query=PC+upgrade+guide+Sinhala"}
];
// Replace these sample cards with verified official shop details before publishing.
const shops = [
 {name:"Add your verified shop",area:"Colombo / Islandwide",desc:"Shop name, official website, phone and warranty details මෙතන දාන්න.",url:"https://www.google.com/search?q=Sri+Lanka+computer+hardware+shop"},
 {name:"Add your verified shop",area:"Your area",desc:"Official store link සහ stock/price check කරන විස්තර එක් කරන්න.",url:"https://www.google.com/search?q=computer+hardware+Sri+Lanka"},
 {name:"Add your verified shop",area:"Online store",desc:"Buyer reviews, warranty terms සහ return policy verify කරන්න.",url:"https://www.google.com/search?q=PC+parts+Sri+Lanka"}
];
let supabase = null, currentUser = null, savedIds = new Set(), localSaved = new Set();
const $ = id => document.getElementById(id);
function toast(message){const el=$("toast");if(!el){console.info("TechLanka Hub:",message);return}el.textContent=message;el.style.display="block";clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.style.display="none",4200)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderTutorials(filter=""){const list=tutorials.filter(t=>(t.title+" "+t.desc+" "+t.tag+" "+t.level).toLowerCase().includes(filter.toLowerCase()));const grid=$("tutorialGrid");if(!grid)return;grid.innerHTML=list.map(t=>`<article class="card"><div class="card-top"><div class="iconbox">${t.icon}</div><span class="tag">${esc(t.tag)} · ${esc(t.level)}</span></div><h3>${esc(t.title)}</h3><p>${esc(t.desc)}</p><p class="small">කාලය: ${esc(t.time)}</p><div class="card-actions"><a class="btn primary" href="${t.url}" target="_blank" rel="noopener">Tutorial බලන්න ↗</a><button class="btn saveBtn" data-save="${t.id}">${savedIds.has(t.id)||localSaved.has(t.id)?"✓ Saved":"☆ Save"}</button></div></article>`).join("")||'<p class="empty">Tutorials හමු වුණේ නැහැ.</p>';grid.querySelectorAll("[data-save]").forEach(b=>b.addEventListener("click",()=>toggleSave(b.dataset.save)))}
function renderShops(filter=""){const grid=$("shopGrid");if(!grid)return;const list=shops.filter(s=>(s.name+" "+s.area+" "+s.desc).toLowerCase().includes(filter.toLowerCase()));grid.innerHTML=list.map(s=>`<article class="card"><div class="card-top"><div class="iconbox">🛒</div><span class="tag">${esc(s.area)}</span></div><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p><div class="card-actions"><a class="btn" href="${s.url}" target="_blank" rel="noopener">Visit / Search ↗</a></div></article>`).join("")}
function renderVideos(){const grid=$("videoGrid");if(!grid)return;const url=window.TECHLANKA_CONFIG?.youtubeChannelUrl||"";const good=url.startsWith("https://www.youtube.com/")&&!url.includes("YOUR_CHANNEL");grid.innerHTML=good?`<article class="card video-card"><div class="video-art">▶</div><div class="video-body"><h3>My YouTube Channel</h3><p>Latest tutorials සහ hardware videos බලන්න.</p><a class="btn primary" href="${esc(url)}" target="_blank" rel="noopener">Open Channel ↗</a></div></article>`:`<article class="card video-card"><div class="video-art">▶</div><div class="video-body"><h3>ඔයාගේ Channel එක මෙතන</h3><p>config.js file එකේ youtubeChannelUrl එකට channel URL එක දාන්න.</p><span class="tag">Channel link needed</span></div></article>`}
function renderSaved(){const grid=$("savedGrid");if(!grid)return;const items=tutorials.filter(t=>savedIds.has(t.id)||localSaved.has(t.id));grid.innerHTML=items.map(t=>`<article class="card"><div class="card-top"><div class="iconbox">${t.icon}</div><span class="saved-label">SAVED</span></div><h3>${esc(t.title)}</h3><p>${esc(t.desc)}</p><div class="card-actions"><a class="btn primary" href="${t.url}" target="_blank" rel="noopener">Open ↗</a><button class="btn" data-remove="${t.id}">Remove</button></div></article>`).join("");const empty=$("savedEmpty");if(empty)empty.style.display=items.length?"none":"block";grid.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>removeSave(b.dataset.remove)))}
async function toggleSave(id){if(!currentUser){if(localSaved.has(id))localSaved.delete(id);else localSaved.add(id);renderTutorials($("tutorialSearch")?.value||"");renderSaved();toast("Browser එකේ save කළා. වෙනත් device sync සඳහා Discord login setup කරන්න.");return}if(savedIds.has(id)){toast("Already saved.");return}const {error}=await supabase.from("saved_tutorials").insert({user_id:currentUser.id,tutorial_id:id});if(error){toast("Save failed: "+error.message);return}savedIds.add(id);renderTutorials($("tutorialSearch")?.value||"");renderSaved();toast("Tutorial account එකට save කළා.")}
async function removeSave(id){if(currentUser&&savedIds.has(id)){const {error}=await supabase.from("saved_tutorials").delete().eq("tutorial_id",id);if(error){toast("Remove failed: "+error.message);return}savedIds.delete(id)}localSaved.delete(id);renderTutorials($("tutorialSearch")?.value||"");renderSaved();toast("Saved list එක update කළා.")}
async function loadSaves(){if(!supabase||!currentUser)return;const {data,error}=await supabase.from("saved_tutorials").select("tutorial_id");if(error){toast("Saved list load failed. SQL/RLS setup පරීක්ෂා කරන්න.");return}savedIds=new Set((data||[]).map(r=>r.tutorial_id));renderTutorials($("tutorialSearch")?.value||"");renderSaved()}
function updateAuthUI(){const logged=!!currentUser;const welcome=$("welcome"),hint=$("loginHint"),status=$("authStatus"),b1=$("loginBtn"),b2=$("loginBtn2"),b3=$("logoutBtn"),hero=$("heroAuth");if(welcome)welcome.textContent=logged?`Welcome, ${currentUser.user_metadata?.full_name||currentUser.user_metadata?.name||currentUser.email||"PC Builder"}!`:"Discord account එකෙන් login වෙන්න";if(hint)hint.textContent=logged?"ඔයාගේ saved tutorials account එකට සම්බන්ධයි.":"Login වුණාම tutorials account එකට save කරගන්න පුළුවන්.";if(status){status.textContent=logged?"Discord / Supabase connected":(supabase?"Not logged in":"Setup required");status.className="status"+(logged?" ok":"")}if(b1)b1.hidden=logged;if(b2)b2.hidden=logged;if(b3)b3.hidden=!logged;if(hero){hero.textContent=logged?"● Connected":"○ Login needed";hero.style.color=logged?"var(--cyan)":"var(--muted)"}}
async function login(){
  try {
    if(!supabase){toast("Discord Login setup incomplete: config.js හි Supabase URL සහ anon/public key පරීක්ෂා කරන්න.");return}
    toast("Discord login වෙත යොමු කරනවා...");
    const {error}=await supabase.auth.signInWithOAuth({provider:"discord",options:{redirectTo:window.location.origin+window.location.pathname}});
    if(error)toast("Login error: "+error.message);
  } catch(err) {
    console.error("TechLanka Hub Discord login failed:",err);
    toast("Login ආරම්භ කරන්න බැරි වුණා. Browser Console එකේ error පරීක්ෂා කරන්න.");
  }
}
async function logout(){if(!supabase)return;await supabase.auth.signOut();currentUser=null;savedIds.clear();updateAuthUI();renderTutorials($("tutorialSearch")?.value||"");renderSaved();toast("Logged out.")}
function init(){
  const year=$("year");if(year)year.textContent=new Date().getFullYear();
  renderTutorials();renderShops();renderVideos();renderSaved();
  $("tutorialSearch")?.addEventListener("input",e=>renderTutorials(e.target.value));
  $("shopSearch")?.addEventListener("input",e=>renderShops(e.target.value));
  $("loginBtn")?.addEventListener("click",e=>{e.preventDefault();login()});
  $("loginBtn2")?.addEventListener("click",e=>{e.preventDefault();login()});
  $("logoutBtn")?.addEventListener("click",e=>{e.preventDefault();logout()});
  // Fallback for login buttons whose HTML IDs differ from the expected IDs.
  document.addEventListener("click",e=>{
    const button=e.target.closest("button, a, [role=button]");
    if(!button)return;
    const id=(button.id||"").toLowerCase();
    const label=(button.innerText||button.getAttribute("aria-label")||"").trim().toLowerCase();
    if((id.includes("login")||id.includes("discord")) && (label.includes("discord")||label.includes("login")||!label)){
      if(id!=="loginbtn"&&id!=="loginbtn2"){e.preventDefault();login()}
    }
  });
  const c=window.TECHLANKA_CONFIG||{};
  if(window.supabase&&c.supabaseUrl?.startsWith("https://")&&!c.supabaseUrl.includes("YOUR-PROJECT")&&c.supabaseAnonKey&&!c.supabaseAnonKey.includes("YOUR_SUPABASE")){
    try {
      supabase=window.supabase.createClient(c.supabaseUrl,c.supabaseAnonKey);
      supabase.auth.getSession().then(async({data,error})=>{if(error)console.error(error);currentUser=data?.session?.user||null;updateAuthUI();await loadSaves()}).catch(err=>{console.error(err);toast("Supabase session load failed. config.js පරීක්ෂා කරන්න.")});
      supabase.auth.onAuthStateChange(async(_event,session)=>{currentUser=session?.user||null;updateAuthUI();await loadSaves()});
    } catch(err) {console.error("Supabase initialization failed:",err);toast("Supabase setup error. config.js සහ Supabase script එක පරීක්ෂා කරන්න.");updateAuthUI()}
  } else {updateAuthUI();console.warn("TechLanka Hub: Supabase config/library missing. Check config.js and the Supabase CDN script.")}
  setTimeout(()=>{$("loader")?.classList.add("hide")},900);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
