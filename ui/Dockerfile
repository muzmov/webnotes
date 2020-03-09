FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/target /etc/nginx/html

