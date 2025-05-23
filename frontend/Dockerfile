FROM node:20-alpine
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Mount source and start Vite in dev mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
