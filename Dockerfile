# PROD CONFIG

# FROM node as PROD
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# ENV NODE_ENV=production
# CMD ["npm", "start"]

# # DEV Config
# FROM prod as dev
# EXPOSE 5000 3000
# ENV NODE_ENV=development
# RUN npm install -g nodemon
# RUN npm install --only=dev
# CMD [ "npm", "run", "dev" ]

FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node","index.js"]