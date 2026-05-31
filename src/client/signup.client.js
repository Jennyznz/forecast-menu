const signUpForm = document.getElementById('sign-up-form');

signUpForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usernameInput = signUpForm.querySelector('#username').value;
    const usernameErr = signUpForm.querySelector('#username-err-msg');
    const pwInput = signUpForm.querySelector('#password').value;
    const pwErr = signUpForm.querySelector('#pw-err-msg');
    const confirmPwInput = signUpForm.querySelector('#confirm-password').value;
    const confirmPwErr = signUpForm.querySelector('#confirm-pw-err-msg');

    usernameErr.textContent = '';
    pwErr.textContent = '';
    confirmPwErr.textContent = '';

    if (usernameInput.length < 1) {
        usernameErr.textContent = "This field is required.";
        return; // One error message at a time
    }

    if (pwInput.length < 1) {
        pwErr.textContent = "This field is required.";
        return; 
    }

    if (confirmPwInput.length < 1) {
        confirmPwErr.textContent = "This field is required.";
        return; 
    }

    if (pwInput.length < 8) {
        pwErr.textContent = "Password length must be at least 8 characters.";
        return; 
    }

    if (pwInput !== confirmPwInput) {
        confirmPwErr.textContent = "Password mismatch.";
        return
    }

    try {
        const response = await fetch('/user/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: usernameInput,
                password: pwInput
            })
        });

        if (response.ok) {
            console.log(await response.json());
            signUpForm.style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
        } else {
            const errorMsg = await response.json();
            signUpForm.style.display = 'none';
            document.getElementById('failure-message').style.display = 'block';
            document.getElementById('failure-details').textContent = errorMsg.error;
        }

    } catch {
        console.log('Error submitting sign up form.', error);
    }


});