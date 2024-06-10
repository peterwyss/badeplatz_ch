// Elemente für verschiedene Status erstellen
var elem_g = document.createElement('div');
elem_g.innerHTML = 'Geschlossen';
elem_g.className = 'status-geschlossen';

var elem_b = document.createElement('div');
elem_b.innerHTML = 'Offen bis 17:00';
elem_b.className = 'status-bald-geschlossen';

var elem_o = document.createElement('div');
elem_o.innerHTML = 'Offen';
elem_o.className = 'status-offen';

var status = "";

// Funktion zum Abrufen und Aktualisieren des Status
async function fetchAndUpdateStatus() {
try {
const response = await fetch('/js/status.json');
if (!response.ok) {
throw new Error('Netzwerkantwort war nicht in Ordnung');
}
const data = await response.json();
status = data.badeplatz.status;
console.log("Status:", status);
updateStatus(status);
} catch (error) {
console.error('Es gab ein Problem mit der Fetch-Operation:', error);
}
}

// Funktion zur Aktualisierung der Benutzeroberfläche basierend auf dem Status
function updateStatus(status) {
const statusElement = document.getElementById('status');
statusElement.innerHTML = ''; // Vorherigen Inhalt leeren


if (status === "geschlossen") {
    console.log("Status geschlossen");
    statusElement.appendChild(elem_g);
} else if (status === "offen") {
    statusElement.appendChild(elem_o);
} else {
    statusElement.appendChild(elem_b);
}


}

// Polling alle 5 Sekunden
function startPolling(interval) {
fetchAndUpdateStatus(); // Erste Abruf
setInterval(fetchAndUpdateStatus, interval); // Regelmäßiger Abruf
}

// Polling starten
startPolling(5000); // Aktualisierung alle 5 Sekunden