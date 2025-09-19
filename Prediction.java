package com.react.reactproject.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String category;
    
    @Column(columnDefinition = "TEXT")
    private String prediction;

    private LocalDateTime timeOfSendingPrediction;

    public Prediction() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPrediction() {
        return prediction;
    }

    public void setPrediction(String prediction) {
        this.prediction = prediction;
    }

    public LocalDateTime getTimeOfSendingPrediction() {
        return timeOfSendingPrediction;
    }

    public void setTimeOfSendingPrediction(LocalDateTime timeOfSendingPrediction) {
        this.timeOfSendingPrediction = timeOfSendingPrediction;
    }
}
