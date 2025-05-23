# OrderManagement_nestjs
An excersise on nest js with postgress, react and rabbitMQ to manage orders and their notifications

## Prerequisites
- Node.js
- Nest.js
- PostgreSQL
- RabbitMQ
- Docker
- Docker Compose
- Redis
- TypeORM
- TypeScript
- React
- Axios
- React Query
- Tailwind CSS

- Prisma
## Getting Started

chmod +x start-all.sh
./start-all.sh
// This will start all the services in the docker-compose file but in a linux environment

// If you are using windows, you can use the following command to start all the services
docker compose up -d
// This will start all the services in the docker-compose file but in a windows environment
// If you are using WSL, you can use the following command to start all the services
docker compose up -d --build
// This will start all the services in the docker-compose file but in a wsl environment
// If you are using a mac, you can use the following command to start all the services
docker compose up -d --build

 If you ever do want a clean slate, you can still manually run:

 docker compose down --remove-orphans -v
