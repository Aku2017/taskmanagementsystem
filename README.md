# taskmanagementsystem
# Task Management Application

This is a Task Management application built using NestJS and Prisma ORM. It provides APIs to manage tasks and users.

## Features

- Create, read, update, and delete tasks
- Create, read, update, and delete users
- Real-time updates using WebSockets

## Technologies Used

- NestJS
- Prisma ORM
- PostgreSQL
- Docker

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker
- Docker Compose

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
  
2. Navigate to Project Directory
cd taskmanagement

3. Install dependencies
npm install

**Database Setup**
a. Start the PostgreSQL database using Docker Compose:

docker-compose up -d

b. Run Prisma migrations to create tables in the database:

npm run prisma:migrate

c. Running the Application
Start the NestJS application:

npm run start:dev
Access the API at http://localhost:3000/api


Sure, here's a README.md file for your Task Management application:

markdown
Copy code
# Task Management Application

This is a Task Management application built using NestJS and Prisma ORM. It provides APIs to manage tasks and users.

## Features

- Create, read, update, and delete tasks
- Create, read, update, and delete users
- Real-time updates using WebSockets

## Technologies Used

- NestJS
- Prisma ORM
- PostgreSQL
- Docker

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker
- Docker Compose

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd taskmanagement
Install dependencies:

bash
Copy code
npm install
Database Setup
Start the PostgreSQL database using Docker Compose:

bash
Copy code
docker-compose up -d
Run Prisma migrations to create tables in the database:

bash
Copy code
npm run prisma:migrate
Running the Application
Start the NestJS application:

bash
Copy code
npm run start:dev
Access the API at http://localhost:3000/api

**Docker Configuration**
To run the application using Docker, follow these steps:

1. Build the Docker image:

docker-compose build


2. Start the Docker containers:

docker-compose up

The application is running at localhost:3000

To create users: run localhost:3000/Users and use postman to test

To create a task: run http://localhost:3000/Tasks/UserId i.e http://localhost:3000/Tasks/0f69dcff-019b-4e03-a5c7-cde3e07a8859
