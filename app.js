let salesData = {
    "Julien": 0,
    "Thomas": 0,
    "Laetitia": 0,
    "Charles": 0,
    "Mehdi": 0,
    "Guillaume": 0,
    "Oussama": 0
};

function validateSale(member) {
    // Augmenter le compteur de ventes
    salesData[member]++;
    
    // Créer et afficher le "+1" de manière dynamique
    showSaleAnimation(member);

    // Jouer le son de validation
    playSound();

    // Trier les membres par nombre de ventes
    let sortedSales = Object.entries(salesData).sort((a, b) => b[1] - a[1]);

    // Mettre à jour le classement à l'écran
    updateRanking(sortedSales);
}

function updateRanking(sortedSales) {
    const rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = "";
    sortedSales.forEach(([member, sales]) => {
        const gain = calculateGain(sales);  // Calculer le gain en fonction des ventes
        const listItem = document.createElement("li");
        listItem.innerHTML = `${member}: <span class="sales">${sales}</span> <span class="sales">vente(s)</span> - <span class="gain">${gain}€</span>`;  // Ajouter la classe 'sales' au mot "vente(s)"
        rankingList.appendChild(listItem);
    });
}

function resetSales() {
    for (let member in salesData) {
        salesData[member] = 0;
    }
    updateRanking(Object.entries(salesData).sort((a, b) => b[1] - a[1]));
}

// Fonction pour afficher l'animation "+1"
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

// Fonction pour jouer le son
function playSound() {
    const audio = new Audio('son_buzzer.mp3');  // Assurez-vous que le fichier son est dans le même répertoire
    audio.play();
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