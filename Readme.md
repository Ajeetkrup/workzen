🚀 WorkZen – Corporate Room Booking & Monitoring System

A microservice-based web application to manage room bookings for corporate employees, with built-in observability using Prometheus and Grafana.
📜 Project Description

WorkZen helps employees easily book meeting rooms, check availability, and manage schedules. This application is built with a microservice approach — a Node.js + Express backend, a React frontend, and a MongoDB database, all containerized and deployed on Kubernetes (Kind) with Prometheus and Grafana for monitoring.
✨ Features

    🏢 Room Management

    📅 Booking Management

    🔍 API Health Monitoring

    📊 Performance Observability (CPU, memory, HTTP requests)

    ✅ Kubernetes Deployment (using Kind for local clusters)

    🔥 Real-time dashboards with Grafana

🏗️ Architecture

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
         |   |   Grafana    | (NodePort :32000)                      |
         |   +-------------+                                          |
         +------------------------------------------------------------+

🧰 Tech Stack

    Frontend: React.js, Axios, TailwindCSS

    Backend: Node.js, Express, Prom-client (metrics)

    Database: MongoDB

    Containerization: Docker

    Orchestration: Kubernetes (Kind for local)

    Monitoring: Prometheus, Grafana

    Deployment: YAML manifests for Deployments, Services, ConfigMaps

📦 Project Structure

workzen/
├── backend/
│   ├── Dockerfile
│   ├── deployment.yaml
│   ├── service.yaml
│   └── src/
├── frontend/
│   ├── Dockerfile
│   ├── deployment.yaml
│   ├── service.yaml
│   └── src/
├── k8s/
│   ├── namespace.yaml
│   ├── mongodb-deployment.yaml
│   ├── mongodb-service.yaml
│   └── ingress.yaml (optional)
├── monitoring/
│   ├── prometheus-deployment.yaml
│   ├── prometheus-service.yaml
│   ├── prometheus-config.yaml
│   ├── grafana-deployment.yaml
│   ├── grafana-service.yaml
│   └── grafana-dashboards/ (optional)
└── README.md

🏗️ Setup Instructions
✅ Step 1: Prerequisites

    Docker

    Kubernetes (kubectl)

    Kind (Kubernetes in Docker)

    DockerHub Account (for image push)

✅ Step 2: Create Kind Cluster

kind create cluster --name workzen

✅ Step 3: Create Namespace

kubectl apply -f k8s/namespace.yaml

✅ Step 4: Build Docker Images

Build backend:

docker build -t <dockerhub-username>/workzen-backend ./backend

Build frontend:

docker build -t <dockerhub-username>/workzen-frontend ./frontend

✅ Step 5: Push Images to DockerHub

docker push <dockerhub-username>/workzen-backend
docker push <dockerhub-username>/workzen-frontend

✅ Step 6: Deploy MongoDB

kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/mongodb-service.yaml

✅ Step 7: Deploy Backend

kubectl apply -f backend/deployment.yaml
kubectl apply -f backend/service.yaml

✅ Step 8: Deploy Frontend

kubectl apply -f frontend/deployment.yaml
kubectl apply -f frontend/service.yaml

✅ Step 9: Deploy Monitoring Stack

kubectl apply -f monitoring/prometheus-config.yaml
kubectl apply -f monitoring/prometheus-deployment.yaml
kubectl apply -f monitoring/prometheus-service.yaml

kubectl apply -f monitoring/grafana-deployment.yaml
kubectl apply -f monitoring/grafana-service.yaml

🌐 Access Services
Service	URL	NodePort
Frontend	http://localhost:31000	31000
Backend API	http://localhost:30000/health	30000
Prometheus	http://localhost:32000	32000
Grafana	http://localhost:33000	33000
🔑 Grafana Credentials

    Username: admin

    Password: admin (or as set in deployment)

📈 Setup Grafana Dashboards

    Open Grafana at http://localhost:33000

    Add Data Source → Prometheus → URL: http://prometheus.monitoring.svc.cluster.local:9090

    Import dashboards manually or from grafana-dashboards/ (optional).

🔍 Prometheus Target Config Example

scrape_configs:
  - job_name: 'backend'
    static_configs:
      - targets: ['backend.workzen.svc.cluster.local:8000']

🧠 Common Debug Commands

Check pods:

kubectl get pods -n workzen

Check services:

kubectl get svc -n workzen

Check logs:

kubectl logs <pod-name> -n workzen

Check Prometheus targets:

http://localhost:32000/targets

Check endpoints:

kubectl get endpoints backend -n workzen

🧽 Tear Down Cluster

kind delete cluster --name workzen

📜 License

MIT License — Free to use, modify, and distribute.
🚀 Author

Made with ❤️ by Ajeet Upadhyay
