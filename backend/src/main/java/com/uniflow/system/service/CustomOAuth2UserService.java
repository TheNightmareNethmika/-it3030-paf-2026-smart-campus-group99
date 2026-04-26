package com.uniflow.system.service;

import com.uniflow.system.model.Role;
import com.uniflow.system.model.User;
import com.uniflow.system.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String raw = oAuth2User.getAttribute("email");
        if (raw == null || raw.isBlank()) {
            return oAuth2User;
        }
        // Match password-based accounts and seeded admin (stored lowercased)
        String email = raw.trim().toLowerCase(Locale.ROOT);

        Optional<User> userOptional = userRepository.findByEmailIgnoreCase(email);
        if (userOptional.isEmpty()) {
            String name = oAuth2User.getAttribute("name");
            if (name == null || name.isBlank()) {
                name = email.contains("@") ? email.substring(0, email.indexOf('@')) : email;
            }
            userRepository.save(new User(name.trim(), email, "OAUTH_LOGIN", Role.USER));
        }

        return oAuth2User;
    }
}
