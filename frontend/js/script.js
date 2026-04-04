async function loadProjects() {
    const response = await fetch("http://localhost:5000/api/projects")
    const projects =await response.json()
    const container=document.getElementById("projects")
    if(!container) return
    projects.forEach(project => {
        const div=document.createElement("div")
        div.innerHTML = `
<h3>${project.title}</h3>
<p>${project.description}</p>
<a href="${project.github}" target="_blank">GitHub</a>
<hr>
`
container.appendChild(div)
        
    });
    
}
loadProjects()
async function loadSkills(){
    const response = await fetch("http://localhost:5000/api/skills")
    const skills=await response.json()
    const container = document.getElementById("skills")
    if(!container) return
    skills.forEach(skill=>{
        const div=document.createElement("div")
        div.innerHTML=`
        <h3>${skill.name}</h3>
        <p>Level: ${skill.level}%</p>
        `
        container.appendChild(div)
    })

}
loadSkills()
const form=document.getElementById("contactForm")
if(form){
    form.addEventListener("submit",async function (e) {
        e.preventDefault()
        const name=document.getElementById("name").value
        const email=document.getElementById("email").value
        const message=document.getElementById("message").value
        await fetch("http://localhost:5000/api/contact", {
            method:"POST",
            headers:{
                "content-type":"application/json"

            },
            body:JSON.stringify({
                name,
                email,
                message
            })

        })
        alert("Message sent successfully!")
        form.reset()
        
    })
}
const loginForm = document.getElementById("loginForm")

if(loginForm){

loginForm.addEventListener("submit", async function (e) {

e.preventDefault()

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const response = await fetch("http://localhost:5000/api/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
email,
password
})
})

const data = await response.json()
console.log(data)

// CHECK IF LOGIN FAILED

if(!data.token){
alert("Login failed")
return
}


console.log("Token:", data.token)

// LOGIN SUCCESS
localStorage.setItem("token", data.token)

alert("Login successful!")

window.location.href = "dashboard.html"

})

}
const projectForm = document.getElementById("projectForm")

if(projectForm){

projectForm.addEventListener("submit", async function(e){

e.preventDefault()

const token = localStorage.getItem("token")

const title = document.getElementById("title").value
const description = document.getElementById("description").value
const github = document.getElementById("github").value

const response=await fetch("http://localhost:5000/api/projects",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":token
},

body:JSON.stringify({
title,
description,
github
})

})
const data=await response.json()
console.log(data)

if(response.ok){
alert("Project added!")
projectForm.reset()
}else{
alert("Error adding project")
}

})


}
const skillForm = document.getElementById("skillForm")

if(skillForm){

skillForm.addEventListener("submit", async function(e){

e.preventDefault()

const token = localStorage.getItem("token")

const name = document.getElementById("skillName").value
const level = document.getElementById("skillLevel").value

const response = await fetch("http://localhost:5000/api/skills",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":token
},

body:JSON.stringify({
name,
level
})

})

const data = await response.json()

console.log(data)

if(response.ok){
alert("Skill added!")
}else{
alert("Error adding skill")
}

})

}


async function loadMessages(){

const token = localStorage.getItem("token")
if(!token){
alert("Please login first")
window.location.href="login.html"
}



const response = await fetch("http://localhost:5000/api/contact",{
headers:{
"Authorization": token
}
})

const data = await response.json()

console.log("Messages from API:", data)

const container = document.getElementById("messages")

if(!container) return

data.forEach(msg => {

const div = document.createElement("div")

div.innerHTML = `
<p><b>${msg.name}</b> (${msg.email})</p>
<p>${msg.message}</p>
<hr>
`

container.appendChild(div)

})

}

loadMessages()