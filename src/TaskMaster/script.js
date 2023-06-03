const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const registerForm = document.getElementById('register-form');

loginLink.addEventListener('click', function (e) {
  e.preventDefault();
  loginContainer.classList.remove('hidden');
  registerContainer.classList.add('hidden');
});

registerLink.addEventListener('click', function (e) {
  e.preventDefault();
  loginContainer.classList.add('hidden');
  registerContainer.classList.remove('hidden');
});

themeToggle.addEventListener('change', function () {
  if (themeToggle.checked) {
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
  }
});

registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;

  const data = {
    username: username,
    password: password
  };

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.text())
    .then(message => {
      console.log(message);
      // Voeg hier eventuele verdere logica toe, zoals het tonen van een succesbericht of het doorsturen naar een andere pagina
    })
    .catch(error => {
      console.error(error);
      // Voeg hier eventuele foutafhandeling toe
    });
});
