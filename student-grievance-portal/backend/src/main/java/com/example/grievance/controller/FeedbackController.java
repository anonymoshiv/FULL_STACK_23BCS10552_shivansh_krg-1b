package com.example.grievance.controller;

import com.example.grievance.model.Feedback;
import com.example.grievance.repository.FeedbackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*", allowedHeaders = "*", exposedHeaders = "Authorization")
public class FeedbackController {
    private final FeedbackRepository repository;

    public FeedbackController(FeedbackRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback, Authentication auth) {
        feedback.setStatus("Pending");
        feedback.setSubmittedBy(auth.getName()); // Set to logged-in username
        Feedback saved = repository.save(feedback);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<Feedback> getAll(Authentication auth) {
        // If admin, return all; if student, return only their own
        boolean isAdmin = auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if (isAdmin) {
            return repository.findAll();
        } else {
            return repository.findBySubmittedBy(auth.getName());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getById(@PathVariable Long id, Authentication auth) {
        Optional<Feedback> f = repository.findById(id);
        if (f.isEmpty()) return ResponseEntity.notFound().build();
        
        // Check if student is trying to access someone else's feedback
        boolean isAdmin = auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if (!isAdmin && !f.get().getSubmittedBy().equals(auth.getName())) {
            return ResponseEntity.status(403).build(); // Forbidden
        }
        
        return ResponseEntity.ok(f.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feedback> update(@PathVariable Long id, @RequestBody Feedback incoming) {
        return repository.findById(id).map(existing -> {
            if (incoming.getStatus() != null) existing.setStatus(incoming.getStatus());
            if (incoming.getDescription() != null) existing.setDescription(incoming.getDescription());
            if (incoming.getStudentName() != null) existing.setStudentName(incoming.getStudentName());
            if (incoming.getCategory() != null) existing.setCategory(incoming.getCategory());
            Feedback saved = repository.save(existing);
            return ResponseEntity.ok(saved);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
