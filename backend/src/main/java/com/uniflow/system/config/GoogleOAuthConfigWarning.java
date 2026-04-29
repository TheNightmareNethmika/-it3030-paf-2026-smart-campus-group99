package com.uniflow.system.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
 * Google shows "Error 401: invalid_client" / "OAuth client was not found" when the
 * client id/secret are missing, are still placeholders, or were copied incorrectly.
 */
@Component
@Order(Ordered.LOWEST_PRECEDENCE)
public class GoogleOAuthConfigWarning implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(GoogleOAuthConfigWarning.class);

    private final Environment environment;

    public GoogleOAuthConfigWarning(Environment environment) {
        this.environment = environment;
    }

    @Override
    public void run(ApplicationArguments args) {
        String id = environment.getProperty("spring.security.oauth2.client.registration.google.client-id", "");
        String secret = environment.getProperty("spring.security.oauth2.client.registration.google.client-secret", "");
        if (isPlaceholder(id) || isPlaceholder(secret)) {
            log.error(
                    """
                    ================================================================================
                    Google OAuth is NOT configured correctly.
                    You will see: "Error 401: invalid_client" / "The OAuth client was not found"
                    
                    Fix:
                    1. Open https://console.cloud.google.com/ → APIs & Services → Credentials
                    2. Create "OAuth 2.0 Client ID" with Application type: Web application
                    3. Authorized redirect URIs must include your backend callback, e.g.:
                          http://localhost:10200/login/oauth2/code/google
                       (use the same host/port as the running Spring app; check the log line
                        "Uniflow API: http://127.0.0.1:PORT" if the port is not 10200)
                    4. In backend/.env set (no quotes around values):
                          GOOGLE_CLIENT_ID=....apps.googleusercontent.com
                          GOOGLE_CLIENT_SECRET=...
                    5. Restart the backend
                    ================================================================================"""
            );
            log.error("GOOGLE looks unset or placeholder. clientId length={}, clientSecret length={}",
                    id == null ? 0 : id.length(),
                    secret == null ? 0 : secret.length());
        } else {
            log.info("Google OAuth client id is set (not a known placeholder).");
        }
    }

    private static boolean isPlaceholder(String v) {
        if (v == null || v.isBlank()) {
            return true;
        }
        String s = v.trim();
        if (s.startsWith("YOUR_") || s.equalsIgnoreCase("your-google-client-id-here")
                || s.equalsIgnoreCase("your-google-client-secret-here")) {
            return true;
        }
        if (s.contains("your-google-client")) {
            return true;
        }
        // Default from application.properties when env var is unset
        if ("YOUR_GOOGLE_CLIENT_ID".equals(s) || "YOUR_GOOGLE_CLIENT_SECRET".equals(s)) {
            return true;
        }
        return false;
    }
}
