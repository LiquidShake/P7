const recipesFromInput = (allRecipes, userSearch = '', keyWords = []) => {

  // Conversion de la chaîne de recherche en minuscules pour une correspondance insensible à la casse
  userSearch = userSearch.toLowerCase();

  // Tableau pour stocker les recettes correspondantes
  const filteredRecipes = [];
  let matchingUserSearch = false;
  let matchingKeyWords = false;

  // Boucle sur chaque recette
  for (let i = 0; i < allRecipes.length; i++) {
    const recipe = allRecipes[i];
    matchingUserSearch = false;
    matchingKeyWords = false;

    // On créé un tableau vide qui recevra la liste des ingrédients de la recette
    const ingredientsList = recipe[1].ingredients.map(ingredient => ingredient.ingredient);

    if(userSearch === '' || isSearchInRecipe(recipe[1], userSearch, ingredientsList)){
      matchingUserSearch = true;
    }
    
    if(keyWords.length === 0 || areKeywordsInRecipe(recipe[1], keyWords, ingredientsList)){
      matchingKeyWords = true;
    }

    if(matchingUserSearch && matchingKeyWords){
      // Ajout de la recette au tableau des recettes filtrées
      filteredRecipes.push(recipe);
    }
  }

  // Renvoi du tableau des recettes correspondantes
  return filteredRecipes;
}

export default recipesFromInput;



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