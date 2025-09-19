package com.react.reactproject.repository;

import com.react.reactproject.entity.Prediction;
import com.react.reactproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {
//    List<Prediction> findByUser(User user);
//    Optional<Prediction> findByUserAndPredictionDateAndCategory(User user, LocalDate predictionDate, String category);
    
}
