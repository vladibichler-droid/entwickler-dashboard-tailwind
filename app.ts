// Holt das Begrüßungsfeld aus der HTML-Datei
const welcomeText = document.getElementById("welcomeText");

// Holt den Bereich, in dem alle Projektkarten angezeigt werden
const projectList = document.getElementById("projectList");

// Holt die Eingabefelder und den Button aus der HTML-Datei
const projectNameInput = document.getElementById("projectNameInput") as HTMLInputElement;
const projectLanguageSelect = document.getElementById("projectLanguageSelect") as HTMLSelectElement;
const projectStatusSelect = document.getElementById("projectStatusSelect") as HTMLSelectElement;
const addProjectButton = document.getElementById("addProjectButton");

// Beschreibt, welche Eigenschaften ein Projekt haben muss
type Project = {
    name: string;
    language: string;
    status: string;
};

// Startliste mit Beispielprojekten
const projects: Project[] = [
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

// Gibt je nach Projektstatus die passenden Tailwind-CSS-Klassen zurück
function getStatusClass(status: string): string {
    if (status === "Fertig") {
        return "bg-green-500/20 text-green-300 border-green-500/30";
    }

    if (status === "In Arbeit") {
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    }

    return "bg-blue-500/20 text-blue-300 border-blue-500/30";
}

// Gibt je nach Projektstatus das passende Symbol zurück
function getStatusIcon(status: string): string {
    if (status === "Fertig") {
        return "🟢";
    }

    if (status === "In Arbeit") {
        return "🟡";
    }

    return "🔵";
}

// Baut alle Projektkarten neu auf
function renderProjects(): void {
    if (!projectList) {
        return;
    }

    projectList.innerHTML = "";

    projects.forEach((project, index) => {
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

            <button
                class="delete-button mt-5 w-full bg-red-600 hover:bg-red-500 rounded-lg px-4 py-2 font-semibold transition"
                data-index="${index}"
            >
                🗑 Löschen
            </button>
        `;

        projectList.appendChild(projectCard);
    });

    connectDeleteButtons();
}

// Fügt ein neues Projekt zur Liste hinzu
function addProject(): void {
    const name = projectNameInput.value.trim();
    const language = projectLanguageSelect.value;
    const status = projectStatusSelect.value;

    if (name === "") {
        alert("Bitte gib einen Projektnamen ein.");
        return;
    }

    const newProject: Project = {
        name: name,
        language: language,
        status: status,
    };

    projects.push(newProject);

    projectNameInput.value = "";

    renderProjects();
}

// Verbindet alle Löschen-Buttons mit einer Klick-Funktion
function connectDeleteButtons(): void {
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const indexText = button.getAttribute("data-index");

            if (indexText === null) {
                return;
            }

            const index = Number(indexText);

            projects.splice(index, 1);

            renderProjects();
        });
    });
}

// Setzt den Begrüßungstext
if (welcomeText) {
    welcomeText.textContent =
        "Willkommen zu deinem Entwickler-Dashboard mit TypeScript und Tailwind CSS.";
}

// Verbindet den Hinzufügen-Button mit der Funktion addProject
if (addProjectButton) {
    addProjectButton.addEventListener("click", addProject);
}

// Startet die erste Anzeige der Projektkarten
renderProjects();