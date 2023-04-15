import recipesArray from './recipes.js';
import displayCards from './displayCards.js';
import filterRecipes from './filterRecipes.js';
import { displayFilters } from './filters.js';

displayCards(recipesArray);
displayFilters(recipesArray);

const searchBar = document.getElementById('searchbar');
const filtersContainers = Array.from(document.getElementsByClassName('filters-container'));
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

filtersContainers.forEach((container) => {

  container.addEventListener('click', () => {

    const hasClass = container.classList.contains('opened');

    filtersContainers.forEach(sibling => {
      if(sibling.classList.contains('opened')){
        sibling.classList.remove('opened');
      }
    });

    if(!hasClass){
      container.classList.add('opened');
    }else{
      container.classList.remove('opened');
    }

  })
})