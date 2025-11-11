package com.example.grievance.repository;

import com.example.grievance.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByStatus(String status);
    List<Feedback> findBySubmittedBy(String submittedBy);
}
