package com.uniflow.system.controller;

import com.uniflow.system.model.Role;
import com.uniflow.system.model.User;
import com.uniflow.system.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/test")
    public String adminTest() {
        return "Welcome ADMIN!";
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
        }
        user.setEmail(user.getEmail().trim().toLowerCase());
        if (userRepository.findByEmailIgnoreCase(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "A user with this email already exists"));
        }
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password is required"));
        }
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        User saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable String id, @RequestBody Map<String, String> body) {
        if (userRepository.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        String roleValue = body.get("role");
        if (roleValue == null || roleValue.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Role value is required"));
        }
        try {
            Role newRole = Role.valueOf(roleValue.toUpperCase());
            // Update only the role so we never resave a User with a missing password (detached/JSON user edge cases).
            int updated = userRepository.updateRoleById(id, newRole);
            if (updated == 0) {
                return ResponseEntity.notFound().build();
            }
            User fresh = userRepository.findById(id).orElseThrow();
            return ResponseEntity.ok(fresh);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid role: " + roleValue));
        }
    }
}
