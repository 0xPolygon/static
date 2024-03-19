FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY . .
RUN rm -rf .git*

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]