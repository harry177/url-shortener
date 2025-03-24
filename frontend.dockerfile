FROM node:20 AS build
WORKDIR /app
COPY frontend/package*.json ./
COPY frontend ./frontend
RUN cd frontend && npm install
RUN cd frontend && npm run build

FROM nginx:1.19-alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]