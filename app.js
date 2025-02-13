// Définir les données des ventes
let salesData = {
    "Julien": 0,
    "Thomas": 0,
    "Laetitia": 0,
    "Charles": 0,
    "Mehdi": 0,
    "Guillaume": 0,
    "Oussama": 0,
    "Timothée": 0
};

// Fonction pour valider une vente
function validateSale(member) {
    // Augmenter le compteur de ventes localement
    salesData[member]++;

    // Afficher l'animation et jouer le son
    showSaleAnimation(member);
    playSound();

    // Trier et afficher le classement
    let sortedSales = Object.entries(salesData).sort((a, b) => b[1] - a[1]);
    updateRanking(sortedSales);
}

// Fonction pour afficher l'animation "+1" lors de la vente
function showSaleAnimation(member) {
    const saleAnimation = document.createElement("div");
    saleAnimation.classList.add("sale-animation");
    saleAnimation.textContent = "+1";

    const button = document.querySelector(`button[onclick="validateSale('${member}')"]`);
    button.appendChild(saleAnimation);

    setTimeout(() => {
        saleAnimation.remove();
    }, 1000);
}

// Fonction pour jouer un son lors de la validation de la vente
function playSound() {
    const audio = new Audio('son_buzzer.mp3'); // Assurez-vous que le fichier son est dans le même répertoire
    audio.play();
}

// Fonction pour afficher le classement des ventes
function updateRanking(sortedSales) {
    const rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = ""; // Réinitialiser le contenu de la liste
    sortedSales.forEach(([member, sales]) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${member}: ${sales} vente(s)`;
        rankingList.appendChild(listItem);
    });
}

// Fonction pour réinitialiser les ventes
function resetSales() {
    for (let member in salesData) {
        salesData[member] = 0;
    }
    updateRanking(Object.entries(salesData).sort((a, b) => b[1] - a[1]));
}