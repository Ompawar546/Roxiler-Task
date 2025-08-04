# 🛒 Store Rating Web Application

A full-stack web app where users can sign up, log in, and rate stores. 
The application features role-based access (Admin, Store Owner, Normal User), authentication, and a responsive UI.

---

## 🚀 How to Start the Project

### 📦 1. Clone the repository

###  git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
💻 2. Setup the Frontend (React + Vite)

cd client
npm install
npm run dev


🖥️ 3. Setup the Backend (Express + Sequelize + PostgreSQL/MySQL)

cd ../store-rating-backend
npm install


⚙️ 4. Configure Environment Variables
Create a .env file in the backend folder:

PORT=5000
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret


🗃️ 5. Start the Backend Server

node server.js

👮 How to Create an Admin Account
There are two ways to create an admin account:

✅ Option 1: Sign up & manually set role
Sign up via /signup page.

Open your database and run:

UPDATE Users SET role = 'admin' WHERE email = 'your_email@example.com';


✅ Option 2: Use Temporary Script
Create a createAdmin.js file inside store-rating-backend:

const bcrypt = require('bcryptjs');
const { User } = require('./models');

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  await User.create({
    name: 'Super Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    address: 'Admin HQ',
    role: 'admin',
  });
  console.log('Admin user created!');
}

createAdmin();



Run the script:

node createAdmin.js


Log in using:

Email: admin@example.com
Password: Admin@123

Delete the script after use to avoid security risks.

🛠️ Tech Stack
Frontend: React, Vite, CSS

Backend: Node.js, Express.js

Database: MySQL / PostgreSQL (via Sequelize ORM)

Auth: JWT + Bcrypt

Roles: Admin, Store Owner, Normal User

🙋‍♂️ Contributing
Feel free to fork this repo and raise a pull request to suggest improvements or add new features. ###
