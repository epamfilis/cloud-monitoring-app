# Cloud-Deployed Web Application with Monitoring

## Overview
This project demonstrates deploying and operating a containerized web application on AWS.  
The application is packaged with Docker, deployed on an EC2 instance running Ubuntu, and monitored using Amazon CloudWatch with email alerts via SNS.

The primary focus of this project is cloud infrastructure, deployment, and observability, rather than application complexity.


## Architecture
- AWS EC2
- Docker (containerized FastAPI application)
- AWS Security Groups (network access control)
- Amazon CloudWatch (metrics and alarms)
- Amazon SNS (email notifications)

**Request flow:**
1. Client sends an HTTP request to the EC2 public IP
2. EC2 forwards traffic on port 80 to the Docker container on port 8000
3. The FastAPI application handles the request
4. CloudWatch continuously monitors system health and CPU utilization
5. SNS sends email alerts when alarm thresholds are breached

## Application
The application is a lightweight FastAPI service with the following endpoints:
- `/` – root endpoint
- `/health` – basic health check
- `/debug` – returns hostname and timestamp to verify runtime environment


## Deployment
Deployment was performed manually using the AWS Console and SSH:

1. Built a Docker image using a `Dockerfile` based on `python:3.12-slim`
2. Launched an EC2 instance running Ubuntu
3. Configured security groups:
   - SSH (port 22) restricted to my IP
   - HTTP (port 80) open to the public
4. Installed Docker on the instance from the official Docker apt repository
5. Built and ran the container on the EC2 instance with:
   - Port mapping from 80 → 8000
   - Automatic restart policy
6. Verified application availability via browser and curl

---

## Monitoring & Alerts
Monitoring is implemented using **Amazon CloudWatch**.

### Configured alarms:
- **High CPU Utilization**
  - Triggers when average CPU usage exceeds 70% over a 5-minute period
  - Validated by generating CPU load on the instance
- **EC2 Instance Health**
  - Uses `StatusCheckFailed` to monitor underlying instance health

### Notifications:
- Alerts are sent via Amazon SNS to an email subscription
- SNS subscription was confirmed and tested

