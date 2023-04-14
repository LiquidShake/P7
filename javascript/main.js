import recipesArray from './recipes.js';
import displayCards from './displayCards.js'
import recipesFromInput from './algoFor.js';
import { displayFilters } from './filters.js';

displayCards(recipesArray);
displayFilters(recipesArray);

const searchBar = document.getElementById('searchbar');
let filteredRecipes = [];
let userSearch = searchBar.value;

searchBar.addEventListener('input', () => {
    if(searchBar.value.length > 2){
        filteredRecipes = recipesFromInput(recipesArray, userSearch);
        displayCards(filteredRecipes);
        displayFilters(filteredRecipes);
    }
})