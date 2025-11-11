-- PostgreSQL Setup Script for Student Grievance Portal
-- Run these commands in pgAdmin4 Query Tool

-- 1. Create the database (if not already created)
CREATE DATABASE grievance_db;

-- 2. Connect to grievance_db database in pgAdmin4, then run the following:

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(100),
    submitted_by VARCHAR(100), -- Username of person who submitted
    category VARCHAR(50),
    description TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users (password is plain text for simplicity)
-- Student accounts
INSERT INTO users (username, password, role) VALUES ('student1', 'pass123', 'STUDENT');
INSERT INTO users (username, password, role) VALUES ('student2', 'pass123', 'STUDENT');
INSERT INTO users (username, password, role) VALUES ('john', 'john123', 'STUDENT');

-- Admin accounts
INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'ADMIN');
INSERT INTO users (username, password, role) VALUES ('admin1', 'admin123', 'ADMIN');

-- Optional: Insert sample feedback for testing
INSERT INTO feedback (student_name, submitted_by, category, description, status) 
VALUES ('John Doe', 'student1', 'Academics', 'Need clarification on exam schedule', 'Pending');

INSERT INTO feedback (student_name, submitted_by, category, description, status) 
VALUES ('Jane Smith', 'student2', 'Hostel', 'Hot water issue in hostel', 'In Progress');

-- Verify data
SELECT * FROM users;
SELECT * FROM feedback;
