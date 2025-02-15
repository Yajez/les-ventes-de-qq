<script type="module">
  import { createClient } from '@supabase/supabase-js'

  const supabaseUrl = 'https://puibgqzzofpvrmjadddu.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1aWJncXp6b2ZwdnJtamFkZGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NDI5NDQsImV4cCI6MjA1NTIxODk0NH0.RX31oBb01V0u2a2J95vXXj2gEBA9fmO38-Sk0WeTK8I';
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Initialiser les données des ventes depuis Supabase
  async function getSalesData() {
    const { data, error } = await supabase.from('sales_data').select('*');
    if (error) {
      console.error('Erreur Supabase:', error);
      return;
    }
    return data.reduce((acc, { member, sales }) => {
      acc[member] = sales;
      return acc;
    }, {});
  }

  // Fonction pour valider une vente et mettre à jour le classement
  async function validateSale(member) {
    let salesData = await getSalesData();
    
    // Si les données de vente n'existent pas encore, initialiser
    if (!salesData[member]) {
      salesData[member] = 0;
    }

    // Augmenter le compteur de ventes dans la base de données
    salesData[member]++;

    // Sauvegarder dans Supabase
    const { error } = await supabase
      .from('sales_data')
      .upsert([{ member, sales: salesData[member] }], { onConflict: ['member'] });

    if (error) {
      console.error('Erreur lors de la mise à jour Supabase:', error);
      return;
    }

    // Afficher l'animation
    showSaleAnimation(member);

    // Trier et afficher le classement
    let sortedSales = Object.entries(salesData).sort((a, b) => b[1] - a[1]);
    updateRanking(sortedSales);
  }

  // Fonction pour mettre à jour le classement
  function updateRanking(sortedSales) {
    const rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = "";
    sortedSales.forEach(([member, sales]) => {
        const gain = calculateGain(sales);
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
      return sales * 5; 
    } else if (sales >= 10) {
      return sales * 4;
    } else {
      return sales * 3;
    }
  }

  // Fonction pour réinitialiser les ventes
  async function resetSales() {
    const confirmation = confirm('Êtes-vous sûr de vouloir réinitialiser toutes les ventes ?');
    if (confirmation) {
      const { error } = await supabase.from('sales_data').delete().gt('sales', 0);

      if (error) {
        console.error('Erreur lors de la réinitialisation Supabase:', error);
        return;
      }

      // Réinitialiser le classement affiché
      updateRanking([]);
    }
  }

  // Fonction pour afficher l'animation "+1"
  function showSaleAnimation(member) {
    const saleAnimation = document.createElement("div");
    saleAnimation.classList.add("sale-animation");
    saleAnimation.textContent = "+1";
    saleAnimation.style.color = "red"; 
    saleAnimation.style.fontSize = "50px";

    const button = document.querySelector(`button[onclick="validateSale('${member}')"]`);
    button.appendChild(saleAnimation);

    setTimeout(() => {
      saleAnimation.remove();
    }, 1000);
  }

  // Fonction pour initialiser Timothée si ce n'est pas déjà fait
  async function initializeTimothee() {
    let salesData = await getSalesData();

    // Si Timothée n'existe pas encore dans les données
    if (!salesData['Timothée']) {
      // Ajoutez-le avec 0 ventes
      const { error } = await supabase
        .from('sales_data')
        .upsert([{ member: 'Timothée', sales: 0 }], { onConflict: ['member'] });

      if (error) {
        console.error('Erreur lors de l\'initialisation de Timothée:', error);
      }
    }
  }

  // Initialiser Timothée et charger le classement au démarrage
  window.onload = async function() {
    await initializeTimothee();  // S'assurer que Timothée est initialisé
    const salesData = await getSalesData();
    const sortedSales = Object.entries(salesData).sort((a, b) => b[1] - a[1]);
    updateRanking(sortedSales);
  };
</script>