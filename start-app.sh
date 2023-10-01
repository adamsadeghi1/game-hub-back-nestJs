npm run build

docker stop game-hub-nestjs-container
docker rm -f game-hub-nestjs-container
docker rmi -f game-hub-nestjs-image

docker build -t game-hub-nestjs-image .
docker run -d -p 3001:3001 --name game-hub-nestjs-container game-hub-nestjs-image