import recipesArray from './recipes.js';
import create from "./utils/create.js";
import clearDoubles from "./utils/clearDoubles.js";
import lowerCaseTable from "./utils/lowerCaseTable.js";
import filterRecipes from './filterRecipes.js';
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
const searchAppareils = document.getElementById('search-appareils');
const searchUstensiles = document.getElementById('search-ustensiles');

// prend une liste et renvoie une liste filtrée par le userSearch
const filterList = (list, userSearch) => {
    return list.filter((item) => item.includes(userSearch))
}

const filterListOnInput = (listDomElement, searchDomElement, listName) => {
    searchDomElement.addEventListener('input', () => {
        let userSearch = searchDomElement.value;
        userSearch = userSearch.toLowerCase();
        
        let currentList = '';

        if (listName === 'ingredients') {
            currentList = currentIngredientsList;
        } else if (listName === 'appareils') {
            currentList = currentAppareilsList;
        } else if (listName === 'ustensiles') {
            currentList = currentUstensilesList;
        }
    
        // filtrer la liste actuellement affichée
        const filteredList = filterList(currentList, userSearch);
    
        // Erase the current list
        listDomElement.innerHTML = '';
    
        // Display the list again
        drawFilterItem(filteredList, listDomElement);
        // Add eventListener to the new list
        filtersHandler();
    });
}

// Activate the event listeners on the 3 search bars
filterListOnInput(ingredientsDOM, searchIngredients, 'ingredients');
filterListOnInput(appareilsDOM, searchAppareils, 'appareils');
filterListOnInput(ustensilesDOM, searchUstensiles, 'ustensiles');

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

            let filteredRecipes = filterRecipes(recipesArray, userSearch, keyWordsToSearch);
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