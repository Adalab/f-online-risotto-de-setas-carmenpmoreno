const shippingCost = 7;
const headerSection = document.querySelector('.header-section');
const mainSection = document.querySelector('.main-section');
let ingredientsSelected = [];
let subtotal = 0;
let total = 0;
let items = 0;

fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
    .then(response => response.json())
    .then(data => {
        recipe = data.recipe;
        return (
            paintData(recipe)
        );
    })

function paintData(recipe) {
    const classArticleSection = 'section-articles';
    const classPriceSection = 'section-price';

    paintElement(headerSection, recipe.name, 'h2', 'class', 'main-title');
    paintElement(headerSection, 'Seleccionar todo', 'button', 'type', 'button')
    paintElement(headerSection, 'Deseleccionar todo', 'button', 'type', 'button')

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
function handleIngredientInput(event) {
    event.currentTarget.classList.toggle('checked');
    console.log('total: ', total);
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
    const articleTotal = document.querySelector('.total-article');
    const articleTotalNew = document.querySelector('.total-article-new');
    if (articleTotal) {
        const result = ingredientsSelected.reduce((acc, number) => acc + number);
        let newSubtotal = result;
        total = newSubtotal + shippingCost;
        console.log('subtotal actual', newSubtotal);
        console.log('nuevo total', total);

        const sectionList = document.querySelector('.section-price');
        paintElement(sectionList, "", 'article', 'class', 'total-article-new');
        const articleTotalNew = document.querySelector('.total-article-new');
        const articleTotal = document.querySelector('.total-article');
        const parentArticle = articleTotal.parentNode;
        parentArticle.replaceChild(articleTotalNew, articleTotal);
    
        paintElement(articleTotalNew, 'Subtotal: ', 'h3', 'class', 'subtotal-title');
        paintElement(articleTotalNew, newSubtotal, 'p', 'class', 'subtotal')
        paintElement(articleTotalNew, 'Gastos de envío: ', 'h3', 'class', 'shipping-cost-title');
        paintElement(articleTotalNew, shippingCost, 'p', 'class', 'shipping-cost')
        paintElement(articleTotalNew, `Total: ${total}`, 'h3', 'class', 'total-title');
        paintElement(articleTotalNew, `Comprar ingredientes: ${total} `, 'button', 'class', 'button-buy');
    
        console.log('sustituyo total');
    } 
    else if(articleTotalNew) {
        const result = ingredientsSelected.reduce((acc, number) => acc + number);
        let newSubtotal = result;
        total = newSubtotal + shippingCost;
        console.log('subtotal actual', newSubtotal);
        console.log('nuevo total', total);

        const sectionList = document.querySelector('.section-price');
        const articleTotalNew = document.querySelector('.total-article-new');
        paintElement(sectionList, "", 'article', 'class', 'total-article');
        const articleTotal = document.querySelector('.total-article');
        const parentArticle = articleTotalNew.parentNode;
        parentArticle.replaceChild(articleTotal, articleTotalNew);
        
        paintElement(articleTotal, 'Subtotal: ', 'h3', 'class', 'subtotal-title');
        paintElement(articleTotal, newSubtotal, 'p', 'class', 'subtotal')
        paintElement(articleTotal, 'Gastos de envío: ', 'h3', 'class', 'shipping-cost-title');
        paintElement(articleTotal, shippingCost, 'p', 'class', 'shipping-cost')
        paintElement(articleTotal, `Total: ${total}`, 'h3', 'class', 'total-title');
        paintElement(articleTotal, `Comprar ingredientes: ${total} `, 'button', 'class', 'button-buy');
    } 
    else {
        const sectionList = document.querySelector('.section-price');
        const result = ingredientsSelected.reduce((acc, number) => acc + number);
        let newSubtotal = result;
        total = newSubtotal + shippingCost;
        console.log('subtotal actual', newSubtotal);
        console.log('nuevo total', total);
    
        paintElement(sectionList, "", 'article', 'class', 'total-article');
        const articleTotal = document.querySelector('.total-article');
        paintElement(articleTotal, 'Subtotal: ', 'h3', 'class', 'subtotal-title');
        paintElement(articleTotal, newSubtotal, 'p', 'class', 'subtotal')
        paintElement(articleTotal, 'Gastos de envío: ', 'h3', 'class', 'shipping-cost-title');
        paintElement(articleTotal, shippingCost, 'p', 'class', 'shipping-cost')
        paintElement(articleTotal, `Total: ${total}`, 'h3', 'class', 'total-title');
        paintElement(articleTotal, `Comprar ingredientes: ${total} `, 'button', 'class', 'button-buy');
    
        console.log('imprimo total');
    }
}

// botón seleccionar todo
    // listener botón
    // click -> add checked en todos los input (y por tanto push de todos los precios)
// botón deseleccionar todo
    // listener botón
    // click -> remove checked en todos los input (volver a array vacío)