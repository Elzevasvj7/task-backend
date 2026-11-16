# 🚀 Task API — CI/CD & Cloud Engineering Lab

[![CI/CD Pipeline](https://github.com/Elzevasvj7/task-backend/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Elzevasvj7/task-backend/actions/workflows/ci-cd.yml)
[![Version](https://img.shields.io/github/v/release/Elzevasvj7/task-backend?color=blue&label=version)](https://github.com/Elzevasvj7/task-backend/releases)
[![Node.js](https://img.shields.io/badge/Node.js-24-green.svg)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/Framework-NestJS-red.svg)](https://nestjs.com/)
[![AWS](https://img.shields.io/badge/Cloud-AWS-orange.svg)](https://aws.amazon.com/)
[![Docker](https://img.shields.io/badge/Container-Docker-blue.svg)](https://www.docker.com/)
[![DevSecOps](https://img.shields.io/badge/Security-Trivy%20%7C%20pnpm%20audit-purple.svg)](https://aquasecurity.github.io/trivy/)

A hands-on **CI/CD and Cloud Engineering project** focused on building an automated software delivery pipeline using GitHub Actions, Docker, and Amazon Web Services.

The pipeline integrates automated testing, code quality checks, DevSecOps security scanning, semantic versioning, and Blue/Green deployments on Amazon ECS Fargate.

The application is intentionally lightweight, keeping the focus on CI/CD automation, cloud infrastructure, deployment strategies, and operational practices.

---

## 🎯 Project Overview

This repository serves as a practical engineering laboratory for exploring modern CI/CD practices and cloud-native application deployments.

Rather than focusing on complex business logic, the project uses a lightweight REST API built with NestJS as the foundation for implementing and experimenting with a complete software delivery workflow.

### Key Objectives

- Build an automated CI/CD pipeline using GitHub Actions.
- Implement automated testing and code quality gates.
- Integrate DevSecOps practices into the deployment lifecycle.
- Containerize applications using Docker.
- Deploy and manage containers with Amazon ECS Fargate.
- Implement Blue/Green deployment strategies.
- Automate application versioning and releases.
- Monitor infrastructure and application health using AWS services.

### Project Scope

This is an infrastructure and automation-focused laboratory, not a production-ready task management system.

The API intentionally does not use a database. Its purpose is to provide a simple application that can be built, tested, containerized, deployed, and validated without introducing unnecessary application complexity.

---

## 🏗️ CI/CD Architecture

The pipeline follows a Continuous Integration and Continuous Delivery approach, separating code validation from deployment operations.

```text
                   Developer Push / Pull Request
                              │
                              ▼
               ┌─────────────────────────────┐
               │   CONTINUOUS INTEGRATION    │
               │                             │
               │  • Node.js 24 + pnpm        │
               │  • Dependency caching       │
               │  • pnpm audit               │
               │  • ESLint                   │
               │  • Vitest + Coverage        │
               │  • TypeScript Build         │
               └──────────────┬──────────────┘
                              │
                     Quality Gates Passed
                              │
                    Push to master only
                              │
                              ▼
               ┌─────────────────────────────┐
               │    CONTINUOUS DELIVERY     │
               │                             │
               │  • Semantic Versioning      │
               │  • AWS IAM Authentication  │
               │  • Docker Buildx            │
               │  • Trivy Image Scanning     │
               │  • Amazon ECR Push          │
               │  • ECS Task Definition      │
               └──────────────┬──────────────┘
                              │
                              ▼
               ┌─────────────────────────────┐
               │       AWS DEPLOYMENT        │
               │                             │
               │  • Amazon ECS Fargate       │
               │  • Application Load Balancer│
               │  • Blue/Green Deployment    │
               │  • Health Checks            │
               │  • Smoke Tests              │
               └──────────────┬──────────────┘
                              │
                              ▼
                    Discord Notification
```

### CI — Continuous Integration

Every pull request and push triggers automated validation to ensure that changes meet the project's quality requirements.

| Stage | Description |
|---|---|
| Environment Setup | Configure Node.js 24 and pnpm with dependency caching |
| Dependency Audit | Identify vulnerable dependencies using pnpm audit |
| Linting | Execute ESLint to validate code quality |
| Unit Testing | Run automated tests using Vitest |
| Coverage | Enforce minimum code coverage thresholds |
| Build | Compile the TypeScript application |

Deployment is only triggered after successful CI validation and a push to the `master` branch.

### CD — Continuous Delivery

Once CI passes, the deployment workflow automates the release and delivery process.

1. Calculate the next semantic version using Conventional Commits.
2. Generate Git tags and publish a GitHub Release.
3. Authenticate with AWS using IAM credentials.
4. Build the Docker image using Docker Buildx.
5. Scan the image locally using Trivy.
6. Push verified images to Amazon ECR.
7. Render the updated ECS Task Definition.
8. Deploy the new application version to Amazon ECS.
9. Execute smoke tests against the load balancer.
10. Send deployment notifications to Discord.

---

## ☁️ AWS Infrastructure

The application is deployed using AWS services designed to support containerized workloads, network isolation, monitoring, and automated deployments.

| AWS Service | Purpose |
|---|---|
| **Amazon ECS** | Container orchestration and deployment management |
| **AWS Fargate** | Serverless container execution |
| **Amazon ECR** | Docker image registry |
| **Application Load Balancer** | Traffic distribution and health checks |
| **Amazon VPC** | Network isolation and infrastructure connectivity |
| **Amazon S3** | Object storage and infrastructure-related resources |
| **AWS IAM** | Identity and access management |
| **Amazon CloudWatch** | Logs, metrics, and infrastructure monitoring |
| **Amazon SNS** | Infrastructure alert notifications |

### Network Architecture

The infrastructure uses private subnets for application workloads, with AWS VPC endpoints to provide private connectivity to required AWS services.

The architecture includes:

- Public subnets for load balancer connectivity.
- Private subnets for ECS workloads.
- Application Load Balancer for incoming traffic.
- S3 Gateway Endpoint.
- ECR API and ECR Docker interface endpoints.
- VPC Flow Logs for network traffic visibility.

This configuration provides practical experience with AWS networking, private connectivity, and cloud infrastructure design.

---

## 🔄 Blue/Green Deployment Strategy

One of the main components of this project is the implementation of Blue/Green deployments using Amazon ECS Fargate and an Application Load Balancer.

The architecture uses two Target Groups and two ALB listeners to separate production traffic from deployment validation.

### Traffic Configuration

| Listener | Port | Purpose |
|---|---:|---|
| Production | `80` | Receives application traffic |
| Testing | `8080` | Validates the newly deployed application version |

### Deployment Workflow

```text
             New Application Version
                       │
                       ▼
                Docker Image
                       │
                       ▼
                  Amazon ECR
                       │
                       ▼
                  Amazon ECS
                       │
                       ▼
              New Task Deployment
                       │
                       ▼
             Green Target Group
                       │
                       ▼
              Testing Listener
                    :8080
                       │
                       ▼
                Smoke Tests
                       │
                 Tests Passed
                       │
                       ▼
             Production Traffic
                  Switch
                       │
                       ▼
             Production Listener
                    :80
                       │
                       ▼
              Green Becomes Active
```

The deployment process allows the new application version to be validated through the testing listener before production traffic is switched.

This approach helps reduce deployment risk and minimize service interruptions.

---

## 🛡️ DevSecOps & Security

Security checks are integrated into the software delivery lifecycle following a Shift-Left approach.

### Dependency Security

**pnpm audit**

- Scans project dependencies for known vulnerabilities.
- Uses a high-severity threshold to enforce dependency security checks.
- Prevents the pipeline from proceeding when the configured audit gate fails.

### Container Security

**Trivy**

- Scans the Docker image before it is pushed to Amazon ECR.
- Identifies vulnerabilities in operating system packages and application dependencies.
- Blocks the deployment pipeline when CRITICAL vulnerabilities are detected.

### AWS Access Management

**IAM Least Privilege**

- Uses dedicated IAM permissions for deployment operations.
- Restricts access to the required AWS services and resources.
- Separates local development credentials from AWS workload permissions.

---

## 📦 Automated Versioning & Releases

The pipeline integrates automated Semantic Versioning based on Conventional Commits.

Commit conventions:

| Commit Type | Version Change |
|---|---|
| `feat:` | Minor |
| `fix:` | Patch |
| `feat!:` | Major |
| `BREAKING CHANGE:` | Major |

For each successful release, the workflow:

- Calculates the next application version.
- Creates a Git tag.
- Publishes a GitHub Release.
- Tags Docker images using the semantic version.
- Tags Docker images using the Git commit SHA.

Using both tags provides readable release versions and immutable references to specific source code revisions.

---

## 📊 Monitoring & Observability

The project integrates AWS monitoring and alerting services to provide visibility into application and infrastructure behavior.

| Service | Implementation |
|---|---|
| **CloudWatch Logs** | Centralized container and application logs |
| **CloudWatch Alarms** | Infrastructure metrics and threshold-based alerts |
| **Amazon SNS** | Email notifications for configured alerts |
| **Discord Webhooks** | Automated CI/CD deployment notifications |
| **ALB Health Checks** | Target availability validation |
| **Smoke Tests** | Post-deployment application validation |

---

## 📡 API Reference

The REST API provides basic task management operations.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Application health check |
| `GET` | `/tasks` | Retrieve all tasks |
| `GET` | `/tasks/:id` | Retrieve a specific task |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Replace an existing task |
| `PATCH` | `/tasks/:id` | Partially update a task |
| `DELETE` | `/tasks/:id` | Delete a task |

### Health Check

**Endpoint:** `GET /health`

Returns application health information used by the load balancer and deployment validation process.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Backend | Node.js 24, NestJS, TypeScript |
| Package Manager | pnpm |
| Testing | Vitest |
| Code Quality | ESLint |
| Containerization | Docker, Docker Buildx |
| CI/CD | GitHub Actions |
| Cloud Provider | Amazon Web Services |
| Container Orchestration | Amazon ECS, AWS Fargate |
| Container Registry | Amazon ECR |
| Networking | Amazon VPC, Application Load Balancer |
| Monitoring | CloudWatch, Amazon SNS |
| Security | Trivy, pnpm audit |
| Versioning | Semantic Versioning, Conventional Commits |
| Notifications | Discord Webhooks |

---

## 💻 Local Development

### Prerequisites

Make sure you have the following tools installed:

- Node.js 24
- pnpm
- Docker (optional, for container builds)

### Installation

Clone the repository:

```bash
git clone https://github.com/Elzevasvj7/task-backend.git

cd task-backend
```

Install dependencies:

```bash
pnpm install
```

### Available Commands

| Command | Description |
|---|---|
| `pnpm run start:dev` | Start the application in development mode |
| `pnpm run lint` | Run ESLint |
| `pnpm run test` | Execute unit tests |
| `pnpm run test:cov` | Execute tests with coverage |
| `pnpm run build` | Compile the application |

### Run Locally

```bash
pnpm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

### Docker

Build the Docker image:

```bash
docker build -t task-backend .
```

Run the container:

```bash
docker run -p 3000:3000 task-backend
```

---

## 🔐 Configuration & Security

AWS credentials and sensitive configuration values must be provided through environment variables or the appropriate AWS credential provider.

Never commit AWS access keys, secrets, or other sensitive credentials to the repository.

The GitHub Actions deployment workflow requires the appropriate IAM permissions to interact with Amazon ECR and ECS.

---

## 📚 What This Project Demonstrates

This laboratory provides practical experience with:

- CI/CD pipeline design and automation.
- Backend application containerization.
- Automated testing and code quality enforcement.
- DevSecOps and container vulnerability scanning.
- AWS IAM and least-privilege access.
- Cloud networking and private connectivity.
- Container orchestration with Amazon ECS Fargate.
- Blue/Green deployment strategies.
- Semantic versioning and automated releases.
- Cloud monitoring, logging, and alerting.

---

## 👨‍💻 Author

**Sebastian Camero**

Full Stack Developer | Backend & Cloud Engineering

- [GitHub](https://github.com/Elzevasvj7)
- [Portfolio](https://portfolio-sebastian-henna.vercel.app/)

---

<p align="center">
  Built as a hands-on laboratory for exploring modern CI/CD and Cloud Engineering practices.
</p>