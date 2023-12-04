FROM --platform=linux/amd64 node:lts-slim as build

RUN mkdir -p /app
WORKDIR /app
COPY ./server /app
COPY ./package.json /app
RUN npm install

FROM --platform=linux/amd64 node:lts-slim as main
WORKDIR /app
COPY --from=build /app /app
EXPOSE 8080
CMD ["npm","run","dev"]