package com.uniflow.system.controller;

import com.uniflow.system.dto.LoginRequest;
import com.uniflow.system.model.User;
import com.uniflow.system.service.AuthService;
import com.uniflow.system.config.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.register(user));
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request) {

        Optional<User> found = authService.login(request.getEmail(), request.getPassword());

        if (found.isPresent()) {
            User u = found.get();
            String token = jwtUtil.generateToken(u.getEmail(), u.getRole().name());

            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("token", token);
            response.put("role", u.getRole().name());
            response.put("name", u.getName() != null ? u.getName() : "Admin User");
            response.put("email", u.getEmail());

            return response;
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid email or password"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(org.springframework.security.core.Authentication authentication) {
        if (authentication == null) return ResponseEntity.status(401).build();
        
        String email = authentication.getName();
        Optional<User> userOptional = authService.getUserByEmail(email);
        
        if (userOptional.isPresent()) {
            User u = userOptional.get();
            java.util.Map<String, Object> response = new java.util.HashMap<>();
            response.put("name", u.getName() != null ? u.getName() : "User");
            response.put("email", u.getEmail());
            response.put("role", u.getRole());
            response.put("id", u.getId());
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.notFound().build();
    }
}
