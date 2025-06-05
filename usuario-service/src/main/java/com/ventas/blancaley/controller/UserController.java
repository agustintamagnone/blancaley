package com.ventas.blancaley.controller;

import com.ventas.blancaley.domain.User;
import com.ventas.blancaley.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // HTTP Request for inserting users to the database.
    @PostMapping
    @Operation(summary = "Creates a new user")
    public ResponseEntity<?> registration(@RequestBody User user) {
        return ResponseEntity.ok(userService.registration(user));
    }

    // HTTP Request for consulting all users from the database.
    @GetMapping
    @Operation(summary = "Get all users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    // HTTP Request for consulting a user from the database based on ID.
    @GetMapping("/{id}")
    @Operation(summary = "Get an user by ID")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        if (userService.getUserById(id) != null) {
            return ResponseEntity.ok(userService.getUserById(id));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // HTTP Request for modifying/patching a user field by ID.
    @PutMapping
    @Operation(summary = "Updates fields of a user")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        for (User u : userService.getUsers()) {
            if (u.getId().equals(user.getId())) {
                u.setFirstName(user.getFirstName());
                u.setLastName(user.getLastName());
                u.setEmail(user.getEmail());

                return ResponseEntity.ok(userService.updateUser(u));
            }
        }
        return ResponseEntity.notFound().build();
    }

    // HTTP Request for deleting a user by ID.
    @DeleteMapping("/{id}")
    @Operation(summary = "Deletes a user")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        if (userService.getUserById(id) != null) {
            userService.deleteById(id);

            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
