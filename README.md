# Task Manager App

## Setup

### Backend
cd backend
npm install
npm start
Runs on http://localhost:4000

### Frontend
cd frontend
npm install
npm start
Runs on http://localhost:3000

## API Endpoints
- GET /api/tasks - get all tasks
- POST /api/tasks - create a task
- PUT /api/tasks/:id - update a task
- DELETE /api/tasks/:id - delete a task
- PATCH /api/tasks/:id/toggle - toggle completion status

## Assumptions & Design Decisions
- Used in-memory array for storage, no database needed
- Carousel built from scratch without external libraries
- Backend runs on port 4000, frontend on 3000

## Time Spent
- Backend: ~70 min
- Frontend + carousel: ~90 min
- Styling: ~35 min
- Debugging: ~25 min
