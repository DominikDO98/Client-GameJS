FROM node:24-alpine AS builder
WORKDIR /client
COPY . .
RUN npm i && npm run build

FROM nginx:alpine
COPY --from=builder /client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]