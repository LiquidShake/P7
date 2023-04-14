import clearDoubles from "./utils/clearDoubles.js";
import lowerCaseTable from "./utils/lowerCaseTable.js";

export const getIngredients = (recipes) => {
    let ingredients = [];
    recipes.forEach((recipe) => {
        ingredients.push(...recipe[1].ingredients.map(ingredient => ingredient.ingredient));
    })
    return ingredients = clearDoubles(lowerCaseTable(ingredients)); // tous les ingredients uniques
}

export const getAppareils = (recipes) => {
    let appareils = [];
    recipes.forEach((recipe) => {
        appareils.push(recipe[1].appliance);
    })
    return appareils = clearDoubles(lowerCaseTable(appareils)); // tous les appareils uniques
}

export const getUstensils = (recipes) => {
    let ustensiles = [];
    recipes.forEach((recipe) => {
        ustensiles.push(...recipe[1].ustensils);
    })
    return ustensiles = clearDoubles(lowerCaseTable(ustensiles)); // tous les ustensiles uniques
}