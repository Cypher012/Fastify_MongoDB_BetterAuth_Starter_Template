# Fastify MongoDB BetterAuth Starter Template

A robust starter template for building secure, modular REST APIs using [Fastify](https://www.fastify.io/), [MongoDB](https://www.mongodb.com/), and [BetterAuth](https://www.npmjs.com/package/better-auth). This template provides a scalable foundation for projects requiring authentication, API documentation, and a clean code structure.

---

## Features

- **Fastify**: High-performance Node.js web framework.
- **MongoDB (Mongoose)**: Flexible, schema-based data modeling.
- **BetterAuth**: Plug-and-play authentication with email/password support.
- **Modular API**: Organized modules for Books, Genres, and Reviews.
- **Swagger & Scalar API Reference**: Auto-generated, interactive API docs.
- **Docker Compose**: Easy local development with MongoDB and Mongo Express.
- **TypeScript**: Type safety and modern JavaScript features.

---

## Project Structure

```
├── compose.yml              # Docker Compose for MongoDB & Mongo Express
├── package.json             # Project dependencies and scripts
├── src/
│   ├── index.ts             # Main Fastify server entry point
│   ├── plugins/             # Fastify plugins (CORS, cookies, auth)
│   ├── utils/               # Utilities (auth, db connection, helpers)
│   ├── modules/             # API modules (Books, Genres, Reviews)
│   │   ├── Books/
│   │   ├── Genres/
│   │   └── Reviews/
│   ├── types.d.ts           # TypeScript type definitions
│   ├── schemas.ts           # Registers all schemas with Fastify
│   └── routes.ts            # Registers all API routes
├── test-auth.js             # Example script to test authentication
├── tsconfig.json            # TypeScript configuration
└── .gitignore               # Git ignored files
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Fastify_MongoDB_BetterAuth_Starter_Template
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory with the following variables:
     ```env
     PORT=8000
     HOST=0.0.0.0
     DATABASE_URL=mongodb://<MONGO_USER>:<MONGO_PASS>@localhost:27017/book_review?authSource=admin
     MONGO_USER=your_mongo_user
     MONGO_PASS=your_mongo_password
     ```

---

## Running the Project

### Local Development

```bash
npm run dev
# or
pnpm dev
```

The server will start on `http://localhost:8000` (or your specified PORT).

### Using Docker Compose

This project includes a `compose.yml` for MongoDB and Mongo Express:

```bash
docker compose up -d
```

- MongoDB: `localhost:27017`
- Mongo Express: `http://localhost:8081` (web UI for MongoDB)

---

## API Documentation

- **Swagger UI**: [http://localhost:8000/documentation](http://localhost:8000/documentation)
- **Scalar API Reference**: [http://localhost:8000/api/auth/reference](http://localhost:8000/api/auth/reference)
- **Scalar BetterAuth API Reference**: [http://localhost:8000/api/auth/reference](http://localhost:8000/api/auth/reference)

### Main Endpoints

#### Books

- `GET /api/books` — List all books
- `POST /api/books` — Create a new book (requires authentication)

#### Genres

- `GET /api/genres` — List all genres
- `POST /api/genres` — Create a new genre (requires authentication)

#### Reviews

- `GET /api/reviews` — List all reviews
- `POST /api/reviews` — Create a new review (requires authentication)

#### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login
- `GET /api/auth/session` — Get current session
- `POST /api/auth/logout` — Logout
- Many more on the Scalar BetterAuth API documentation

> **Note:** All `POST` endpoints (except `/api/auth/*`) require authentication via BetterAuth.

---

## Authentication

- Uses [BetterAuth](https://www.npmjs.com/package/better-auth) with MongoDB adapter.
- Email/password authentication enabled by default.
- Auth endpoints are prefixed with `/api/auth`.
- Session management via cookies.

**Example Auth Flow:**

1. Register or login via `/api/auth/sign-up/email` or `/api/auth/sign-in/email`.
2. Use the session cookie for authenticated requests to protected endpoints.

---

## Testing Authentication

A sample script is provided to test authentication and protected endpoints:

```bash
node test-auth.js
```

- Attempts to create a review without authentication (should fail).
- Checks session endpoint.
- Demonstrates how to use cookies for authenticated requests.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.
