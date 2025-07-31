FROM node:22.17-alpine AS build
LABEL author="Renato Falzoni"
LABEL application="Falzoni Express API de Transações"

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run esbuild

FROM node:22.17-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./

EXPOSE 3000

ENTRYPOINT ["node", "app.js"]