import java.time.LocalDate;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Create a user
        UserBusinessLayer userBusinessLayer = new UserBusinessLayer();
        userBusinessLayer.addUser("Loka", "password123");

        // Create tasks
        TaskBusinessLayer taskBusinessLayer = new TaskBusinessLayer();
        taskBusinessLayer.addTask("Task 1", Task.Priority.HIGH);
        taskBusinessLayer.addTask("Task 2", Task.Priority.LOW);
        taskBusinessLayer.addTask("Task 3", Task.Priority.HIGH);

        // Assign tasks to a specific date
        taskBusinessLayer.assignTaskToDay(0, LocalDate.of(2023, 5, 24));
        taskBusinessLayer.assignTaskToDay(1, LocalDate.of(2023, 5, 25));
        taskBusinessLayer.assignTaskToDay(2, LocalDate.of(2023, 5, 24));

        // Get the task count for a specific date
        LocalDate date = LocalDate.of(2023, 5, 24);
        int taskCount = taskBusinessLayer.getTaskCountForDay(date);
        System.out.println("Task count for " + date + ": " + taskCount);

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
