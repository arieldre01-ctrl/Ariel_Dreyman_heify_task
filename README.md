# Task Manager App

A simple fullstack task manager built with React + Express.js.

## Setup

### Backend
```bash
cd backend
npm install
npm start
```
Runs on http://localhost:4000

### Frontend
```bash
cd frontend
npm install
npm start
```
Runs on http://localhost:3000

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |
| PATCH | /api/tasks/:id/toggle | Toggle completion |

## Notes
- Data is stored in memory (resets on server restart)
- Carousel loops infinitely with cloned first/last items for seamless animation
- No external carousel libraries used
- CSS only for styling, no frameworks

## Time breakdown
- Backend: ~80 min
- Frontend components + carousel: ~100 min
- Styling: ~35 min
- Debugging: ~25 min
