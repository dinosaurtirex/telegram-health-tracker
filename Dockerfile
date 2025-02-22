FROM oven/bun:latest
ENV DATABASE_URL=postgresql://admin:admin@host.docker.internal:5432/hbotDb

WORKDIR /app

COPY . .

RUN bun install

COPY .env /app/.env

CMD ["sh", "-c", "bun ./main.ts & bun ./cron/notify.ts"]