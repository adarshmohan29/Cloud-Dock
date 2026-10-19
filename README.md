# CloudDock

CloudDock is a prototype **bring-your-own-cloud deployment platform**. It connects a GitHub repository to an AWS EC2 instance, prepares a Docker-based deployment, and provides a dashboard for viewing and controlling instances.


> **Project status:** The frontend structure builds successfully and the backend source passes JavaScript syntax checks. Live AWS provisioning, SSH access, DNS, and end-to-end deployment have not yet been verified with fresh infrastructure.

## Core workflow

When a user creates a deployment, CloudDock is designed to:

1. Create an AWS EC2 instance.
2. Connect to the instance over SSH.
3. Install Docker.
4. Clone the selected GitHub repository.
5. Add a Dockerfile for React, Node.js, or Django.
6. Add Docker Compose and Caddy configuration.
7. Build and start the application.

```text
GitHub repository
       |
       v
React dashboard -> Express API -> AWS EC2
                                   |
                                   v
                         SSH + Docker + Caddy
                                   |
                                   v
                           Deployed application
```

## Project structure

```text
CloudDock/
├── CloudDock_frontend/       React 17 dashboard
│   └── src/jsx/components/Dashboard/
│       ├── Home.js           Instance summary
│       ├── Campaign.js       List/start/stop instances
│       ├── NewCompaign.js    Deployment workflow
│       └── Spendings.js      Cost view and CSV export
└── CloudDock_backend/        Node.js and Express API
    ├── index.js              Server entry point and route registration
    └── routes/
        ├── github/github.js              GitHub repository operations
        └── aws/
            ├── create_aws_console.js     EC2 provisioning
            ├── docker_aws.js             Docker installation over SSH
            ├── code_caddy.js             Repository deployment
            └── detailed_aws.js            Instance details and controls
```



## Technology stack

- **Frontend:** React 17, React Router, Axios, Bootstrap, Chart.js
- **Backend:** Node.js, Express, Passport, Octokit
- **Infrastructure:** AWS EC2
- **Deployment:** SSH, Docker, Docker Compose, Caddy
- **Authentication experiments:** Auth0 in the frontend and GitHub OAuth in the backend

## Prerequisites

- Node.js 16 or newer
- npm
- A GitHub OAuth application or personal access token
- An AWS account with an EC2 AMI, security group, and appropriate IAM permissions
- An EC2-compatible SSH key pair

AWS credentials are only required when testing the AWS routes. Do not commit real credentials or private keys.

## Environment configuration

Create the backend environment file from the example:

```bash
cp CloudDock_backend/.env.example CloudDock_backend/.env
```

Then replace the placeholder values in `CloudDock_backend/.env` with fresh credentials and resource identifiers.

Required backend variables:

```dotenv
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=
EC2_AMI_ID=
EC2_INSTANCE_TYPE=t2.micro
EC2_SECURITY_GROUP_ID=
GITHUB_TOKEN=
GITHUB_CLIENT_ID=
CLIENT_SECRET=
CALLBACK_URL=http://localhost:3000/auth/github/callback
```

For a production-quality version, use temporary AWS credentials or an IAM role instead of permanent access keys.

## Install dependencies

```bash
cd CloudDock_backend
npm install

cd ../CloudDock_frontend
npm install
```

## Run locally

The current code has a port configuration conflict: both the Express backend and Create React App default to port `3000`. Until the ports and API base URL are centralized, run the backend on port `3000` and the frontend on port `3001`:

Terminal 1:

```bash
cd CloudDock_backend
node index.js
```

Terminal 2:

```bash
cd CloudDock_frontend
PORT=3001 npm start
```

The dashboard should then be available at `http://localhost:3001`. Some authentication redirects are still hardcoded to port `3000` and require cleanup before GitHub/Auth0 login can be considered functional.

## Verify without creating AWS resources

These checks do not create, start, stop, or modify an EC2 instance.

Backend syntax check:

```bash
for file in CloudDock_backend/index.js CloudDock_backend/routes/aws/*.js CloudDock_backend/routes/github/*.js CloudDock_backend/utils/*.js; do
  node --check "$file" || exit 1
done
```

Frontend production build:

```bash
cd CloudDock_frontend
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

The build currently completes with warnings, mainly from unused components inherited from the dashboard template.

## Main API routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/github/allrepos` | List configured GitHub repositories |
| `POST` | `/api/aws/create-instance` | Create an EC2 instance |
| `GET` | `/api/aws/instance/:instanceId` | Get an instance's details |
| `GET` | `/api/details/instances` | List EC2 instances |
| `POST` | `/api/details/instances/:instanceId/start` | Start an instance |
| `POST` | `/api/details/instances/:instanceId/stop` | Stop an instance |
| `POST` | `/api/install/instance/:instanceId/docker-compose` | Install Docker tooling |
| `POST` | `/api/code/instance/:instanceId/git-repo` | Clone a repository |
| `POST` | `/api/code/instance/:instanceId/dockerfiles` | Add deployment configuration |
| `POST` | `/api/code/instance/:instanceId/startWebsite` | Build and start the application |



