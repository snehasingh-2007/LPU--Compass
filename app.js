const app = document.getElementById("app");
const toast = document.getElementById("toast");

const state = {
  loggedIn: false,
  page: "home",
  user: {
    name: "Sneha",
    branch: "B.Tech CSE",
    year: "1st Year",
    level: "Beginner",
    goal: "Build projects",
    skills: ["Python", "HTML", "CSS"],
    interests: ["Artificial Intelligence", "Web Development", "Hackathons"],
    freeMinutes: 135,
preferredLocation: "Block 32"
  }
};

const opportunities = [
  {id:1,title:"AI for Beginners Workshop",type:"Workshop",icon:"🤖",location:"Block 32",time:"5:00 PM",duration:"90 min",match:94,skills:["Python"],interest:"Artificial Intelligence",level:"Beginner",goal:"Build projects",reason:["Python matches the required skill","AI is one of your interests","Beginner-friendly","Fits your available time"],gap:[]},
  {id:2,title:"AI / ML Club Meetup",type:"Club",icon:"👥",location:"Block 14",time:"6:00 PM",duration:"60 min",match:89,skills:["Python"],interest:"Artificial Intelligence",level:"Beginner",goal:"Build projects",reason:["Matches your AI interest","Suitable for beginners","Good for project networking"],gap:["Machine Learning basics"]},
  {id:3,title:"Campus Web Hackathon",type:"Hackathon",icon:"🏆",location:"Uni Auditorium",time:"7:00 PM",duration:"3 hrs",match:84,skills:["HTML","CSS","JavaScript"],interest:"Web Development",level:"Beginner",goal:"Build projects",reason:["HTML and CSS match your current skills","Web development is your interest","JavaScript would increase your readiness"],gap:["JavaScript"]},
  {id:4,title:"Frontend Development Internship",type:"Internship",icon:"💼",location:"Placement Cell",time:"Tomorrow • 10:00 AM",duration:"Application",match:72,skills:["HTML","CSS","JavaScript","React"],interest:"Web Development",level:"Intermediate",goal:"Career",reason:["You already have HTML + CSS","Web development aligns with your interest","Two skills are still needed"],gap:["JavaScript","React"]},
  {id:5,title:"Innovation & Startup Sprint",type:"Competition",icon:"💡",location:"Block 38",time:"Tomorrow • 2:00 PM",duration:"2 hrs",match:78,skills:["Communication"],interest:"Hackathons",level:"Beginner",goal:"Build projects",reason:["Good for hands-on experience","Matches your interest in competitions","Beginner-friendly"],gap:["Pitching"]},
  {id:6,title:"Quiet Study Zone",type:"Campus Space",icon:"📚",location:"Central Library",time:"Open now",duration:"Until 10 PM",match:82,skills:[],interest:"Study",level:"All",goal:"Learn",reason:["Available during your free time","Quiet environment","Close to major academic blocks"],gap:[]}
];

const locations = [
  ["Block 32","Academic Block • 1.2 km","b1"],["Block 14","Clubs & activities","b2"],["Uni Auditorium","Events & competitions","b3"],["Central Library","Study spaces","b4"],["Block 38","Labs & classrooms","b5"],["Placement Cell","Career services","b6"]
];

function render(){
  if(!state.loggedIn){renderLogin();return;}
  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand"><div class="brand-mark">C</div><div>LPU COMPASS<small>Navigate • Discover • Grow</small></div></div>
        <div class="user-mini"><span>${state.user.name}</span><div class="avatar">${state.user.name[0]}</div></div>
      </header>
      <div class="app-layout">
        <aside class="sidebar">${sidebar()}</aside>
        <main class="main">${pageContent()}</main>
      </div>
      <nav class="mobile-nav">${mobileNav()}</nav>
    </div>`;
}
function sidebar(){
  return `<div class="nav-section">Compass</div>
    ${navButton("home","⌂","Home")}
    ${navButton("discover","✦","Discover")}
    ${navButton("map","⌖","Campus Map")}
    <div class="nav-section">My journey</div>
    ${navButton("profile","◎","My Profile")}
    ${navButton("growth","↗","Growth Path")}
    <div style="margin-top:30px" class="card">
      <div style="font-size:22px">🧭</div><b style="display:block;margin-top:10px">Your Compass</b>
      <p style="font-size:11px;color:var(--muted);line-height:1.5;margin-top:6px">Turn LPU's possibilities into your next best action.</p>
    </div>`;
}
function navButton(page,icon,label){return `<button class="nav-btn ${state.page===page?"active":""}" onclick="go('${page}')"><span>${icon}</span>${label}</button>`}
function mobileNav(){return [["home","⌂","Home"],["discover","✦","Discover"],["map","⌖","Map"],["profile","◎","Profile"]].map(x=>`<button class="${state.page===x[0]?"active":""}" onclick="go('${x[0]}')"><span>${x[1]}</span>${x[2]}</button>`).join("")}

function renderLogin(){
 app.innerHTML=`<div class="login-page">
   <section class="login-visual">
     <div class="brand"><div class="brand-mark">C</div><div>LPU COMPASS<small>Navigate • Discover • Grow</small></div></div>
     <div class="hero-copy">
       <div style="font-size:13px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;opacity:.7;margin-bottom:12px">Your intelligent campus companion</div>
       <h1>Don't search<br>the campus.<br><span>Let it find you.</span></h1>
       <p>Discover the right event, club, workshop, project or opportunity based on your skills, interests, goals, time and location.</p>
       <div class="hero-pills"><span class="hero-pill">🎯 Smart Matching</span><span class="hero-pill">🧭 Campus Navigation</span><span class="hero-pill">📈 Skill Growth</span></div>
     </div>
   </section>
   <section class="login-panel">
     <div class="login-card">
       <div style="font-size:12px;color:var(--primary);font-weight:900;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px">Student access</div>
       <h2>Welcome to Compass</h2><p class="sub">Sign in to discover what's next for you at LPU.</p>
       <div class="field"><label>LPU Email</label><input id="email" type="email" placeholder="yourname@lpu.in" value="sneha@lpu.in"></div>
       <div class="field"><label>Password</label><input id="password" type="password" placeholder="••••••••" value="12345678"></div>
       <button class="primary-btn" onclick="login()">Sign in to LPU COMPASS →</button>
       <div class="demo-note"><b>Hackathon demo mode:</b> This prototype uses sample student/opportunity data. Production deployment would connect to authorized LPU systems.</div>
     </div>
   </section>
 </div>`;
}

function pageContent(){
 if(state.page==="home") return homePage();
 if(state.page==="discover") return discoverPage();
 if(state.page==="map") return mapPage();
 if(state.page==="profile") return profilePage();
 if(state.page==="growth") return growthPage();
 return homePage();
}
function homePage(){
 const recs=getRecommendations().slice(0,3);
 return `<div class="page-title"><div><h1>Good evening, ${state.user.name} 👋</h1><p>Your campus has possibilities. Let's find the ones that matter to you.</p></div><button class="small-btn primary" onclick="go('profile')">Personalize profile</button></div>
 <div class="grid grid-4">
   <div class="card stat"><div><div class="icon">🎯</div><h3>${recs[0]?.match||94}%</h3><p>Top opportunity match</p></div></div>
   <div class="card stat"><div><div class="icon">🕒</div><h3>2h 15m</h3><p>Free time today</p></div></div>
   <div class="card stat"><div><div class="icon">📍</div><h3>6</h3><p>Campus destinations</p></div></div>
   <div class="card stat"><div><div class="icon">📈</div><h3>72%</h3><p>Growth readiness</p></div></div>
 </div>
 <div class="section-head"><h2>What should I do next?</h2><button class="link-btn" onclick="go('discover')">View all →</button></div>
 <div class="grid grid-3">${recs.map(opCard).join("")}</div>
 <div class="grid grid-2" style="margin-top:18px">
   <div class="card free-card"><p style="font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1px">Your free time</p><div class="time">2h 15m</div><p>Tell Compass what you want to achieve and we'll find the best use of your time.</p><div class="free-options"><span class="free-option" onclick="showToast('Showing learning opportunities')">📚 Learn</span><span class="free-option" onclick="showToast('Showing project opportunities')">💻 Build</span><span class="free-option" onclick="showToast('Showing events near you')">🎉 Explore</span></div></div>
   <div class="card"><div class="section-head" style="margin:0 0 12px"><h2>Quick actions</h2></div>
     <div class="grid grid-2"><button class="card" style="padding:15px;text-align:left" onclick="go('map')">🧭 <b>Find a place</b><p style="font-size:11px;color:var(--muted);margin-top:4px">Navigate campus</p></button>
     <button class="card" style="padding:15px;text-align:left" onclick="go('discover')">🎯 <b>Find my match</b><p style="font-size:11px;color:var(--muted);margin-top:4px">Personalized opportunities</p></button>
     <button class="card" style="padding:15px;text-align:left" onclick="go('growth')">📈 <b>Close a skill gap</b><p style="font-size:11px;color:var(--muted);margin-top:4px">See your next step</p></button>
     <button class="card" style="padding:15px;text-align:left" onclick="showToast('Saved opportunities will appear here')">🔖 <b>Saved</b><p style="font-size:11px;color:var(--muted);margin-top:4px">Your shortlist</p></button></div>
   </div>
 </div>`;
}
function opCard(op){
 return `<div class="card op-card">
   <span class="match">${op.match}% match</span>
   <div class="op-top"><div class="op-icon">${op.icon}</div><div><h3>${op.title}</h3><div class="meta">${op.type} • ${op.location}</div></div></div>
   <div class="match-bar"><div class="match-fill" style="width:${op.match}%"></div></div>
   <div class="meta">🕐 ${op.time} &nbsp; • &nbsp; ${op.duration}</div>
   <div class="tags">${op.skills.slice(0,3).map(s=>`<span class="tag">${s}</span>`).join("")}<span class="tag">${op.interest}</span></div>
   <div class="op-actions"><button class="small-btn primary" onclick="openOpportunity(${op.id})">See why →</button><button class="small-btn outline" onclick="go('map');showToast('Route opened on Campus Map')">🧭 Route</button></div>
 </div>`;
}
function discoverPage(){
 const recs=getRecommendations();
 return `<div class="page-title"><div><h1>Discover</h1><p>Opportunities ranked around your profile — not just a generic list.</p></div><button class="small-btn primary" onclick="go('profile')">Edit preferences</button></div>
 <div class="card" style="margin-bottom:18px;background:linear-gradient(135deg,#eef5ff,#fff)">
   <b>🎯 Your matching profile</b><span style="color:var(--muted);font-size:12px;margin-left:8px">${state.user.skills.join(" • ")} · ${state.user.interests.join(" • ")}</span>
 </div>
 <div class="grid grid-3">${recs.map(opCard).join("")}</div>`;
}
function mapPage(){
    const places = [
        {name:"Block 32", type:"Facilities", icon:"🏢", left:"25%", top:"30%"},
        {name:"Block 14", type:"Facilities", icon:"🏢", left:"70%", top:"30%"},
        {name:"Uni Auditorium", type:"Events", icon:"🎯", left:"72%", top:"70%"},
        {name:"Central Library", type:"Study", icon:"📚", left:"35%", top:"72%"},
        {name:"Food Court", type:"Food", icon:"🍔", left:"55%", top:"52%"},
        {name:"Campus Café", type:"Food", icon:"☕", left:"42%", top:"40%"},
        {name:"Campus Store", type:"Shopping", icon:"🛍️", left:"82%", top:"38%"},
        {name:"Stationery Shop", type:"Shopping", icon:"✏️", left:"18%", top:"58%"},
        {name:"Main Shuttle Stop", type:"Transport", icon:"🚌", left:"50%", top:"15%"},
        {name:"Bus Stop - Gate", type:"Transport", icon:"🚌", left:"88%", top:"72%"},
        {name:"AI Workshop", type:"Events", icon:"🤖", left:"62%", top:"58%"}
    ];

    return `
    <div class="page-title">
        <div>
            <h1>Smart Campus Explorer</h1>
            <p>Find places, facilities and opportunities around you.</p>
        </div>
    </div>

    <div class="card" style="margin-bottom:18px">
        <div style="display:flex;gap:8px;flex-wrap:wrap">

            <button class="map-filter active" onclick="filterMap('All',this)">
                🌐 All
            </button>

            <button class="map-filter" onclick="filterMap('Food',this)">
                🍔 Food
            </button>

            <button class="map-filter" onclick="filterMap('Transport',this)">
                🚌 Transport
            </button>

            <button class="map-filter" onclick="filterMap('Study',this)">
                📚 Study
            </button>

            <button class="map-filter" onclick="filterMap('Shopping',this)">
                🛍️ Shopping
            </button>

            <button class="map-filter" onclick="filterMap('Facilities',this)">
                🏢 Facilities
            </button>

            <button class="map-filter" onclick="filterMap('Events',this)">
                🎯 Events
            </button>

        </div>
    </div>

    <div class="card" style="padding:0;overflow:hidden">

        <div id="campusMap"
             style="
                height:520px;
                position:relative;
                overflow:hidden;
                background:
                linear-gradient(90deg,rgba(23,105,255,.04) 1px,transparent 1px),
                linear-gradient(rgba(23,105,255,.04) 1px,transparent 1px);
                background-size:40px 40px;
                border-radius:18px;
             ">

            <div style="
                position:absolute;
                left:8%;
                right:8%;
                top:48%;
                height:55px;
                background:#e8eef8;
                border-radius:30px;
                transform:rotate(-8deg);
            "></div>

            <div style="
                position:absolute;
                left:20%;
                top:10%;
                width:55%;
                height:75%;
                border:3px dashed #d5deed;
                border-radius:30px;
            "></div>

            ${places.map((place,index) => `
                <button
                    class="map-place"
                    data-type="${place.type}"
                    onclick="selectMapPlace('${place.name}')"
                    style="
                        position:absolute;
                        left:${place.left};
                        top:${place.top};
                        transform:translate(-50%,-50%);
                        border:none;
                        background:white;
                        padding:8px 12px;
                        border-radius:14px;
                        box-shadow:0 8px 20px rgba(0,0,0,.12);
                        cursor:pointer;
                        z-index:5;
                        font-weight:700;
                        font-size:12px;
                    "
                >
                    <span style="font-size:20px">${place.icon}</span><br>
                    ${place.name}
                </button>
            `).join("")}

            <div id="youAreHere"
                 style="
                    position:absolute;
                    left:48%;
                    top:42%;
                    transform:translate(-50%,-50%);
                    z-index:10;
                    text-align:center;
                    pointer-events:none;
                 ">
                <div style="
                    width:18px;
                    height:18px;
                    background:#1769ff;
                    border:4px solid white;
                    border-radius:50%;
                    margin:auto;
                    box-shadow:0 0 0 8px rgba(23,105,255,.15);
                 "></div>
                <div style="
                    margin-top:5px;
                    background:#1769ff;
                    color:white;
                    padding:5px 9px;
                    border-radius:8px;
                    font-size:10px;
                    font-weight:800;
                 ">
                    YOU ARE HERE
                </div>
            </div>

        </div>

        <div id="mapInfo"
             style="
                padding:18px;
                border-top:1px solid #edf1f7;
                background:white;
             ">
            <b>📍 Explore your campus</b>
            <p style="color:var(--muted);margin-top:5px">
                Select a place on the map to see details and navigate.
            </p>
        </div>

    </div>
    `;
}
function locationItem(l){return `<button class="location-item" onclick="routeTo('${l[0]}')"><b>📍 ${l[0]}</b><span>${l[1]}</span></button>`}
function filterLocations(q){const list=document.getElementById("locationList");if(!list)return;list.innerHTML=locations.filter(l=>l[0].toLowerCase().includes(q.toLowerCase())||l[1].toLowerCase().includes(q.toLowerCase())).map(locationItem).join("")||`<p style="font-size:12px;color:var(--muted);padding:10px">No destination found.</p>`}
function routeTo(name){
    const destinations = {
        "Block 32": {left:25, top:30},
        "Block 14": {left:70, top:30},
        "Uni Auditorium": {left:72, top:70},
        "Central Library": {left:35, top:72},
        "Food Court": {left:55, top:52},
        "Campus Café": {left:42, top:40},
        "Campus Store": {left:82, top:38},
        "Stationery Shop": {left:18, top:58},
        "Main Shuttle Stop": {left:50, top:15},
        "Bus Stop - Gate": {left:88, top:72},
        "AI Workshop": {left:62, top:58}
    };

    const destination = destinations[name];
    const marker = document.getElementById("youAreHere");
    const map = document.getElementById("campusMap");

    if(!destination || !marker || !map) return;

    const startLeft = 48;
    const startTop = 42;

    marker.style.transition = "left 1.2s ease, top 1.2s ease";
    marker.style.left = destination.left + "%";
    marker.style.top = destination.top + "%";

    let line = document.getElementById("routeLine");

    if(!line){
        line = document.createElement("div");
        line.id = "routeLine";
        map.appendChild(line);
    }

    const mapWidth = map.offsetWidth;
    const mapHeight = map.offsetHeight;

    const x1 = startLeft / 100 * mapWidth;
    const y1 = startTop / 100 * mapHeight;
    const x2 = destination.left / 100 * mapWidth;
    const y2 = destination.top / 100 * mapHeight;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
    line.style.width = distance + "px";
    line.style.transform = `rotate(${angle}deg)`;
    line.style.display = "block";

    showToast(`🧭 Route to ${name} • 8 min walk`);
}
function profilePage(){
    const skillOptions = [
        "Python",
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Java",
        "C++"
    ];

    const interestOptions = [
        "Artificial Intelligence",
        "Web Development",
        "Hackathons",
        "Cybersecurity",
        "Data Science",
        "Startups"
    ];

    return `
    <div class="page-title">
        <div>
            <h1>My Compass Profile</h1>
            <p>Your profile powers the personalized matching engine.</p>
        </div>

        <button class="small-btn primary" onclick="saveProfile()">
            Save changes
        </button>
    </div>

    <div class="grid grid-2">

        <div class="card">
            <div class="profile-head">
                <div class="big-avatar">${state.user.name[0]}</div>

                <div>
                    <h2>${state.user.name}</h2>
                    <p>${state.user.branch} • ${state.user.year}</p>
                </div>
            </div>

            <div class="field">
                <label>Academic level</label>

                <select onchange="state.user.level=this.value">
                    <option ${state.user.level==="Beginner"?"selected":""}>
                        Beginner
                    </option>

                    <option ${state.user.level==="Intermediate"?"selected":""}>
                        Intermediate
                    </option>

                    <option ${state.user.level==="Advanced"?"selected":""}>
                        Advanced
                    </option>
                </select>
            </div>

            <div class="field">
                <label>Primary goal</label>

                <select onchange="state.user.goal=this.value">
                    <option ${state.user.goal==="Build projects"?"selected":""}>
                        Build projects
                    </option>

                    <option ${state.user.goal==="Career"?"selected":""}>
                        Career
                    </option>

                    <option ${state.user.goal==="Learn"?"selected":""}>
                        Learn
                    </option>

                    <option ${state.user.goal==="Networking"?"selected":""}>
                        Networking
                    </option>
                </select>
            </div>
        </div>


        <div class="card">

            <h2>Skills</h2>
            <p style="font-size:12px;color:var(--muted)">
                What can you already do?
            </p>

            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px">
                ${skillOptions.map(skill => `
                    <button
                        class="skill-chip"
                        style="border:none;cursor:pointer"
                        onclick="toggleSkill('${skill}')">
                        ${state.user.skills.includes(skill) ? "✓ " : ""}
                        ${skill}
                    </button>
                `).join("")}
            </div>


            <h2 style="margin-top:28px">Interests</h2>

            <p style="font-size:12px;color:var(--muted)">
                What would you like to explore?
            </p>

            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px">
                ${interestOptions.map(interest => `
                    <button
                        class="skill-chip"
                        style="border:none;cursor:pointer"
                        onclick="toggleInterest('${interest}')">
                        ${state.user.interests.includes(interest) ? "✓ " : ""}
                        ${interest}
                    </button>
                `).join("")}
            </div>

        </div>
    </div>

    <div class="card" style="margin-top:18px">
        <h2>🧠 How COMPASS uses your profile</h2>

        <p style="color:var(--muted);line-height:1.6;margin-top:8px">
            Your skills, interests, goals and experience are combined to
            calculate how relevant each campus opportunity is for you.
        </p>

        <div style="
            display:flex;
            flex-wrap:wrap;
            gap:10px;
            margin-top:16px;
        ">
            <span class="skill-chip">Skills • 30%</span>
            <span class="skill-chip">Interests • 25%</span>
            <span class="skill-chip">Goal • 15%</span>
            <span class="skill-chip">Experience • 10%</span>
            <span class="skill-chip">Availability • 10%</span>
            <span class="skill-chip">Context • 10%</span>
        </div>
    </div>
    `;
}
function toggleSkill(skill){
    if(state.user.skills.includes(skill)){
        state.user.skills = state.user.skills.filter(s => s !== skill);
    }else{
        state.user.skills.push(skill);
    }

    render();
}


function toggleInterest(interest){
    if(state.user.interests.includes(interest)){
        state.user.interests =
            state.user.interests.filter(i => i !== interest);
    }else{
        state.user.interests.push(interest);
    }

    render();
}


function saveProfile(){
    render();

    showToast("Profile updated • COMPASS recalculated your matches");
}
function growthPage(){
    const currentSkills = state.user.skills || [];

    const pathways = [
        {
            skill:"JavaScript",
            icon:"💻",
            level:"Beginner → Intermediate",
            reason:"JavaScript is a useful next step for your web-development interests.",
            steps:[
                "Learn JavaScript fundamentals",
                "Build a small interactive webpage",
                "Join a campus web project or hackathon",
                "Apply for frontend opportunities"
            ]
        },
        {
            skill:"React",
            icon:"⚛️",
            level:"Beginner → Intermediate",
            reason:"React can strengthen your frontend development profile.",
            steps:[
                "Learn components and props",
                "Build a small React project",
                "Create a portfolio project",
                "Apply for frontend internships"
            ]
        },
        {
            skill:"Python",
            icon:"🐍",
            level:"Beginner → Intermediate",
            reason:"Python supports AI, data science and many campus technical opportunities.",
            steps:[
                "Strengthen Python fundamentals",
                "Build a mini project",
                "Explore AI/data libraries",
                "Join an AI project or competition"
            ]
        }
    ];

    const recommended = pathways.filter(p => !currentSkills.includes(p.skill));

    return `
    <div class="page-title">
        <div>
            <h1>Skill Gap & Growth Path</h1>
            <p>Turn your opportunity gaps into your next learning steps.</p>
        </div>
    </div>

    <div class="card" style="margin-bottom:18px">
        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:20px;
            flex-wrap:wrap;
        ">
            <div>
                <div style="font-size:13px;color:var(--muted);font-weight:700">
                    YOUR CURRENT PROFILE
                </div>

                <h2 style="margin-top:6px">
                    ${currentSkills.length ? currentSkills.join(" • ") : "Start building your skills"}
                </h2>

                <p style="color:var(--muted);margin-top:6px">
                    COMPASS identifies useful skills that can unlock more opportunities.
                </p>
            </div>

            <div style="
                font-size:42px;
                font-weight:900;
                color:#1769ff;
            ">
                ${recommended.length}
                <div style="
                    font-size:11px;
                    color:var(--muted);
                    font-weight:700;
                    text-align:center;
                ">
                    NEXT SKILLS
                </div>
            </div>
        </div>
    </div>

    <h2 style="margin:20px 0 12px">🎯 Recommended Growth Paths</h2>

    <div class="grid grid-2">

        ${recommended.map(path => `
            <div class="card">

                <div style="
                    display:flex;
                    align-items:center;
                    gap:14px;
                ">
                    <div style="
                        width:52px;
                        height:52px;
                        border-radius:15px;
                        background:#eef4ff;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:26px;
                    ">
                        ${path.icon}
                    </div>

                    <div>
                        <h2>${path.skill}</h2>
                        <p style="color:#1769ff;font-size:12px;font-weight:800">
                            ${path.level}
                        </p>
                    </div>
                </div>

                <p style="
                    color:var(--muted);
                    line-height:1.5;
                    margin-top:16px;
                ">
                    ${path.reason}
                </p>

                <div style="margin-top:18px">

                    ${path.steps.map((step,index) => `
                        <div style="
                            display:flex;
                            gap:12px;
                            align-items:center;
                            margin-bottom:12px;
                        ">

                            <div style="
                                min-width:28px;
                                height:28px;
                                border-radius:50%;
                                background:#eef4ff;
                                color:#1769ff;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                font-size:11px;
                                font-weight:900;
                            ">
                                ${index + 1}
                            </div>

                            <span style="font-size:13px">
                                ${step}
                            </span>

                        </div>
                    `).join("")}

                </div>

                <button
                    class="primary-btn"
                    style="width:100%;margin-top:8px"
                    onclick="startGrowthPath('${path.skill}')"
                >
                    🚀 Start pathway
                </button>

            </div>
        `).join("")}

    </div>

    <div class="card" style="
        margin-top:18px;
        background:#f4f8ff;
    ">
        <h2>🧠 COMPASS Insight</h2>

        <p style="
            color:var(--muted);
            line-height:1.6;
            margin-top:8px;
        ">
            Not being ready for an opportunity doesn't have to mean
            missing it. COMPASS can identify the missing skill and give
            you a path from <b>Learn → Build → Participate → Apply.</b>
        </p>
    </div>
    `;
}


function startGrowthPath(skill){
    showToast(`🚀 ${skill} pathway started • Your next step is learning`);
}
function getRecommendations(){
    return opportunities.map(o => {

        let score = 0;

        // 30% — Skills
        const userSkills = state.user.skills.map(s => s.toLowerCase());

        const opportunitySkills = (o.skills || []).map(s => s.toLowerCase());

        const matchedSkills = opportunitySkills.filter(skill =>
            userSkills.includes(skill)
        );

        if (opportunitySkills.length === 0) {
            score += 30;
        } else {
            score += (matchedSkills.length / opportunitySkills.length) * 30;
        }


        // 25% — Interests
        const userInterests = state.user.interests.map(i => i.toLowerCase());

        const opportunityInterests = (o.interests || []).map(i =>
            i.toLowerCase()
        );

        const interestMatch = opportunityInterests.some(i =>
            userInterests.includes(i)
        );

        if (interestMatch) {
            score += 25;
        }


        // 15% — Career goal
        if (
            o.goal &&
            o.goal.toLowerCase() === state.user.goal.toLowerCase()
        ) {
            score += 15;
        }


        // 10% — Experience level
        if (
            o.level === "All" ||
            o.level === state.user.level
        ) {
            score += 10;
        }


        // 10% — Availability
        const durationText = o.duration || "";

        const durationMatch = durationText.match(/(\d+)\s*(min|hr|hrs)/i);

        let durationMinutes = 60;

        if (durationMatch) {
            const number = Number(durationMatch[1]);
            const unit = durationMatch[2].toLowerCase();

            durationMinutes = unit.startsWith("hr")
                ? number * 60
                : number;
        }

        const freeMinutes = state.user.freeMinutes || 135;

        if (durationMinutes <= freeMinutes) {
            score += 10;
        } else if (durationMinutes <= freeMinutes + 30) {
            score += 5;
        }


        // 10% — Campus context
        const preferredLocation =
            state.user.preferredLocation || "Block 32";

        if (
            o.location &&
            o.location.toLowerCase().includes(
                preferredLocation.toLowerCase()
            )
        ) {
            score += 10;
        } else {
            score += 5;
        }


        return {
            ...o,
            match: Math.min(99, Math.round(score))
        };

    }).sort((a, b) => b.match - a.match);
}
function login(){state.loggedIn=true;state.page="home";render();showToast("Welcome to LPU COMPASS 👋")}
function go(page){state.page=page;render();window.scrollTo({top:0,behavior:"smooth"})}
function openOpportunity(id){
    const o = opportunities.find(x => x.id === id);

    if(!o) return;

    const userSkills = state.user.skills.map(s => s.toLowerCase());

    const matchedSkills = (o.skills || []).filter(skill =>
        userSkills.includes(skill.toLowerCase())
    );

    const userInterests = state.user.interests.map(i =>
        i.toLowerCase()
    );

    const interestMatch = (o.interests || []).some(interest =>
        userInterests.includes(interest.toLowerCase())
    );

    const goalMatch =
        o.goal &&
        o.goal.toLowerCase() === state.user.goal.toLowerCase();

    const levelMatch =
        o.level === "All" ||
        o.level === state.user.level ||
        o.level?.toLowerCase() === state.user.level?.toLowerCase();

    const durationText = o.duration || "";

    const durationMatch =
        durationText.match(/(\d+)\s*(min|hr|hrs)/i);

    let durationMinutes = 60;

    if(durationMatch){
        const number = Number(durationMatch[1]);
        const unit = durationMatch[2].toLowerCase();

        durationMinutes =
            unit.startsWith("hr")
                ? number * 60
                : number;
    }

    const freeMinutes = state.user.freeMinutes || 135;

    const timeMatch = durationMinutes <= freeMinutes;

    const matchScore =
        getRecommendations().find(x => x.id === id)?.match || 0;

    const reasons = [];

    if(matchedSkills.length){
        reasons.push(
            `✓ Skill match — You know ${matchedSkills.join(", ")}`
        );
    }else{
        reasons.push(
            `⚪ Skill gap — Build ${o.skills?.join(", ") || "relevant skills"}`
        );
    }

    if(interestMatch){
        reasons.push(
            "✓ Interest match — This aligns with what you want to explore"
        );
    }else{
        reasons.push(
            "⚪ Interest — Explore something outside your usual interests"
        );
    }

    if(goalMatch){
        reasons.push(
            `✓ Goal match — Supports your goal: ${state.user.goal}`
        );
    }

    if(levelMatch){
        reasons.push(
            `✓ Experience fit — Suitable for your ${state.user.level.toLowerCase()} level`
        );
    }else{
        reasons.push(
            `⚪ Experience — This may require additional preparation`
        );
    }

    if(timeMatch){
        reasons.push(
            `✓ Time fit — ${o.duration || "Flexible"} fits your available time`
        );
    }else{
        reasons.push(
            `⚪ Time — This may take longer than your available ${Math.round(freeMinutes/60*10)/10} hours`
        );
    }

    document.body.insertAdjacentHTML(
        "beforeend",

        `<div class="modal-backdrop" id="modal"
            onclick="if(event.target===this)closeModal()">

            <div class="modal">

                <button
                    class="modal-close"
                    onclick="closeModal()">
                    ×
                </button>

                <div style="font-size:35px">
                    ${o.icon}
                </div>

                <h2>${o.title}</h2>

                <p class="sub">
                    ${o.type} • ${o.location}
                </p>

                <div style="
                    margin:20px 0;
                    padding:18px;
                    border-radius:16px;
                    background:#eef4ff;
                    text-align:center;
                ">

                    <div style="
                        font-size:42px;
                        font-weight:900;
                        color:#1769ff;
                    ">
                        ${matchScore}%
                    </div>

                    <div style="
                        color:var(--muted);
                        font-size:13px;
                        font-weight:700;
                    ">
                        COMPASS MATCH SCORE
                    </div>

                </div>

                <h3 style="font-size:18px">
                    🎯 Why this matches you
                </h3>

                <div class="reason-grid">
                    ${reasons.map(reason => `
                        <div class="reason">
                            ${reason}
                        </div>
                    `).join("")}
                </div>

                <div style="
                    margin-top:20px;
                    padding:16px;
                    background:#f4f8ff;
                    border-radius:14px;
                ">

                    <b>💡 COMPASS insight</b>

                    <p style="
                        margin-top:7px;
                        color:var(--muted);
                        line-height:1.5;
                    ">
                        ${matchedSkills.length
                            ? "This opportunity builds on skills you already have."
                            : "This opportunity can help you discover and build a new skill."
                        }
                    </p>

                </div>

                <div style="
                    display:flex;
                    gap:10px;
                    margin-top:20px;
                ">

                    <button
                        class="primary-btn"
                        style="flex:1"
                        onclick="routeTo('${o.location}')">
                        🧭 Take me there
                    </button>

                    <button
                        class="small-btn"
                        onclick="closeModal()">
                        Close
                    </button>

                </div>

            </div>
        </div>`
    );
}
function addSkill(){
  const skill = prompt("Enter a skill you know or want to add:");

  if(!skill || !skill.trim()){
    return;
  }

  const cleanSkill = skill.trim();

  if(state.user.skills.includes(cleanSkill)){
    showToast("You already have this skill.");
    return;
  }

  state.user.skills.push(cleanSkill);

  showToast(`${cleanSkill} added to your profile`);

  render();
}
function openPathway(){

    const pathway = [
        {
            step: "01",
            title: "Learn",
            description: "Build the missing skill through courses, workshops and guided learning."
        },
        {
            step: "02",
            title: "Build",
            description: "Create a small project to demonstrate the skill."
        },
        {
            step: "03",
            title: "Participate",
            description: "Join a relevant campus club, competition or hackathon."
        },
        {
            step: "04",
            title: "Apply",
            description: "Use your new skills to apply for internships and opportunities."
        }
    ];

    document.body.insertAdjacentHTML("beforeend", `
        <div class="modal-backdrop" id="pathwayModal"
             onclick="if(event.target===this)closePathway()">

            <div class="modal">

                <button class="modal-close"
                        onclick="closePathway()">×</button>

                <div style="font-size:38px">🚀</div>

                <h2>Your COMPASS Growth Path</h2>

                <p class="sub">
                    Turn a skill gap into your next opportunity.
                </p>

                <div style="margin-top:22px">

                    ${pathway.map((item, index) => `
                        <div style="
                            display:flex;
                            gap:15px;
                            padding:16px 0;
                            border-bottom:${index === pathway.length-1 ? "none" : "1px solid #e8edf5"};
                        ">

                            <div style="
                                min-width:42px;
                                height:42px;
                                border-radius:50%;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                background:#eef4ff;
                                color:#1769ff;
                                font-weight:800;
                            ">
                                ${item.step}
                            </div>

                            <div>
                                <h3 style="margin:0">
                                    ${item.title}
                                </h3>

                                <p style="
                                    margin:5px 0 0;
                                    color:var(--muted);
                                    line-height:1.5;
                                ">
                                    ${item.description}
                                </p>
                            </div>

                        </div>
                    `).join("")}

                </div>

                <button
                    class="primary-btn"
                    style="width:100%;margin-top:20px"
                    onclick="closePathway()">
                    Start Learning 🚀
                </button>

            </div>
        </div>
    `);
}


function closePathway(){
    const modal = document.getElementById("pathwayModal");

    if(modal){
        modal.remove();
    }
}
function closeModal(){document.getElementById("modal")?.remove()}
function showToast(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(window.__t);window.__t=setTimeout(()=>toast.classList.remove("show"),2200)}
window.login=login;window.go=go;window.openOpportunity=openOpportunity;window.closeModal=closeModal;window.showToast=showToast;window.filterLocations=filterLocations;window.routeTo=routeTo;
render();
function filterMap(type, button){
    document.querySelectorAll(".map-filter").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    document.querySelectorAll(".map-place").forEach(place => {
        if(type === "All" || place.dataset.type === type){
            place.style.display = "block";
        }else{
            place.style.display = "none";
        }
    });
}


function selectMapPlace(name){
    const placeData = {
        "Block 32": {
            icon:"🏢",
            type:"Facility",
            info:"Academic block and student activity area."
        },
        "Block 14": {
            icon:"🏢",
            type:"Facility",
            info:"Academic and student service area."
        },
        "Uni Auditorium": {
            icon:"🎯",
            type:"Event Venue",
            info:"Major events, competitions and campus activities."
        },
        "Central Library": {
            icon:"📚",
            type:"Study Space",
            info:"Quiet place for focused study and academic work."
        },
        "Food Court": {
            icon:"🍔",
            type:"Food Point",
            info:"Quick meals, snacks and refreshments."
        },
        "Campus Café": {
            icon:"☕",
            type:"Food Point",
            info:"A convenient place to grab a drink or snack."
        },
        "Campus Store": {
            icon:"🛍️",
            type:"Shopping",
            info:"Convenience items and everyday student needs."
        },
        "Stationery Shop": {
            icon:"✏️",
            type:"Shopping",
            info:"Stationery and academic supplies."
        },
        "Main Shuttle Stop": {
            icon:"🚌",
            type:"Transport",
            info:"Campus shuttle/transport pickup point."
        },
        "Bus Stop - Gate": {
            icon:"🚌",
            type:"Transport",
            info:"Transport point near the campus gate."
        },
        "AI Workshop": {
            icon:"🤖",
            type:"Opportunity",
            info:"Example campus opportunity recommended by COMPASS."
        }
    };

    const place = placeData[name];

    if(!place) return;

    const info = document.getElementById("mapInfo");

    if(info){
        info.innerHTML = `
            <div style="display:flex;justify-content:space-between;gap:15px;align-items:center;flex-wrap:wrap">

                <div>
                    <div style="font-size:24px">
                        ${place.icon} <b>${name}</b>
                    </div>

                    <div style="color:#1769ff;font-size:12px;font-weight:800;margin-top:5px">
                        ${place.type}
                    </div>

                    <p style="color:var(--muted);margin-top:7px">
                        ${place.info}
                    </p>
                </div>

                <button
                    class="primary-btn"
                    onclick="routeTo('${name}')"
                >
                    🧭 Navigate
                </button>

            </div>
        `;
    }
}