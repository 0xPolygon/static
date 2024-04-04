FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY . .
RUN rm -rf .git*

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
