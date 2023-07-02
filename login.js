import { password } from "./password";
const { Client } = require('pg');

// Verbindingsgegevens voor de PostgreSQL-database
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'TaskMaster',
  password: password,
  port: 5432,
};

// Functie om inloggegevens te verwerken
async function processLogin(username, password) {
  const client = new Client(config);
  await client.connect();

  try {
    // Controleren of de gebruiker al bestaat
    const checkUserQuery = 'SELECT id FROM users WHERE username = $1';
    const checkUserValues = [username];
    const checkUserResult = await client.query(checkUserQuery, checkUserValues);

    if (checkUserResult.rows.length > 0) {
      // Gebruiker bestaat al
      console.log('Gebruiker bestaat al');
    } else {
      // Gebruiker bestaat nog niet, toevoegen aan de database
      const insertUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
      const insertUserValues = [username, password];
      await client.query(insertUserQuery, insertUserValues);
      console.log('Registratie succesvol');
    }

    // Roep de getTasks-functie aan om de taken op te halen en weer te geven
    getTasks(username);
  } catch (error) {
    console.error('Fout bij registratie:', error);
  } finally {
    await client.end();
  }
}

// Functie om de taken op te halen en weer te geven
async function getTasks(username) {
  const client = new Client(config);
  await client.connect();

  try {
    const getTasksQuery = 'SELECT * FROM tasks WHERE username = $1';
    const getTasksValues = [username];
    const getTasksResult = await client.query(getTasksQuery, getTasksValues);

    // Verwerk hier de taken en toon ze in de tabellen op de todo.html-pagina
    const tasks = getTasksResult.rows;
    displayTasksInTable(tasks);
  } catch (error) {
    console.error('Fout bij ophalen taken:', error);
  } finally {
    await client.end();
  }
}

  

// Event listener voor het inlogformulier
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      if (data.success && data.redirectToTodo) {
        // Succesvol ingelogd, roep de functie aan om taken op te halen en weer te geven
        processLogin(username, password);
        window.location.href = '/todo.html';
      } else {
        // Fout bij inloggen
        console.error('Fout bij inloggen');
      }
    });
});

fetch('/getTasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: userName })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Taken opgehaald:', data.tasks);
        displayTasksInTable(data.tasks);
      } else {
        console.error('Fout bij ophalen taken:', data.message);
      }
    })
    .catch(error => {
      console.error('Fout bij communiceren met de server:', error);
    });
  