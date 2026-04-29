package com.uniflow.system.bootstrap;

import com.uniflow.system.model.Role;
import com.uniflow.system.model.User;
import com.uniflow.system.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Locale;

/**
 * Creates or updates the local admin from {@code ADMIN_EMAIL} / {@code ADMIN_PASSWORD}.
 * Re-reads {@code .env} from disk so seeding works even when Spring's Environment does not
 * mirror {@link System#getProperty} (e.g. some IDE launches).
 */
@Component
@Order(1)
public class AdminUserSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminUserSeeder.class);

    private final UserRepository userRepository;
    private final Environment environment;

    public AdminUserSeeder(UserRepository userRepository, Environment environment) {
        this.userRepository = userRepository;
        this.environment = environment;
    }

    @Override
    public void run(String... args) {
        mergeAdminKeysFromDotEnvFiles();

        String email = firstNonBlank(
                System.getProperty("ADMIN_EMAIL"),
                environment.getProperty("ADMIN_EMAIL"),
                System.getenv("ADMIN_EMAIL")
        ).trim().toLowerCase(Locale.ROOT);

        String password = firstNonBlank(
                System.getProperty("ADMIN_PASSWORD"),
                environment.getProperty("ADMIN_PASSWORD"),
                System.getenv("ADMIN_PASSWORD")
        ).trim();

        if (email.isEmpty() || password.isEmpty()) {
            log.warn("Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env (or env vars) to enable seeded admin login.");
            return;
        }
        if (isPlaceholder(email, password)) {
            log.warn("ADMIN_EMAIL / ADMIN_PASSWORD still look like placeholders — not seeding admin.");
            return;
        }

        userRepository.findByEmailIgnoreCase(email).ifPresentOrElse(
                existing -> {
                    existing.setRole(Role.ADMIN);
                    existing.setPassword(password);
                    if (existing.getName() == null || existing.getName().isBlank()) {
                        existing.setName("Administrator");
                    }
                    userRepository.save(existing);
                    log.info("Updated admin user for {}", email);
                },
                () -> {
                    userRepository.save(new User("Administrator", email, password, Role.ADMIN));
                    log.info("Seeded admin user for {}", email);
                }
        );
    }

    /**
     * Parses {@code .env} files for ADMIN_* lines and sets {@link System#setProperty} so values
     * are always available to this runner.
     */
    private static void mergeAdminKeysFromDotEnvFiles() {
        String userDir = System.getProperty("user.dir");
        List<Path> files = List.of(Path.of(userDir, ".env"), Path.of(userDir, "backend", ".env"));
        for (Path envFile : files) {
            if (!Files.isRegularFile(envFile)) {
                continue;
            }
            try {
                for (String line : Files.readAllLines(envFile, StandardCharsets.UTF_8)) {
                    String trimmed = line.trim();
                    if (trimmed.isEmpty() || trimmed.startsWith("#")) {
                        continue;
                    }
                    int eq = trimmed.indexOf('=');
                    if (eq < 1) {
                        continue;
                    }
                    String key = stripBom(trimmed.substring(0, eq).trim());
                    if (!"ADMIN_EMAIL".equals(key) && !"ADMIN_PASSWORD".equals(key)) {
                        continue;
                    }
                    String val = unquote(trimmed.substring(eq + 1).trim());
                    if (!val.isEmpty()) {
                        System.setProperty(key, val);
                    }
                }
            } catch (IOException e) {
                log.debug("Could not read {}: {}", envFile, e.getMessage());
            }
        }
    }

    private static String stripBom(String key) {
        if (key != null && !key.isEmpty() && key.charAt(0) == '\uFEFF') {
            return key.substring(1);
        }
        return key;
    }

    private static String unquote(String v) {
        if (v.length() >= 2 && v.charAt(0) == '"' && v.charAt(v.length() - 1) == '"') {
            return v.substring(1, v.length() - 1);
        }
        return v;
    }

    private static String firstNonBlank(String... values) {
        if (values == null) {
            return "";
        }
        for (String v : values) {
            if (v != null && !v.isBlank()) {
                return v;
            }
        }
        return "";
    }

    private static boolean isPlaceholder(String email, String password) {
        if (email.contains("your-admin-email") || email.endsWith("@example.com")) {
            return true;
        }
        return password.equals("your-admin-password-here") || password.equals("your-admin-password");
    }
}
