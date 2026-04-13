function displayForms() {
    const main = document.getElementById('main-container');
    main.textContent = '';

    const formContainer = document.createElement('div');
    formContainer.id = 'form-container';

    const formOptions = document.createElement('div');
    formOptions.id = 'form-options';
    const signupOption = document.createElement('div');
    signupOption.id = 'signup-option';
    const loginOption = document.createElement('div');
    loginOption.id = 'login-option';

    const formContent = document.createElement('div');
    formContent.id = 'form-content';
}

function displaySignup() {
    const content = document.createElement('div');

    const form = document.createElement('form');
    form.id = 'sign-up-form';
    form.method = 'post';
    // form.actions = '';

    const nameLabel = document.createElement('label');
    

    return content;
}

function displayLogin() {
    const content = document.createElement('div');
    return content;
}