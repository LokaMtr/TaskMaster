import java.time.LocalDate;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Create a user
        UserBusinessLayer userBusinessLayer = new UserBusinessLayer();
        userBusinessLayer.addUser("Loka", "password123");

        // Create tasks
        TaskBusinessLayer taskBusinessLayer = new TaskBusinessLayer();
        taskBusinessLayer.addTask("Boodschappen doen", Task.Priority.HIGH);
        taskBusinessLayer.addTask("Werken", Task.Priority.LOW);
        taskBusinessLayer.addTask("Voetballen", Task.Priority.HIGH);

        // Assign tasks to a specific date
        taskBusinessLayer.assignTaskToDay(0, LocalDate.of(2023, 5, 24));
        taskBusinessLayer.assignTaskToDay(1, LocalDate.of(2023, 5, 25));
        taskBusinessLayer.assignTaskToDay(2, LocalDate.of(2023, 5, 24));

        // Get the task count for a specific date
        LocalDate date = LocalDate.of(2023, 5, 24);
        int taskCount = taskBusinessLayer.getTaskCountForDay(date);
        System.out.println("Task count for " + date + ": " + taskCount);

        
        // Voorbeelden van taakbewerkingen

        // Voorbeeld 1: Taak verwijderen
        taskBusinessLayer.removeTask(1); // Verwijder de taak op index 1

        // Voorbeeld 2: Taakbeschrijving aanpassen
        taskBusinessLayer.updateTaskDescription(0, "Naar de albertheijn gaan"); // Pas de taakbeschrijving van taak op index 0 aan

        // Voorbeeld 3: Status van een taak veranderen
        taskBusinessLayer.updateTaskStatus(2, Task.TaskStatus.DONE); // Verander de status van taak op index 2 naar DONE

        // Print task details
        List<Task> tasks = taskBusinessLayer.getTasksForDay(date);
        for (Task task : tasks) {
            System.out.println("Task Description: " + task.getDescription());
            System.out.println("Task Priority: " + task.getPriority());
            System.out.println("Task Status: " + task.getStatus());
            System.out.println("-------------");
        }

        // Get user information
        User user = userBusinessLayer.getUserByUsername("Loka");
        if (user != null) {
            System.out.println("Username: " + user.getUsername());
            System.out.println("Password: " + user.getPassword());
        }

    }
}
