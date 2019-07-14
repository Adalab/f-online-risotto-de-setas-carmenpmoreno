const headerSection = document.querySelector('.header-section');
const mainSection = document.querySelector('.main-section');
let recipe = {}
let ingredientsSelected = [];
let subtotal = ""

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
    .then(response => response.json())
    .then(data => {
        recipe = data.recipe;
        return (
            paintData(recipe)
        );
    })
function paintData(recipe) {
    paintElement(headerSection, recipe.name, 'h2', 'class', 'main-title');
    paintElement(headerSection, 'Seleccionar todo', 'button', 'type', 'button')
    paintElement(headerSection, 'Deseleccionar todo', 'button', 'type', 'button')
    const classArticleSection = 'section-articles';
    const classPriceSection = 'section-price';
    createSection(recipe, classArticleSection);
    createSection(recipe, classPriceSection, subtotal);

    const ingredientInputs = document.querySelectorAll('.ingredient-input');
    for (const ingredientInput of ingredientInputs) {
        ingredientInput.addEventListener('click', handleIngredientInput);
    }
}
function paintElement(section, node, element, atribute, nameAtribute) {
    const elementSelector = document.createElement(element);
    const elementContent = document.createTextNode(node);
    elementSelector.appendChild(elementContent);
    section.appendChild(elementSelector);
    elementSelector.setAttribute(atribute, nameAtribute);
}
function createSection(recipe, classList, subtotal) {
    const sectionList = document.createElement('section');
    sectionList.classList.add(classList);
    mainSection.appendChild(sectionList);
    if (sectionList.classList.contains('section-articles')) {
        createArticles(recipe, sectionList);
    } else {
        paintElement(sectionList, '', 'section', 'class', 'section-total');
        paintElement(sectionList, 'Comprar ingredientes: ', 'button', 'class', 'button-buy');
        const buttonBuy = document.querySelector('.button-buy');
        console.log(buttonBuy);
        buttonBuy.addEventListener('click', handleButtonBuy);
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
    inputSelector.setAttribute('value', ingredient.price);
    inputSelector.setAttribute('name', 'ingredient-price');
    labelSelector.appendChild(inputSelector);
}
function createArticlesubtitles(subtitle, articleSelector, unit) {
    const subtitleSelector = document.createElement('h4');
    const subtitleContent = document.createTextNode(subtitle + unit);
    subtitleSelector.appendChild(subtitleContent);
    articleSelector.appendChild(subtitleSelector);
}
// INTERACCIONES: guardar precio en array ingredientsSelected cada vez que se selecciona:
// listener sobre todos los input (funcion paint data)
function handleIngredientInput(event) {
    event.currentTarget.classList.toggle('checked');
    // input checked -> añado elemento al array y si antes no lo he añadido
    if (event.currentTarget.classList.contains('checked')
        && !ingredientsSelected.find(price => price === event.currentTarget.value)) {
        const numberPrice = parseFloat(event.currentTarget.value);
        const newingredientsSelected = ingredientsSelected.push(numberPrice);
        //  si no checked -> elimino ese elemento del array si estuviese incluído
    } else {
        const newingredientsSelected = ingredientsSelected.filter(price => price !== parseFloat(event.currentTarget.value));
        ingredientsSelected = newingredientsSelected;
    }
}
// cuando pulso botón comprar, se pinta la sección con el precio:
function handleButtonBuy(event) {
    printSubtotal();
}
function printSubtotal() {
    const result = ingredientsSelected.reduce((acc, number) => acc + number);
    let newSubtotal = result;
    console.log(newSubtotal);
    const sectionList = document.querySelector('.section-total');
    paintElement(sectionList, 'Subtotal: ', 'h3', 'class', 'subtotal-title');
    paintElement(sectionList, newSubtotal, 'p', 'class', 'subtotal')
    paintElement(sectionList, 'Gastos de envío: ', 'h3', 'class', 'shippinf-cost-title');
    paintElement(sectionList, "", 'p', 'class', 'shipping-cost')
    paintElement(sectionList, 'Total: ', 'h3', 'class', 'total-title');
    paintElement(sectionList, "", 'p', 'class', 'total')
    console.log('imprimo total');
}

// botón seleccionar todo
    // listener botón
    // click -> add checked en todos los input (y por tanto push de todos los precios)
// botón deseleccionar todo
    // listener botón
    // click -> remove checked en todos los input (volver a array vacío)