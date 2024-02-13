FROM oven/bun

EXPOSE 5000

WORKDIR /usr/src/api
COPY package*.json ./
RUN bun install

COPY ./src ./src
COPY ./client ./client

CMD ["sh", "-c", "bun run src/main.ts"]
