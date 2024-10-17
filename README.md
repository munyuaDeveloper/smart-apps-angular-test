# Smart Apps Angular Test

This project is a combined assignment focusing on two main functionalities:
1. **User Registration and Authentication using Auth0 API**: Implementing a secure authentication system with user registration and login forms.
2. **CRUD Operations using JSONPlaceholder API**: Demonstrating basic CRUD operations in an Angular application using the JSONPlaceholder API for data interaction.

## Table of Contents
- [Project Structure](#project-structure)
- [Assignment 1: User Registration and Authentication with Auth0](#assignment-1-user-registration-and-authentication-with-auth0)
- [Assignment 2: CRUD Operations using JSONPlaceholder API](#assignment-2-crud-operations-using-jsonplaceholder-api)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)

---

## Project Structure

The project contains the following key directories and files:

- **components/**: Contains reusable Angular components such as the `edit-post-dialog`, `loader`, and `nav-bar`.
- **guards/**: Includes the `auth.guard.ts` file to protect routes by checking user authentication.
- **interceptors/**: Contains interceptors for handling HTTP requests and errors globally.
- **models/**: Defines interfaces for data models like `PostInterface`.
- **pages/**: Contains different feature pages such as `dashboard`, `home`, and `post-detail`.
- **services/**: Contains Angular services like `loading.service.ts`, `posts.service.ts`, and `shared.service.ts` for handling API interactions.
- **environments/**: Contains environment configuration files (`environment.ts` and `environment.prod.ts`) to manage development and production environments.
- **app.component.ts**: The main component for bootstrapping the application.
- **app.routes.ts**: Defines the routes for navigating between pages in the application.

---

## Assignment 1: User Registration and Authentication with Auth0

### Objective
To create a secure authentication system using Auth0 for user registration and login. The app integrates with the Auth0 API to authenticate users and protect specific routes using access tokens.

### Features
1. **Registration Form**: Allows new users to register by providing a username, email, and password.
2. **Login Form**: Users can log in using their registered email and password. Error handling is implemented for invalid credentials.
3. **Auth Guard**: Protects certain routes and redirects unauthenticated users to the login page.

### Auth0 Integration
1. **Auth0 SDK**: The project integrates with Auth0 for managing user authentication.
2. **Token-Based Authorization**: The app uses access tokens to secure routes and handle user sessions.

---

## Assignment 2: CRUD Operations using JSONPlaceholder API

### Objective
This part of the project demonstrates CRUD operations (Create, Read, Update, Delete) by interacting with the JSONPlaceholder API. The data is displayed in a list format with options to create, update, or delete posts.

### Features
1. **Create Posts**: Users can create a new post using a form.
2. **Read Posts**: Posts are fetched from the JSONPlaceholder API and displayed in a list using Angular Material's table component.
3. **Update Posts**: Users can update existing posts.
4. **Delete Posts**: Allows users to delete posts from the list.

### API Endpoints
- **Create (POST)**: `https://jsonplaceholder.typicode.com/posts`
- **Read (GET)**: Fetch posts from `https://jsonplaceholder.typicode.com/posts`
- **Update (PUT/PATCH)**: Update post at `https://jsonplaceholder.typicode.com/posts/{id}`
- **Delete (DELETE)**: Delete a post from `https://jsonplaceholder.typicode.com/posts/{id}`

---

## Environment Setup

### Auth0 Configuration
1. Go to [Auth0](https://auth0.com) and create a new application.
2. In the `environment.ts` file, configure your Auth0 domain and client ID:
   ```typescript
   export const environment = {
     production: false,
     auth0: {
       domain: 'YOUR_AUTH0_DOMAIN',
       clientId: 'YOUR_AUTH0_CLIENT_ID',
     },
   };
