FROM node:10-alpine

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./

# copy source code to /app/src folder
COPY src /app/src

# check files list
RUN ls -a

RUN npm ci
RUN npm run build

EXPOSE 8080

CMD [ "node", "build/index.js" ]