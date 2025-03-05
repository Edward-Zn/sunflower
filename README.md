# 🌻 Sunflower Field

---

## 📋 Prerequisites

Make sure you have the following installed:

- **Node.js** (v14+)
- **MySQL** (v8+)
- **Git** (for cloning the repository)

---

### 🚀 Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.


### 🛠️ Setup Database

1. Start your MySQL server.
2. Create a new database:

```sql
CREATE DATABASE sunflower;

```

3. Set up your .env file with your database credentials in the backend directory:

```env
DB_NAME=sunflower
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306

```

4. Run the migrations to create the required tables:

```bash
cd backend
npx sequelize-cli db:migrate

```

### 🌐 Running the Application
#### 1. Backend Setup

```bash
# Go to the backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm start

```

The backend server will run on http://localhost:5000.

#### 2. Frontend Setup

```bash
# Go to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start

```

The frontend server will run on http://localhost:3000.

### 🧪 Testing the Setup

1. Open the frontend in your browser at http://localhost:3000.
2. Register two players.
3. The game board should appear after registration is complete.

### 📂 Project Structure

```bash
sunflower-field/
├─ backend/
│   ├─ config/          # Database configuration
│   ├─ controllers/     # Business logic
│   ├─ migrations/      # Database migrations
│   ├─ models/          # Sequelize models
│   ├─ routes/          # API endpoints
│   ├─ seeders/         # Database seeders
│   ├─ db.js            # Database connection
│   └─ server.js        # Express server setup
├─ frontend/
│   ├─ public/          # Static files
│   ├─ src/
│   │   ├─ components/  # React components
│   │   ├─ styles/      # CSS files
│   │   ├─ App.js       # Main React app component
│   │   └─ index.js     # React entry point
├─ .env                 # Environment variables
└─ README.md            # Project documentation

```

---

## 🤖 Technologies Used

#### Backend
* Node.js with Express
* Sequelize ORM
* MySQL as the database
* bcrypt for password hashing
* moment.js for date handling
#### Frontend
* React with Create React App
* Tailwind CSS for styling

---

### 🚧 Roadmap

- [x] Implement player registration
- [ ] Basic turn-based mechanics
- [ ] Add advanced game actions
- [ ] Implement game state persistence
- [ ] Add user authentication

