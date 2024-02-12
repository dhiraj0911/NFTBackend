# service1/Dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm start
COPY . .
EXPOSE 5000
CMD ["nodemon", "index.js"]