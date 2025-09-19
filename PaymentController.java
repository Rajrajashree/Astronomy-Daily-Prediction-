package com.react.reactproject.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.react.reactproject.entity.Subscription;
import com.react.reactproject.entity.User;
import com.react.reactproject.repository.SubscriptionRepository;
import com.react.reactproject.repository.UserRepository;
import com.react.reactproject.service.EmailService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.react.reactproject.dto.SubscriptionDTO;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;
    
    @Autowired
    private EmailService emailService;
    
    // Helper method to convert time text to HH:mm format
    private String mapPreferredTimeToTime(String timeText) {
        if (timeText == null) return null;
        switch (timeText.toLowerCase()) {
            case "morning": return "08:00";
            case "afternoon": return "13:05";
            case "evening": return "18:00";//18
            case "night": return "23:00";
            default: return null;
        }
    }
    
 //  ADDED: Helper method to get the plan duration in days
    private long getPlanDurationInDays(String planName) {
        // This is a mapping of plan names to their durations.
        // You can fetch this from a database or configuration file for a production app.
        switch (planName) {
            case "Daily Horoscope 🔮 ": return 7;
            case "Career and Finances 💼": return 15;
            case "Health 💪": return 30;
            case "Relationships ❤️": return 20;
            case "Personality and Temperament 🧘": return 25;
            case "Success in Life 🌟": return 30;
            case "Travel and Foreign Opportunities 🚗": return 28;
            case "Past Life Karma and Spiritual Growth  challenges 🧿 ": return 45;
            default: return 30; // Default to 30 days if plan not found
        }
    }

    @PostMapping("/create-order")
    public String createOrder(@RequestBody Map<String, String> data) {
        try {
            RazorpayClient client = new RazorpayClient("rzp_live_qIBPkGYUdLQG4h", "iI5Oa8jT1yrx2E37BTdS4NEL");

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", Integer.parseInt(data.get("amount")));
            orderRequest.put("currency", data.get("currency"));
            orderRequest.put("receipt", "receipt#1");
            orderRequest.put("payment_capture", 1);

            Order order = client.orders.create(orderRequest);
            return order.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Order creation failed\"}";
        }
    }
    
    @PostMapping("/verify-payment")
    public ResponseEntity<String> verifyPayment(@RequestBody SubscriptionDTO subscriptionDTO) {
        try {
            String razorpaySecret = "iI5Oa8jT1yrx2E37BTdS4NEL";

            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", subscriptionDTO.getRazorpayOrderId());
            options.put("razorpay_payment_id", subscriptionDTO.getRazorpayPaymentId());
            options.put("razorpay_signature", subscriptionDTO.getRazorpaySignature());

            boolean isValid = com.razorpay.Utils.verifyPaymentSignature(options, razorpaySecret);

            if (!isValid) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("❌ Invalid payment signature.");
            }

            Optional<User> userOpt = userRepository.findByPhone(subscriptionDTO.getUserPhone());
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("User not found");
            }
            User user = userOpt.get();

            Subscription subscription = new Subscription();
            subscription.setUser(user);
            
            // ➡️ FIX: Explicitly set all the fields.
            subscription.setPaid(true); // Now correctly set to true
            subscription.setPlanName(subscriptionDTO.getPlanName());
            subscription.setStatus("COMPLETED");
            subscription.setStartDate(LocalDate.now());
            
            long durationDays = getPlanDurationInDays(subscriptionDTO.getPlanName());
            subscription.setEndDate(LocalDate.now().plusDays(durationDays)); // Assuming a 30-day subscription
            
            subscription.setUserPhone(subscriptionDTO.getUserPhone()); // Now correctly set from DTO
            subscription.setCategory(subscriptionDTO.getPlanName()); // Now correctly set from DTO
            subscription.setPreferredTime(mapPreferredTimeToTime(subscriptionDTO.getPreferredTimeOfDay())); // Converted to HH:mm format
            subscription.setBirthPlace(subscriptionDTO.getPlaceOfBirth());
            subscription.setBirthTime(subscriptionDTO.getTimeOfBirth());
            subscription.setDateOfBirth(subscriptionDTO.getDateOfBirth());
            
            subscriptionRepository.save(subscription);

            emailService.sendSubscriptionEmail(
                subscriptionDTO.getEmail(),
                subscriptionDTO.getPlanName(),
                subscriptionDTO.getDateOfBirth().toString(),
                subscriptionDTO.getTimeOfBirth(),
                subscriptionDTO.getPlaceOfBirth()
            );

            return ResponseEntity.ok("✅ Payment signature verified and subscription saved successfully.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Error verifying payment signature.");
        }
    }
}
