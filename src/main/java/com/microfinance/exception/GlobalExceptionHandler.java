package com.microfinance.exception;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import com.microfinance.dto.ApiResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

	// ========================================================
    // 🟩 JSP View Exception Handlers (for @Controller classes)
    // ========================================================
	
    @ExceptionHandler(ResourceNotFoundException.class)
    public String handleNotFound(ResourceNotFoundException ex, Model model) {
        model.addAttribute("error", ex.getMessage());
        return "error/404"; // Create error/404.jsp
    }
    
    @ExceptionHandler(Exception.class)
    public String handleAll(Exception ex, Model model) {
        model.addAttribute("error", "Something went wrong: " + ex.getMessage());
        return "error/general"; // Create error/general.jsp
    }
    
    // ========================================================
    // 🟦 REST API Exception Handlers (for @RestController APIs)
    // ========================================================
    
    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<ApiResponse<String>> handleBusinessError(BusinessLogicException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }

    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationErrors(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        
        return ResponseEntity
         .status(HttpStatus.BAD_REQUEST)
         .body(ApiResponse.error(HttpStatus.BAD_REQUEST, "Validation failed", errors));
    }
    
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<String>> handleBadRequest(BadRequestException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }


    
    
   
}
