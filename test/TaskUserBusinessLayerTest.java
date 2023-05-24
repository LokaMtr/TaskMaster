import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.util.List;

public class TaskUserBusinessLayerTest {
    private UserBusinessLayer userBusinessLayer;
    private TaskBusinessLayer taskBusinessLayer;

    @BeforeEach
    public void setUp() {
        userBusinessLayer = new UserBusinessLayer();
        taskBusinessLayer = new TaskBusinessLayer();
    }

    @Test
    public void testAddUser() {
        // Test adding a new user
        boolean addUserResult = userBusinessLayer.addUser("JohnDoe", "password123");
        Assertions.assertTrue(addUserResult);

        // Test adding a user with the same username (should fail)
        boolean duplicateUserResult = userBusinessLayer.addUser("JohnDoe", "password456");
        Assertions.assertFalse(duplicateUserResult);
    }

    @Test
    public void testGetUserByUsername() {
        // Add a user
        userBusinessLayer.addUser("JohnDoe", "password123");

        // Test getting an existing user
        User existingUser = userBusinessLayer.getUserByUsername("JohnDoe");
        Assertions.assertNotNull(existingUser);
        Assertions.assertEquals("JohnDoe", existingUser.getUsername());
        Assertions.assertEquals("password123", existingUser.getPassword());

        // Test getting a non-existing user
        User nonExistingUser = userBusinessLayer.getUserByUsername("JaneDoe");
        Assertions.assertNull(nonExistingUser);
    }

    @Test
    public void testTaskOperations() {
        // Add tasks
        taskBusinessLayer.addTask("Task 1", Task.Priority.HIGH);
        taskBusinessLayer.addTask("Task 2", Task.Priority.LOW);

        // Assign tasks to a specific date
        taskBusinessLayer.assignTaskToDay(0, LocalDate.of(2023, 5, 24));
        taskBusinessLayer.assignTaskToDay(1, LocalDate.of(2023, 5, 25));

        // Test getTaskCountForDay()
        int taskCount = taskBusinessLayer.getTaskCountForDay(LocalDate.of(2023, 5, 24));
        Assertions.assertEquals(1, taskCount);

        // Test getTasksForDay()
        List<Task> tasks = taskBusinessLayer.getTasksForDay(LocalDate.of(2023, 5, 25));
        Assertions.assertEquals(1, tasks.size());
        Task task = tasks.get(0);
        Assertions.assertEquals("Task 2", task.getDescription());
        Assertions.assertEquals(Task.Priority.LOW, task.getPriority());

        // Test removeTask()
        taskBusinessLayer.removeTask(1);
        int updatedTaskCount = taskBusinessLayer.getTaskCountForDay(LocalDate.of(2023, 5, 25));
        Assertions.assertEquals(0, updatedTaskCount);
    }
}
