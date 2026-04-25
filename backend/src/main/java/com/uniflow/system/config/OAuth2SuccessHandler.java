package com.uniflow.system.config;

import com.uniflow.system.model.User;
import com.uniflow.system.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final String FRONTEND_URL = System.getProperty("FRONTEND_URL", "http://localhost:3100");

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public OAuth2SuccessHandler(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        if (email == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Google account has no email address");
            return;
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "User account could not be resolved");
            return;
        }

        User user = userOptional.get();
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        // Invalidate the OAuth2 session after JWT has been issued so the
        // server stays effectively stateless for all subsequent API calls.
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // UriComponentsBuilder handles proper percent-encoding of all values
        // (spaces and special characters in display names, etc.)
        String targetUrl = UriComponentsBuilder
                .fromUriString(FRONTEND_URL + "/oauth2/redirect")
                .queryParam("token", token)
                .queryParam("role", user.getRole().name())
                .queryParam("name", user.getName() != null ? user.getName() : "")
                .queryParam("email", user.getEmail())
                .build()
                .toUriString();

        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
