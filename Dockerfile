FROM node:16-alpine

WORKDIR /app 

COPY package.json yarn.lock ./

COPY . . 

RUN yarn install

RUN yarn compile

EXPOSE 3011

CMD ["yarn", "dev"]