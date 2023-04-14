import recipesArray from './recipes.js';
import create from "./utils/create.js";
import clearDoubles from "./utils/clearDoubles.js";
import lowerCaseTable from "./utils/lowerCaseTable.js";
import recipesFromInput from './algoFor.js';
import displayCards from './displayCards.js'
import displayTags from './displayTags.js'

const ingredientsDOM = document.getElementById("ingredients-list");
const appareilsDOM   = document.getElementById("appareils-list");
const ustensilesDOM  = document.getElementById("ustensils-list");
const searchBar      = document.getElementById('searchbar');
let keyWordsToSearch = [];
let currentIngredientsList = [];
let currentAppareilsList = [];
let currentUstensilesList = [];

const searchIngredients = document.getElementById('search-ingredients');
// const searchAppareils = document.getElementById('search-appareils');
const searchUstensiles = document.getElementById('search-ustensiles');


// // searchIngredients
// // searchAppareils
searchUstensiles.addEventListener('input', () => {
    let userSearch = '';
  
    // recuperer liste d'ustensiles (actuellement affichée)
    console.log(currentUstensilesList)
    // TODO: filtrer cette liste, donc un genre de filterRecipes()

    // TODO: erase the list

    // Display the list again
    drawFilterItem(currentIngredientsList, ingredientsDOM);
  });

const getFiltersByType = (recipes, filterType) => {
    switch (filterType) {
        case 'ingredients':
            let ingredients = [];
            recipes.forEach((recipe) => {
                ingredients.push(...recipe[1].ingredients.map(ingredient => ingredient.ingredient));
            })
            return ingredients = clearDoubles(lowerCaseTable(ingredients)); // tous les ingredients uniques
        case 'appareils':
            let appareils = [];
            recipes.forEach((recipe) => {
                appareils.push(recipe[1].appliance);
            })
            return appareils = clearDoubles(lowerCaseTable(appareils)); // tous les appareils uniques
        case 'ustensiles':
            let ustensiles = [];
            recipes.forEach((recipe) => {
                ustensiles.push(...recipe[1].ustensils);
            })
            return ustensiles = clearDoubles(lowerCaseTable(ustensiles)); // tous les ustensiles uniques
    }
}

const removeFilters = () => {
    const displayedFilters = Array.from(document.getElementsByClassName("filter"));
    displayedFilters.forEach(filter => filter.remove())
}

const filtersHandler = () => {
    const keyWords = Array.from(document.getElementsByClassName('filter'));
    let userSearch = searchBar.value;

    keyWords.forEach((keyWord) => {

        keyWord.addEventListener('click', () => {
            if(keyWordsToSearch.includes(keyWord.textContent)){
                // delete keyword if already active
                keyWordsToSearch.splice(keyWordsToSearch.indexOf(keyWord.textContent), 1);
            }else{
                // add keyword
                keyWordsToSearch.push(keyWord.textContent);
            }

            console.log(keyWord.parentElement.id);

            let filteredRecipes = recipesFromInput(recipesArray, userSearch, keyWordsToSearch);
            displayCards(filteredRecipes);
            displayFilters(filteredRecipes);
            displayTags(keyWordsToSearch);
        })
    })
}

const drawFilterItem = (itemList, domElement) => {
    itemList.forEach((filter) => {
        const filterItem = create('li', {class: 'filter'});
        filterItem.innerHTML = filter;
        domElement.appendChild(filterItem);
    })
}

export const displayFilters = (recipes) => {
    removeFilters();
    currentIngredientsList = getFiltersByType(recipes, 'ingredients')
    currentAppareilsList = getFiltersByType(recipes, 'appareils')
    currentUstensilesList = getFiltersByType(recipes, 'ustensiles')

    drawFilterItem(currentIngredientsList, ingredientsDOM);
    drawFilterItem(currentAppareilsList, appareilsDOM);
    drawFilterItem(currentUstensilesList, ustensilesDOM);
    filtersHandler();
}