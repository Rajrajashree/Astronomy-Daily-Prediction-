package com.react.reactproject.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder; // Import PasswordEncoder
import org.springframework.web.bind.annotation.*;

import com.react.reactproject.dto.LoginDTO;
import com.react.reactproject.dto.UserDTO;
import com.react.reactproject.entity.User;
import com.react.reactproject.repository.UserRepository;
import com.react.reactproject.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject the PasswordEncoder
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            // ✅ Log received input to confirm frontend is sending correct data
            System.out.println("Received User: " + user.getName() + ", " + user.getEmail() + ", " + user.getPhone());

            // ✅ Optional check if email already exists
            if (userService.existsByEmail(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("message", "Account already exists with this email."));
            }

            // ✅ Save user to DB
            User savedUser = userService.saveUser(user);

            // ✅ Return UserDTO
            UserDTO userDTO = new UserDTO(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getPhone()
            );

            return new ResponseEntity<>(userDTO, HttpStatus.CREATED);


        } catch (Exception e) {
            // ✅ Print exception for debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Error: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginDTO loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());
        if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    }



//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
//        String email = loginData.get("email");
//        String password = loginData.get("password"); // This is the plain text password from frontend
//
//        // 1. Find user by email
//        Optional<User> optionalUser = userService.findUserByEmail(email); // Use UserService to find by email
//
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//            // 2. Compare provided plain text password with stored hashed password
//            if (passwordEncoder.matches(password, user.getPassword())) {
//                UserDTO userDTO = new UserDTO(
//                    user.getId(),
//                    user.getName(),
//                    user.getEmail(),
//                    user.getPhone()
//                );
//                return ResponseEntity.ok(userDTO);
//            } else {
//                // Passwords do not match
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body(Map.of("message", "Invalid credentials (password mismatch)")); // Specific for debugging
//            }
//        } else {
//            // User not found by email
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Map.of("message", "Invalid credentials (email not found)")); // Specific for debugging
//        }
////    }
///

