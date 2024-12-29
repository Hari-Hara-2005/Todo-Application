# Full-Stack Authentication and To-Do List App

This is a full-stack project featuring user authentication, a to-do list with individual user data, and product routing. The project is fully hosted with a React frontend (using Shadcn for styling) on Vercel and a Node.js/Express backend with PostgreSQL for data storage.

## Table of Contents

- Features
- Tech Stack
- Installation
- Environment Variables
- Running the Project
- API Routes
- Deployment
- License

## Features

Full authentication (Sign In, Sign Up, JWT-based authorization)

To-Do list management with CRUD operations

Individual user data isolation

Protected routes based on user authentication

Product router for additional features

Fully responsive and styled using Shadcn

Frontend and backend hosted and connected seamlessly

Tech Stack

Frontend:

React.js

Shadcn (CSS)

Vercel (Hosting)

Backend:

Node.js

Express.js

CORS

JWT (Authentication)

Vercel (Hosting)

Database:

PostgreSQL (Hosted on Aiven)

Installation

Clone the Repository

  git clone https://github.com/yourusername/fullstack-todo-auth.git
  cd fullstack-todo-auth

Install Dependencies

Backend

  cd backend
  npm install

Frontend

  cd frontend
  npm install

Environment Variables

Create a .env file in the root of the backend folder and add the following:

PORT=5000
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret_key

Running the Project

Start Backend

  cd backend
  npm run dev

Start Frontend

  cd frontend
  npm start

The frontend should be available at http://localhost:3000 and the backend at http://localhost:5000.

API Routes

Authentication

POST /api/auth/signup - Register new user

POST /api/auth/signin - Login user and receive JWT

To-Do

GET /api/todo - Get user-specific to-do items

POST /api/todo - Add new to-do item

PUT /api/todo/:id - Update to-do item

DELETE /api/todo/:id - Delete to-do item

Products (Sample Route)

GET /api/products - Fetch products (protected route)

API URL

Base API URL: https://todo-pi-plum-45.vercel.app

Deployment

Frontend

Deployed using Vercel

Automatic builds from GitHub push

Backend

Deployed on Vercel at https://todo-pi-plum-45.vercel.app

PostgreSQL hosted on Aiven

License

This project is open-source and available under the MIT License.

