FROM nginx:1.25.4-alpine-slim as prod
COPY /build/web-mobile /usr/share/nginx/html
COPY /nginx/default.conf  /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]