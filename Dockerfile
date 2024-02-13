# service1/Dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm start
EXPOSE 5000
CMD ["nodemon", "index.js"]