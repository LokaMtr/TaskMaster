<?php
// Verbinding maken met de database
$servername = "localhost";
$username = "postgres";
$password = "0684284771";
$database = "TaskMaster";

$conn = new mysqli($servername, $username, $password, $database);

// Controleren op verbinding fouten
if ($conn->connect_error) {
  die("Fout bij het verbinden met de database: " . $conn->connect_error);
}

// Ontvang de query van de JavaScript-code
$query = $_GET["query"];

// Voer de query uit
$result = $conn->query($query);

// Controleren op queryfouten
if (!$result) {
  die("Fout bij het uitvoeren van de query: " . $conn->error);
}

// Maak een array van de resultaten
$tasks = array();
while ($row = $result->fetch_assoc()) {
  $tasks[] = $row;
}

// Stuur de resultaten terug als JSON
header('Content-Type: application/json');
echo json_encode($tasks);

// Verbinding sluiten
$conn->close();
?>
