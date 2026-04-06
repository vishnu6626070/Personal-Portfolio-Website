const BASE_URL = "https://personal-portfolio-website-ttkw.onrender.com";


// ================= PROJECTS =================
async function loadProjects() {
    try {
        const response = await fetch(`${BASE_URL}/api/projects`);
        const projects = await response.json();

        const container = document.getElementById("projects");
        if (!container) return;

        container.innerHTML = "";

        projects.forEach(project => {
            const div = document.createElement("div");
            div.className = "project-card";

            div.innerHTML = `
                ${project.image ? `<img src="${project.image}" style="width:100%; border-radius:8px; margin-bottom:10px;">` : ""}
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.github}" target="_blank">View Project</a>
            `;

            container.appendChild(div);
        });

    } catch (err) {
        console.log("Error loading projects:", err);
    }
}
loadProjects();


// ================= SKILLS =================
async function loadSkills() {
    try {
        const response = await fetch(`${BASE_URL}/api/skills`);
        const skills = await response.json();

        const container = document.getElementById("skills");
        if (!container) return;

        container.innerHTML = "";

        skills.forEach(skill => {
            const div = document.createElement("div");
            div.className = "skill-card";

            div.innerHTML = `
                <h3>${skill.name}</h3>
                <div class="progress-bar">
                    <div class="progress" style="width:${skill.level}%"></div>
                </div>
            `;

            container.appendChild(div);
        });

    } catch (err) {
        console.log("Error loading skills:", err);
    }
}
loadSkills();


// ================= CONTACT =================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        await fetch(`${BASE_URL}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        alert("Message sent successfully!");
        contactForm.reset();
    });
}


// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch(`${BASE_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!data.token) {
            alert("Login failed");
            return;
        }

        localStorage.setItem("token", data.token);

        alert("Login successful!");
        window.location.href = "dashboard.html";
    });
}


// ================= ADD PROJECT =================
const projectForm = document.getElementById("projectForm");

if (projectForm) {
    projectForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const github = document.getElementById("github").value;
        const image = document.getElementById("image").value;

        const response = await fetch(`${BASE_URL}/api/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ title, description, github, image })
        });

        if (response.ok) {
            alert("Project added!");
            projectForm.reset();
        } else {
            alert("Error adding project");
        }
    });
}


// ================= ADD SKILL =================
const skillForm = document.getElementById("skillForm");

if (skillForm) {
    skillForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const name = document.getElementById("skillName").value;
        const level = document.getElementById("skillLevel").value;

        const response = await fetch(`${BASE_URL}/api/skills`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ name, level })
        });

        if (response.ok) {
            alert("Skill added!");
            skillForm.reset();
        } else {
            alert("Error adding skill");
        }
    });
}


// ================= LOAD MESSAGES (UPDATED UI) =================
async function loadMessages() {
    const container = document.getElementById("messages");
    if (!container) return;

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/contact`, {
            headers: { "Authorization": token }
        });

        const data = await response.json();

        container.innerHTML = "";

        data.forEach(msg => {
            const div = document.createElement("div");
            div.className = "message-card";

            div.innerHTML = `
                <h3>${msg.name}</h3>
                <span>${msg.email}</span>
                <p>${msg.message}</p>
            `;

            container.appendChild(div);
        });

    } catch (err) {
        console.log("Error loading messages:", err);
    }
}

loadMessages();