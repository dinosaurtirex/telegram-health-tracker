docker build -t healthcare-bot .

docker rm hbot
docker run -d --name hbot -v ./database:/app/database healthcare-bot
