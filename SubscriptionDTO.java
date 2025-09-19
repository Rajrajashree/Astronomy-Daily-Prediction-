package com.react.reactproject.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class SubscriptionDTO {
	private String razorpayOrderId;
	private String razorpayPaymentId;
	private String razorpaySignature;

	private String userPhone;
	private String planName;
    
	private String userName;
    private String email;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    private String timeOfBirth;  // or use `LocalTime`
    private String placeOfBirth;
    private String preferredTimeOfDay;
    
    
    
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}
	public String getPlanName() {
		return planName;
	}
	public void setPlanName(String planName) {
		this.planName = planName;
	}
	public SubscriptionDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public String getRazorpayOrderId() {
	    return razorpayOrderId;
	}

	public String getRazorpayPaymentId() {
	    return razorpayPaymentId;
	}

	public String getRazorpaySignature() {
	    return razorpaySignature;
	}

	
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getTimeOfBirth() {
		return timeOfBirth;
	}
	public void setTimeOfBirth(String timeOfBirth) {
		this.timeOfBirth = timeOfBirth;
	}
	public String getPlaceOfBirth() {
		return placeOfBirth;
	}
	public void setPlaceOfBirth(String placeOfBirth) {
		this.placeOfBirth = placeOfBirth;
	}
	public String getPreferredTimeOfDay() {
		return preferredTimeOfDay;
	}
	public void setPreferredTimeOfDay(String preferredTimeOfDay) {
		this.preferredTimeOfDay = preferredTimeOfDay;
	}
    

}
