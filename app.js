// 1. Importer les fonctions nécessaires de Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9tjKvcFRxPPAkrfjErEUT_olHEaYvzQg",
  authDomain: "lesventesdeqq.firebaseapp.com",
  databaseURL: "https://lesventesdeqq-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "lesventesdeqq",
  storageBucket: "lesventesdeqq.appspot.com",
  messagingSenderId: "1015169103890",
  appId: "1:1015169103890:web:93208d282f91ddb09e00cb"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 4. Récupérer la base de données
const database = getDatabase(app);

// 5. Définir les ventes initiales dans Firebase
function initializeSalesData() {
  const salesData = {
    "Julien": 0,
    "Thomas": 0,
    "Laetitia": 0,
    "Charles": 0,
    "Mehdi": 0,
    "Guillaume": 0,
    "Oussama": 0
  };

  // Définir les données dans Firebase à 'salesData'
  set(ref(database, 'salesData'), salesData)
    .then(() => {
      console.log('Ventes initialisées dans la base de données.');
    })
    .catch((error) => {
      console.error('Erreur lors de l\'initialisation des ventes : ', error);
    });
}

// Appeler la fonction pour initialiser les données une seule fois
initializeSalesData();

// 6. Logiciel pour valider les ventes et mettre à jour la base de données
let salesData = {};

function validateSale(member) {
  // Augmenter le compteur de ventes localement
  salesData[member]++;
  
  // Mettre à jour la base de données Firebase
  set(ref(database, 'salesData/' + member), salesData[member]);

  // Afficher l'animation et jouer le son
  showSaleAnimation(member);
  playSound();

  // Trier et afficher le classement
  let sortedSales = Object.entries(salesData).sort((a, b) => b[1] - a[1]);
  updateRanking(sortedSales);
}

// 7. Écouter les changements en temps réel dans Firebase
onValue(ref(database, 'salesData'), (snapshot) => {
  salesData = snapshot.val() || {}; // Prendre les données ou un objet vide si pas encore initialisé
  let sortedSales = Object.entries(salesData).sort((a, b) => b[1] - a[1]);
  updateRanking(sortedSales);
});

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

// Fonction pour mettre à jour le classement
function updateRanking(sortedSales) {
  const rankingList = document.getElementById("ranking-list");
  rankingList.innerHTML = "";
  
  sortedSales.forEach(([member, sales]) => {
    const gain = calculateGain(sales);  // Calculer le gain en fonction des ventes
    const listItem = document.createElement("li");
    listItem.innerHTML = `${member}: <span class="sales">${sales}</span> <span class="sales">vente(s)</span> - <span class="gain">${gain}€</span>`;
    rankingList.appendChild(listItem);
  });
}