'use strict';

let radioStations = [
    {
        title: 'Saguenay Rouge FM',
        url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CFIXFM.mp3'
    },
    {
        title: 'Montreal Rouge FM',
        url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CITE1FM.mp3'
    },
    {
        title: 'Radio Station 3',
        url: 'http://stream-url3.com/stream'
    }
];

const audio = document.getElementById('radioPlayer');
const statusMessage = document.getElementById('statusMessage');
const currentStation = document.getElementById('currentStation');
const stationSelect = document.getElementById('stationSelect');
const stationList = document.getElementById('stationList');

// Afficher les stations dans le dropdown
function displayStations() {
    stationSelect.innerHTML = '<option value="">Choisir une station</option>'; // Reset dropdown
    stationList.innerHTML = ''; // Réinitialiser la liste des stations
    radioStations.forEach((station, index) => {
        const option = document.createElement('option');
        option.textContent = station.title;
        option.value = index;
        stationSelect.appendChild(option);

        // Ajouter la station à la liste
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <span>${station.title}</span>
            <div>
                <button class="btn btn-warning btn-sm" onclick="editStation(${index})">
                    <i class="fas fa-edit"></i> Modifier
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteStation(${index})">
                    <i class="fas fa-trash-alt"></i> Supprimer
                </button>
            </div>
        `;
        stationList.appendChild(listItem);
    });
}

// Fonction pour jouer une station de radio donnée
function playRadio(index) {
    if (index === "") {
        resetForm();
        return;
    }
    const station = radioStations[index];
    audio.src = station.url;
    audio.play();

    statusMessage.textContent = `Connexion à ${station.title}...`;
    currentStation.textContent = `Station en cours : ${station.title}`;
}

// Ajouter ou mettre à jour une station
function addOrUpdateStation() {
    const stationName = document.getElementById('stationName').value.trim();
    const stationUrl = document.getElementById('stationUrl').value.trim();
    if (stationName && stationUrl) {
        const existingIndex = radioStations.findIndex(station => station.title === stationName);
        if (existingIndex !== -1) {
            radioStations[existingIndex].url = stationUrl; // Mise à jour de l'URL
            alert("Station mise à jour !");
        } else {
            radioStations.push({ title: stationName, url: stationUrl }); // Ajout de nouvelle station
            alert("Station ajoutée !");
        }
        displayStations();
        resetForm();
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

// Réinitialiser le formulaire
function resetForm() {
    document.getElementById('stationName').value = '';
    document.getElementById('stationUrl').value = '';
}

// Supprimer une station
function deleteStation(index) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette station ?")) {
        radioStations.splice(index, 1); // Suppression de la station
        alert("Station supprimée !");
        displayStations();
    }
}

// Éditer une station
function editStation(index) {
    const station = radioStations[index];
    document.getElementById('stationName').value = station.title;
    document.getElementById('stationUrl').value = station.url;
}

// Initialiser les stations à la charge de la page
window.onload = displayStations;
