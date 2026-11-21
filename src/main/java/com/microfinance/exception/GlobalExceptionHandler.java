package com.microfinance.exception;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import com.microfinance.dto.ApiResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

	private boolean isApiOrAjaxRequest(HttpServletRequest request) {
		if (request == null) return false;
		String uri = request.getRequestURI() != null ? request.getRequestURI() : "";
		String accept = request.getHeader("Accept") != null ? request.getHeader("Accept") : "";
		String requestedWith = request.getHeader("X-Requested-With") != null ? request.getHeader("X-Requested-With") : "";
		String contentType = request.getContentType() != null ? request.getContentType() : "";
		return uri.contains("/api/")
				|| uri.contains("/accountManagement/")
				|| uri.contains("/customermanagement/")
				|| "XMLHttpRequest".equalsIgnoreCase(requestedWith)
				|| accept.contains("application/json")
				|| contentType.contains("application/json")
				|| contentType.contains("multipart/form-data");
	}

	// ========================================================
	// 🟩 Resource Not Found Exception
	// ========================================================
	@ExceptionHandler(ResourceNotFoundException.class)
	public Object handleNotFound(ResourceNotFoundException ex, HttpServletRequest request, Model model) {
		String msg = (ex.getMessage() != null) ? ex.getMessage().toUpperCase() : "RESOURCE NOT FOUND";
		if (isApiOrAjaxRequest(request)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(ApiResponse.error(HttpStatus.NOT_FOUND, msg));
		}
		model.addAttribute("error", msg);
		return "error/404";
	}

	// ========================================================
	// 🟩 Form Binding Exceptions (e.g. invalid types in @ModelAttribute)
	// ========================================================
	@ExceptionHandler(BindException.class)
	public Object handleBindException(BindException ex, HttpServletRequest request, Model model) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors().forEach(error ->
				errors.put(error.getField(), (error.getDefaultMessage() != null ? error.getDefaultMessage() : "INVALID VALUE").toUpperCase())
		);
		String errorMsg = errors.isEmpty()
				? "INVALID FORM DATA SUBMITTED"
				: "FORM VALIDATION ERROR: " + errors.toString().toUpperCase();

		if (isApiOrAjaxRequest(request)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, errorMsg, errors));
		}
		model.addAttribute("error", errorMsg);
		return "error/general";
	}

	// ========================================================
	// 🟩 Validation Errors (@Valid @RequestBody)
	// ========================================================
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Object handleValidationErrors(MethodArgumentNotValidException ex, HttpServletRequest request, Model model) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors().forEach(error ->
				errors.put(error.getField(), (error.getDefaultMessage() != null ? error.getDefaultMessage() : "VALIDATION FAILED").toUpperCase())
		);
		String errorMsg = errors.isEmpty()
				? "VALIDATION FAILED"
				: "VALIDATION FAILED: " + errors.toString().toUpperCase();

		if (isApiOrAjaxRequest(request)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, errorMsg, errors));
		}
		model.addAttribute("error", errorMsg);
		return "error/general";
	}

	// ========================================================
	// 🟩 Type Mismatch Exception
	// ========================================================
	@ExceptionHandler(TypeMismatchException.class)
	public Object handleTypeMismatch(TypeMismatchException ex, HttpServletRequest request, Model model) {
		String msg = "INVALID PARAMETER FORMAT: " + (ex.getPropertyName() != null ? ex.getPropertyName().toUpperCase() : "");
		if (isApiOrAjaxRequest(request)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, msg));
		}
		model.addAttribute("error", msg);
		return "error/general";
	}

	// ========================================================
	// 🟩 File Upload Max Size Exception
	// ========================================================
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public Object handleMaxSizeException(MaxUploadSizeExceededException ex, HttpServletRequest request, Model model) {
		String msg = "FILE SIZE EXCEEDS MAXIMUM PERMITTED UPLOAD LIMIT";
		if (isApiOrAjaxRequest(request)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, msg));
		}
		model.addAttribute("error", msg);
		return "error/general";
	}

	// ========================================================
	// 🟩 Business Logic Exceptions
	// ========================================================
	@ExceptionHandler(BusinessLogicException.class)
	public Object handleBusinessError(BusinessLogicException ex, HttpServletRequest request, Model model) {
		String msg = (ex.getMessage() != null) ? ex.getMessage().toUpperCase() : "BUSINESS LOGIC ERROR";
		if (isApiOrAjaxRequest(request)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, msg));
		}
		model.addAttribute("error", msg);
		return "error/general";
	}

	// ========================================================
	// 🟩 Bad Request Exceptions
	// ========================================================
	@ExceptionHandler(BadRequestException.class)
	public Object handleBadRequest(BadRequestException ex, HttpServletRequest request, Model model) {
		String msg = (ex.getMessage() != null) ? ex.getMessage().toUpperCase() : "BAD REQUEST";
		if (isApiOrAjaxRequest(request)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ApiResponse.error(HttpStatus.BAD_REQUEST, msg));
		}
		model.addAttribute("error", msg);
		return "error/general";
	}

	// ========================================================
	// 🟩 Catch-All Exception Handler
	// ========================================================
	@ExceptionHandler(Exception.class)
	public Object handleAll(Exception ex, HttpServletRequest request, Model model) {
		String detail = (ex.getMessage() != null && !ex.getMessage().trim().isEmpty())
				? ex.getMessage().toUpperCase()
				: ex.getClass().getSimpleName().toUpperCase();
		String msg = "SOMETHING WENT WRONG: " + detail;

		if (isApiOrAjaxRequest(request)) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, msg));
		}
		model.addAttribute("error", msg);
		return "error/general";
	}
}
