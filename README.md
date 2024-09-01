# Cronos zkEVM Currency Conversions (Demo)

## Run locally

```bash
npm run dev
```

## Run in production

```bash
# Build command
npm run build
# Run command
npm run start
```

## With docker

```bash
docker build -t frontend_image .
docker rm -f frontend_container
docker run -p 3000:3000 --name frontend_container frontend_image
docker logs -f frontend_container
```
