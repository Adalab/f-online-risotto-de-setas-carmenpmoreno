const headerSection = document.querySelector('.header-section');
const mainSection = document.querySelector('.main-section');
const ingredientsSelected = [];

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
    .then(response => response.json())
    .then(data => {
        const recipe = data.recipe;
        return (
            paintData(recipe)
        );
    })
function paintData(recipe) {
    paintTitle(recipe);
    paintButton('Seleccionar todo', headerSection);
    paintButton('Deseleccionar todo', headerSection);
    const classArticleSection = 'section-articles';
    const classPriceSection = 'section-price';
    createSection(recipe, classArticleSection);
    createSection(recipe, classPriceSection);

    const ingredientInputs = document.querySelectorAll('.ingredient-input');
    console.log(ingredientInputs);
    for (const ingredientInput of ingredientInputs) {
        ingredientInput.addEventListener('click', handleIngredientInput);
    }
}
function paintTitle(recipe) {
    const title = document.createTextNode(recipe.name);
    const titleSelector = document.createElement('h2');
    titleSelector.classList.add('title');
    titleSelector.appendChild(title);
    headerSection.appendChild(titleSelector);
}
function paintButton(text, section) {
    const buttonSelector = document.createElement('button');
    const buttonText = document.createTextNode(text);
    buttonSelector.setAttribute('type', 'button');
    buttonSelector.appendChild(buttonText);
    section.appendChild(buttonSelector);
}
function createSection(recipe, classList) {
    const sectionList = document.createElement('section');
    sectionList.classList.add(classList);
    mainSection.appendChild(sectionList);
    if (sectionList.classList.contains('section-articles')) {
        createArticles(recipe, sectionList);
    } else {
        createPricestitles(sectionList, 'Subtotal: ');
        createPricestitles(sectionList, 'Gastos de envío: ');
        createPricestitles(sectionList, 'Total: ');
        paintButton('Comprar ingredientes: ', sectionList);
    }
}
function createArticles(recipe, sectionList) {
    recipe.ingredients.map(ingredient => {
        const articleSelector = document.createElement('article');
        createLabel(ingredient, articleSelector);
        if (ingredient.brand) {
            createArticlesubtitles(ingredient.brand, articleSelector, "");
        }
        createArticlesubtitles(ingredient.quantity, articleSelector, "");
        createArticlesubtitles(ingredient.price, articleSelector, " €");
        sectionList.appendChild(articleSelector);
    })
}
function createLabel(ingredient, articleSelector) {
    const labelSelector = document.createElement('label');
    createInput(ingredient, labelSelector);
    labelSelector.setAttribute('for', ingredient.product);
    const labelContent = document.createTextNode(ingredient.product);
    labelSelector.appendChild(labelContent);
    articleSelector.appendChild(labelSelector);
}
function createInput(ingredient, labelSelector) {
    const inputSelector = document.createElement('input');
    inputSelector.setAttribute('id', ingredient.product);
    inputSelector.setAttribute('class', 'ingredient-input');
    inputSelector.setAttribute('type', 'checkbox');
    inputSelector.setAttribute('value', ingredient.product);
    inputSelector.setAttribute('name', 'ingredients');
    labelSelector.appendChild(inputSelector);
}
function createArticlesubtitles(subtitle, articleSelector, unit) {
    const subtitleSelector = document.createElement('h4');
    const subtitleContent = document.createTextNode(subtitle + unit);
    subtitleSelector.appendChild(subtitleContent);
    articleSelector.appendChild(subtitleSelector);
}
function createPricestitles(sectionList, title) {
    const titleSelector = document.createElement('h3');
    const titleContent = document.createTextNode(title);
    titleSelector.appendChild(titleContent);
    sectionList.appendChild(titleSelector);
}
// INTERACCIONES

// guardar precio en array ingredientsSelected cada vez que se selecciona:
function handleIngredientInput(event) {
    console.log(event.currentTarget.value);
}
    // listener sobre todos los input (funcion paint data)

    // toggle clase checked cuanto se hace "click" en uninput
    // si checked -> push del ingredient.price a mi array ingredientsSelected
    // si no -> eliminar precio del array...
// pintar precio final en seccion precios
    // ...


// botón seleccionar todo
    // listener botón
    // click -> add checked en todos los input (y por tanto push de todos los precios)
// botón deseleccionar todo
    // listener botón
    // click -> remove checked en todos los input (volver a array vacío)