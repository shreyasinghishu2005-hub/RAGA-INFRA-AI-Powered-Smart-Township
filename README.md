# 🏙️ RAGA INFRA – AI Powered Smart Township

> A production-ready, AI-powered Smart Township Management Platform for a 300-acre integrated township near Mahindra SEZ.

![Smart Township](https://img.shields.io/badge/Status-In%20Development-blue)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20NestJS%20%7C%20PostgreSQL%20%7C%20AI-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📌 Overview

**Raga Infra Smart Township** is the Digital Brain of a 300-acre integrated township. It unifies residential zones, premium villas, commercial areas, IT offices, schools, colleges, hospitals, government offices, solar energy, water management, elder care, and eco-infrastructure into a single centralized **AI Command Center**.

The platform covers:
- 🏠 75 Acres — Residential (Smart Apartments + Villas)
- 🏡 40 Acres — Premium Villas
- 🛍️ 20 Acres — Commercial Zone (Mall, Retail, Cinema)
- 🏢 30 Acres — IT Office Park
- 🎓 40 Acres — College Campus (2 Colleges)
- 🏫 18 Acres — Schools (2 Schools)
- 🏥 33 Acres — Hospitals (3 Hospitals)
- 🏛️ 10 Acres — Government Office Complex
- 🎉 10 Acres — Party Club & Entertainment
- ⛽ 2 Acres — Petrol Pump
- ☀️ 30 Acres — Solar Farm
- 💧 5 Acres — Water Treatment Plant
- 🌊 15 Acres — Rainwater Harvesting Lake
- 🌳 25 Acres — Central Park & Open Spaces

**Total Estimated Budget: ₹2,700 Crore**

---

## 🚀 Key Features

### 🤖 AI Integration
- AI Command Center (centralized intelligence hub)
- AI Chatbot & Voice Assistant
- Predictive Analytics (traffic, electricity, water, crime)
- Generative AI Reports
- AI Diagnosis Assistant (hospitals)
- AI Learning Recommendations (schools)

### 🔐 Security System
- AI Face Recognition at entry points
- License Plate Recognition (LPR)
- Visitor Pass with QR Code
- Drone Surveillance
- 360° AI CCTV Network
- Crime Analytics
- Emergency SOS

### 🌱 Eco & Solar Monitoring
- Solar Production Dashboard (30-acre Solar Farm)
- Battery Storage & Grid Export Monitoring
- Carbon Savings Tracker
- Rainwater Lake Level & Flood Prediction
- Green Index Score
- Air Quality & Noise Monitoring

### 👴 Elder Care System
- Smart Wearable Health Monitoring
- Fall Detection with Emergency Alerts
- Medicine Reminder System
- AI Health Assistant
- Ambulance Dispatch with GPS Tracking
- Family Notification System

### 📡 IoT Sensor Network
- Fire, Smoke & Gas Leak Sensors
- Flood & Earthquake Alerts
- Motion & Door Sensors
- Smart Street Lights
- Smart Waste Collection
- Smart Irrigation System

### 🏗️ Landscaping & Infrastructure
- EV Charging Stations
- Smart Drainage & Water Recycling
- Green Belt & Tree Plantation Tracking
- Bicycle & Walking Tracks
- Sustainable Construction Monitoring

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js, React, TypeScript, TailwindCSS, Shadcn UI, Framer Motion |
| **Backend** | Node.js, Express.js, NestJS |
| **Database** | PostgreSQL, Prisma ORM |
| **Authentication** | Clerk, JWT |
| **AI / ML** | OpenAI, Gemini, LangChain, AI Agents |
| **IoT** | MQTT, WebSocket, LoRa Gateway |
| **Maps** | Mapbox, Leaflet |
| **Charts** | Recharts |
| **Cloud** | Firebase, AWS EC2 |
| **Deployment** | Docker, GitHub Actions, Vercel |

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    PUBLIC WEBSITE                    │
│     (Next.js + Mapbox + AI Chatbot + Booking)       │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│              ROLE-BASED DASHBOARDS (12)              │
│  Super Admin │ Township │ Security │ Hospital        │
│  School │ Resident │ Company │ Government           │
│  Solar │ Water │ AI │ Analytics                     │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│           NESTJS BACKEND MICROSERVICES               │
│  Auth │ IoT │ AI Engine │ Alerts │ Billing          │
│  Hospital │ School │ Security │ Eco │ Elder Care    │
└──────┬──────────────┬──────────────┬────────────────┘
       │              │              │
┌──────▼───┐   ┌──────▼───┐   ┌─────▼──────┐
│PostgreSQL│   │  MQTT /  │   │  OpenAI /  │
│ Prisma   │   │ WebSocket│   │  Gemini    │
└──────────┘   └──────────┘   └────────────┘
```

---

## 👥 User Roles

| Role | Access |
|------|--------|
| Super Admin | Full system access |
| Township Manager | Operations & monitoring |
| Resident | Personal portal, visitors, billing |
| Visitor | Entry pass only |
| Company Admin | IT Park & meeting rooms |
| Hospital Admin | Hospital dashboard |
| School Admin | School dashboard |
| Government Officer | Government portal |
| Maintenance Staff | Work orders & sensors |
| Security Officer | Security dashboard |
| Emergency Team | Alerts & dispatch |

---

## 📊 Dashboards

1. Super Admin Dashboard
2. Township Dashboard
3. Security Dashboard
4. Hospital Dashboard
5. School Dashboard
6. Resident Dashboard
7. Company Dashboard
8. Government Dashboard
9. Solar Dashboard
10. Water Dashboard
11. AI Dashboard
12. Analytics Dashboard

---

## 🌐 Public Website Pages

- Home
- About Township
- Master Plan
- Live Township Map (Interactive Mapbox)
- Gallery
- Residential Booking
- Commercial Booking
- IT Park
- Schools
- Hospitals
- Amenities
- Pricing
- Contact
- AI Chatbot

---

## 📁 Project Structure

```
raga-infra-smart-township/
├── apps/
│   ├── web/                  # Next.js public website
│   └── dashboard/            # Next.js admin dashboards
├── backend/
│   ├── src/
│   │   ├── auth/             # Authentication & RBAC
│   │   ├── iot/              # IoT & sensor management
│   │   ├── ai/               # AI engine & agents
│   │   ├── security/         # Security & surveillance
│   │   ├── elder-care/       # Elder care system
│   │   ├── hospital/         # Hospital management
│   │   ├── school/           # School management
│   │   ├── eco/              # Solar & eco monitoring
│   │   ├── residential/      # Resident portal
│   │   ├── commercial/       # Commercial zone
│   │   ├── government/       # Government portal
│   │   └── utilities/        # AI utilities
│   └── prisma/
│       └── schema.prisma     # Database schema
├── .kiro/
│   └── specs/
│       └── raga-infra-smart-township/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

---

## 🗄️ Database Models

Users, Residents, Buildings, Properties, Companies, Visitors, Hospitals, Schools, Vehicles, Parking, Sensors, IoT Devices, Solar Data, Water Data, Weather, Complaints, Events, Emergency Logs, Notifications, Payments, Maintenance, Reports

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose
- Clerk account (authentication)
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/shreyasinghishu2005-hub/RAGA-INFRA-AI-Powered-Smart-Township.git
cd RAGA-INFRA-AI-Powered-Smart-Township

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Docker Setup

```bash
docker-compose up -d
```

---

## 🔑 Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/raga_infra
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
MQTT_BROKER_URL=mqtt://localhost:1883
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
FIREBASE_PROJECT_ID=your_firebase_project
```

---

## 📋 Spec Documents

| Document | Description |
|----------|-------------|
| [Requirements](/.kiro/specs/raga-infra-smart-township/requirements.md) | 17 functional requirements with acceptance criteria |
| [Design](/.kiro/specs/raga-infra-smart-township/design.md) | System architecture & technical design |

---

## 🏆 Township Planning Flow

```
LAND → ZONE DIVISION → RESIDENTIAL/EDUCATION/HEALTHCARE
→ MALL → COMPANIES → GOVT OFFICES → GREEN/WATER/SOLAR
→ ROADS → SECURITY → AI CONTROL → SMART TOWN
```

---

## 📄 License

MIT License — Raga Infra Smart Township © 2026

---

## 👩‍💻 Author

**Shreya Singh**
GitHub: [@shreyasinghishu2005-hub](https://github.com/shreyasinghishu2005-hub)
