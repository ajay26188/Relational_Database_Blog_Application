# 📝 Relational Database Blog Application

A full-stack blog application using **Node.js**, **Express**, **Sequelize**, and **PostgreSQL** — containerized with **Docker Compose**.

---

## 🚀 Getting Started

### 📦 Installation

```bash
npm install
```

### ▶️ Running the App

Start the development server:

```bash
npm run dev
```

> Make sure your PostgreSQL database is running (see below for Docker setup).

---

## 🐳 Docker (Database Only)

To spin up the PostgreSQL database using Docker:

```bash
docker-compose up
```

This will start the PostgreSQL container as defined in your `docker-compose.yml`.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgres://<username>:<password>@localhost:<port>/<database_name>
SECRET=your_jwt_secret_key
```

---

## 📁 API Routes

Below are the available API endpoints:

| Method | Endpoint                       | Description                    |
|--------|--------------------------------|--------------------------------|
| GET    | `/api/users`                  | Get all users                  |
| GET    | `/api/blogs`                  | Get all blogs                  |
| GET    | `/api/authors`                | Get blog counts by author      |
| POST   | `/api/users`                  | Register a new user            |
| POST   | `/api/blogs`                  | Create a new blog              |
| POST   | `/api/login`                  | Login and get JWT token        |
| PUT    | `/api/blogs/:id`              | Update a blog by ID            |
| DELETE | `/api/blogs/:id`              | Delete a blog by ID            |

> Additional routes and logic can be found in the `controllers/` directory.

---

## 🧱 Tech Stack

- Node.js + Express
- PostgreSQL + Sequelize ORM
- Docker (for DB container)
- JWT (authentication)
- dotenv

---

## 📌 Notes

- Blogs are associated with users using foreign key relationships.
- Authenticated users can create, update, and delete their own blogs.
- Supports token-based session management and soft user disabling.

