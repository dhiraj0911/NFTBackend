# service1/Dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["nodemon", "index.js"]