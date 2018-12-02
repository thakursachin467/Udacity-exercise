let signinUrl = 'https://private-47ed5-interviewapitest.apiary-mock.com/signin';
let strength = {
  0: "Worst",
  1: "Bad",
  2: "Weak",
  3: "Good",
  4: "Strong"
}
const password = document.getElementById('password');
const email = document.getElementById('email');
const emailText = document.getElementById('email-text');
const Username = document.getElementById('username');
const usernameText = document.getElementById('username-text');
const meter = document.getElementById('password-meter');
const text = document.getElementById('text');
const form = document.getElementById('form-signup');
const loader = document.getElementById('loading');

function post(url, data, cb) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    cb(JSON.parse(this.responseText));
  }
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
}
function submitForm() {
  post(signinUrl, {
    username: document.querySelector('#username').value,
    password: document.querySelector('#password').value
  }, function (res) {
    console.log(res);
    form.reset();
    loader.classList.add('hide');
    form.classList.remove('hide');
    meter.value = 0;
  })
}

//password validation
const emailValidation = (value) => {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (value.length === 0) {
    emailText.innerHTML = `<strong>Cannot leave this feild empty.</strong>`
    emailText.classList.add("danger");
  } else {
    if (reg.test(value)) {
      emailText.innerHTML = ''
      emailText.classList.remove("danger");
      return true;
    } else {
      emailText.innerHTML = `<strong>The password entered is in-valid</strong>`
      emailText.classList.add("danger");
      return false;
    }
  }


}

//username validation
const usernameValidation = (value) => {
  if (value.length === 0) {
    usernameText.innerHTML = `<strong>Cannot leave this field empty.</strong>`;
    usernameText.classList.add("danger");
  } else {
    if (value.length < 5 || value.length > 10) {
      usernameText.innerHTML = `<strong>Username should be between 5 and 10 characters.</strong>`;
      usernameText.classList.add("danger");
      return false;
    } else {
      usernameText.innerHTML = '';
      usernameText.classList.remove("danger");
      return true;
    }
  }

}

//password validation

const passwordValidation = (value) => {
  if (value.length === 0) {
    text.innerHTML = `<strong>Cannot leave this field empty.</strong>`;
    text.classList.add("danger");
    return false;
  } else {
    text.innerHTML = '';
    text.classList.remove("danger");
    return true;
  }
}

//email validator per input
email.addEventListener('input', (e) => {
  emailValidation(e.target.value);
});

//username validation per input
username.addEventListener('input', (e) => {
  usernameValidation(e.target.value);

});

//form submit event handler
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const emailValidationValue = emailValidation(email.value);
  const usernameValidationValue = usernameValidation(Username.value);
  const passwordValidationValue = passwordValidation(password.value);
  if (emailValidationValue && usernameValidationValue && passwordValidationValue) {
    loader.classList.remove('hide');
    form.classList.add('hide');
    submitForm()
  }

})



//check the strength of the password.
password.addEventListener('input', () => {
  text.classList.remove("danger");
  const value = password.value;
  const result = zxcvbn(value);
  meter.value = result.score;
  if (value !== "") {
    text.innerHTML = `Strength: ${strength[result.score]} <strong>${result.feedback.warning}</strong> <strong>${result.feedback.suggestions}</strong>`;
  } else {
    text.innerHTML = "";
  }
})
