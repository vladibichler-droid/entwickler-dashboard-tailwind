"use strict";
// Schlüsselname für den Browser-Speicher
const storageKey = "entwickler-dashboard-projekte";
// Aktueller Filter
let currentFilter = "Alle";
// Holt das Begrüßungsfeld aus der HTML-Datei
const welcomeText = document.getElementById("welcomeText");
// Holt den Bereich, in dem alle Projektkarten angezeigt werden
const projectList = document.getElementById("projectList");
// Holt die Statistikfelder aus der HTML-Datei
const totalProjects = document.getElementById("totalProjects");
const plannedProjects = document.getElementById("plannedProjects");
const workingProjects = document.getElementById("workingProjects");
const finishedProjects = document.getElementById("finishedProjects");
// Holt die Eingabefelder und den Button aus der HTML-Datei
const projectNameInput = document.getElementById("projectNameInput");
const projectLanguageSelect = document.getElementById("projectLanguageSelect");
const projectStatusSelect = document.getElementById("projectStatusSelect");
const projectProgressInput = document.getElementById("projectProgressInput");
const addProjectButton = document.getElementById("addProjectButton");
// Startliste mit Beispielprojekten
const defaultProjects = [
    {
        name: "Notiz-App",
        language: "JavaScript",
        status: "Fertig",
        progress: 100,
    },
    {
        name: "NOC Dashboard",
        language: "TypeScript",
        status: "In Arbeit",
        progress: 60,
    },
    {
        name: "CNC Werkzeugliste",
        language: "Lua",
        status: "Fertig",
        progress: 100,
    },
    {
        name: "Entwickler Dashboard",
        language: "TypeScript",
        status: "Geplant",
        progress: 25,
    },
];
// Lädt gespeicherte Projekte aus dem Browser
function loadProjects() {
    const savedProjects = localStorage.getItem(storageKey);
    if (savedProjects === null) {
        return defaultProjects;
    }
    return JSON.parse(savedProjects);
}
// Speichert die aktuelle Projektliste im Browser
function saveProjects() {
    localStorage.setItem(storageKey, JSON.stringify(projects));
}
// Aktive Projektliste
let projects = loadProjects();
// Gibt je nach Projektstatus die passenden Tailwind-CSS-Klassen zurück
function getStatusClass(status) {
    if (status === "Fertig") {
        return "bg-green-500/20 text-green-300 border-green-500/30";
    }
    if (status === "In Arbeit") {
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    }
    return "bg-blue-500/20 text-blue-300 border-blue-500/30";
}
// Gibt je nach Projektstatus das passende Symbol zurück
function getStatusIcon(status) {
    if (status === "Fertig") {
        return "🟢";
    }
    if (status === "In Arbeit") {
        return "🟡";
    }
    return "🔵";
}
// Gibt je nach Fortschritt eine passende Farbe für den Balken zurück
function getProgressBarClass(progress) {
    if (progress >= 100) {
        return "bg-green-500";
    }
    if (progress >= 50) {
        return "bg-yellow-500";
    }
    return "bg-blue-500";
}
// Achtet darauf, dass der Fortschritt immer zwischen 0 und 100 bleibt
function cleanProgress(progress) {
    if (progress < 0) {
        return 0;
    }
    if (progress > 100) {
        return 100;
    }
    return progress;
}
// Aktualisiert die Statistik oben im Dashboard
function updateProjectStats() {
    const totalCount = projects.length;
    const plannedCount = projects.filter((project) => project.status === "Geplant").length;
    const workingCount = projects.filter((project) => project.status === "In Arbeit").length;
    const finishedCount = projects.filter((project) => project.status === "Fertig").length;
    if (totalProjects) {
        totalProjects.textContent = String(totalCount);
    }
    if (plannedProjects) {
        plannedProjects.textContent = String(plannedCount);
    }
    if (workingProjects) {
        workingProjects.textContent = String(workingCount);
    }
    if (finishedProjects) {
        finishedProjects.textContent = String(finishedCount);
    }
}
// Liefert die gefilterten Projekte zurück
function getFilteredProjects() {
    if (currentFilter === "Alle") {
        return projects;
    }
    return projects.filter((project) => project.status === currentFilter);
}
// Ändert den Status eines Projekts
function changeProjectStatus(index) {
    const currentStatus = projects[index].status;
    if (currentStatus === "Geplant") {
        projects[index].status = "In Arbeit";
        projects[index].progress = 50;
    }
    else if (currentStatus === "In Arbeit") {
        projects[index].status = "Fertig";
        projects[index].progress = 100;
    }
    else {
        projects[index].status = "Geplant";
        projects[index].progress = 0;
    }
    saveProjects();
    renderProjects();
}
// Baut alle Projektkarten neu auf
function renderProjects() {
    if (!projectList) {
        return;
    }
    projectList.innerHTML = "";
    getFilteredProjects().forEach((project) => {
        const originalIndex = projects.indexOf(project);
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

            <div class="mt-5">
                <div class="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Fortschritt</span>
                    <span>${project.progress}%</span>
                </div>

                <div class="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                        class="${getProgressBarClass(project.progress)} h-3 rounded-full transition-all"
                        style="width: ${project.progress}%"
                    ></div>
                </div>
            </div>

            <div class="mt-5 flex gap-2">
                <button
                    class="status-button flex-1 bg-blue-600 hover:bg-blue-500 rounded-lg px-4 py-2 font-semibold transition"
                    data-index="${originalIndex}"
                >
                    Status ändern
                </button>

                <button
                    class="delete-button flex-1 bg-red-600 hover:bg-red-500 rounded-lg px-4 py-2 font-semibold transition"
                    data-index="${originalIndex}"
                >
                    🗑 Löschen
                </button>
            </div>
        `;
        projectList.appendChild(projectCard);
    });
    connectStatusButtons();
    connectDeleteButtons();
    connectFilterButtons();
    updateProjectStats();
}
// Fügt ein neues Projekt zur Liste hinzu
function addProject() {
    const name = projectNameInput.value.trim();
    const language = projectLanguageSelect.value;
    const status = projectStatusSelect.value;
    const progress = cleanProgress(Number(projectProgressInput.value));
    if (name === "") {
        alert("Bitte gib einen Projektnamen ein.");
        return;
    }
    const newProject = {
        name: name,
        language: language,
        status: status,
        progress: progress,
    };
    projects.push(newProject);
    saveProjects();
    projectNameInput.value = "";
    projectProgressInput.value = "0";
    renderProjects();
}
// Verbindet alle Status-Buttons mit einer Klick-Funktion
function connectStatusButtons() {
    const statusButtons = document.querySelectorAll(".status-button");
    statusButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const indexText = button.getAttribute("data-index");
            if (indexText === null) {
                return;
            }
            changeProjectStatus(Number(indexText));
        });
    });
}
// Verbindet alle Löschen-Buttons mit einer Klick-Funktion
function connectDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const indexText = button.getAttribute("data-index");
            if (indexText === null) {
                return;
            }
            const index = Number(indexText);
            projects.splice(index, 1);
            saveProjects();
            renderProjects();
        });
    });
}
// Verbindet alle Filter-Buttons mit einer Klick-Funktion
function connectFilterButtons() {
    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            if (filter === null) {
                return;
            }
            currentFilter = filter;
            renderProjects();
        });
    });
}
// Setzt den Begrüßungstext
if (welcomeText) {
    welcomeText.textContent =
        "Willkommen zu deinem Entwickler-Dashboard mit TypeScript, Tailwind CSS, Browser-Speicher und Filterfunktion.";
}
// Verbindet den Hinzufügen-Button mit der Funktion addProject
if (addProjectButton) {
    addProjectButton.addEventListener("click", addProject);
}
// Startet die erste Anzeige der Projektkarten
renderProjects();
