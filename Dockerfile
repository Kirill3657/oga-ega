# --- Этап 1: Сборка (Builder) ---
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Копируем файлы модулей
COPY go.mod go.sum ./
RUN go mod download

# Копируем исходный код
COPY . .

# Собираем бинарник
RUN go build -o server .

# --- Этап 2: Запуск (Runner) ---
FROM alpine:latest

WORKDIR /root/

# Копируем собранный бинарник из первого этапа
COPY --from=builder /app/server .

# Открываем порт (обычно Go-серверы слушают 8080 или 3000)
EXPOSE 8080

# Запускаем сервер
CMD ["./server"]