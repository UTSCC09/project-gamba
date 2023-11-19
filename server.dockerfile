FROM --platform=linux/amd64 node:lts-slim as build

RUN mkdir -p /app
WORKDIR /app
COPY ./server /index
COPY ./env
RUN npm install

FROM --platform=linux/amd64 node:lts-slim as main
WORKDIR /app
COPY --from=build /app /app
EXPOSE 5000
CMD ["npm","run","prod"]