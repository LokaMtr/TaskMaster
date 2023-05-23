import java.time.LocalDate;

public class Task {
    private String description;
    private Priority priority;
    private TaskStatus status;
    private LocalDate assignedDate;

    public Task(String description, Priority priority, TaskStatus status) {
        this.description = description;
        this.priority = priority;
        this.status = status;
    }

    // Getters and setters

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public LocalDate getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(LocalDate assignedDate) {
        this.assignedDate = assignedDate;
    }

    public enum Priority {
        HIGH,
        LOW
    }

    public enum TaskStatus {
        TODO,
        DOING,
        DONE
    }
}
