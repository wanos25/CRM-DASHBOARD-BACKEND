# CRM Dashboard - Backend API

## 📌 Overview
This project is a **backend API for a CRM Dashboard** built with **Node.js, Express, Prisma, and PostgreSQL**.  
It provides authentication, role-based access control (RBAC), and full CRUD operations for **Clients, Projects, and Reports**.  

---

## 🚀 Features
- 🔐 **Authentication & Authorization**
  - User registration and login with **JWT**
  - Role-based access control (**ADMIN, MANAGER, USER**)

- 👤 **User Management**
  - Register & login
  - Secure password hashing with **bcrypt**

- 🏢 **Clients**
  - Create, read, update, delete clients
  - Clients linked to projects

- 📂 **Projects**
  - CRUD operations
  - Linked to clients and users
  - Status tracking (**Active, On Hold, Completed, Cancelled**)

- 📝 **Reports**
  - Linked to projects and authors
  - Full CRUD operations

- 🛠 **Prisma ORM**
  - PostgreSQL database integration
  - Easy schema migrations
  - Prisma Studio support

---

## 📦 Tech Stack
- **Node.js** + **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **RBAC middleware** for permissions

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/wanos25/CRM-DASHBOARD-BACKEND.git
cd CRM-DASHBOARD-BACKEND
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5433/crm_db"
JWT_SECRET="secretkey"
PORT=5000
```

### 4️⃣ Run Prisma Migrations
```bash
npx prisma migrate dev --name init
```

### 5️⃣ Start the Server
```bash
npm run dev
```

Server will run at:  
👉 `http://localhost:5000`

---

## 📖 API Endpoints

### 🔐 Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login user  

### 🏢 Clients
- `POST /api/clients` → Create client (**ADMIN, MANAGER**)  
- `GET /api/clients` → List clients (**ALL ROLES**)  
- `GET /api/clients/:id` → Get client by ID  
- `PUT /api/clients/:id` → Update client (**ADMIN, MANAGER**)  
- `DELETE /api/clients/:id` → Delete client (**ADMIN**)  

### 📂 Projects
- `POST /api/projects` → Create project  
- `GET /api/projects` → List projects  
- `GET /api/projects/:id` → Get project  
- `PUT /api/projects/:id` → Update project  
- `DELETE /api/projects/:id` → Delete project  

### 📝 Reports
- `POST /api/reports` → Create report  
- `GET /api/reports` → List reports  
- `GET /api/reports/:id` → Get report  
- `PUT /api/reports/:id` → Update report  
- `DELETE /api/reports/:id` → Delete report  

---

## 🧪 Testing
Use **Postman** to test endpoints with `Bearer Token` authentication.  
Make sure to **register & login** first to get a JWT token.  

---

## 👨‍💻 Author
Developed by **WANOS MOHA** ✨
