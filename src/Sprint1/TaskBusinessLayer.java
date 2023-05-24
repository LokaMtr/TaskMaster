import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.Collections;


public class TaskBusinessLayer {
    private List<Task> taskList;
    private Map<LocalDate, List<Task>> tasksByDate;

    public TaskBusinessLayer() {
        this.taskList = new ArrayList<>();
        this.tasksByDate = new HashMap<>();
    }

    public void addTask(String description, Task.Priority priority) {
        Task newTask = new Task(description, priority, Task.TaskStatus.TODO);
        taskList.add(newTask);
    }

    public void assignTaskToDay(int taskIndex, LocalDate date) {
        if (taskIndex >= 0 && taskIndex < taskList.size()) {
            Task task = taskList.get(taskIndex);
            task.setAssignedDate(date);

            // Add the task to the task list of the specific date
            if (tasksByDate.containsKey(date)) {
                tasksByDate.get(date).add(task);
            } else {
                List<Task> tasks = new ArrayList<>();
                tasks.add(task);
                tasksByDate.put(date, tasks);
            }
        }
    }

    public int getTaskCountForDay(LocalDate date) {
        if (tasksByDate.containsKey(date)) {
            List<Task> tasks = tasksByDate.get(date);
            return tasks.size();
        } else {
            return 0;
        }
    }

    public List<Task> getTasksForDay(LocalDate date) {
        if (tasksByDate.containsKey(date)) {
            return tasksByDate.get(date);
        } else {
            return Collections.emptyList();
        }
    }

    public void removeTask(int taskIndex) {
        if (taskIndex >= 0 && taskIndex < taskList.size()) {
            Task removedTask = taskList.remove(taskIndex);
            LocalDate assignedDate = removedTask.getAssignedDate();
    
            if (assignedDate != null && tasksByDate.containsKey(assignedDate)) {
                tasksByDate.get(assignedDate).remove(removedTask);
            }
        }
    }
    
    public void updateTaskDescription(int taskIndex, String newDescription) {
        if (taskIndex >= 0 && taskIndex < taskList.size()) {
            Task task = taskList.get(taskIndex);
            task.setDescription(newDescription);
        }
    }
    
    public void updateTaskStatus(int taskIndex, Task.TaskStatus newStatus) {
        if (taskIndex >= 0 && taskIndex < taskList.size()) {
            Task task = taskList.get(taskIndex);
            task.setStatus(newStatus);
        }
    }
    
}
