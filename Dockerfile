FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install

# Создание директории для базы данных
RUN mkdir -p /app/database

# Используем volume для хранения базы
VOLUME ["/app/database"]

COPY .env /app/.env

# Применение миграций Prisma
RUN if [ ! -f /app/database/data.sqlite ]; then bun prisma migrate deploy --schema=/app/database/prisma/schema.prisma; fi
RUN cd /app/database/prisma && bun prisma migrate deploy --schema=/app/database/prisma/schema.prisma

# Запуск основного бота и крона параллельно
CMD ["sh", "-c", "bun ./main.ts & (bun ./cron/notify.ts)"]
