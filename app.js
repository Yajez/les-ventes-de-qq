// Données initiales des ventes
let salesData = {
    "Julien": 0,
    "Thomas": 0,
    "Laetitia": 0,
    "Charles": 0,
    "Mehdi": 0,
    "Guillaume": 0,
    "Oussama": 0
};

// Fonction pour valider une vente et mettre à jour le classement
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

// Fonction pour mettre à jour le classement
function updateRanking(sortedSales) {
    const rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = "";
    sortedSales.forEach(([member, sales]) => {
        const gain = calculateGain(sales);  // Calculer le gain en fonction des ventes
        const listItem = document.createElement("li");

        // Créer les 3 colonnes (prénom, ventes, gain)
        const nameColumn = document.createElement("div");
        nameColumn.classList.add("column");
        nameColumn.textContent = member;

        const salesColumn = document.createElement("div");
        salesColumn.classList.add("column");
        // Modification ici pour enlever le tiret après "vente(s)"
        salesColumn.textContent = `${sales} vente${sales > 1 ? 's' : ''}`;

        const gainColumn = document.createElement("div");
        gainColumn.classList.add("column");
        gainColumn.textContent = `${gain}€`;

        // Ajouter les colonnes au li
        listItem.appendChild(nameColumn);
        listItem.appendChild(salesColumn);
        listItem.appendChild(gainColumn);

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

// Fonction pour récupérer les données de Firebase (si nécessaire)
function getSalesDataFromFirebase() {
    // Remplace ce code avec la méthode de récupération depuis Firebase
    // par exemple : onValue(ref(database, 'salesData'), (snapshot) => {...});
}

// Écouter les changements en temps réel dans la base de données Firebase (si tu utilises Firebase)
// onValue(ref(database, 'salesData'), (snapshot) => {
//     salesData = snapshot.val() || {};  // Prendre les données ou un objet vide si pas encore initialisé
//     let sortedSales = Object.entries(salesData).sort((a, b) => b[1] - a[1]);
//     updateRanking(sortedSales);
// });