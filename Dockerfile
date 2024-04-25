FROM node:latest
WORKDIR /api-cep/app
COPY package*.json ./
RUN npm install
COPY . . 
# EXPOSE 3000
CMD ["npm", "run", "dev"]
