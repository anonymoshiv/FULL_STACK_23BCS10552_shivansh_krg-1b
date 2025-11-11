package com.example.grievance.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> login(Authentication auth) {
        // If we reach here, authentication succeeded (Spring Security checked credentials)
        Map<String, String> response = new HashMap<>();
        response.put("username", auth.getName());
        
        // Extract role from authorities (ROLE_STUDENT or ROLE_ADMIN)
        String role = auth.getAuthorities().stream()
                .findFirst()
                .map(a -> a.getAuthority().replace("ROLE_", ""))
                .orElse("STUDENT");
        
        response.put("role", role);
        response.put("message", "Login successful");
        
        return ResponseEntity.ok(response);
    }
}
