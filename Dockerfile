FROM nginx:alpine

COPY . /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/.git*

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]