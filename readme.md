## About:

A full-stack implementation of URL shortener concept: server receives an original url from client, transformes it and returns back. 
Together with database (MySQL) it stores original url value and redirects to it if user attempts to watch short url. 
Additionally app provides services to delete short url from database and to look at some short url info (original data, click count, requested ip addresses).

## How to launch

Dev: Go to backend and frontend folders and launch "npm i" command there to install dependencies. In backend folder add .env file and write variables for databse and server (port). Then you can start back and front separately with "npm run dev". And don't forget to install MySQL if you don't have it.

Prod: Just install Docker Desktop on your OS and then execute next command from Url shortener root: "docker-compose up --build" - it prepares docker container with backend, frontend and database images and allows to try Url shortener on localhost:5173 

Enjoy!

## Technology stack

- **Frontend:** Typescript, React, Zod, Material UI
- **Backend:** Node.js, Express.js, Typescript
- **Test env:** Jest, Supertest
- **Bundler:** Vite
- **Database and model:** MySQL, Sequelize
- **Infrastructure:** Docker
- **Linters and helpers:** Eslint

## Author

Artem Prygunov