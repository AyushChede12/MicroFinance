package com.microfinance.dto;

import org.springframework.http.HttpStatus;

import com.microfinance.model.ExecutiveFounder;

public class ApiResponse<T> {

	private HttpStatus status;
    private String message;
    private T data;

    // Constructors
    public ApiResponse(HttpStatus status, String message, T data) {
        this.status = status;
        this.message = (message != null) ? message.toUpperCase() : null;
        this.data = data;
    }

   

	public ApiResponse(String string, String message2, ApiResponse<ExecutiveFounder> response) {
		// TODO Auto-generated constructor stub
	}

	// Static helper methods for success and error responses
    public static <T> ApiResponse<T> success(HttpStatus status, String message, T data) {
        return new ApiResponse<>(status, message, data);
    }

    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return new ApiResponse<>(status, message, null);
    }
    public static <T> ApiResponse<T> error(HttpStatus status, String message, T data) {
        return new ApiResponse<>(status, message, data);
    }


    // Getters and setters
    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = (message != null) ? message.toUpperCase() : null;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
	

}