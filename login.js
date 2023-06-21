const { Client } = require('pg');

// Verbindingsgegevens voor de PostgreSQL-database
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'TaskMaster',
    password: '0684284771',
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
    } catch (error) {
        console.error('Fout bij registratie:', error);
    } finally {
        await client.end();
    }
}

// Voorbeeldgebruik van de functie
const exampleUsername = 'voorbeeldgebruiker';
const examplePassword = 'voorbeeldwachtwoord';

processLogin(exampleUsername, examplePassword);


// login.js
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
        window.location.href = '/todo.html';
      } else {
        // Handleer andere situaties
      }
    });
  });
  