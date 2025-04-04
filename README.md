# ✂️ fastify-app-tony

Monolithic SaaS Application Starter based on Node.js and Vite. Develop both server and client with one `yarn dev`, create a single Docker image (built-in `Dockerfile`) and deploy it easily.

## 💪 Getting Started

```bash
# Install dependencies
$ yarn

# Create `.env` file
$ cp ./app/.env.example ./app/.env

# Start development server
$ yarn workspace @fastify-app-tony/app dev
```

> Make it your app by doing find and replace all `fastify-app-tony`.

## 🔨 Tech Stack

It consists of the following technology stacks:

### Common

Maintaining a stable development speed with fast feedback

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)

### Server

Separation of domain knowledge and scalability using event sourcing.

- [Node.js](https://nodejs.org/)
- [eventive](https://github.com/tonyfromundefined/eventive)
- [Fastify](https://fastify.dev/)
- [GraphQL](https://graphql.org/)
  - [Mercurius](https://mercurius.dev/)
  - [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [nodemon](https://nodemon.io/)
- [Docker](https://www.docker.com/)
  - [docker-compose](https://docs.docker.com/compose/)
- [dotenv-safe](https://www.npmjs.com/package/dotenv-safe)

### Client

Securing E2E Type Safety and Data-View Consistency using GraphQL.

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Relay](https://relay.dev/)
- [Plantae](https://github.com/daangn/plantae)
- [Vanilla Extract](https://vanilla-extract.style/)
- [Vite](https://vitejs.dev/)

## 🚢 How to Deploy

You can use any kind of deployment platform that supports deploying Docker images.

- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Fly.io](https://fly.io/)
