📝 Relational Database Blog Application
A blog application using Node.js, Express, Sequelize, and PostgreSQL — containerized with Docker Compose.

🚀 Getting Started
📦 Installation
bash
Copy code
npm install
▶️ Running the App
Start the development server:

bash
Copy code
npm run dev
Make sure your PostgreSQL database is running (see below for Docker setup).

🐳 Docker (Database Only)
To spin up the PostgreSQL database using Docker:

bash
Copy code
docker-compose up
This will start the PostgreSQL container as defined in your docker-compose.yml.

🔐 Environment Variables
Create a .env file in the root directory with the following variables:

ini
Copy code
DATABASE_URL=postgres://<user>:<password>@localhost:<port>/<database_name>
SECRET=your_jwt_secret_key

🧱 Tech Stack
Node.js + Express

PostgreSQL + Sequelize ORM

Docker (for DB container)

JWT (authentication)

dotenv

📌 Notes
Blogs are associated with users using foreign key relationships.

Authenticated users can create, update, and delete their own blogs.

Supports token-based session management and soft user disabling.