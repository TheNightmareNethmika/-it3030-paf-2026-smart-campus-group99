package com.uniflow.system.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
public class CustomOAuth2FailureHandler implements AuthenticationFailureHandler {

    private static final String FRONTEND_URL = System.getProperty("FRONTEND_URL", "http://localhost:3000");

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception)
            throws IOException, ServletException {

        // Clean up the OAuth2 session so it doesn't linger
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        String message = exception.getMessage() != null
                ? exception.getMessage()
                : "Google authentication failed";

        // Redirect the browser back to the React login page with a readable error
        String redirectUrl = UriComponentsBuilder
                .fromUriString(FRONTEND_URL + "/login")
                .queryParam("error", "oauth2")
                .queryParam("message", message)
                .build()
                .toUriString();

        response.sendRedirect(redirectUrl);
    }
}
