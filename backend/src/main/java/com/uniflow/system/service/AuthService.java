package com.uniflow.system.service;

import com.uniflow.system.model.Role;
import com.uniflow.system.model.User;
import com.uniflow.system.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        if (user.getEmail() != null) {
            user.setEmail(user.getEmail().trim().toLowerCase());
        }
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        if (email == null || password == null) {
            return Optional.empty();
        }
        String normalizedEmail = email.trim().toLowerCase();
        String trimmedPassword = password.trim();
        Optional<User> userOptional = userRepository.findByEmailIgnoreCase(normalizedEmail);

        if (userOptional.isEmpty()) {
            return Optional.empty();
        }
        User user = userOptional.get();
        String stored = user.getPassword();
        if (stored != null && stored.trim().equals(trimmedPassword)) {
            return Optional.of(user);
        }
        return Optional.empty();
    }

    public Optional<User> getUserByEmail(String email) {
        if (email == null) {
            return Optional.empty();
        }
        return userRepository.findByEmailIgnoreCase(email.trim().toLowerCase());
    }
}
