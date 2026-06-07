"use strict";
const welcomeText = document.getElementById("welcomeText");
const projectList = document.getElementById("projectList");
const projects = [
    {
        name: "Notiz-App",
        language: "JavaScript",
        status: "Fertig",
    },
    {
        name: "NOC Dashboard",
        language: "TypeScript",
        status: "In Arbeit",
    },
    {
        name: "CNC Werkzeugliste",
        language: "Lua",
        status: "Fertig",
    },
    {
        name: "Entwickler Dashboard",
        language: "TypeScript",
        status: "Geplant",
    },
];
function getStatusClass(status) {
    if (status === "Fertig") {
        return "bg-green-500/20 text-green-300 border-green-500/30";
    }
    if (status === "In Arbeit") {
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    }
    return "bg-blue-500/20 text-blue-300 border-blue-500/30";
}
function getStatusIcon(status) {
    if (status === "Fertig") {
        return "🟢";
    }
    if (status === "In Arbeit") {
        return "🟡";
    }
    return "🔵";
}
if (welcomeText) {
    welcomeText.textContent =
        "Willkommen zu deinem Entwickler-Dashboard mit TypeScript und Tailwind CSS.";
}
if (projectList) {
    projectList.innerHTML = "";
    projects.forEach((project) => {
        const projectCard = document.createElement("article");
        projectCard.className =
            "bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg hover:border-slate-500 transition";
        projectCard.innerHTML = `
            <h3 class="text-xl font-bold mb-3">${project.name}</h3>

            <p class="text-slate-300 mb-3">
                Sprache: ${project.language}
            </p>

            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusClass(project.status)}">
                ${getStatusIcon(project.status)} ${project.status}
            </span>
        `;
        projectList.appendChild(projectCard);
    });
}
