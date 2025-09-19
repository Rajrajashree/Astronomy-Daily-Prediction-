package com.react.reactproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
@EnableScheduling
@EnableJpaRepositories
public class ReactprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReactprojectApplication.class, args);
	}
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

//	@Bean
//	public ObjectMapper objectMapper() {
//		return new ObjectMapper();
//	}

}
