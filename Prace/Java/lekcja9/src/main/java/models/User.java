package models;

import java.util.HashMap;

public class User {
    private String email;
    private String firstName;
    private String lastName;
    private int id;
    public static HashMap<String, User> store = new HashMap<>();
    private static int globalId = 0;

    public static void push(User user) {
        user.setId(globalId);
        User.store.put(Integer.toString(globalId), user);
        User.globalId++;
    }

    public User(int id, String email, String firstName, String lastName) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "{\"id\":\"" + Integer.toString(id) + "\",\"email\":\"" + email + "\", \"firstName\":\"" + firstName
                + "\", \"lastName\":\"" + lastName + "\"}";
    }

}
