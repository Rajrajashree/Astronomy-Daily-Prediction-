package com.react.reactproject.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

public class MockAstrologyPredictionService {

    public static String generateMockPrediction(LocalDate dob, String category, String tob, String pob) {
        String zodiacSign = getZodiacSign(dob);

        Map<String, String> careerTraits = new HashMap<>();
        careerTraits.put("aries", "You’re full of ambition today, great for setting career goals.");
        careerTraits.put("taurus", "Patience will reward you at work today. Stay steady.");
        careerTraits.put("gemini", "Communication skills will open new doors in your career.");
        careerTraits.put("cancer", "Your intuition helps navigate tricky work situations.");
        careerTraits.put("leo", "Leadership opportunities arise—take charge.");
        careerTraits.put("virgo", "Your eye for detail pays off in your job.");
        careerTraits.put("libra", "Seek harmony in team projects.");
        careerTraits.put("scorpio", "Focus helps you complete tough assignments.");
        careerTraits.put("sagittarius", "Great day to think big—consider career expansion.");
        careerTraits.put("capricorn", "Your discipline keeps things moving forward.");
        careerTraits.put("aquarius", "Innovative ideas bring praise.");
        careerTraits.put("pisces", "Creativity can help in professional growth.");

        Map<String, String> healthAdvice = new HashMap<>();
        healthAdvice.put("aries", "Channel your energy into exercise to stay balanced.");
        healthAdvice.put("taurus", "Prioritize rest to stay grounded.");
        healthAdvice.put("gemini", "Stretch and stay hydrated.");
        healthAdvice.put("cancer", "Meditation helps with emotional clarity.");
        healthAdvice.put("leo", "Your vitality is high—keep active.");
        healthAdvice.put("virgo", "A routine checkup might be helpful.");
        healthAdvice.put("libra", "Balance your meals and physical activity.");
        healthAdvice.put("scorpio", "Avoid burnout—schedule breaks.");
        healthAdvice.put("sagittarius", "Outdoor activity boosts your well-being.");
        healthAdvice.put("capricorn", "Structure your fitness goals today.");
        healthAdvice.put("aquarius", "Try a new wellness activity.");
        healthAdvice.put("pisces", "Good day for rest and recovery.");

        Map<String, String> travelInsights = new HashMap<>();
        travelInsights.put("aries", "Adventure awaits—plan a quick trip!");
        travelInsights.put("taurus", "Relaxing locations suit your current mood.");
        travelInsights.put("gemini", "Ideal time to explore new cultures.");
        travelInsights.put("cancer", "A short trip near water brings peace.");
        travelInsights.put("leo", "Travel for luxury is favored.");
        travelInsights.put("virgo", "Plan and prepare before your journey.");
        travelInsights.put("libra", "Great day to travel with a companion.");
        travelInsights.put("scorpio", "Solo travel helps you recharge.");
        travelInsights.put("sagittarius", "Long-distance travel inspires you.");
        travelInsights.put("capricorn", "Business travel may bring success.");
        travelInsights.put("aquarius", "Unconventional destinations appeal to you.");
        travelInsights.put("pisces", "A spiritual journey could be fulfilling.");

        // Choose the correct map based on the category
        Map<String, String> selectedMap;
        switch (category.toLowerCase()) {
            case "career":
                selectedMap = careerTraits;
                break;
            case "health":
                selectedMap = healthAdvice;
                break;
            case "travel":
                selectedMap = travelInsights;
                break;
            default:
                return "Unsupported category: " + category;
        }

        String prediction = selectedMap.getOrDefault(zodiacSign, "No prediction available for your zodiac sign.");
        return String.format("Prediction for %s (DOB: %s, TOB: %s, POB: %s): %s",
                category, dob, tob, pob, prediction);
    }

    // Zodiac sign logic
    private static String getZodiacSign(LocalDate dob) {
        int day = dob.getDayOfMonth();
        int month = dob.getMonthValue();

        if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "aquarius";
        else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "pisces";
        else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "aries";
        else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "taurus";
        else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "gemini";
        else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "cancer";
        else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "leo";
        else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "virgo";
        else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "libra";
        else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "scorpio";
        else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "sagittarius";
        else return "capricorn";
    }
}
