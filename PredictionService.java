package com.react.reactproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.react.reactproject.entity.Prediction;
import com.react.reactproject.entity.Subscription;
import com.react.reactproject.entity.User;
import com.react.reactproject.repository.PredictionRepository;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;

import org.json.JSONObject;

@Service
public class PredictionService {

    @Autowired
    private EmailService emailService;
    
    @Autowired
    private PredictionRepository predictionRepository; 
    
    // ➡️ IMPORTANT: Replace with your actual Gemini API key.
    private final String geminiApiKey = "Gemini API Key";

    public void generateAndSendPrediction(Subscription subscription, User user) {
        String prompt = buildPredictionPrompt(subscription);
        try {
            // Call to the LLM to get a prediction
            String prediction = getPredictionFromGemini(prompt);
            
         // ➡️ ADDED: Save the prediction to the database
            Prediction newPrediction = new Prediction();
            newPrediction.setUser(user);
            newPrediction.setCategory(subscription.getCategory());
            newPrediction.setPrediction(prediction);
            newPrediction.setTimeOfSendingPrediction(LocalDateTime.now());
            predictionRepository.save(newPrediction);

            // Pass the correct data from the Subscription object to the email service method
            emailService.sendPredictionEmail(
                user.getEmail(),
                subscription.getPlanName(),
                prediction,
                subscription.getDateOfBirth().toString(),
                subscription.getBirthTime(),
                subscription.getBirthPlace()
            );

        } catch (Exception e) {
            System.err.println("❌ Failed to generate or send prediction for user " );
            e.printStackTrace();
        }
    }

    private String buildPredictionPrompt(Subscription subscription) {
        // Get DOB, TOB, and POB directly from the Subscription object
        String dob = subscription.getDateOfBirth() != null ? subscription.getDateOfBirth().toString() : "N/A";
        String tob = subscription.getBirthTime() != null ? subscription.getBirthTime() : "N/A";
        String pob = subscription.getBirthPlace() != null ? subscription.getBirthTime() : "N/A";

        return String.format(
            "Based on the following user details, please generate a daily horoscope prediction for their plan '%s':" +
            "Date of Birth: %s, Time of Birth: %s, Place of Birth: %s. " +
            "Make the prediction short, engaging, and in a friendly tone.",
            subscription.getPlanName(), dob, tob, pob
        );
    }
    
    private String getPredictionFromGemini(String prompt) throws IOException, InterruptedException {
         String apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=" + geminiApiKey;

        JSONObject requestBody = new JSONObject()
                .put("contents", new JSONObject[] {
                    new JSONObject()
                        .put("parts", new JSONObject[] {
                            new JSONObject().put("text", prompt)
                        })
                });

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString()))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        // Parse the response to extract the text
        JSONObject responseJson = new JSONObject(response.body());
        if (responseJson.has("candidates")) {
             return responseJson.getJSONArray("candidates")
                               .getJSONObject(0)
                               .getJSONObject("content")
                               .getJSONArray("parts")
                               .getJSONObject(0)
                               .getString("text");
        } else {
            return "Unable to generate a prediction at this time. Please check back later!";
        }
    }
}
