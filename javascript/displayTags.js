import create from "./utils/create.js";
import recipesArray from './recipes.js';
import recipesFromInput from './algoFor.js';
import displayCards from './displayCards.js'
import { displayFilters } from "./filters.js";
import { getAppareils, getIngredients, getUstensils } from './getLists.js'

const tagsContainer  = document.getElementById('tags');
const searchBar      = document.getElementById('searchbar');
const allIngredients = getIngredients(recipesArray);
const allAppareils   = getAppareils(recipesArray);
// const allUstensils   = getUstensils(recipesArray);

const removeTags = () => {
    const displayedTags = Array.from(document.getElementsByClassName("tag"));
    displayedTags.forEach(tag => tag.remove())
}

const tagHandler = (keyWordsToSearch) => {
    const tags = Array.from(document.getElementsByClassName('tag'));
    let userSearch = searchBar.value;

    tags.forEach((tag) => {
        tag.addEventListener('click', () => {
            
            keyWordsToSearch.splice(keyWordsToSearch.indexOf(tag.textContent), 1);
            tag.remove(); 

            let filteredRecipes = recipesFromInput(recipesArray, userSearch, keyWordsToSearch);
            displayCards(filteredRecipes);
            displayFilters(filteredRecipes);
            displayTags(keyWordsToSearch);
        })
    })
}

const displayTags = (tags) => {
    removeTags();

    tags.forEach((tag) => {
        const tagItem = create('span', {class: `tag ${getColorForTag(tag)}`});
        tagItem.innerHTML = tag;
        tagsContainer.appendChild(tagItem);
    })
    tagHandler(tags);
}

const getColorForTag = (tag) => {
    if (allIngredients.includes(tag)) {
        return 'blue';
    }else if(allAppareils.includes(tag)){
        return 'green';
    }else{
        return 'orange';
    }
}

export default displayTags;