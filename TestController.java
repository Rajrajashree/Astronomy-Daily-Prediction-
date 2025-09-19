package com.react.reactproject.controller;
	
	import org.springframework.http.ResponseEntity;

// src/main/java/com/yourpackage/controller/TestController.java

	import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.react.reactproject.dto.SubscriptionDTO;

	@RestController
	public class TestController {

		 @PostMapping("/test-date")
		    public ResponseEntity<String> testDate(@RequestBody SubscriptionDTO dto) {
		        return ResponseEntity.ok("Received DOB: " + dto.getDateOfBirth());
		    }
	}



