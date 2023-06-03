import java.util.ArrayList;
import java.util.List;

public class UserBusinessLayer {
    private List<User> userList;

    public UserBusinessLayer() {
        this.userList = new ArrayList<>();
    }

    public boolean addUser(String username, String password) {
        for (User user : userList) {
            if (user.getUsername().equals(username)) {
                return false; // Unique username requirement failed
            }
        }

        User newUser = new User(username, password);
        userList.add(newUser);
        return true; // User added successfully
    }

    public User getUserByUsername(String username) {
        for (User user : userList) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }
        return null; // User not found
    }
}
