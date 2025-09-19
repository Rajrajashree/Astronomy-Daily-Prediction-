package com.react.reactproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.react.reactproject.entity.Subscription;
import com.react.reactproject.entity.User;
import com.react.reactproject.repository.SubscriptionRepository;
import com.react.reactproject.repository.UserRepository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Component
public class SubscriptionScheduler {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PredictionService predictionService;

    // The scheduler runs every minute to check for new predictions to send.
    @Scheduled(cron = "0 * * * * *")
    public void sendScheduledPredictions() {
        System.out.println("⏰ Running daily prediction scheduler...");
        
        LocalTime now = LocalTime.now();
        String currentHour = String.format("%02d", now.getHour()); // Format to two digits
        String currentMinute = String.format("%02d", now.getMinute()); // Format to two digits
        String currentTime = currentHour + ":" + currentMinute;

        List<Subscription> activeSubscriptions = subscriptionRepository.findByStatus("COMPLETED");

        for (Subscription sub : activeSubscriptions) {
            String preferredTime = sub.getPreferredTime();
            if (preferredTime != null && !preferredTime.isEmpty()) {
                // Now directly compare the current time to the stored preferred time.
                if (currentTime.equals(preferredTime)) {
                    // Fetch the user to get their email address.
                    Optional<User> userOpt = userRepository.findById(sub.getUser().getId());
                    if (userOpt.isPresent()) {
                        User user = userOpt.get();
                        System.out.println("Sending prediction for user " + user.getPhone() + " at their preferred time: " + preferredTime);
                        // Pass both the subscription and user objects to the PredictionService.
                        predictionService.generateAndSendPrediction(sub, user);
                    }
                }
            }
        }
        System.out.println("✅ Prediction scheduler finished.");
    }
}
