const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const password = require('./password');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Statische bestanden (HTML, CSS, JS)
const staticFilesPath = path.join(__dirname, '../TaskMaster');
app.use(express.static(staticFilesPath));

// PostgreSQL databaseverbinding
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'TaskMaster',
  password: password,
  port: 5432,
};

const client = new Client(dbConfig);
client.connect();

// Registratiegegevens opslaan en lezen
function saveUser(username, password) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Fout bij hashen wachtwoord:', err);
      return;
    }

    const insertUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    const insertUserValues = [username, hash];
    client.query(insertUserQuery, insertUserValues)
      .then(() => {
        console.log('Gebruiker opgeslagen in de database.');
      })
      .catch(error => {
        console.error('Fout bij opslaan gebruiker:', error);
      });
  });
}

function checkUserCredentials(username, password) {
  const selectUserQuery = 'SELECT * FROM users WHERE username = $1';
  const selectUserValues = [username];
  return client.query(selectUserQuery, selectUserValues)
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        return { success: false, message: 'Ongeldige gebruikersnaam of wachtwoord.' };
      }

      // Vergelijk de gehashte wachtwoorden met bcrypt.compare
      return bcrypt.compare(password, user.password)
        .then(match => {
          if (match) {
            return { success: true };
          } else {
            return { success: false, message: 'Ongeldige gebruikersnaam of wachtwoord.' };
          }
        });
    })
    .catch(error => {
      console.error('Fout bij ophalen gebruiker:', error);
      return { success: false, message: 'Er is een fout opgetreden.' };
    });
}


app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Controleer of de gebruikersnaam al bestaat
  const checkUserQuery = 'SELECT id FROM users WHERE username = $1';
  const checkUserValues = [username];
  client.query(checkUserQuery, checkUserValues)
    .then(result => {
      if (result.rows.length > 0) {
        res.json({ success: false, message: 'Gebruikersnaam bestaat al.' });
      } else {
        saveUser(username, password);
        res.json({ success: true, message: 'Registratie succesvol!' });
      }
    })
    .catch(error => {
      console.error('Fout bij controle gebruikersnaam:', error);
      res.json({ success: false, message: 'Er is een fout opgetreden.' });
    });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Ontvangen inloggegevens:', username, password);

  checkUserCredentials(username, password)
    .then(result => {
      console.log('Inlogresultaat:', result);

      if (result.success) {
        res.json({ success: true, redirectToTodo: true });
      } else {
        res.json(result);
      }
    })
    .catch(error => {
      console.error('Fout bij inloggen:', error);
      res.json({ success: false, message: 'Er is een fout opgetreden.' });
    });
});

// Serveer todo.html
const todoFilesPath = path.join(__dirname, '../TaskMaster/src/TaskMaster');
app.use(express.static(todoFilesPath));

// Fallback naar login.html voor andere routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../TaskMaster/src/TaskMaster/login.html'));
});

// Start de server
const port = 3000;
app.listen(port, () => {
  console.log(`Server gestart op http://localhost:${port}`);
});
