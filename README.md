# File Downloader

This is a monorepo project designed to handle file operations, with both a web frontend and a server backend. The project is structured with two workspaces, web and server, and uses concurrently to run both services simultaneously.

## Prerequisites

To get started, ensure that your system meets the following requirements:

Node.js: Version 20 or higher
You can check your versions by running:

```
node -v
```

## Installation

Follow these steps to install and set up the project on your local machine:

Clone the repository:

```
git clone https://github.com/norup/file-downloader
cd file-downloader
```

Install dependencies for both web and server workspaces by running the following command in the root directory:

```
npm install
```

Running the Application
To run both the backend server and the frontend client simultaneously, use the following command:

```
npm start
```

Frontend: The frontend will be available at http://localhost:3000 by default.
Backend: The backend server will be running on http://localhost:4500 by default.
