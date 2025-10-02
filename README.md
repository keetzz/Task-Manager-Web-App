 #Task Manager Web Application
Overview

The Task Manager Web App is a full-stack application that allows users to register, log in, and manage their tasks securely.
It provides essential task management features such as adding, editing, marking as complete, and deleting tasks, all tied to an authenticated user session.

The backend is powered by Django REST Framework (DRF) with JWT authentication, while the frontend is built with React.js, React Router, and Context API.
The project also includes Docker support for running the backend in a containerized environment.

Features

├── User authentication with JWT (Register & Login)
├── Secure API endpoints for tasks (per-user access only)
├── CRUD operations on tasks:

 Add new tasks

 Edit task titles

 Mark tasks as complete/incomplete

├── Delete tasks
├── React frontend with protected routes
├── Confetti animation 🎉 when completing tasks
├── Responsive UI with Bootstrap styling
├── Dockerized backend for easy deployment


Tech Stack

Frontend :(React.js, React Router DOM, Context API (state management), Bootstrap (styling),
Canvas-confetti (fun task completion effect))

Backend : (Django 4.x, Django REST Framework, SimpleJWT (JWT Authentication), SQLite (default database), 
Docker (backend containerization))

task-manager/
├── backend/                    # Django REST API
│   ├── task_manager/         
│   ├── accounts/               
│   ├── tasks/                 
│   ├── api/                    
│   ├── requirements.txt
├   ├── docker-compose.yml
│   └── Dockerfile
├── frontend/                   # React.js frontend
│   └── src/
│       ├── components/        
│       │   ├── TaskItem.jsx    
│       │   └── PrivateRoute.jsx
│       ├── context/          
│       │   └── AuthContext.jsx
│       ├── pages/              
│       │   ├── LoginPage.jsx  
│       │   └── RegisterPage.jsx
│       │   └── TasksPage.jsx  
│       └── services/          
│           └── api.js       
│   └── package.json
└── README.md

 Setup Instructions
1. Backend (Django REST API)
  # Navigate to backend folder
  cd backend
  # Install dependencies
  pip install -r requirements.txt
  # Run migrations
  python manage.py migrate
  # Start the server
  python manage.py runserver


The backend will run at: http://127.0.0.1:8000/

Using Docker:
cd backend
docker build -t task-backend .
docker compose up

2. Frontend (React)
# Navigate to frontend folder
cd task_manager-frontend

# Install dependencies
npm install

# Start development server
npm start
npm run dev


The frontend will run at: http://localhost:5173

Tasks

GET /api/tasks/ -- Get all tasks for logged-in user

POST /api/tasks/ -- Create new task

PUT /api/tasks/{id}/ -- Update a task

DELETE /api/tasks/{id}/ -- Delete a task

 All task endpoints require an Authorization: Bearer <token> header.
 
<img width="1054" height="871" alt="image" src="https://github.com/user-attachments/assets/f0d1830a-5d80-43df-9c58-fc4b826e3437" />

<img width="865" height="791" alt="image" src="https://github.com/user-attachments/assets/b6ee776c-47d0-4273-b303-8db2aac58de1" />

<img width="1252" height="902" alt="image" src="https://github.com/user-attachments/assets/9b3d342b-46b5-41b8-b3fb-2c8d9341b305" />

<img width="1573" height="890" alt="image" src="https://github.com/user-attachments/assets/31f1d2b7-fc1c-4286-9806-9042ae9703f9" />


 How It Works

A user registers with a username, email, and password.

On login, they receive a JWT token, which is stored in localStorage.

The frontend uses this token to make authenticated requests to the backend.

Each user can only see and manage their own tasks.

Completing a task triggers a confetti animation 🎉 for better UX.


👨‍💻 Author

Developed by Keerthana C
(ISE Department — Shyena Solutions Assignment)
