FROM node:16
WORKDIR /app
COPY . .
RUN npm install --frozen-lockfile
RUN npm run build
EXPOSE 80
CMD ["npm", "start"]