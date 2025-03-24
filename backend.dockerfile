FROM node:20 AS build
WORKDIR /app
COPY backend/package*.json ./
COPY backend ./backend
RUN cd backend && npm install
RUN cd backend && npm run build

FROM node:16-alpine
COPY --from=build /app/backend/dist .
COPY --from=build /app/backend/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "index.js"]