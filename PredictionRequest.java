package com.react.reactproject.dto;

import lombok.Data;

@Data
public class PredictionRequest {
    private String dob;      // Format: YYYY-MM-DD
    private String tob;      // Format: HH:mm:ss
    private String pob;      // Place of birth (e.g., "Mumbai")
    private String category; // e.g., "career", "travel", "health", etc.
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getTob() {
		return tob;
	}
	public void setTob(String tob) {
		this.tob = tob;
	}
	public String getPob() {
		return pob;
	}
	public void setPob(String pob) {
		this.pob = pob;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public PredictionRequest(String dob, String tob, String pob, String category) {
		super();
		this.dob = dob;
		this.tob = tob;
		this.pob = pob;
		this.category = category;
	}
	public PredictionRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
    
    
    
}
