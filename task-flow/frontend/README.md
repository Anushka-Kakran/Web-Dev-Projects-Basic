# ✅ Taskflow | MERN Task Management

Taskflow is a minimalist, high-performance task management application built with the MERN stack. It features a sleek emerald-themed interface, secure JWT authentication, and a seamless user experience that moves users directly from registration to their personal dashboard.



[Image of MERN stack architecture diagram]


## 🚀 Key Features

* **Smart Authentication:** Secure Sign-up and Login using JWT (JSON Web Tokens) and Bcrypt hashing.
* **Direct-to-Dashboard:** New users are automatically logged in upon registration—no extra login step required.
* **Protected Routes:** Robust client-side and server-side protection. Unauthorized users are automatically redirected to the Register page if no token is found.
* **Modern UI:** Built with Tailwind CSS, featuring custom emerald accents, card-based layouts, and Lucide icons.
* **Password Privacy:** Built-in eye-toggle icon for secure password entry and visibility.
* **Full CRUD Logic:** Create, Read, Update (toggle completion), and Delete tasks with instant UI updates.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Lucide Icons, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Security** | JWT, Bcrypt.js, Dotenv |

---

## 📦 Getting Started

### 1. Backend Configuration
Navigate to the `/backend` folder, install dependencies, and create a `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=my_super_secret_key_99