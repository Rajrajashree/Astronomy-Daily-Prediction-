package com.react.reactproject.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import com.react.reactproject.dto.SubscriptionDTO;
import com.react.reactproject.entity.Subscription;
import com.react.reactproject.entity.User;
import com.react.reactproject.repository.SubscriptionRepository;
import com.react.reactproject.repository.UserRepository;
import com.react.reactproject.service.PredictionService;
//import com.react.reactproject.service.WhatsAppService;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class SubscriptionController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;



    // For testing - basic subscription
    @PostMapping("/subscribe")
    public Subscription subscribe(@RequestParam Long userId, @RequestParam String type) {
        User user = userRepository.findById(userId).orElseThrow();
        Subscription subscription = new Subscription();
        //subscription.setType(type);
        //subscription.setPaid(false); // default false
        subscription.setUser(user);
        return subscriptionRepository.save(subscription);
    }

    @PostMapping("/confirm")
    public Subscription confirmPayment(@RequestParam Long subscriptionId) {
        Subscription sub = subscriptionRepository.findById(subscriptionId).orElseThrow();
        //sub.setPaid(true);
        return subscriptionRepository.save(sub);
    }


    @PostMapping("/process")
    public ResponseEntity<String> processSubscription(@RequestBody SubscriptionDTO dto) {
        Optional<User> userOpt = userRepository.findByPhone(dto.getUserPhone());
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        User user = userOpt.get();
        // Save subscription record
        Subscription subscription = new Subscription();
        subscription.setUser(user);
        //subscription.setUserPhone(dto.getUserPhone());
        subscription.setPlanName(dto.getPlanName());
        subscription.setStatus("COMPLETED");
        subscription.setStartDate(LocalDate.now());
        subscriptionRepository.save(subscription);

      

        return ResponseEntity.ok("Subscription processed");
    }
    @GetMapping("/user/{phone}")
    public ResponseEntity<?> getUserSubscriptions(@PathVariable String phone) {
        var activeSubscriptions = subscriptionRepository.findByUserPhoneAndStatus(phone, "COMPLETED");
        return ResponseEntity.ok().body(new java.util.HashMap<>() {{
            put("activeSubscriptions", activeSubscriptions.stream().map(Subscription::getPlanName).toList());
        }});
    }
    
    
    //testing 
    @Autowired
    private PredictionService predictionService;
    @PostMapping("/test-prediction/{phone}")
    public ResponseEntity<String> testPrediction(@PathVariable String phone) {
        Optional<User> userOpt = userRepository.findByPhone(phone);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }
        User user = userOpt.get();

        List<Subscription> activeSubscriptions = subscriptionRepository.findByUserPhoneAndStatus(phone, "COMPLETED");
        if (activeSubscriptions.isEmpty()) {
            return ResponseEntity.badRequest().body("No active subscriptions found for this user.");
        }

        // We'll take the first active subscription to send a prediction for.
        Subscription subscription = activeSubscriptions.get(0);
        
        System.out.println("Manually triggering prediction for user " + user.getPhone());
        predictionService.generateAndSendPrediction(subscription, user);

        return ResponseEntity.ok("Prediction email triggered successfully for " + user.getEmail());
    }
}
//    @Autowired
//    private EmailService emailService;
//
//    
//    @Autowired
//    private PredictionService predictionService;
//
//    @PostMapping("/send-prediction")
//    public ResponseEntity<String> sendPredictionEmail(@RequestParam String userPhone , @RequestParam String category) {
//        Optional<User> userOpt = userRepository.findByPhone(userPhone);
//        if (userOpt.isEmpty()) {
//            return ResponseEntity.badRequest().body("User not found");
//        }
//        User user = userOpt.get();
//
//        try {
//            String prediction = predictionService.generatePersonalizedPrediction(user , category);
//            emailService.sendEmail(user.getEmail(), "Your Daily Astrology Prediction 🌌", prediction);
//            return ResponseEntity.ok("Prediction sent to email successfully!");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.internalServerError().body("Failed to send prediction email");
//        }
//    }


    




