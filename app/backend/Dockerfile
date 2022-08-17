FROM node:16.14-alpine AS build

WORKDIR /app-backend

COPY package* ./

RUN npm install

COPY . . 

CMD ["npm", "start"]
