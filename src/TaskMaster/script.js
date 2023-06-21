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
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        alert('Registratie succesvol!');
        loginContainer.classList.remove('hidden');
        registerContainer.classList.add('hidden');
      } else {
        alert('Registratie mislukt. Probeer het opnieuw.');
      }
    })
    .catch(error => {
      console.error('Fout bij registratie:', error);
    });
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        window.location.href = '/todo.html';
      } else {
        alert('Ongeldige gebruikersnaam of wachtwoord.');
      }
    })
    .catch(error => {
      console.error('Fout bij inloggen:', error);
    });
});

