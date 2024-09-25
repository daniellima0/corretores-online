# backend/Dockerfile
FROM golang:1.21.0-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN go build -o main .

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]