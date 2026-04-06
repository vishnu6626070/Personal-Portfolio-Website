const BASE_URL = "https://personal-portfolio-website-ttkw.onrender.com";

const token = localStorage.getItem("token");

// ================= PROFILE =================
async function loadProfile() {
    try {
        const res = await fetch(`${BASE_URL}/api/profile`);
        const data = await res.json();

        if (document.getElementById("profileName")) {
            document.getElementById("profileName").innerText =
                "Hello, I'm " + (data?.name || "Vishnu");
        }

        if (document.getElementById("profileBio")) {
            document.getElementById("profileBio").innerText =
                data?.bio || "B.Tech Student";
        }

    } catch (err) {
        console.log("Profile error:", err);
    }
}
loadProfile();

// ================= UPDATE PROFILE =================
async function updateProfile() {
    const name = document.getElementById("profileNameInput").value;
    const bio = document.getElementById("profileBioInput").value;

    await fetch(`${BASE_URL}/api/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ name, bio })
    });

    alert("Profile updated!");
}

// ================= PROJECTS =================
async function loadProjects() {
    try {
        const res = await fetch(`${BASE_URL}/api/projects`);
        const projects = await res.json();

        const container = document.getElementById("projects");
        if (!container) return;

        container.innerHTML = "";

        projects.forEach(p => {
            container.innerHTML += `
            <div class="project-card">
                ${p.image ? `<img src="${p.image}" class="project-img">` : ""}
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <a href="${p.github}" target="_blank">View Project</a>

                ${token ? `
                <div class="admin-btns">
                    <button onclick="editProject('${p._id}')">Edit</button>
                    <button onclick="deleteProject('${p._id}')">Delete</button>
                </div>` : ""}
            </div>`;
        });

    } catch (err) {
        console.log(err);
    }
}
loadProjects();

// ADD PROJECT
const projectForm = document.getElementById("projectForm");

if (projectForm) {
    projectForm.addEventListener("submit", async e => {
        e.preventDefault();

        await fetch(`${BASE_URL}/api/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                github: github.value,
                image: image.value
            })
        });

        alert("Project added!");
        projectForm.reset();
        loadProjects();
    });
}

// DELETE PROJECT
async function deleteProject(id) {
    await fetch(`${BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: token }
    });

    loadProjects();
}

// EDIT PROJECT
async function editProject(id) {
    const title = prompt("New title");
    const description = prompt("New description");

    await fetch(`${BASE_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ title, description })
    });

    loadProjects();
}

// ================= SKILLS =================
async function loadSkills() {
    try {
        const res = await fetch(`${BASE_URL}/api/skills`);
        const skills = await res.json();

        const container = document.getElementById("skills");
        if (!container) return;

        container.innerHTML = "";

        skills.forEach(s => {
            container.innerHTML += `
            <div class="skill-card">
                <h3>${s.name}</h3>
                <div class="progress-bar">
                    <div class="progress" style="width:${s.level}%"></div>
                </div>

                ${token ? `
                <div class="admin-btns">
                    <button onclick="editSkill('${s._id}')">Edit</button>
                    <button onclick="deleteSkill('${s._id}')">Delete</button>
                </div>` : ""}
            </div>`;
        });

    } catch (err) {
        console.log(err);
    }
}
loadSkills();

// ADD SKILL
const skillForm = document.getElementById("skillForm");

if (skillForm) {
    skillForm.addEventListener("submit", async e => {
        e.preventDefault();

        await fetch(`${BASE_URL}/api/skills`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                name: skillName.value,
                level: skillLevel.value
            })
        });

        alert("Skill added!");
        skillForm.reset();
        loadSkills();
    });
}

// DELETE SKILL
async function deleteSkill(id) {
    await fetch(`${BASE_URL}/api/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: token }
    });

    loadSkills();
}

// EDIT SKILL
async function editSkill(id) {
    const name = prompt("Skill name");
    const level = prompt("Skill level");

    await fetch(`${BASE_URL}/api/skills/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ name, level })
    });

    loadSkills();
}

// ================= CONTACT =================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async e => {
        e.preventDefault();

        await fetch(`${BASE_URL}/api/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                message: message.value
            })
        });

        alert("Message sent!");
        contactForm.reset();
    });
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async e => {
        e.preventDefault();

        const res = await fetch(`${BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        const data = await res.json();

        if (!data.token) return alert("Login failed");

        localStorage.setItem("token", data.token);
        alert("Login success");
        window.location.href = "dashboard.html";
    });
}

// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// ================= MESSAGES =================
async function loadMessages() {
    const container = document.getElementById("messages");
    if (!container) return;

    const res = await fetch(`${BASE_URL}/api/messages`, {
        headers: { Authorization: token }
    });

    const data = await res.json();

    container.innerHTML = "";

    data.forEach(m => {
        container.innerHTML += `
        <div class="message-card">
            <h3>${m.name}</h3>
            <span>${m.email}</span>
            <p>${m.message}</p>

            <button onclick="deleteMessage('${m._id}')">Delete</button>
        </div>`;
    });
}
loadMessages();

// DELETE MESSAGE
async function deleteMessage(id) {
    await fetch(`${BASE_URL}/api/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: token }
    });

    loadMessages();
}