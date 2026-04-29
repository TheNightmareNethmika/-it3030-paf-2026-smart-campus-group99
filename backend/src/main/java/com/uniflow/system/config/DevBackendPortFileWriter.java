package com.uniflow.system.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.server.context.WebServerApplicationContext;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * Writes {@code backend/.dev-server-port} so the CRA dev server (setupProxy) can reach this JVM
 * when the chosen port is not the default (e.g. after a port collision).
 */
@Component
@Profile("dev")
public class DevBackendPortFileWriter {

    private static final Logger log = LoggerFactory.getLogger(DevBackendPortFileWriter.class);
    private static final Path PORT_FILE = Path.of(".dev-server-port");

    @EventListener(org.springframework.boot.context.event.ApplicationReadyEvent.class)
    public void onReady(org.springframework.boot.context.event.ApplicationReadyEvent event) {
        var ctx = event.getApplicationContext();
        if (!(ctx instanceof WebServerApplicationContext webCtx)) {
            return;
        }
        int port = webCtx.getWebServer().getPort();
        try {
            Files.writeString(PORT_FILE, String.valueOf(port));
        } catch (IOException e) {
            log.debug("Could not write {}: {}", PORT_FILE, e.getMessage());
        }
        log.warn("Uniflow API: http://127.0.0.1:{}  (CRA proxy reads .dev-server-port if present)", port);
    }

    @EventListener(ContextClosedEvent.class)
    public void onClosed(ContextClosedEvent event) {
        if (event.getApplicationContext().getParent() != null) {
            return;
        }
        try {
            Files.deleteIfExists(PORT_FILE);
        } catch (IOException ignored) {
        }
    }
}
