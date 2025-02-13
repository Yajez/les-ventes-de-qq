// Charger les données des ventes depuis localStorage (si elles existent)
let salesData = JSON.parse(localStorage.getItem('salesData')) || {
    "Julien": 0,
    "Thomas": 0,
    "Laetitia": 0,
    "Charles": 0,
    "Mehdi": 0,
    "Guillaume": 0,
    "Oussama": 0,
    "Timothée": 0
};

// Fonction pour valider une vente et mettre à jour le classement
function validateSale(member) {
    // Augmenter le compteur de ventes localement
    salesData[member]++;
    
    // Sauvegarder les données dans localStorage
    localStorage.setItem('salesData', JSON.stringify(salesData));

    // Afficher l'animation et jouer le son
    showSaleAnimation(member);
    playSound();

    // Trier et afficher le classement
    let sortedSales = Object.entries(salesData).sort((a, b) => b[1] - a[1]);
    updateRanking(sortedSales);
}

// Fonction pour mettre à jour le classement
function updateRanking(sortedSales) {
    const rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = "";
    sortedSales.forEach(([member, sales]) => {
        const gain = calculateGain(sales);  // Calculer le gain en fonction des ventes
        const listItem = document.createElement("li");
        listItem.innerHTML = `<div class="column">${member}</div>
                              <div class="column"><span class="sales">${sales}</span> <span class="sales-word">vente(s)</span></div>
                              <div class="column"><span class="gain">${gain}€</span></div>`;
        rankingList.appendChild(listItem);
    });
}

// Fonction pour calculer le gain en fonction du nombre de ventes
function calculateGain(sales) {
    if (sales >= 20) {
        return sales * 5;  // 5€ par vente à partir de 20 ventes
    } else if (sales >= 10) {
        return sales * 4;  // 4€ par vente entre 10 et 19 ventes
    } else {
        return sales * 3;  // 3€ par vente entre 1 et 9 ventes
    }
}

// Fonction pour réinitialiser les ventes
function resetSales() {
    for (let member in salesData) {
        salesData[member] = 0;
    }
    // Sauvegarder les données réinitialisées dans localStorage
    localStorage.setItem('salesData', JSON.stringify(salesData));

    updateRanking(Object.entries(salesData).sort((a, b) => b[1] - a[1]));
}

// Fonction pour afficher l'animation "+1"
function showSaleAnimation(member) {
    const saleAnimation = document.createElement("div");
    saleAnimation.classList.add("sale-animation");
    saleAnimation.textContent = "+1";
    saleAnimation.style.color = "red";  // Mettre en rouge
    saleAnimation.style.fontSize = "50px";  // Augmenter la taille

    const button = document.querySelector(`button[onclick="validateSale('${member}')"]`);
    button.appendChild(saleAnimation);

    setTimeout(() => {
        saleAnimation.remove();
    }, 1000);
}

// Fonction pour jouer le son
function playSound() {
    const audio = new Audio('son_buzzer.mp3');  // Assurez-vous que le fichier son est dans le même répertoire
    audio.play();
}

// Initialiser le classement dès le chargement de la page
window.onload = function() {
    let sortedSales = Object.entries(salesData).sort((a, b) => b[1] - a[1]);
    updateRanking(sortedSales);
};
