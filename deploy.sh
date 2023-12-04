#!/bin/bash

# stop all containers and clear all old images and create client and server image and start containers
docker stop $(docker ps -a -q)
docker system prune -a -f
docker build -t server -f server.dockerfile .
docker run -d --rm -p 8080:8080 server
docker build -t client -f client.dockerfile .
docker run -d --rm -p 80:3000 client



