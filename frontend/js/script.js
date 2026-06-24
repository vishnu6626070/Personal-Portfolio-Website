// BASE URL - Dynamic lookup for development vs production Render environment
const BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === ""
  ? "http://localhost:5000"
  : "https://personal-portfolio-website-ttkw.onrender.com";

// Active Nav Link highlight on current page
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop();
    document.querySelectorAll("nav ul li").forEach(li => {
        const link = li.querySelector("a");
        if (link && link.getAttribute("href") === currentPath) {
            document.querySelectorAll("nav ul li").forEach(l => l.classList.remove("active"));
            li.classList.add("active");
        }
    });
});

// Helper for Fetch Headers with Token
function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": token
    };
}

// Convert image file to base64 data url
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// ================= FUTURISTIC CANVAS BACKGROUND =================
function initStarfield() {
    const canvas = document.getElementById("starfield-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    window.addEventListener("resize", () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });
    
    const particles = [];
    const count = 50;
    
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 1,
            vx: Math.random() * 0.3 - 0.15,
            vy: Math.random() * 0.3 - 0.15,
            color: Math.random() > 0.5 ? "rgba(34, 211, 238, 0.2)" : "rgba(124, 58, 237, 0.2)"
        });
    }
    
    let mouse = { x: null, y: null, radius: 100 };
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    function draw() {
        ctx.clearRect(0, 0, w, h);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            
            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    p.x += (dx / dist) * force * 2;
                    p.y += (dy / dist) * force * 2;
                }
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        
        requestAnimationFrame(draw);
    }
    draw();
}

// ================= TYPEWRITER ROLE SWITCHER =================
function initRoleCarousel() {
    const el = document.getElementById("role-carousel");
    if (!el) return;
    
    const roles = [
        "Data Science Student",
        "Machine Learning Enthusiast",
        "Data Analyst",
        "Problem Solver"
    ];
    
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    
    function tick() {
        const fullWord = roles[wordIdx];
        
        if (isDeleting) {
            el.textContent = fullWord.substring(0, charIdx - 1);
            charIdx--;
        } else {
            el.textContent = fullWord.substring(0, charIdx + 1);
            charIdx++;
        }
        
        let typeSpeed = 80;
        if (isDeleting) typeSpeed = 40;
        
        if (!isDeleting && charIdx === fullWord.length) {
            typeSpeed = 2200; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % roles.length;
            typeSpeed = 400; // Pause before typing next
        }
        
        setTimeout(tick, typeSpeed);
    }
    tick();
}

// ================= SKILLS RADIAL RINGS ANIMATION =================
function animateRadialSkills(pythonLevel = 75, mlLevel = 70) {
    const pyFill = document.getElementById("radial-py-fill");
    const pyPct = document.getElementById("radial-py-pct");
    const mlFill = document.getElementById("radial-ml-fill");
    const mlPct = document.getElementById("radial-ml-pct");
    
    if (pyFill && pyPct) {
        // Circumference is approx 201 (2 * pi * r where r=32)
        const pyOffset = 201 - (201 * pythonLevel / 100);
        pyFill.style.strokeDashoffset = pyOffset;
        pyPct.textContent = pythonLevel + "%";
    }
    
    if (mlFill && mlPct) {
        const mlOffset = 201 - (201 * mlLevel / 100);
        mlFill.style.strokeDashoffset = mlOffset;
        mlPct.textContent = mlLevel + "%";
    }
}

// ================= ADVANCED SAAS ANIMATIONS (3D TILT & MOUSE GLOW) =================
function initAdvancedAnimations() {
    const cards = document.querySelectorAll(".bento-card, .coding-profile-card, .skill-category-card, .project-glass-card, .timeline-content, .cert-card, .login-glass-box, .stat-bento-card");
    
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
            
            // 3D Parallax Tilt Effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -12; // Max 12 deg tilt
            const rotateY = ((x - centerX) / centerX) * 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });

    // Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll(".bento-card, .skill-category-card, .project-glass-card, .timeline-item, .cert-card, .coding-profile-card");
    
    // Add default reveal style hidden
    revealElements.forEach(el => el.classList.add("reveal-hidden"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
            }
        });
    }, { threshold: 0.08 });

    revealElements.forEach(el => observer.observe(el));
}

// ================= STATS COUNT ANIMATION =================
function animateBentoStats(cgpa = "9.1", projects = 12, certs = 15, solved = 500) {
    animateCount(document.getElementById("stats-cgpa"), 0, parseFloat(cgpa), 1.5, true);
    animateCount(document.getElementById("stats-projects"), 0, projects, 1.5, false, "+");
    animateCount(document.getElementById("stats-certs"), 0, certs, 1.5, false, "+");
    animateCount(document.getElementById("stats-solved"), 0, solved, 1.5, false, "+");
}

function animateCount(element, start, end, duration, isFloat = false, suffix = "") {
    if (!element) return;
    let startTime = null;
    
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentVal = progress * (end - start) + start;
        
        element.textContent = isFloat 
            ? currentVal.toFixed(1) + suffix
            : Math.floor(currentVal) + suffix;
            
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = isFloat ? end.toFixed(1) + suffix : end + suffix;
        }
    }
    window.requestAnimationFrame(step);
}

// Name Typewriter Effect
function typeWriter(element, text, speed) {
    if (!element) return;
    element.textContent = "";
    let i = 0;
    const cursor = document.getElementById("typing-cursor");
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (cursor) {
            setTimeout(() => {
                cursor.style.display = "none";
            }, 3000);
        }
    }
    type();
}

// ================= GLOBAL / HOME SETTINGS =================
async function loadHomeSettings() {
    const nameEl = document.getElementById("profile-name");
    const titleEl = document.getElementById("profile-title");
    const bioEl = document.getElementById("profile-bio");
    const imageEl = document.getElementById("profile-image");
    const aboutEl = document.getElementById("profile-about");
    const resumeBtn = document.getElementById("resume-btn");
    const githubLink = document.getElementById("github-link");
    const linkedinLink = document.getElementById("linkedin-link");
    const emailLink = document.getElementById("email-link");
    const contactEmailTxt = document.getElementById("contact-email-txt");
    const contactGithub = document.getElementById("contact-github");
    const contactLinkedin = document.getElementById("contact-linkedin");

    try {
        const response = await fetch(`${BASE_URL}/api/settings`);
        if (!response.ok) return;
        const settings = await response.json();

        if (nameEl) {
            typeWriter(nameEl, settings.name || "A. VISHNUVARDHAN REDDY", 70);
        }
        if (titleEl) titleEl.textContent = settings.title;
        if (bioEl) bioEl.textContent = settings.bio;
        if (aboutEl) aboutEl.textContent = settings.about;
        
        // Bento dynamic text bindings
        const objEl = document.getElementById("profile-objective");
        if (objEl) objEl.textContent = settings.objective || "To leverage data-driven analytics and statistical models to deliver scalable business solutions...";
        
        const strengthsContainer = document.getElementById("strengths-tags-container");
        if (strengthsContainer && settings.strengths) {
            strengthsContainer.innerHTML = "";
            settings.strengths.split(",").forEach(tag => {
                const span = document.createElement("span");
                span.className = "strength-tag";
                span.textContent = tag.trim();
                strengthsContainer.appendChild(span);
            });
        }

        // Animate numbers inside stats grid
        animateBentoStats(
            settings.cgpa || "9.1",
            settings.projectsCount || 12,
            settings.certsCount || 15,
            settings.problemsSolved || 500
        );

        if (imageEl && settings.profileImage) {
            imageEl.src = settings.profileImage;
        }

        if (resumeBtn) {
            if (settings.resumeUrl) {
                resumeBtn.href = settings.resumeUrl;
                resumeBtn.style.display = "inline-flex";
            } else {
                resumeBtn.style.display = "none";
            }
        }

        if (githubLink) {
            githubLink.href = settings.githubUrl || "#";
            if (!settings.githubUrl) githubLink.style.display = "none";
        }
        if (linkedinLink) {
            linkedinLink.href = settings.linkedinUrl || "#";
            if (!settings.linkedinUrl) linkedinLink.style.display = "none";
        }
        if (emailLink) {
            emailLink.href = settings.emailUrl ? `mailto:${settings.emailUrl}` : "#";
            if (!settings.emailUrl) emailLink.style.display = "none";
        }

        // Contact Page binds
        if (contactEmailTxt) contactEmailTxt.textContent = settings.emailUrl || "not available";
        if (contactGithub) contactGithub.href = settings.githubUrl || "#";
        if (contactLinkedin) contactLinkedin.href = settings.linkedinUrl || "#";

        // Coding Profiles Console binds
        const leetcodeCard = document.getElementById("leetcode-link-card");
        const gfgCard = document.getElementById("gfg-link-card");
        const chefCard = document.getElementById("codechef-link-card");
        const hrCard = document.getElementById("hackerrank-link-card");

        if (leetcodeCard) leetcodeCard.href = settings.leetcodeUrl || "#";
        if (gfgCard) gfgCard.href = settings.geeksforgeeksUrl || "#";
        if (chefCard) chefCard.href = settings.codechefUrl || "#";
        if (hrCard) hrCard.href = settings.hackerrankUrl || "#";

        animateCount(document.getElementById("leetcode-solved-count"), 0, settings.leetcodeSolved || 0, 1.5, false);
        animateCount(document.getElementById("gfg-solved-count"), 0, settings.geeksforgeeksSolved || 0, 1.5, false);
        animateCount(document.getElementById("codechef-solved-count"), 0, settings.codechefSolved || 0, 1.5, false);
        animateCount(document.getElementById("hackerrank-solved-count"), 0, settings.hackerrankSolved || 0, 1.5, false);

    } catch (err) {
        console.log("Error loading settings:", err);
    }
}

// ================= PROJECTS LISTING & FILTERING =================
let cachedProjects = [];

async function loadProjects() {
    const container = document.getElementById("projects");
    if (!container) return;

    try {
        const response = await fetch(`${BASE_URL}/api/projects`);
        cachedProjects = await response.json();
        renderProjects("All");
        setupFilterListeners();
    } catch (err) {
        console.log("Error loading projects:", err);
        container.innerHTML = `<p style="color:var(--text-secondary)">Failed to connect to projects. Try starting local server!</p>`;
    }
}

function renderProjects(categoryFilter) {
    const container = document.getElementById("projects");
    if (!container) return;

    const filtered = categoryFilter === "All" 
        ? cachedProjects 
        : cachedProjects.filter(p => p.category === categoryFilter);

    if (filtered.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 40px;">No projects found in this category.</p>`;
        return;
    }

    container.innerHTML = "";
    filtered.forEach(proj => {
        const card = document.createElement("div");
        card.className = "project-glass-card";

        const tagsHtml = proj.tags 
            ? proj.tags.split(",").map(t => `<span class="tag">${t.trim()}</span>`).join("")
            : "";

        card.innerHTML = `
            <div class="project-image-box">
                <img src="${proj.image || 'images/project-placeholder.jpg'}" onerror="this.src='https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800'">
                <span class="project-category-tag">${proj.category}</span>
            </div>
            <div class="project-body">
                <h3>${proj.title}</h3>
                <p>${proj.description}</p>
                <div class="project-tags">${tagsHtml}</div>
                <div class="project-footer">
                    ${proj.github ? `<a href="${proj.github}" target="_blank" class="project-link-code"><i class="fab fa-github"></i> GitHub</a>` : ""}
                    ${proj.demo ? `<a href="${proj.demo}" target="_blank" class="project-link-demo"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ""}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function setupFilterListeners() {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            renderProjects(e.target.dataset.category);
        });
    });
}

// ================= SKILLS LISTING =================
async function loadSkills() {
    const container = document.getElementById("skills");
    if (!container) return;

    try {
        const response = await fetch(`${BASE_URL}/api/skills`);
        const skills = await response.json();

        // Extract values to sync with home dashboard radial gauges
        let pyLevel = 75;
        let mlLevel = 70;
        let sqlLevel = 80;
        let biLevel = 75;

        skills.forEach(skill => {
            const name = skill.name.toLowerCase();
            if (name.includes("python")) pyLevel = skill.level;
            if (name.includes("machine learning") || name.includes("ml")) mlLevel = skill.level;
            if (name.includes("sql")) sqlLevel = skill.level;
            if (name.includes("power bi") || name.includes("powerbi")) biLevel = skill.level;
        });

        // Set gauge levels on Home Page bento grid
        animateRadialSkills(pyLevel, mlLevel);
        const sqlFill = document.getElementById("skill-sql-fill");
        const sqlPct = document.getElementById("skill-sql-pct");
        if (sqlFill && sqlPct) {
            sqlFill.style.width = sqlLevel + "%";
            sqlPct.textContent = sqlLevel + "%";
        }
        const biFill = document.getElementById("skill-bi-fill");
        const biPct = document.getElementById("skill-bi-pct");
        if (biFill && biPct) {
            biFill.style.width = biLevel + "%";
            biPct.textContent = biLevel + "%";
        }

        if (skills.length === 0) {
            container.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--text-secondary)">No skills found.</p>`;
            return;
        }

        const groups = {};
        skills.forEach(skill => {
            const cat = skill.category || "Data Science";
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(skill);
        });

        container.innerHTML = "";
        Object.keys(groups).forEach(cat => {
            const catCard = document.createElement("div");
            catCard.className = "skill-category-card";
            
            let skillsListHtml = "";
            groups[cat].forEach(skill => {
                skillsListHtml += `
                    <div>
                        <div class="skill-item-info">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-percent">${skill.level}%</span>
                        </div>
                        <div class="skill-bar-bg">
                            <div class="skill-bar-fill" data-level="${skill.level}"></div>
                        </div>
                    </div>
                `;
            });

            catCard.innerHTML = `
                <h3>${cat}</h3>
                <div class="skill-list">${skillsListHtml}</div>
            `;
            container.appendChild(catCard);
        });

        setTimeout(() => {
            document.querySelectorAll(".skill-bar-fill").forEach(fill => {
                fill.style.width = fill.getAttribute("data-level") + "%";
            });
        }, 100);

    } catch (err) {
        console.log("Error loading skills:", err);
        container.innerHTML = `<p style="color:var(--text-secondary)">Failed to connect to skills server.</p>`;
    }
}

// ================= EDUCATION & CERTIFICATIONS =================
async function loadEduAndCerts() {
    const eduTimeline = document.getElementById("education-timeline");
    const certsGrid = document.getElementById("certifications-grid");
    const bentoCertsGrid = document.getElementById("bento-certs-grid");

    if (!eduTimeline && !certsGrid && !bentoCertsGrid) return;

    // Load Education
    if (eduTimeline) {
        try {
            const eduRes = await fetch(`${BASE_URL}/api/education`);
            const eduList = await eduRes.json();
            
            if (eduList.length === 0) {
                eduTimeline.innerHTML = `<p style="color:var(--text-secondary)">No education milestones published.</p>`;
            } else {
                eduTimeline.innerHTML = "";
                eduList.forEach(edu => {
                    const item = document.createElement("div");
                    item.className = "timeline-item";
                    item.innerHTML = `
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <span class="timeline-year">${edu.year}</span>
                            <h3>${edu.degree}</h3>
                            <div class="timeline-institution">${edu.institution}</div>
                            ${edu.gpa ? `<div class="timeline-gpa">${edu.gpa}</div>` : ""}
                            ${edu.details ? `<p class="timeline-details">${edu.details}</p>` : ""}
                        </div>
                    `;
                    eduTimeline.appendChild(item);
                });
            }
        } catch (err) {
            console.log("Error loading education:", err);
            eduTimeline.innerHTML = `<p style="color:var(--text-secondary)">Failed to load academic records.</p>`;
        }
    }

    // Load Certifications Grid (Subpage)
    if (certsGrid) {
        try {
            const certRes = await fetch(`${BASE_URL}/api/certifications`);
            const certList = await certRes.json();
            
            if (certList.length === 0) {
                certsGrid.innerHTML = `<p style="color:var(--text-secondary); grid-column:1/-1;">No certifications found.</p>`;
            } else {
                certsGrid.innerHTML = "";
                certList.forEach(cert => {
                    const card = document.createElement("div");
                    card.className = "cert-card";
                    card.innerHTML = `
                        <div class="cert-icon"><i class="fas fa-certificate"></i></div>
                        <h3>${cert.title}</h3>
                        <div class="cert-issuer">${cert.issuer}</div>
                        <div class="cert-year">Issued: ${cert.year || 'N/A'}</div>
                        ${cert.link ? `<a href="${cert.link}" target="_blank" class="cert-link">Verify Credential <i class="fas fa-external-link-alt" style="font-size:0.75rem;"></i></a>` : ""}
                    `;
                    certsGrid.appendChild(card);
                });
            }
        } catch (err) {
            console.log("Error loading certifications:", err);
            certsGrid.innerHTML = `<p style="color:var(--text-secondary); grid-column:1/-1;">Failed to load credentials catalog.</p>`;
        }
    }

    // Load Bento Certifications Slider (Homepage Bento Grid)
    if (bentoCertsGrid) {
        try {
            const certRes = await fetch(`${BASE_URL}/api/certifications`);
            const certList = await certRes.json();
            
            if (certList.length === 0) {
                bentoCertsGrid.innerHTML = `<p style="color:var(--text-secondary); grid-column:1/-1;">No credentials published.</p>`;
            } else {
                bentoCertsGrid.innerHTML = "";
                certList.slice(0, 4).forEach(cert => {
                    const box = document.createElement("div");
                    box.className = "bento-cert-card";
                    box.innerHTML = `
                        <div class="bento-cert-icon"><i class="fas fa-award"></i></div>
                        <div class="bento-cert-info">
                            <h4>${cert.title}</h4>
                            <span>${cert.issuer} • ${cert.year}</span>
                        </div>
                    `;
                    bentoCertsGrid.appendChild(box);
                });
            }
        } catch (err) {
            console.log("Bento credentials slider failed:", err);
            bentoCertsGrid.innerHTML = `<p style="color:var(--text-secondary); grid-column:1/-1;">Credentials loader offline.</p>`;
        }
    }
}

// ================= CONTACT FORM SUBMISSION =================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {
            const response = await fetch(`${BASE_URL}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                alert("Thank you! Your message was sent successfully.");
                contactForm.reset();
            } else {
                alert("Error sending message. Try again later.");
            }
        } catch (err) {
            console.log("Contact error:", err);
            alert("Connection error. Could not reach server.");
        }
    });
}

// ================= ADMIN LOGIN =================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${BASE_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok || !data.token) {
                alert(data.message || "Invalid Admin Credentials");
                return;
            }

            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } catch (err) {
            console.log("Login error:", err);
            alert("Failed to connect to authentication server.");
        }
    });
}

// ================= ADMIN DASHBOARD CORE =================
const isDashboard = document.querySelector(".dashboard-page");
if (isDashboard) {
    // Check Authentication
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Unauthorized! Please log in first.");
        window.location.href = "login.html";
    }

    // Initialize Dashboard Panels and Tabs
    setupDashboardTabs();
    loadDashboardData();
    setupDashboardForms();
    setupDashboardUploads();
    
    // Logout Button
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
}

function setupDashboardTabs() {
    document.querySelectorAll(".dash-tab-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const targetTab = e.currentTarget.dataset.tab;
            if (!targetTab) return;

            document.querySelectorAll(".dash-tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".dash-panel").forEach(p => p.classList.remove("active"));

            e.currentTarget.classList.add("active");
            document.getElementById(targetTab).classList.add("active");
        });
    });
}

async function loadDashboardData() {
    try {
        const stats = {
            projects: 0,
            skills: 0,
            certs: 0,
            messages: 0
        };

        const settingsRes = await fetch(`${BASE_URL}/api/settings`);
        if (settingsRes.ok) {
            const set = await settingsRes.json();
            
            // Populate Settings Forms
            document.getElementById("profileNameInput").value = set.name || "";
            document.getElementById("profileTitleInput").value = set.title || "";
            document.getElementById("profileBioInput").value = set.bio || "";
            document.getElementById("profileAboutInput").value = set.about || "";
            document.getElementById("profileImageInput").value = set.profileImage || "";
            document.getElementById("profileResumeInput").value = set.resumeUrl || "";
            document.getElementById("profileGithubInput").value = set.githubUrl || "";
            document.getElementById("profileLinkedinInput").value = set.linkedinUrl || "";
            document.getElementById("profileEmailInput").value = set.emailUrl || "";
            
            // Bento Settings inputs
            document.getElementById("profileCgpaInput").value = set.cgpa || "9.1";
            document.getElementById("profileProjectsCountInput").value = set.projectsCount || 12;
            document.getElementById("profileCertsCountInput").value = set.certsCount || 15;
            document.getElementById("profileSolvedCountInput").value = set.problemsSolved || 500;
            document.getElementById("profileStrengthsInput").value = set.strengths || "";
            document.getElementById("profileObjectiveInput").value = set.objective || "";

            // Coding Profiles Console inputs
            document.getElementById("profileLeetcodeUrl").value = set.leetcodeUrl || "";
            document.getElementById("profileLeetcodeSolved").value = set.leetcodeSolved || 0;
            document.getElementById("profileGfgUrl").value = set.geeksforgeeksUrl || "";
            document.getElementById("profileGfgSolved").value = set.geeksforgeeksSolved || 0;
            document.getElementById("profileCodechefUrl").value = set.codechefUrl || "";
            document.getElementById("profileCodechefSolved").value = set.codechefSolved || 0;
            document.getElementById("profileHackerrankUrl").value = set.hackerrankUrl || "";
            document.getElementById("profileHackerrankSolved").value = set.hackerrankSolved || 0;

            if (set.profileImage) {
                const preview = document.getElementById("profile-img-preview");
                preview.innerHTML = `<img src="${set.profileImage}">`;
            }
        }

        const projRes = await fetch(`${BASE_URL}/api/projects`);
        if (projRes.ok) {
            const list = await projRes.json();
            stats.projects = list.length;
            renderDashProjectsList(list);
        }

        const skillRes = await fetch(`${BASE_URL}/api/skills`);
        if (skillRes.ok) {
            const list = await skillRes.json();
            stats.skills = list.length;
            renderDashSkillsList(list);
        }

        const certRes = await fetch(`${BASE_URL}/api/certifications`);
        if (certRes.ok) {
            const list = await certRes.json();
            stats.certs = list.length;
            renderDashCertsList(list);
        }

        const eduRes = await fetch(`${BASE_URL}/api/education`);
        if (eduRes.ok) {
            const list = await eduRes.json();
            renderDashEduList(list);
        }

        const msgRes = await fetch(`${BASE_URL}/api/contact`, { headers: getAuthHeaders() });
        if (msgRes.ok) {
            const list = await msgRes.json();
            stats.messages = list.length;
            renderDashMessagesList(list);
        }

        // Bind stats numbers to dashboard UI
        document.getElementById("stat-projects").textContent = stats.projects;
        document.getElementById("stat-skills").textContent = stats.skills;
        document.getElementById("stat-certs").textContent = stats.certs;
        document.getElementById("stat-messages").textContent = stats.messages;

    } catch (err) {
        console.log("Error loading dashboard data:", err);
    }
}

// Handle image conversions to base64
function setupDashboardUploads() {
    const profFile = document.getElementById("profileImageFile");
    const projFile = document.getElementById("projImageFile");
    const editProjFile = document.getElementById("editProjImageFile");

    if (profFile) {
        profFile.addEventListener("change", async (e) => {
            if (e.target.files.length > 0) {
                const base64 = await convertFileToBase64(e.target.files[0]);
                document.getElementById("profileImageInput").value = base64;
                document.getElementById("profile-img-preview").innerHTML = `<img src="${base64}">`;
            }
        });
    }

    if (projFile) {
        projFile.addEventListener("change", async (e) => {
            if (e.target.files.length > 0) {
                const base64 = await convertFileToBase64(e.target.files[0]);
                document.getElementById("projImageBase64").value = base64;
                document.getElementById("proj-img-preview").innerHTML = `<img src="${base64}">`;
            }
        });
    }

    if (editProjFile) {
        editProjFile.addEventListener("change", async (e) => {
            if (e.target.files.length > 0) {
                const base64 = await convertFileToBase64(e.target.files[0]);
                document.getElementById("editProjImageBase64").value = base64;
                document.getElementById("edit-proj-img-preview").innerHTML = `<img src="${base64}">`;
            }
        });
    }
}

// Dashboard Form Submit Handlers
function setupDashboardForms() {
    // 1. Profile settings Form
    const profForm = document.getElementById("dashProfileForm");
    if (profForm) {
        profForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const body = {
                name: document.getElementById("profileNameInput").value,
                title: document.getElementById("profileTitleInput").value,
                bio: document.getElementById("profileBioInput").value,
                about: document.getElementById("profileAboutInput").value,
                profileImage: document.getElementById("profileImageInput").value,
                resumeUrl: document.getElementById("profileResumeInput").value,
                githubUrl: document.getElementById("profileGithubInput").value,
                linkedinUrl: document.getElementById("profileLinkedinInput").value,
                emailUrl: document.getElementById("profileEmailInput").value,
                cgpa: document.getElementById("profileCgpaInput").value,
                projectsCount: Number(document.getElementById("profileProjectsCountInput").value),
                certsCount: Number(document.getElementById("profileCertsCountInput").value),
                problemsSolved: Number(document.getElementById("profileSolvedCountInput").value),
                strengths: document.getElementById("profileStrengthsInput").value,
                objective: document.getElementById("profileObjectiveInput").value,
                // Coding Profiles
                leetcodeUrl: document.getElementById("profileLeetcodeUrl").value,
                leetcodeSolved: Number(document.getElementById("profileLeetcodeSolved").value),
                geeksforgeeksUrl: document.getElementById("profileGfgUrl").value,
                geeksforgeeksSolved: Number(document.getElementById("profileGfgSolved").value),
                codechefUrl: document.getElementById("profileCodechefUrl").value,
                codechefSolved: Number(document.getElementById("profileCodechefSolved").value),
                hackerrankUrl: document.getElementById("profileHackerrankUrl").value,
                hackerrankSolved: Number(document.getElementById("profileHackerrankSolved").value)
            };
            
            try {
                const res = await fetch(`${BASE_URL}/api/settings`, {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(body)
                });
                if (res.ok) {
                    alert("Profile settings updated!");
                    loadDashboardData();
                } else {
                    alert("Error saving settings.");
                }
            } catch (err) {
                alert("Failed to update profile settings.");
            }
        });
    }

    // 1b. Password Change Form
    const pwForm = document.getElementById("dashPasswordForm");
    if (pwForm) {
        pwForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById("currentPasswordInput").value;
            const newPassword = document.getElementById("newPasswordInput").value;
            const confirmPassword = document.getElementById("confirmPasswordInput").value;

            if (newPassword !== confirmPassword) {
                alert("New passwords do not match!");
                return;
            }

            try {
                const res = await fetch(`${BASE_URL}/api/change-password`, {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify({ currentPassword, newPassword })
                });

                const data = await res.json();
                if (res.ok) {
                    alert("Password updated successfully!");
                    pwForm.reset();
                } else {
                    alert(data.message || "Failed to update password.");
                }
            } catch (err) {
                alert("Network error. Failed to connect to server.");
            }
        });
    }

    // 2. Add Project Form
    const projForm = document.getElementById("dashProjectForm");
    if (projForm) {
        projForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const body = {
                title: document.getElementById("projTitle").value,
                description: document.getElementById("projDesc").value,
                github: document.getElementById("projGithub").value,
                demo: document.getElementById("projDemo").value,
                tags: document.getElementById("projTags").value,
                category: document.getElementById("projCategory").value,
                image: document.getElementById("projImageBase64").value
            };

            try {
                const res = await fetch(`${BASE_URL}/api/projects`, {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(body)
                });
                if (res.ok) {
                    alert("Project added!");
                    projForm.reset();
                    document.getElementById("proj-img-preview").innerHTML = "<span>No Image Selected</span>";
                    document.getElementById("projImageBase64").value = "";
                    loadDashboardData();
                } else {
                    alert("Failed to save project.");
                }
            } catch (err) {
                alert("Connection failed.");
            }
        });
    }



    // 4. Add Skill Form
    const skillForm = document.getElementById("dashSkillForm");
    if (skillForm) {
        skillForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const body = {
                name: document.getElementById("skillNameInput").value,
                level: Number(document.getElementById("skillLevelInput").value),
                category: document.getElementById("skillCategoryInput").value
            };

            try {
                const res = await fetch(`${BASE_URL}/api/skills`, {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(body)
                });
                if (res.ok) {
                    alert("Skill added!");
                    skillForm.reset();
                    loadDashboardData();
                }
            } catch (err) {
                alert("Failed to save skill.");
            }
        });
    }



    // 6. Add Cert Form
    const certForm = document.getElementById("dashCertForm");
    if (certForm) {
        certForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const body = {
                title: document.getElementById("certTitle").value,
                issuer: document.getElementById("certIssuer").value,
                year: document.getElementById("certYear").value,
                link: document.getElementById("certLink").value
            };

            try {
                const res = await fetch(`${BASE_URL}/api/certifications`, {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(body)
                });
                if (res.ok) {
                    alert("Certification added!");
                    certForm.reset();
                    loadDashboardData();
                }
            } catch (err) {
                alert("Failed to save certification.");
            }
        });
    }

    // 7. Edit Cert Modal Submit
    const editCertForm = document.getElementById("editCertForm");
    if (editCertForm) {
        editCertForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = document.getElementById("editCertId").value;
            const body = {
                title: document.getElementById("editCertTitle").value,
                issuer: document.getElementById("editCertIssuer").value,
                year: document.getElementById("editCertYear").value,
                link: document.getElementById("editCertLink").value
            };

            try {
                const res = await fetch(`${BASE_URL}/api/certifications/${id}`, {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(body)
                });
                if (res.ok) {
                    alert("Certification updated!");
                    closeModal("editCertModal");
                    loadDashboardData();
                }
            } catch (err) {
                alert("Failed to update certification.");
            }
        });
    }

    // 8. Add Edu Form
    const eduForm = document.getElementById("dashEduForm");
    if (eduForm) {
        eduForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const body = {
                degree: document.getElementById("eduDegree").value,
                institution: document.getElementById("eduInstitution").value,
                year: document.getElementById("eduYear").value,
                gpa: document.getElementById("eduGPA").value,
                details: document.getElementById("eduDetails").value
            };

            try {
                const res = await fetch(`${BASE_URL}/api/education`, {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(body)
                });
                if (res.ok) {
                    alert("Education milestone added!");
                    eduForm.reset();
                    loadDashboardData();
                }
            } catch (err) {
                alert("Failed to save education.");
            }
        });
    }

    // 9. Edit Edu Modal Submit
    const editEduForm = document.getElementById("editEduForm");
    if (editEduForm) {
        editEduForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const id = document.getElementById("editEduId").value;
            const body = {
                degree: document.getElementById("editEduDegree").value,
                institution: document.getElementById("editEduInstitution").value,
                year: document.getElementById("editEduYear").value,
                gpa: document.getElementById("editEduGPA").value,
                details: document.getElementById("editEduDetails").value
            };

            try {
                const res = await fetch(`${BASE_URL}/api/education/${id}`, {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(body)
                });
                if (res.ok) {
                    alert("Education milestone updated!");
                    closeModal("editEduModal");
                    loadDashboardData();
                }
            } catch (err) {
                alert("Failed to update education.");
            }
        });
    }
}

// Render Lists in Dashboard
function renderDashProjectsList(projects) {
    const list = document.getElementById("dash-projects-list");
    if (!list) return;
    list.innerHTML = "";
    projects.forEach(p => {
        const row = document.createElement("div");
        row.className = "item-row";
        row.innerHTML = `
            <div class="item-info">
                <h4>${p.title}</h4>
                <span>Category: ${p.category}</span>
            </div>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteItem('projects', '${p._id}')"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
        `;
        list.appendChild(row);
    });
}

function renderDashSkillsList(skills) {
    const list = document.getElementById("dash-skills-list");
    if (!list) return;
    list.innerHTML = "";
    skills.forEach(s => {
        const row = document.createElement("div");
        row.className = "item-row";
        row.innerHTML = `
            <div class="item-info">
                <h4>${s.name}</h4>
                <span>Proficiency: ${s.level}% | Category: ${s.category}</span>
            </div>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteItem('skills', '${s._id}')"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
        `;
        list.appendChild(row);
    });
}

function renderDashCertsList(certs) {
    const list = document.getElementById("dash-certs-list");
    if (!list) return;
    list.innerHTML = "";
    certs.forEach(c => {
        const row = document.createElement("div");
        row.className = "item-row";
        row.innerHTML = `
            <div class="item-info">
                <h4>${c.title}</h4>
                <span>Issuer: ${c.issuer} | Year: ${c.year}</span>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="openEditCert('${c._id}', '${escapeHtml(c.title)}', '${escapeHtml(c.issuer)}', '${escapeHtml(c.year)}', '${escapeHtml(c.link || '')}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn-delete" onclick="deleteItem('certifications', '${c._id}')"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
        `;
        list.appendChild(row);
    });
}

function renderDashEduList(eduList) {
    const list = document.getElementById("dash-edu-list");
    if (!list) return;
    list.innerHTML = "";
    eduList.forEach(e => {
        const row = document.createElement("div");
        row.className = "item-row";
        row.innerHTML = `
            <div class="item-info">
                <h4>${e.degree}</h4>
                <span>Institution: ${e.institution} | Year: ${e.year}</span>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="openEditEdu('${e._id}', '${escapeHtml(e.degree)}', '${escapeHtml(e.institution)}', '${escapeHtml(e.year)}', '${escapeHtml(e.gpa || '')}', '${escapeHtml(e.details || '')}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn-delete" onclick="deleteItem('education', '${e._id}')"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
        `;
        list.appendChild(row);
    });
}

function renderDashMessagesList(messages) {
    const list = document.getElementById("dash-messages-list");
    if (!list) return;
    if (messages.length === 0) {
        list.innerHTML = `<p style="color:var(--text-secondary)">Inbox is currently empty.</p>`;
        return;
    }
    list.innerHTML = "";
    messages.forEach(m => {
        const card = document.createElement("div");
        card.className = "dash-msg-card";
        const dateStr = new Date(m.createdAt).toLocaleString();
        card.innerHTML = `
            <div class="dash-msg-header">
                <div class="dash-msg-sender">
                    <h4>${escapeHtml(m.name)}</h4>
                    <span>${escapeHtml(m.email)}</span>
                </div>
                <div style="display:flex; align-items:center; gap:12px;">
                    <span class="dash-msg-date">${dateStr}</span>
                    <button class="btn-delete" onclick="deleteItem('contact', '${m._id}')"><i class="fas fa-trash-alt"></i> Delete</button>
                </div>
            </div>
            <div class="dash-msg-body">${escapeHtml(m.message)}</div>
        `;
        list.appendChild(card);
    });
}

// Modal Toggle Helpers
function openModal(id) {
    document.getElementById(id).classList.add("active");
}
function closeModal(id) {
    document.getElementById(id).classList.remove("active");
}



// Global Delete Action
async function deleteItem(type, id) {
    if (!confirm(`Are you sure you want to delete this from ${type}?`)) return;
    
    try {
        const res = await fetch(`${BASE_URL}/api/${type}/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });
        if (res.ok) {
            alert("Deleted successfully!");
            loadDashboardData();
        } else {
            alert("Failed to delete.");
        }
    } catch (err) {
        alert("Server connection failed.");
    }
}

// Utility Escaping Helper
function escapeHtml(str) {
    if (!str) return '';
    return str
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// ================= PASSWORD VISIBILITY TOGGLE =================
function setupPasswordToggles() {
    const toggles = [
        { btnId: "toggleLoginPassword", inputId: "password" },
        { btnId: "toggleCurrentPW", inputId: "currentPasswordInput" },
        { btnId: "toggleNewPW", inputId: "newPasswordInput" },
        { btnId: "toggleConfirmPW", inputId: "confirmPasswordInput" }
    ];

    toggles.forEach(toggle => {
        const btn = document.getElementById(toggle.btnId);
        const input = document.getElementById(toggle.inputId);
        
        if (btn && input) {
            btn.addEventListener("click", () => {
                const type = input.getAttribute("type") === "password" ? "text" : "password";
                input.setAttribute("type", type);
                
                if (type === "password") {
                    btn.classList.remove("fa-eye");
                    btn.classList.add("fa-eye-slash");
                } else {
                    btn.classList.remove("fa-eye-slash");
                    btn.classList.add("fa-eye");
                }
            });
        }
    });
}

// ================= BOOTSTRAP INITIALIZERS =================
initStarfield();
initRoleCarousel();
initAdvancedAnimations();
loadHomeSettings();
loadProjects();
loadSkills();
loadEduAndCerts();
setupPasswordToggles();