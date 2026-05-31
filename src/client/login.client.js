const loginForm = document.getElementById('login-form');

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = loginForm.querySelector('#username').value;
    const password = loginForm.querySelector('#password').value;
    const usernameErrMsg = loginForm.querySelector('#username-err-msg');
    const pwErrMsg = loginForm.querySelector('#pw-err-msg');
    const errMsg = loginForm.querySelector('#login-err-msg');

    errMsg.textContent = '';
    usernameErrMsg.textContent = '';
    pwErrMsg.textContent = '';

    if (username.length < 1) {
        usernameErrMsg.textContent = 'Username field cannot be empty';
        return;
    }

    if (password.length < 1) {
        pwErrMsg.textContent = 'Password field cannot be empty';
        return;
    }

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (response.ok) {
            window.location.href = ('/');
        } else {
            const errResponse = await response.json();
            errMsg.textContent = errResponse.error;
        }

    } catch (err) {
        console.log('Error processing login form', err);
    }

});