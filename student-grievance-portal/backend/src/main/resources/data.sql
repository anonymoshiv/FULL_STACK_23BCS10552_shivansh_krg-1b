-- Insert sample users on application startup (for H2 in-memory database)
-- This file is automatically executed by Spring Boot

INSERT INTO users (username, password, role) VALUES ('student1', 'pass123', 'STUDENT');
INSERT INTO users (username, password, role) VALUES ('student2', 'pass123', 'STUDENT');
INSERT INTO users (username, password, role) VALUES ('john', 'john123', 'STUDENT');
INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'ADMIN');
INSERT INTO users (username, password, role) VALUES ('admin1', 'admin123', 'ADMIN');
