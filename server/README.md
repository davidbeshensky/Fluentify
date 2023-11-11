# TypeScript Express Server

This is a simple Node.js and Express server written in TypeScript, containerized with Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

1. Install Dependencies:
`npm install`
2. Build TypeScript code:
`npm run build`
3. Start the server 
`npm start`


## Docker

1. Build the Docker Image:
`docker build -t server .`

2. Run the Docker container:
`docker run -p 3000:3000 server`

3. Access the Server at localhost:3000


