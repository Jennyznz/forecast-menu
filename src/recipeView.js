function displayRecipe() {
    const content = document.createElement('div');
    content.id = 'recipe-view-content';

    content.append(
        createToolbar(), 
        createTitle(), 
        createPhoto(), 
        createDescription(), 
        createIngredients(),
        createInstructions());
    return content;
}

function createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.id = 'toolbar';

    const toolbarLeft = document.createElement('div');
    toolbarLeft.id = 'toolbar-left'

    const toolbarRight= document.createElement('div');
    toolbarRight.id = 'toolbar-right'
    
    const backBtn = document.createElement('button');
    backBtn.id = 'back-btn';
    backBtn.textContent = 'Back';

    toolbarLeft.append(backBtn);

    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-btn';

    const editBtn = document.createElement('button');
    editBtn.id = 'edit-btn';
    editBtn.textContent = 'Edit';

    toolbarRight.append(saveBtn, editBtn);

    toolbar.append(toolbarLeft, toolbarRight);
    return toolbar;
}

function createTitle() {
    const title = document.createElement('h1');
    title.id = 'title';
    title.textContent = 'Recipe title'; // FILLER
    return title;
}

function createPhoto() {
    const photo = document.createElement('img');
    photo.id = 'photo';
    photo.src = '../assets/food.svg'; // FILLER
    photo.alt = 'Photo of a pie';

    return photo;
}

function createDescription() {
    const description = document.createElement('div');
    description.id = 'description';
    description.textContent = 'A short description';    // FILLER   
    return description;
}

function createIngredients() {
    const container = document.createElement('div');
    container.id = 'ingredients-container';
    
    const label = document.createElement('h2');
    label.id = 'ingredients-label';
    label.textContent = 'Ingredients: ';

    const list = document.createElement('ul');
    list.id = 'ingredients-list';

    const ingredient = document.createElement('li');    // FILLER
    ingredient.classList.add('ingredient');
    ingredient.textContent = 'Ingredient One';
    list.append(ingredient);

    container.append(label, list);
    return container;
}

function createInstructions() {
    const container = document.createElement('div');
    container.id = 'instructions-container';
    
    const label = document.createElement('h2');
    label.id = 'instructions-label';
    label.textContent = 'Instructions: ';

    const list = document.createElement('ol');
    list.id = 'instructions-list';

    const instruction = document.createElement('li');    // FILLER
    instruction.classList.add('instruction');
    instruction.textContent = 'Instruction One';
    list.append(instruction);

    container.append(label, list);
    return container;
}

export { displayRecipe };