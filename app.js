// Import des modules Firebase nécessaires
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9tjKvcFRxPPAkrfjErEUT_olHEaYvzQg",
  authDomain: "lesventesdeqq.firebaseapp.com",
  databaseURL: "https://lesventesdeqq-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lesventesdeqq",
  storageBucket: "lesventesdeqq.appspot.com",
  messagingSenderId: "1015169103890",
  appId: "1:1015169103890:web:93208d282f91ddb09e00cb"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Initialisation des données locales
let salesData = {};

// Fonction pour valider une vente
function validateSale(member) {
  salesData[member]++;

  // Mettre à jour Firebase
  set(ref(database, `salesData/${member}`), salesData[member])
    .then(() => console.log(`Mise à jour réussie pour ${member}`))
    .catch((error) => console.error(`Erreur de mise à jour :`, error));

  updateRanking();
}

// Fonction pour réinitialiser les ventes
function resetSales() {
  for (const member in salesData) {
    salesData[member] = 0;
  }

  // Mettre à jour Firebase
  set(ref(database, `salesData`), salesData)
    .then(() => console.log("Ventes réinitialisées !"))
    .catch((error) => console.error(`Erreur lors de la réinitialisation :`, error));

  updateRanking();
}

// Fonction pour mettre à jour le classement
function updateRanking() {
  const rankingList = document.getElementById("ranking-list");
  rankingList.innerHTML = "";

  const sortedSales = Object.entries(salesData).sort((a, b) => b[1] - a[1]);
  sortedSales.forEach(([member, sales]) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${member}: ${sales} ventes`;
    rankingList.appendChild(listItem);
  });
}

// Écoute en temps réel pour les mises à jour de Firebase
onValue(ref(database, "salesData"), (snapshot) => {
  salesData = snapshot.val() || {};
  updateRanking();
});

// Exposer les fonctions globalement
window.validateSale = validateSale;
window.resetSales = resetSales;