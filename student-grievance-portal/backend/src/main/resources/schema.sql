-- Optional: initial schema (Postgres)
-- The application uses JPA auto-ddl=update, but you may use this to create the table explicitly
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(100),
    category VARCHAR(50),
    description TEXT,
    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
