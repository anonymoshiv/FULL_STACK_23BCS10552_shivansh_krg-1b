# Student Grievance and Feedback Portal

This repository contains a minimal full-stack project: a Spring Boot backend and a React (Vite) frontend with Tailwind CSS.

Folder layout
- `backend/` — Spring Boot (Java, Maven). Exposes REST API at `http://localhost:8080/api/feedback`.
- `frontend/` — Vite + React + Tailwind project.

Quick start (Windows PowerShell)

1) Backend
- Ensure you have Java 17 and Maven installed.
- Create a PostgreSQL database named `grievance_db` and update `backend/src/main/resources/application.properties` with your DB credentials.

Commands:
```powershell
# from project root
cd "D:\shivansh Programming\java programming\final project\student-grievance-portal\backend"
# build and run
mvn spring-boot:run
```
The backend listens on port 8080 by default.

2) Frontend
- Ensure Node.js (>=18) and npm are installed.

Commands:
```powershell
cd "D:\shivansh Programming\java programming\final project\student-grievance-portal\frontend"
npm install
npm run dev
```
Open the dev server address printed by Vite (usually http://localhost:5173).

Notes
- The backend uses JPA with `spring.jpa.hibernate.ddl-auto=update` for quick setup. For production, use migrations and stricter settings.
- The frontend expects the backend at `http://localhost:8080/api` (see `src/services/api.js`).

Evaluation checklist
- UI responsiveness and Tailwind styling: basic Tailwind setup and example pages included.
- API connection: frontend uses Axios to call backend endpoints.
- CRUD: POST/GET/PUT/DELETE endpoints are implemented in the backend controller.
- Role-based visibility: Admin dashboard is a simple page (no auth). You can extend with authentication later.
- Git: Commit the generated files locally and push to your repository to preserve version history.

Next steps / suggestions
- Add authentication (student vs admin).
- Add DTOs and validation in backend.
- Add unit/integration tests and CI workflows.
