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

export const displayFilters = (recipes) => {
    removeFilters();
    getFiltersByType(recipes, 'ingredients').forEach((filter) => {
        const filterItem = create('li', {class: 'filter'});
        filterItem.innerHTML = filter;
        ingredientsDOM.appendChild(filterItem);
    })
    getFiltersByType(recipes, 'appareils').forEach((filter) => {
        const filterItem = create('li', {class: 'filter'});
        filterItem.innerHTML = filter;
        appareilsDOM.appendChild(filterItem);
    })
    getFiltersByType(recipes, 'ustensiles').forEach((filter) => {
        const filterItem = create('li', {class: 'filter'});
        filterItem.innerHTML = filter;
        ustensilesDOM.appendChild(filterItem);
    })
    filtersHandler();
}