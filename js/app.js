let emailInput = document.querySelector('#email');
let password = document.querySelector('#password');
let otherInputs = document.querySelectorAll('.options')
let errorEmail = document.querySelector('.erroremail');
let errorPassword = document.querySelector('.errorpassword');
let errorInputs = document.querySelectorAll('.errorinput')
let button = document.querySelector('.btn');
let errormessage;

/* 
 A. validateName funtion does the following:

 1. split the input value into two to check if it is two - firstName and LastName
 2. Check to make sure each name is more than one letter and not a number.
*/
function validateName() {
    let fullname = document.querySelector('#fullname');
    let errorName = document.querySelector('.errorname');
    let isName, names;

    function indicateError() {
        setTimeout(() => {
            errorName.innerHTML = '';
            fullname.classList.remove('error-class');
        }, 4000)
    }

    if (fullname !== "" && typeof fullname.value !== 'number') {
        names = fullname.value.split(' ');
        isName = names.every(key => key.length >= 2);

        if (names.length >= 2 && isName) {
            fullname.classList.add('success-class')
            return true;
        } else {
            errormessage = "Enter firstname and lastname!"
            fullname.classList.add('error-class');
            errorName.innerHTML = errormessage;
            indicateError();
            return false;
        }
    } else {
       indicateError();
       return false
    }
}
/*
    B. validateEmail Functon: This funtion checks the following

    1. Atleast a number must be before '@'
    2. There must at at least a letter btw '@' and '.' 
    3. There must be a letter after '.'
*/
function validateEmail() {
    let dotpos = emailInput.value.indexOf('.');
    let atpos = emailInput.value.indexOf('@');
    errormessage = "Invalid Email!"

    function indicateError(){
        emailInput.classList.add('error-class');
        errorEmail.innerHTML = errormessage;
        setTimeout(() => {
            errorEmail.innerHTML = '';
            emailInput.classList.remove('error-class');
        }, 3000)
    }

    if (atpos !== -1 && dotpos !== -1) {
        if ((atpos > 0) && (dotpos > atpos + 1) && (dotpos < emailInput.value.length - 1)) {
            emailInput.classList.add('success-class');
            return true
        } else {
            indicateError()
            return false;
        }
    // Or using ES6: return ( (atpos > 0) && (dotpos > atpos + 1) && (dotpos < emailInput.value.length - 1) ) ? true : false
    } else {
        indicateError();
        return false;
    }
}

function validatePassword() {
    errormessage = 'password should be atleast 8 characters and consist uppercase, lowercase and number only';
    const passmin = 8;
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/gm
    let result = regex.test(password.value);

    if (password.value.length < passmin || password.value === '' || !result) {

        password.classList.add('error-class');
        errorPassword.innerHTML = errormessage;

        setTimeout(() => {
                errorPassword.innerHTML = '';
                password.classList.remove('error-class');
            }, 3000)
        return false
    }
    password.classList.add('success-class');
    return result;
}

function validateAll() {
    console.log(otherInputs)
    otherInputs.forEach(element => {
        if (element.value !== '') {
            element.classList.add('success-class');
            return true;
        } else {
            errorInputs.forEach(errorarea => {
                errormessage = "Input cannot be empty!"
                element.classList.add('error-class');
                errorarea.innerHTML = errormessage;


        setTimeout(() => {
                errorarea.innerHTML = '';
                // emailInput.classList.remove('error-class');
            }, 3000)
            })
        }
    })
}

function validateForm() {
    validateName() 
     validateEmail() 
     validatePassword() 
     validateAll()
    if (validateName() && validateEmail() && validatePassword() && validateAll()) {
        document.querySelector('form').submit();
        return true
    } return false
}


// disableAutocomplete function disable autocomplete behaviour on all input for better user experience
(function disableAutocomplete() {
    let input = document.querySelectorAll('input');
    input.forEach(element => {
        element.setAttribute('autocomplete', 'off')
    });
})()