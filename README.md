# Node.js, MongoDB, and Nginx with Docker Compose

A containerized TypeScript/Node.js application that uses MongoDB for data storage and Nginx as a reverse proxy.

## Architecture

The Docker Compose stack runs three services:

| Service | Description | Host access |
| --- | --- | --- |
| `nginx` | Reverse proxy | `http://localhost` (port 80) |
| `app` | Express TypeScript API | `http://localhost:4000` (port 4000) |
| `db` | MongoDB database | Internal Docker network only |

Nginx forwards requests to the Node.js container on `app:4000`. MongoDB is available to the application through the Docker network at `db:27017`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Returns the server status HTML page |
| `GET` | `/health` | Returns a JSON server health response |
| `GET` | `/lead` | Returns records from the MongoDB `workerleads` collection |

## Requirements

- Docker Desktop or Docker Engine
- Docker Compose v2
- Node.js 22 and npm (only for local development without Docker)
- A Docker Hub account (only for publishing images)

## Environment Variables

Create `.env` in this directory:

```env
PORT=4000
MONGO_URL=mongodb://db:27017/safehandnewbackend25
```

Use `localhost` instead of `db` only when running the Node.js server outside Docker.

## Run with Docker Compose

Build the application image:

```powershell
docker build -t indrama/docker_with_nginx-app:local .
```

Start the stack with the local image:

```powershell
$env:IMAGE_TAG="local"
docker compose up -d
```

Then open:

- Application through Nginx: http://localhost
- Direct application port: http://localhost:4000
- Health check: http://localhost/health
- Worker leads: http://localhost/lead

View container status and logs:

```powershell
docker compose ps
docker compose logs -f
```

Stop the stack:

```powershell
docker compose down
```

To delete the MongoDB data volume as well:

```powershell
docker compose down -v
```

## Run Locally Without Docker

Install dependencies and make sure MongoDB is running locally:

```powershell
npm ci
```

Set the environment variables in `.env`:

```env
PORT=4000
MONGO_URL=mongodb://localhost:27017/safehandnewbackend25
```

Build and start the server:

```powershell
npm run build
npm start
```

## Docker Images and Deployment

The Dockerfile uses a multi-stage build:

1. Builds TypeScript from `src` into `dist`
2. Installs production dependencies
3. Runs `dist/server.js` as a non-root `node` user

Build and push an image manually:

```powershell
docker login
docker build -t <docker-hub-user>/docker_with_nginx-app:latest .
docker push <docker-hub-user>/docker_with_nginx-app:latest
```

On the deployment host, set the image tag and start the stack:

```powershell
$env:IMAGE_TAG="<image-tag>"
docker compose pull app
docker compose up -d
docker compose ps
```

The GitHub Actions workflow in `.github/workflows/ci.yml`:

- Builds the application image on pushes to `main`
- Pushes it to Docker Hub using the commit SHA as the image tag
- Deploys it to an EC2 instance over SSH

Configure these GitHub repository secrets for the workflow:

- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `EC2_HOST`
- `EC2_USERNAME`
- `EC2_SSH_KEY`

## Project Structure

```text
docker_with_nginx/
|-- Dockerfile
|-- compose.yaml
|-- nginx.conf
|-- package.json
|-- package-lock.json
|-- tsconfig.json
|-- src/
|   |-- server.ts
|   `-- dbConfig.ts
`-- .github/workflows/
    `-- ci.yml
```
