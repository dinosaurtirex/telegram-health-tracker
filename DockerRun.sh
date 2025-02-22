cd ./database/prisma; npx prisma migrate deploy; cd ../../;

docker build -t healthcare-bot .

docker stop hbot 2>/dev/null || true
docker rm hbot 2>/dev/null || true

docker run -d --name hbot healthcare-bot
