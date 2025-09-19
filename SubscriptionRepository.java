package com.react.reactproject.repository;


import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.react.reactproject.entity.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
	List<Subscription> findByUserPhoneAndStatus(String phone, String status);
	List<Subscription> findByPreferredTime(String preferredTime);
	 List<Subscription> findByStatus(String status);

}

