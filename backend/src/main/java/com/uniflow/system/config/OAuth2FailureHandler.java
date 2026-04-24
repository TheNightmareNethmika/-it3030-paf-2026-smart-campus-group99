package com.uniflow.system.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2FailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final String frontendUrl;

    public OAuth2FailureHandler(@Value("${app.frontend.url:http://localhost:3000}") String frontendUrl) {
        this.frontendUrl = frontendUrl;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        String message = URLEncoder.encode(exception.getMessage(), StandardCharsets.UTF_8);
        getRedirectStrategy().sendRedirect(request, response, frontendUrl + "/login?error=" + message);
    }
}
