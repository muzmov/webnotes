FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM muzmov/nginx:v1
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/target /etc/nginx/html
EXPOSE 8080 8443
CMD ["nginx", "-g", "daemon off;"]


