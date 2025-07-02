# 🚀 WorkZen – Corporate Room Booking & Monitoring System

A microservice-based web application to manage room bookings for corporate employees, with built-in observability using Prometheus and Grafana.

## 📜 Project Description

WorkZen helps employees easily book meeting rooms, check availability, and manage schedules. This application is built with a microservice approach — a Node.js + Express backend, a React frontend, and a MongoDB database, all containerized and deployed on Kubernetes (Kind) with Prometheus and Grafana for monitoring.

## ✨ Features

- 🏢 Room Management
- 📅 Booking Management  
- 🔍 API Health Monitoring
- 📊 Performance Observability (CPU, memory, HTTP requests)
- ✅ Kubernetes Deployment (using Kind for local clusters)
- 🔥 Real-time dashboards with Grafana

## 🏗️ Architecture

```
                       +------------------+
                       |    Frontend      | (NodePort :31000)
                       +--------+---------+
                                |
                                | API calls
                                v
                       +------------------+
                       |    Backend       | (NodePort :30000)
                       +------------------+
                                |
                                v
                       +------------------+
                       |    MongoDB       | (ClusterIP)
                       +------------------+

         +---------------------------------------------------------+
         |                     Monitoring Stack                    |
         | +---------------+     +------------------------------+  |
         | |  Prometheus    | <-- | /metrics from Backend        |  |
         | +-------+-------+     +------------------------------+  |
         |         |                                                  |
         |         v                                                  |
         |   +-------------+                                          |
         |   |   Grafana    | (NodePort :32001)                      |
         |   +-------------+                                          |
         +------------------------------------------------------------+
```

## 🧰 Tech Stack

- **Frontend**: React.js, Axios, TailwindCSS
- **Backend**: Node.js, Express, Prom-client (metrics)
- **Database**: MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes (Kind for local)
- **Monitoring**: Prometheus, Grafana
- **Deployment**: YAML manifests for Deployments, Services, ConfigMaps

## 📦 Project Structure

```
workzen/
├── backend/
│   ├── Dockerfile
│   └── src/
├── frontend/
│   ├── Dockerfile
│   └── src/
├── k8s/
│   ├── namespace.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── mongodb-deployment.yaml
│   ├── mongodb-service.yaml
│   ├── prometheus-deployment.yaml
│   ├── prometheus-service.yaml
│   ├── prometheus-config.yaml
│   ├── grafana-deployment.yaml
│   ├── grafana-service.yaml
│   └── ingress.yaml (optional)
└── README.md
```

## 🏗️ Setup Instructions

### ✅ Step 1: Prerequisites

- Docker
- Kubernetes (kubectl)
- Kind (Kubernetes in Docker)
- DockerHub Account (for image push)

### ✅ Step 2: Create Kind Cluster

```bash
kind create cluster --name workzen
```

### ✅ Step 3: Create Namespace

```bash
kubectl apply -f k8s/namespace.yaml
```

### ✅ Step 4: Build Docker Images

**Build backend:**
```bash
docker build -t <dockerhub-username>/workzen-backend ./backend
```

**Build frontend:**
```bash
docker build -t <dockerhub-username>/workzen-frontend ./frontend
```

### ✅ Step 5: Push Images to DockerHub

```bash
docker push <dockerhub-username>/workzen-backend
docker push <dockerhub-username>/workzen-frontend
```

### ✅ Step 6: Deploy MongoDB

```bash
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/mongodb-service.yaml
```

### ✅ Step 7: Deploy Backend

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
```

### ✅ Step 8: Deploy Frontend

```bash
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

### ✅ Step 9: Deploy Monitoring Stack

```bash
kubectl apply -f k8s/prometheus-config.yaml
kubectl apply -f k8s/prometheus-deployment.yaml
kubectl apply -f k8s/prometheus-service.yaml

kubectl apply -f k8s/grafana-deployment.yaml
kubectl apply -f k8s/grafana-service.yaml
```

## 🌐 Access Services

| Service | URL | NodePort |
|---------|-----|----------|
| Frontend | http://localhost:31000 | 31000 |
| Backend API | http://localhost:30000/health | 30000 |
| Prometheus | http://localhost:32000 | 32000 |
| Grafana | http://localhost:33000 | 32001 |

## 🔑 Grafana Credentials

- **Username**: admin
- **Password**: admin (or as set in deployment)

## 📈 Setup Grafana Dashboards

1. Open Grafana at http://localhost:32001
2. Add Data Source → Prometheus → URL: `http://prometheus:9090`
3. Import dashboards manually or create custom dashboards

> **Key Fix**: Use simple service name `prometheus:9090` instead of FQDN since both services are in the same `workzen` namespace!

## 🔍 Prometheus Target Config Example

```yaml
scrape_configs:
  - job_name: 'backend'
    static_configs:
      - targets: ['backend:8000']  # Simple service name - same namespace
```

## 🧠 Common Debug Commands

**Check pods:**
```bash
kubectl get pods -n workzen
```

**Check services:**
```bash
kubectl get svc -n workzen
```

**Check logs:**
```bash
kubectl logs <pod-name> -n workzen
```

**Check Prometheus targets:**
```bash
http://localhost:32000/targets
```

**Check endpoints:**
```bash
kubectl get endpoints backend -n workzen
```

## 🧽 Tear Down Cluster

```bash
kind delete cluster --name workzen
```

## 📊 Available Metrics

Your Node.js backend exposes these metrics for monitoring:

- **Process Metrics**: CPU usage, memory consumption, file descriptors
- **Node.js Metrics**: Event loop lag, heap usage, garbage collection
- **HTTP Metrics**: Request duration, request rate, response codes
- **Custom Metrics**: Application-specific business metrics

## 🎯 Monitoring Queries Examples

```promql
# CPU Usage Rate
rate(process_cpu_seconds_total[5m]) * 100

# Memory Usage (MB)
process_resident_memory_bytes / 1024 / 1024

# Event Loop Lag (ms)
nodejs_eventloop_lag_p99_seconds * 1000

# HTTP Request Rate
rate(http_request_duration_seconds_count[5m])

# Average Response Time
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])
```

## 📜 License

MIT License — Free to use, modify, and distribute.

## 🚀 Author

Made with ❤️ by **Ajeet Upadhyay**

---

⭐ **Star this repo** if you found it helpful!