package com.react.reactproject.service;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSubscriptionEmail(String toEmail, String planName, String dob, String birthTime, String birthPlace) {
        SimpleMailMessage message = new SimpleMailMessage();
        
        // This should match the 'spring.mail.username' from your application.properties
        message.setFrom("your-email@gmail.com"); 
        message.setTo(toEmail);
        message.setSubject("Your Subscription to " + planName + " is Active! ✅");
        
        String emailBody = "Dear Customer,\n\n"
            + "Congratulations! Your subscription to '" + planName + "' is now active.\n\n"
            + "We have received your personal details and will use them for your readings. Here is the information you provided:\n"
            + "  - Date of Birth: " + dob + "\n"
            + "  - Time of Birth: " + birthTime + "\n"
            + "  - Place of Birth: " + birthPlace + "\n\n"
            + "Thank you for subscribing to our service.\n\n"
            + "Best regards,\n"
            + "The Astronomy Team";
        
        message.setText(emailBody);
        
        try {
            mailSender.send(message);
            System.out.println("✅ Email notification sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Failed to send a email: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    
    public void sendPredictionEmail(String toEmail, String planName, String prediction, String dob, String birthTime, String birthPlace) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("your-email@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Your Daily Horoscope is Here! 🔮");

        String emailBody = "Hello there,\n\n"
            + "As per your subscription to '" + planName + "', here is your personalized horoscope prediction for today:\n\n"
            + "➡️ " + prediction + "\n\n"
            + "Your details on file:\n"
            + "  - Date of Birth: " + dob + "\n"
            + "  - Time of Birth: " + birthTime + "\n"
            + "  - Place of Birth: " + birthPlace + "\n\n"
            + "Wishing you a wonderful day!\n"
            + "The Astronomy Team";

        message.setText(emailBody);

        try {
            mailSender.send(message);
            System.out.println("✅ Daily prediction email sent to: " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Failed to send prediction email: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
