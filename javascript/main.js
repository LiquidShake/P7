import recipesArray from './recipes.js';
import displayCards from './displayCards.js';
import filterRecipes from './algoFor.js';
import { displayFilters } from './filters.js';

displayCards(recipesArray);
displayFilters(recipesArray);

const searchBar = document.getElementById('searchbar');
let filteredRecipes = [];

searchBar.addEventListener('input', () => {
  let userSearch = '';

  // Get active tags
  const keyWordsHTML = Array.from(document.getElementsByClassName('tag'));
  const keyWordsToSearch = keyWordsHTML.map((keyWord) => keyWord.textContent);

  // Only search if the search bar has at least 3 characters
  if (searchBar.value.length > 2) {
    userSearch = searchBar.value;
  }

  // Filter recipes + display everythi
  filteredRecipes = filterRecipes(recipesArray, userSearch, keyWordsToSearch);
  displayCards(filteredRecipes);
  displayFilters(filteredRecipes);
});
