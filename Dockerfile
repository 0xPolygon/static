FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY . .
RUN rm -rf .git*

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]