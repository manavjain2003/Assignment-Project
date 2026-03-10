# Task Management System

A simple task management app built with MERN stack for assignment

### Backend
```
cd backend
npm install
npm install express mongoose jsonwebtoken bcryptjs dotenv cors
node server.js
```

### Frontend
```
cd frontend
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in the backend folder:
```
PORT=5000
MONGO_URI= url
JWT_SECRET= key
```

## Features
- User registration and login
- JWT based authentication
- Admin can create projects and add users
- Users can create tasks and update task status
- Role based access (admin / user)

## Important
- To create an admin, we hve to do it manually from mongodb
- Frontend runs on port 5173, backend runs on port 5000
