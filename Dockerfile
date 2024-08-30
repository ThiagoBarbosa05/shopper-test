FROM node:current-alpine3.20 AS build

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build
RUN pnpm prune --prod

FROM node:current-alpine3.20 AS deploy

WORKDIR /usr/src/app

RUN npm i -g pnpm prisma

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app .


RUN pnpm prisma generate

EXPOSE 3000

CMD [ "pnpm", "start" ]

