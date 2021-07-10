FROM node:14

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src

RUN ls -a
RUN npm install
RUN npm run build

COPY . .

EXPOSE 3001

CMD [ "node", "./dist/server.js" ]