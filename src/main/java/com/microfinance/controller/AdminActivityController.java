package com.microfinance.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.microfinance.model.ActivityLog;
import com.microfinance.repository.ActivityLogRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminActivityController {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @GetMapping("/activities")
    public ResponseEntity<List<ActivityLog>> getActivities() {
        return ResponseEntity.ok(activityLogRepository.findAllByOrderByTimestampDesc());
    }

    @DeleteMapping("/activities/clear")
    public ResponseEntity<Map<String, String>> clearActivities() {
        activityLogRepository.deleteAll();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Activity log cleared successfully");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        List<ActivityLog> logs = activityLogRepository.findAll();
        long totalActivities = logs.size();
        long successCount = logs.stream().filter(l -> "SUCCESS".equals(l.getStatus())).count();
        long failureCount = totalActivities - successCount;
        
        // Count top actions
        Map<String, Integer> actionCounts = new HashMap<>();
        for (ActivityLog log : logs) {
            actionCounts.put(log.getAction(), actionCounts.getOrDefault(log.getAction(), 0) + 1);
        }
        
        // Count activities by user
        Map<String, Integer> userCounts = new HashMap<>();
        for (ActivityLog log : logs) {
            userCounts.put(log.getUsername(), userCounts.getOrDefault(log.getUsername(), 0) + 1);
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalActivities", totalActivities);
        stats.put("successCount", successCount);
        stats.put("failureCount", failureCount);
        stats.put("actionStats", actionCounts);
        stats.put("userStats", userCounts);
        
        return ResponseEntity.ok(stats);
    }
}
