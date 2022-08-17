package com.bnksys.innerProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(
        {FileUploadProperties.class}
)
@SpringBootApplication
public class InnerProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(InnerProjectApplication.class, args);
	}

}
