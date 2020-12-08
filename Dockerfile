FROM node:alpine
RUN mkdir -p /app/mock
WORKDIR /app/mock
COPY package*.json ./
RUN npm install --quiet
COPY . .
CMD ["npm", "run", "start:mock"]