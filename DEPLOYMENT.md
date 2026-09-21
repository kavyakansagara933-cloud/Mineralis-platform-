# MINERALIS Deployment Guide (Portfolio & Production)

This guide walks you through the easiest and most effective ways to deploy **MINERALIS** online for recruiters and portfolio evaluators.

---

## 🌟 Recommended Architecture

```
[ Railway / Vercel ]  --->  Next.js 14 Frontend  (Port 3000)
                                  │
                                  ▼ (HTTPS / WSS API Requests)
[ Railway / Render ]  --->  FastAPI Backend (Python 3.11 + Uvicorn)
```

---

## 🚀 Option 1: Railway (Best Full-Stack & 1-Click Setup) — *Recommended*

Railway is the best choice for **MINERALIS** because it runs both Python FastAPI (with live WebSockets) and Next.js seamlessly without free-tier sleep/spin-down delays.

### Step-by-Step Railway Deployment:
1. Push your repository to **GitHub**.
2. Go to **[railway.app](https://railway.app)** and click **New Project** → **Deploy from GitHub repo**.
3. **Deploy Backend Service**:
   - In Railway Project Canvas, click **+ New Service** → **GitHub Repo** → Select your repo.
   - Go to **Settings** → **Root Directory** → set to `backend`.
   - Go to **Variables** → set `PORT` to `8000`.
   - Go to **Networking** → Click **Generate Domain** (e.g. `https://mineralis-backend.up.railway.app`).
4. **Deploy Frontend Service**:
   - Click **+ New Service** → **GitHub Repo** → Select the same repo.
   - Go to **Settings** → **Root Directory** → set to `frontend`.
   - Go to **Variables** → add `NEXT_PUBLIC_API_URL` = `https://mineralis-backend.up.railway.app/api`.
   - Go to **Networking** → Click **Generate Domain** (e.g. `https://mineralis.up.railway.app`).
5. **Done!** Both services are live with automatic Git push deployments.

---

## ⚖️ Railway vs Render: Why You Might Prefer Railway

| Feature | Railway | Render |
| :--- | :--- | :--- |
| **Cold Starts** | ⚡ **Instant** (No sleep on standard tier) | ⏳ Free tier sleeps after 15 min of inactivity (takes 50s to wake) |
| **WebSocket Support** | ✅ Native, ultra-low latency | ✅ Supported, but can disconnect during free-tier sleeps |
| **Full-Stack Monorepo** | 🎯 Deploy backend & frontend in 1 project canvas | Requires separate web service setups |
| **Build Speed** | 🚀 Extremely fast Nixpacks build | Standard pip / docker build |
| **Pricing** | $5 free monthly credit (~runs full month easily) | Free tier available (with sleep timeout) |

---

## 🐳 Option 2: Docker / Single-Server Deployment (DigitalOcean, AWS EC2, GCP)

If you prefer a single server or containerized setup:

### 1. Backend `Dockerfile` (`backend/Dockerfile`):
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 2. Frontend `Dockerfile` (`frontend/Dockerfile`):
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 📦 Option 3: Railway (1-Click Full Stack)
1. Go to [railway.app](https://railway.app).
2. Connect your repo and add two services:
   - **Backend**: Root directory `backend`, start `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Frontend**: Root directory `frontend`, variable `NEXT_PUBLIC_API_URL` pointing to the backend domain.

---

## 🔒 Post-Deployment Checklist
- [ ] Ensure CORS in `backend/app/main.py` allows your production frontend domain.
- [ ] Test the live `/api/health` endpoint.
- [ ] Test the interactive **Tour** modal on the live site.
- [ ] Add the live deployment URL to your **LinkedIn**, **Resume**, and **GitHub Profile README**.
