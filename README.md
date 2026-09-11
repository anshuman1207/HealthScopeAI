# HealthScope AI 🩺

HealthScope AI is a full-stack, intelligent healthcare platform combining clinical management, AI-assisted diagnosis, symptom analysis, and risk scoring. It bridges patients, doctors, hospitals, and NGOs through modern web interfaces and medical machine learning services.

---

## 🏛️ System Architecture

```
                                  +-----------------------------+
                                  |   Next.js 15 Web Frontend   |
                                  |    (client / Port 3000)     |
                                  +--------------+--------------+
                                                 |
                       +-------------------------+-------------------------+
                       |                                                   |
                       v                                                   v
        +-----------------------------+                     +-----------------------------+
        |  Node.js / Express Backend  |                     |   Python FastAPI ML Engine  |
        |  (server-main / Port 5000)  |                     |    (server-ml / Port 8000)  |
        +--------------+--------------+                     +--------------+--------------+
                       |                                                   |
                       | Mongoose                                          | Scikit-learn
                       v                                                   v
              [ MongoDB Database ]                              [ Symptom & Risk Models ]
                                                                           |
                                                            +--------------+--------------+
                                                            |  Medical Chatbot (Flask)    |
                                                            |   (server-ml / Port 5002)   |
                                                            +-----------------------------+
```

### Component Overview

| Service | Directory | Tech Stack | Default Port | Primary Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | `/client` | Next.js 15, React 19, TailwindCSS, Radix UI | `3000` | Responsive user portals (Patient, Doctor, NGO, Hospital), Symptom Checker UI, AI Chat interface |
| **Main Server** | `/server-main` | Node.js, Express, Mongoose, JWT, bcrypt | `5000` | User authentication, doctor registry, appointments, medical reports, RBAC |
| **ML Engine** | `/server-ml` | Python, FastAPI, Scikit-learn, Pandas | `8000` | AI symptom analysis (`/analyze-symptoms`), health risk scoring, trend analytics |
| **Medical Bot** | `/server-ml/models/bot.py` | Python, Flask, Infermedica API (with mock mode) | `5002` | Interactive conversational medical assistant (`/api/medical-query`) |

---

## 📁 Repository Structure

```
HealthScope/
├── client/                     # Next.js App Router frontend application
│   ├── app/                    # Next.js pages, layouts, and API route handlers
│   │   ├── api/                # Internal App Router API endpoints (doctors, users, etc.)
│   │   └── dashboard/          # Role-based dashboards (patient, doctor, hospital, ngo)
│   ├── components/             # Reusable UI components (shadcn/Radix/charts)
│   ├── hooks/                  # React hooks (useAuth, useToast, etc.)
│   ├── lib/                    # Shared utilities, database client, ML helper functions
│   ├── models/                 # TypeScript Mongoose/Data models
│   ├── public/                 # Static assets and icons
│   ├── .env.local.example      # Frontend environment template
│   └── package.json            # Frontend scripts and dependencies
│
├── server-main/                # Primary Node.js/Express REST API backend
│   ├── middleware/             # JWT auth middleware
│   ├── models/                 # Mongoose schemas (User, Doctor, Appointment, Report)
│   ├── routes/                 # Express API route modules (auth, doctors, appointments, reports)
│   ├── server.js               # Express application entrypoint
│   ├── .env.example            # Backend environment template
│   └── package.json            # Server scripts and dependencies
│
├── server-ml/                  # Python machine learning & clinical AI services
│   ├── database/               # Database manager (PostgreSQL with in-memory fallback)
│   ├── models/                 # ML estimators:
│   │   ├── symptom_analyzer.py # Gradient Boosting symptom disorder classifier
│   │   ├── risk_calculator.py  # Clinical risk scoring logic
│   │   └── bot.py              # Medical conversational chatbot service (Port 5002)
│   ├── utils/                  # Data preprocessing and clinical text parsing
│   ├── main.py                 # FastAPI application entrypoint (Port 8000)
│   ├── requirements.txt        # Python pip dependencies
│   └── .env.example            # Python ML environment template
│
├── docs/                       # Project documentation, presentations, and design briefs
├── .gitignore                  # Git ignore rules (configured for multi-stack monorepo)
├── package.json                # Root convenience scripts
└── README.md                   # Project documentation
```

---

## ⚡ Prerequisites

Make sure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher ([Download](https://nodejs.org/))
- **npm**: `v9.0.0` or higher
- **Python**: `3.10` or higher ([Download](https://www.python.org/))
- **MongoDB**: A running local MongoDB instance (`mongodb://localhost:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.

---

## 🚀 Quick Start Guide

### 1. Clone the Repository

```bash
git clone https://github.com/anshuman1207/HealthScopeAI.git
cd HealthScopeAI
```

---

### 2. Configure Environment Variables

Create the `.env` files using the provided templates:

#### A. Node.js Backend (`server-main`)
```bash
cp server-main/.env.example server-main/.env
```
Open `server-main/.env` and ensure `MONGODB_URI` points to your MongoDB instance:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthscope
JWT_SECRET=your_jwt_secret_key_change_in_production
FRONTEND_URL=http://localhost:3000
```

#### B. Frontend Client (`client`)
```bash
cp client/.env.local.example client/.env.local
```
*(Defaults work out of the box for local development)*

#### C. Python ML Service (`server-ml`)
```bash
cp server-ml/.env.example server-ml/.env
```
*(Defaults run in offline testing mode without requiring external API keys)*

---

### 3. Install Dependencies

#### Node.js Dependencies (Root, Client, and Server-Main)
```bash
npm run install:all
```
*(Alternatively: `cd client && npm install && cd ../server-main && npm install && cd ..`)*

#### Python Dependencies
It is recommended to use a virtual environment:
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS / Linux
python3 -m venv .venv
source .venv/bin/activate

# Install requirements
pip install -r server-ml/requirements.txt
```

---

### 4. Running the Application

You will need **3 terminal windows** to run the services concurrently:

#### Terminal 1: Main Express Backend (Port 5000)
```bash
cd server-main
node server.js
```
*Expected output: `MongoDB connected successfully` & `Server is running on port 5000`*

#### Terminal 2: Python FastAPI ML Backend (Port 8000)
```bash
# Ensure your virtual environment is activated
cd server-ml
python main.py
```
*Expected output: `Uvicorn running on http://0.0.0.0:8000`*

*(Optional) Medical Chatbot (Port 5002):*
```bash
python server-ml/models/bot.py
```

#### Terminal 3: Next.js Frontend (Port 3000)
```bash
cd client
npm run dev
```
*Expected output: `Ready in ... on http://localhost:3000`*

---

## 🌐 Accessing the Platform

Open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

### Available Portals & User Roles
1. **Patient Portal**: Self-assessment, symptom checker, medical chatbot, appointment booking, vital sign tracking.
2. **Doctor Portal**: View assigned patients, manage appointments, triage urgent cases with AI severity scores.
3. **Hospital Portal**: Hospital capacity, department admissions, doctor availability.
4. **NGO Portal**: Community health outreach, campaign management, regional medical aid coordination.

---

## 📡 Key API Endpoints

### Node.js Backend (`http://localhost:5000`)
- `POST /api/auth/register` - Register a new user (`patient`, `doctor`, `hospital`, `ngo`)
- `POST /api/auth/login` - Authenticate user and receive JWT token
- `GET /api/auth/me` - Fetch authenticated user profile
- `GET /api/doctors` - Search doctors by specialization and city
- `GET /api/doctors/urgent-cases` - Fetch priority cases triaged for a doctor
- `POST /api/appointments` - Book doctor consultation
- `POST /api/reports` - Submit or fetch diagnostic reports

### FastAPI ML Backend (`http://localhost:8000`)
- `GET /health` - Service health status
- `POST /analyze-symptoms` - Analyze primary concerns, duration, and additional symptoms to predict disorder, risk score, and clinical recommendations
- `GET /symptoms/history/{patient_id}` - Historical symptom analyses
- `GET /analytics/dashboard` - Population health metrics and condition prevalence

### Medical Chatbot API (`http://localhost:5002`)
- `POST /api/medical-query` - Contextual NLP medical inquiry assistant

---

## 🛠️ Tech Stack Details

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Radix UI, Framer Motion, Lucide Icons, Recharts, Leaflet.
- **Backend API**: Express.js, MongoDB / Mongoose, JWT (JSON Web Tokens), bcrypt.
- **Machine Learning**: Python 3.10+, FastAPI, Uvicorn, Scikit-learn (GradientBoostingClassifier, RandomForest), Pandas, NumPy.
- **Natural Language**: TF-IDF, Regex clinical entity extractors, Infermedica API with offline mock fallback.

---

## 📄 License
This project was developed for healthcare innovation hackathons. Open for development and educational use.
