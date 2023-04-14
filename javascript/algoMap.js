// Définir un tableau de recettes
let recettes = [
    {
      titre: "Poulet rôti aux herbes",
      ingredients: ["1 poulet", "2 branches de romarin", "3 gousses d'ail", "Sel et poivre"],
      description: "Un délicieux poulet rôti aux herbes de Provence et à l'ail."
    },
    {
      titre: "Ratatouille",
      ingredients: ["2 aubergines", "2 courgettes", "2 poivrons", "4 tomates", "1 oignon", "2 gousses d'ail"],
      description: "Une recette provençale de ratatouille avec des légumes frais."
    },
    {
      titre: "Tarte aux pommes",
      ingredients: ["1 pâte brisée", "4 pommes", "50g de sucre", "1 sachet de sucre vanillé", "25g de beurre"],
      description: "Une délicieuse tarte aux pommes avec une pâte croustillante et des pommes fondantes."
    }
  ];
  
  // Définir la fonction de recherche
  function rechercherRecettes(motCle) {
    // Utiliser la méthode map pour créer un nouveau tableau qui contient les recettes contenant le mot-clé
    let resultats = recettes.filter(recette => {
      // Vérifier si le mot-clé se trouve dans le titre, les ingrédients ou la description de la recette
      return recette.titre.toLowerCase().includes(motCle.toLowerCase()) ||
             recette.ingredients.some(ingredient => ingredient.toLowerCase().includes(motCle.toLowerCase())) ||
             recette.description.toLowerCase().includes(motCle.toLowerCase());
    });
  
    // Retourner les résultats
    return resultats;
  }
  
  // Utiliser la fonction de recherche pour trouver les recettes contenant le mot "pommes"
  let resultatPommes = rechercherRecettes("pommes");
  console.log(resultatPommes);
  
  // Utiliser la fonction de recherche pour trouver les recettes contenant le mot "ratatouille"
  let resultatRatatouille = rechercherRecettes("ratatouille");
  console.log(resultatRatatouille);