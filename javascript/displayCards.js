import create from "./utils/create.js";

const recipesGrid = document.getElementById("recipesGrid");

const createCard = (recipe) => {
    //image
    let image = create("img", {src: `https://source.unsplash.com/random/?${recipe[1].name.toLowerCase().split(" ")[0]}/`, alt: "card-image"});
    //title
    let title = create("h2", {class: "titre"});
    title.textContent = recipe[1].name;

    let timeParent = create("div", {class: "timer"});
    timeParent.innerHTML = "<p>" + recipe[1].time + " min</p>"

    //grouping the header elements
    let headerParent = create("div", {class: "content-head"});
    headerParent.appendChild(title);
    headerParent.appendChild(timeParent);

    //ingredients list
    let ingredients = create("div", {class: "ingredients"});

    let eachIngredient = recipe[1].ingredients.map(ingredient => 
        `<div><strong>${ingredient.ingredient}:</strong>
        ${ingredient.quantity ? ingredient.quantity : ''}${ingredient.unit ? ingredient.unit : ''}</div>`
    ).join("");

    ingredients.innerHTML = eachIngredient;

    //cook method
    let description = create("p", {class: "description"});
    description.textContent = recipe[1].description.slice(0, 250) + '...';
    
    //card body
    let cardBody = create("div", {class: "card-body card-content"});
    //combine in card body
    cardBody.appendChild(ingredients);
    cardBody.appendChild(description);

    //card container
    let cardContainer = create("article", {class: "recipe"});

    //combine to DOM
    cardContainer.appendChild(image);
    cardContainer.appendChild(headerParent);
    cardContainer.appendChild(cardBody);

    //put into DOM
    recipesGrid.appendChild(cardContainer);
}

const removeCards = () => {
    const displayedCards = Array.from(document.getElementsByClassName("recipe"));
    displayedCards.forEach(card => card.remove())
}

const displayCards = (recipes) => {
    removeCards();
    if(recipes.length === 0) {
        const noRecipes = create('p', {class: 'no-recipes recipe'});
        noRecipes.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc'
        recipesGrid.appendChild(noRecipes);
    }else {
        recipes.forEach((recipe) => {
            createCard(recipe)
        })
    }
}

export default displayCards;