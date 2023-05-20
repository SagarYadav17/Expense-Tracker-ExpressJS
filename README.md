# Expense Tracker API in Express JS

This is a sample README file for an Express.js project with Docker Compose.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SagarYadav17/Expense-Tracker-ExpressJS.git
```

2. Change into the project directory:

```bash
cd Expense-Tracker-ExpressJS
```

3. Install the dependencies:

```bash
npm install
```

3. Create the `.env` file in root directory:

```
DB_NAME = "postgres"
DB_USERNAME ="postgres"
DB_PASSWORD = "postgres"
DB_HOSTNAME = "127.0.0.1"
DB_PORT = 5432
SERVER_PORT = 3000
```

## Usage

To start the Express.js application, run the following command:

```bash
npm start
```

The application will start running on `http://localhost:3000`.

## Docker Compose

To run the application using Docker Compose, follow these steps:

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and start the Docker containers:

```bash
docker-compose up --build
```

The Express.js application will now be running inside a Docker container, and you can access it at `http://localhost:3000`.
