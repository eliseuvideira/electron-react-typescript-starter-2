FROM electronuserland/builder:wine

WORKDIR /project

COPY package.json yarn.lock ./

RUN NODE_ENV=development yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "dist" ]
