OrderManagement_nestjs

A sample NestJS + PostgreSQL + React + RabbitMQ application for managing orders and notifications.

Table of Contents

Prerequisites

Getting Started

Clone the repo

Environment Variables

Install Dependencies

Generate Prisma Client & Apply Migrations

Start Services

Usage

Cleanup

Prerequisites

Docker & Docker Compose

Node.js (v16+)

WSL2 (Windows users, optional)

All other services (PostgreSQL, Redis, RabbitMQ) will run in Docker.

Getting Started

Clone the repo

git clone https://github.com/your-username/OrderManagement_nestjs.git
cd OrderManagement_nestjs

Environment Variables

Copy the example and adjust as needed:

cp .env.example .env
# Edit .env to set your DATABASE_URL, RabbitMQ settings, etc.

Install Dependencies

# Install root-level tools (start-all.sh, etc.)
chmod +x start-all.sh

Generate Prisma Client & Apply Migrations

# Inside the API container:
docker-compose exec api npx prisma generate
docker-compose exec api npx prisma migrate dev --name init

Start Services

Linux

./start-all.sh

macOS / WSL2 / Windows PowerShell

docker-compose up -d --build

This will start:

API on port 4000

UI on port 3000

PostgreSQL, Redis, RabbitMQ, and other dependencies

Usage

Open your browser:

Frontend: http://localhost:3000

API Explorer (if enabled): http://localhost:4000

Register or login with email.

Create, edit, and delete orders in the dashboard.

Cleanup

To stop and remove all containers, networks, and volumes:

docker-compose down --remove-orphans -v

To reset your local database (drops all data):

docker-compose exec api npx prisma migrate reset --force

