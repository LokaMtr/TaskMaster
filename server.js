const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('src/TaskMaster'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/TaskMaster/login.html');
});

app.post('/register', (req, res) => {
  const newUsername = req.body['new-username'];
  const newPassword = req.body['new-password'];

  const userData = {
    username: newUsername,
    password: newPassword
  };

  const userString = JSON.stringify(userData) + '\n';

  // Controleren of het bestand bestaat, anders aanmaken
  const filePath = 'users.txt';
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }

  // Gegevens toevoegen aan het bestand
  fs.appendFile(filePath, userString, (err) => {
    if (err) throw err;
    console.log('User registered and data saved!');
  });

  res.redirect('/login.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
