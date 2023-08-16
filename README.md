# ✂️ fastify-app-tony

Monolithic SaaS Application Starter based on Node.js and Vite. Develop both server and client with one `yarn dev`, create a single Docker image (built-in `Dockerfile`) and deploy it easily.

## 💪 Getting Started

```bash
# Install dependencies
$ yarn

# Bootstrap MongoDB with `docker-compose`
$ docker-compose up -d

# Start Development Server
$ yarn workspace @fastify-app-tony/app dev
```

## 🔨 Tech Stack

It consists of the following technology stacks:

### Common

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Server

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
  - [eventive](https://github.com/tonyfromundefined/eventive)
- [Fastify](https://fastify.dev/)
- [GraphQL](https://graphql.org/)
  - [Mercurius](https://mercurius.dev/)
  - [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [ESBuild](https://esbuild.github.io/)
- [nodemon](https://nodemon.io/)
- [Docker](https://www.docker.com/)
  - [docker-compose](https://docs.docker.com/compose/)
- [dotenv-safe](https://www.npmjs.com/package/dotenv-safe)

### Client

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Relay](https://relay.dev/)
- [Vanilla Extract](https://vanilla-extract.style/)
- [Vite](https://vitejs.dev/)

## 🚢 How to Deploy

You can use any kind of deployment platform that supports deploying Docker images.

- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Fly.io](https://fly.io/)
