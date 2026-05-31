const loginForm = document.getElementById('login-form');

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('HEY');
    const username = loginForm.querySelector('#username').value;
    const password = loginForm.querySelector('#password').value;
    const errMsg = loginForm.querySelector('#login-err-msg');
    console.log(username);
    console.log(password);

    errMsg.textContent = '';

    if (username.length < 1) {
        errMsg.textContent = 'Username field cannot be empty.';
        return;
    }

    if (password.length < 1) {
        errMsg.textContent = 'Password field cannot be empty.';
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