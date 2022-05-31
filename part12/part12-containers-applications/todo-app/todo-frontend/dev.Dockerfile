FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV REACT_APP_BACKEND_URL="http://localhost:3001/"

CMD ["npm", "start"]