package com.example.todosapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class TodosApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodosApiApplication.class, args);
	}
}
