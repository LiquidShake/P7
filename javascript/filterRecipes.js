// Prends toutes les recettes + la recherche texte + les filtres actifs
const filterRecipes = (allRecipes, userSearch = '', keyWords = []) => {
  // Conversion de la chaîne de recherche en minuscules pour une correspondance insensible à la casse
  userSearch = userSearch.toLowerCase();

  // Utilisation de la méthode filter pour filtrer les recettes correspondantes
  const filteredRecipes = allRecipes.filter(recipe => {
    // On créé un tableau vide qui recevra la liste des ingrédients de la recette
    const ingredientsList = recipe[1].ingredients.map(ingredient => ingredient.ingredient);

    // Vérification si la recherche utilisateur correspond à la recette
    const isUserSearchMatching = userSearch === '' || isSearchInRecipe(recipe[1], userSearch, ingredientsList);

    // Vérification si les mots-clés correspondent à la recette
    const areKeyWordsMatching = keyWords.length === 0 || areKeywordsInRecipe(recipe[1], keyWords, ingredientsList);

    // Retourne true si la recette correspond aux critères de recherche, false sinon
    return isUserSearchMatching && areKeyWordsMatching;
  });

  // Renvoi du tableau des recettes correspondantes
  return filteredRecipes;
}

export default filterRecipes;



// Vérification si la chaîne de recherche est présente dans le titre, les ingrédients ou la description de la recette
const isSearchInRecipe = (recipe, userSearch, ingredientsList) => {

  if (recipe.name.toLowerCase().includes(userSearch) ||
  ingredientsList.some((ingredient) => ingredient.toLowerCase().includes(userSearch)) ||
  recipe.description.toLowerCase().includes(userSearch)) {

    return true;

  }

  return false
}

// Renvoie true si au moins un keyword est présent dans les appliance, ingredients ou ustensils de la recette
const areKeywordsInRecipe = (recipe, keyWords, ingredientsList) => {
  for (let j = 0; j < keyWords.length; j++) {
    const keyWord = keyWords[j];

    if ((recipe.appliance.toLowerCase().includes(keyWord) ||
      ingredientsList.some((ingredient) => ingredient.toLowerCase().includes(keyWord)) ||
      recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(keyWord))) === false) {
      
      return false;

    }
  }

  return true;
}