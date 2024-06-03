FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY network .
COPY index.html .
RUN rm -rf .git*

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
