package com.uniflow.system;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@SpringBootApplication(scanBasePackages = {"com.uniflow.system", "com.paf.helpdesk"})
@EntityScan(basePackages = {"com.uniflow.system.model", "com.paf.helpdesk.entity"})
@EnableJpaRepositories(basePackages = {"com.uniflow.system.repository", "com.paf.helpdesk.repository"})
public class UniflowApplication {

	public static void main(String[] args) {
		loadDotEnvFiles();
		SpringApplication.run(UniflowApplication.class, args);
	}

	/**
	 * Loads {@code .env} from the JVM working directory and from {@code backend/.env} when the
	 * process is started from the repo root (common with IDEs). Later files override earlier keys.
	 */
	private static void loadDotEnvFiles() {
		String userDir = System.getProperty("user.dir");
		List<Path> candidates = List.of(
				Path.of(userDir, ".env"),
				Path.of(userDir, "backend", ".env")
		);
		for (Path envFile : candidates) {
			if (!Files.isRegularFile(envFile)) {
				continue;
			}
			Dotenv dotenv = Dotenv.configure()
					.directory(envFile.getParent().toString())
					.filename(envFile.getFileName().toString())
					.ignoreIfMalformed()
					.load();
			dotenv.entries().forEach(entry -> {
				if (entry.getKey() != null && entry.getValue() != null) {
					String key = stripBom(entry.getKey().trim());
					String val = entry.getValue().trim();
					System.setProperty(key, val);
				}
			});
		}
	}

	private static String stripBom(String key) {
		if (key != null && !key.isEmpty() && key.charAt(0) == '\uFEFF') {
			return key.substring(1);
		}
		return key;
	}

}
