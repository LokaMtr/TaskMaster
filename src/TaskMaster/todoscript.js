let currentTheme = 'dark';

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dateInput = document.getElementById('dateInput');
  const prioritySelect = document.getElementById('prioritySelect');
  const task = taskInput.value;
  const date = dateInput.value;
  const priority = prioritySelect.value;

  if (task.trim() === '') {
    alert('Voer een taak in');
    return;
  }

  const listItem = document.createElement('li');

  // Converteer de datumstring naar een datumobject
  const dateObject = new Date(date);

  // Controleer of de datum geldig is
  if (isNaN(dateObject.getTime())) {
    alert('Voer een geldige datum in');
    return;
  }

  // Zet de datum om naar een geldige database-indeling (YYYY-MM-DD)
  const formattedDate = dateObject.toISOString().split('T')[0];

  // Stuur de taakgegevens naar de server
  const taskData = {
    username: sessionStorage.getItem('username'),
    task: task,
    date: formattedDate,
    priority: priority
  };

  fetch('/addTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        console.log('Taak opgeslagen in de database.');
      } else {
        console.error('Fout bij opslaan taak:', result.message);
      }
    })
    .catch(error => {
      console.error('Fout bij communiceren met de server:', error);
    });

  listItem.innerHTML = `
    <span class="task">${task}</span>
    <span class="date">${formattedDate}</span>
    <div class="action-buttons">
      <button class="edit-btn" onclick="editTask(event)">✎</button>
      <button class="delete-btn" onclick="deleteTask(event)">✕</button>
      <button class="move-task-btn" onclick="moveTask(event)">→</button>
    </div>
  `;

  switch (priority) {
    case 'high':
      listItem.classList.add('high-priority');
      break;
    case 'medium':
      listItem.classList.add('medium-priority');
      break;
    case 'low':
      listItem.classList.add('low-priority');
      break;
  }

  document.getElementById('todoList').appendChild(listItem);

  taskInput.value = '';
  dateInput.value = '';
}


function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark');

  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  const themeToggle = document.getElementById('themeToggle');

  const themeCheckbox = document.createElement('input');
  themeCheckbox.setAttribute('type', 'checkbox');
  themeCheckbox.setAttribute('id', 'themeCheckbox');
  themeCheckbox.setAttribute('onchange', 'toggleTheme()');
  themeCheckbox.checked = currentTheme === 'light';

  const label = document.createElement('label');
  label.setAttribute('for', 'themeCheckbox');

  themeToggle.innerHTML = '';
  themeToggle.appendChild(themeCheckbox);
  themeToggle.appendChild(label);

  // Wissel de afbeelding van het logo
  const logo = document.getElementById('logo');
  const lightThemeLogoPath = '/src/TaskMaster/modellen/LogoWit.png';
  const darkThemeLogoPath = '/src/TaskMaster/modellen/LogoGrijs.png';

  if (currentTheme === 'light') {
    logo.src = lightThemeLogoPath;
  } else {
    logo.src = darkThemeLogoPath;
  }
}

function editTask(event) {
  const listItem = event.target.parentNode.parentNode;
  const taskElement = listItem.querySelector('.task');
  const newTask = prompt('Pas de taak aan', taskElement.textContent);

  if (newTask !== null && newTask.trim() !== '') {
    taskElement.textContent = newTask;
  }
}

function deleteTask(event) {
  const listItem = event.target.parentNode.parentNode;
  listItem.parentNode.removeChild(listItem);
}

function moveTask(event) {
  const listItem = event.target.parentNode.parentNode;
  const currentList = listItem.parentNode;
  const targetList = currentList.id === 'todoList' ? document.getElementById('doingList') : document.getElementById('doneList');

  if (targetList.id === 'doneList') {
    listItem.querySelector('.move-task-btn').style.display = 'none';
  } else {
    listItem.querySelector('.move-task-btn').style.display = 'block';
  }

  const distance = targetList.getBoundingClientRect().left - currentList.getBoundingClientRect().left;

  listItem.classList.add('moving');

  listItem.style.transform = `translateX(${distance}px)`;

  
  requestAnimationFrame(function () {
    
    currentList.removeChild(listItem);

    
    listItem.style.transform = '';

    
    requestAnimationFrame(function () {
      
      targetList.appendChild(listItem);

      
      listItem.addEventListener('transitionend', function () {
        listItem.classList.remove('moving');
      }, { once: true });
    });
  });
}
// Functie om de knopstijlen toe te passen
function applyButtonStyles(button) {
  button.classList.add("edit-btn");
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
      <path fill="#fff" d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6 14.086l-1.086 1.084-5-5L7 12l1.914 1.914L12 16.828l4-4z"/>
    </svg>
  `;
}

// Voeg de knopstijlen toe aan de knoppen
var editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach(function(button) {
  applyButtonStyles(button);
});

var deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(function(button) {
  applyButtonStyles(button);
});

var moveButtons = document.querySelectorAll('.move-task-btn');
moveButtons.forEach(function(button) {
  applyButtonStyles(button);
});
