const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Statische bestanden (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../TaskMaster')));

// Registratiegegevens opslaan en lezen
let users = [];

function saveUsers() {
  const data = JSON.stringify(users, null, 2);
  fs.writeFileSync(path.join(__dirname, 'users.txt'), data, 'utf8');
}

function loadUsers() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'users.txt'), 'utf8');
    users = JSON.parse(data);
  } catch (error) {
    users = [];
  }
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Controleer of de gebruikersnaam al bestaat
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    res.json({ success: false, message: 'Gebruikersnaam bestaat al.' });
    return;
  }

  users.push({ username, password });
  saveUsers();
  res.json({ success: true, message: 'Registratie succesvol!' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Zoek de gebruiker op basis van de gebruikersnaam
  const user = users.find(user => user.username === username);

  if (!user || user.password !== password) {
    res.json({ success: false, message: 'Ongeldige gebruikersnaam of wachtwoord.' });
    return;
  }

  res.json({ success: true });
});

const staticFilesPath = path.join(__dirname, 'src/TaskMaster');
app.use(express.static(staticFilesPath));

// Fallback naar login.html voor andere routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/TaskMaster/login.html'));
});

// Laden van gebruikers bij het starten van de server
loadUsers();

// Start de server
const port = 3000;
app.listen(port, () => {
  console.log(`Server gestart op http://localhost:${port}`);
});
