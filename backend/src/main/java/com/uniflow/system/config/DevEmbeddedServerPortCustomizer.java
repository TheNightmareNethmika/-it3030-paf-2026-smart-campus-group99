package com.uniflow.system.config;

import org.springframework.boot.tomcat.TomcatWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.ServerSocket;

/**
 * In {@code dev}, pick the first free TCP port from {@code server.port} up to +200.
 * Avoids "address already in use" when a previous JVM is still bound to the default port.
 */
@Configuration
@Profile("dev")
@Order(Ordered.HIGHEST_PRECEDENCE)
public class DevEmbeddedServerPortCustomizer implements WebServerFactoryCustomizer<TomcatWebServerFactory> {

    private final Environment environment;

    public DevEmbeddedServerPortCustomizer(Environment environment) {
        this.environment = environment;
    }

    @Override
    public void customize(TomcatWebServerFactory factory) {
        int preferred = environment.getProperty("server.port", Integer.class, 10200);
        int chosen = findFirstAvailablePort(preferred, preferred + 200);
        factory.setPort(chosen);
    }

    private static int findFirstAvailablePort(int startInclusive, int endExclusive) {
        for (int port = startInclusive; port < endExclusive; port++) {
            if (isTcpPortAvailable(port)) {
                return port;
            }
        }
        return 0;
    }

    private static boolean isTcpPortAvailable(int port) {
        try (ServerSocket socket = new ServerSocket()) {
            socket.setReuseAddress(false);
            socket.bind(new InetSocketAddress("127.0.0.1", port), 1);
            return true;
        } catch (IOException e) {
            return false;
        }
    }
}
