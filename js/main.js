const headerSection = document.querySelector('.header-section');
const mainSection = document.querySelector('.main-section');

// fetch para traer los datos de la receta
fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
    .then(response => response.json())
    .then(data => {
        const recipe = data.recipe;
        return (
            paintData(recipe)
        );
    })
// función que pinta todo el main con datos del fetch
function paintData(recipe) {
    paintTitle(recipe);
    createSectionArticles(recipe);
}
// pinto el título de la receta en el header
function paintTitle(recipe) {
    const title = document.createTextNode(recipe.name);
    const titleSelector = document.createElement('h2');
    titleSelector.classList.add('title');
    titleSelector.appendChild(title);
    headerSection.appendChild(titleSelector);
}
// creo sección para lista
function createSectionArticles(recipe) {
    const sectionList = document.createElement('section');
    sectionList.classList.add('section-list');
    mainSection.appendChild(sectionList);
    createArticles(recipe, sectionList);
}
// creo la lista de ingredientes, cada uno en un article
function createArticles(recipe, sectionList) {
    recipe.ingredients.map(ingredient => {
        const articleSelector = document.createElement('article');
        createLabel(ingredient, articleSelector);
        createArticlesubtitles(ingredient.brand, articleSelector, "");
        createArticlesubtitles(ingredient.quantity, articleSelector, "");
        createArticlesubtitles(ingredient.price, articleSelector, "€");
        sectionList.appendChild(articleSelector);
    })
}
function createLabel(ingredient, articleSelector) {
    const labelSelector = document.createElement('label');
    createInput(ingredient, labelSelector);
    labelSelector.setAttribute('for', 'ingredient.product');
    const labelContent = document.createTextNode(ingredient.product);
    labelSelector.appendChild(labelContent);
    articleSelector.appendChild(labelSelector);
}
function createInput(ingredient, labelSelector) {
    const inputSelector = document.createElement('input');
    inputSelector.setAttribute('id', 'ingredient.product');
    inputSelector.setAttribute('type', 'checkbox');
    inputSelector.setAttribute('value', 'ingredient.product');
    inputSelector.setAttribute('name', 'ingredients');
    labelSelector.appendChild(inputSelector);
}
function createArticlesubtitles(subtitle, articleSelector, unit) {
    const subtitleSelector = document.createElement('h4');
    const subtitleContent = document.createTextNode(subtitle + unit);
    subtitleSelector.appendChild(subtitleContent);
    articleSelector.appendChild(subtitleSelector);
}