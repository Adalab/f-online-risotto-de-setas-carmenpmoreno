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
    createSectionList(recipe);
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
function createSectionList(recipe) {
    const sectionList = document.createElement('section');
    sectionList.classList.add('section-list');
    mainSection.appendChild(sectionList);
    getIngredientes(recipe, sectionList);

}
// creo la lista de ingredientes
// obtengo ingredientes de data
function getIngredientes(recipe, sectionList) {
    const allIngredients = recipe.ingredients.map(ingredient => {
        const listItemSelector = document.createElement('li');
        const listItemContent = document.createTextNode(ingredient.product);
        const listItem = listItemSelector.appendChild(listItemContent);
        console.log(listItemSelector);
        sectionList.appendChild(listItemSelector);
    })
}
