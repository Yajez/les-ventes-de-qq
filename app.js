let salesData = {
    "Julien": 0,
    "Thomas": 0,
    "Laetitia": 0,
    "Charles": 0,
    "Mehdi": 0,
    "Guillaume": 0,
    "Oussama": 0,
};

function validateSale(member) {
    // Augmente les ventes du membre
    salesData[member]++;
    updateRanking();
}

function updateRanking() {
    const rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = ""; // Vide la liste actuelle
    Object.entries(salesData).forEach(([member, sales]) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${member}: ${sales} vente(s)`;
        rankingList.appendChild(listItem);
    });
}

// Réinitialiser les ventes
function resetSales() {
    Object.keys(salesData).forEach(member => {
        salesData[member] = 0;
    });
    updateRanking();
}

// Initialiser le classement
updateRanking();