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

// // Endpoint om alle taken van de huidige gebruiker op te halen
// app.get('/tasks', (req, res) => {
//   const username = req.query.username; // Haal de gebruikersnaam uit de queryparameters

//   const selectTasksQuery = 'SELECT * FROM tasks WHERE username = $1';
//   const selectTasksValues = [username];
  
//   client.query(selectTasksQuery, selectTasksValues)
//     .then(result => {
//       const tasks = result.rows;
//       res.json(tasks);
//     })
//     .catch(error => {
//       console.error('Fout bij ophalen taken:', error);
//       res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van taken.' });
//     });
// });

// function saveTask(username, task, date, priority, status) {
//   const insertTaskQuery = 'INSERT INTO tasks (username, task, date, priority, status) VALUES ($1, $2, $3, $4, $5)';
//   const insertTaskValues = [username, task, date, priority, status];
//   client.query(insertTaskQuery, insertTaskValues)
//     .then(() => {
//       console.log('Taak opgeslagen in de database.');
//     })
//     .catch(error => {
//       console.error('Fout bij opslaan taak:', error);
//     });
// }


// Endpoint om alle taken van de huidige gebruiker op te halen
app.get('/tasks', (req, res) => {
  const username = req.query.username; // Haal de gebruikersnaam uit de queryparameters

  const selectTasksQuery = 'SELECT * FROM tasks WHERE username = $1';
  const selectTasksValues = [username];
  
  client.query(selectTasksQuery, selectTasksValues)
    .then(result => {
      const tasks = result.rows;
      res.json(tasks);
    })
    .catch(error => {
      console.error('Fout bij ophalen taken:', error);
      res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van taken.' });
    });
});

function saveTask(username, task, date, priority, status) {
  const insertTaskQuery = 'INSERT INTO tasks (username, task, date, priority, status) VALUES ($1, $2, $3, $4, $5)';
  const insertTaskValues = [username, task, date, priority, status || 'todo']; // Gebruik 'todo' als standaardwaarde als status niet is opgegeven
  client.query(insertTaskQuery, insertTaskValues)
    .then(() => {
      console.log('Taak opgeslagen in de database.');
    })
    .catch(error => {
      console.error('Fout bij opslaan taak:', error);
    });
}

// Endpoint om een nieuwe taak toe te voegen
app.post('/addTask', (req, res) => {
  const { username, task, date, priority, status } = req.body; // Ontvang de taakgegevens van het verzoek

  saveTask(username, task, date, priority, status); // Voeg de taak toe aan de database

  res.json({ success: true });
});

function deleteTask(taskDescription) {
  const deleteTaskQuery = 'DELETE FROM tasks WHERE task = $1';
  const deleteTaskValues = [taskDescription];

  client.query(deleteTaskQuery, deleteTaskValues)
    .then(() => {
      console.log('Taak verwijderd uit de database.');
    })
    .catch(error => {
      console.error('Fout bij het verwijderen van de taak:', error);
    });
}


app.delete('/deleteTask/:taskDescription', (req, res) => {
  const { taskDescription } = req.params;

  deleteTask(taskDescription); // Verwijder de taak uit de database

  res.json({ success: true });
});



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

  // console.log('Ontvangen inloggegevens:', username, password);

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

// // Endpoint voor het toevoegen van een taak
// app.post('/addTask', (req, res) => {
//   // Ontvang de taakgegevens van het verzoek
//   const { username, task, date, priority } = req.body;

//   // Voeg de taak toe aan de database zonder de "id" kolom op te geven
//   client.query('INSERT INTO tasks (username, task, date, priority) VALUES ($1, $2, $3, $4)', [username, task, date, priority], (error, result) => {
//     if (error) {
//       console.error('Fout bij opslaan taak:', error);
//       res.json({ success: false, message: 'Fout bij opslaan taak' });
//     } else {
//       console.log('Taak opgeslagen in de database.');
//       res.json({ success: true });
//     }
//   });
// });

app.post('/login', (req, res) => {
  const { username, password } = req.body;

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
