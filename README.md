# Serverless CRUD REST API (AWS)

This project is a Serverless Framework-based REST API using AWS API Gateway, Lambda (Node.js/TypeScript), and DynamoDB. It supports full CRUD operations and is ready for CI/CD deployment.

## Features
- Node.js/TypeScript Lambdas
- AWS API Gateway REST API
- DynamoDB integration (no direct service proxy)
- Serverless Framework IaC
- GitHub Actions CI/CD (multi-stage: dev, prod)

## Folder Structure
```
serverless/
  src/
    handlers/   # Lambda function handlers
    models/     # TypeScript interfaces/models
    services/   # Business logic, DynamoDB access
  README.md
  serverless.yml
```

## Getting Started
Instructions will be added as the project is built step by step.
