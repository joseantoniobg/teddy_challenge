FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install
RUN yarn add @ant-design/v5-patch-for-react-19

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]