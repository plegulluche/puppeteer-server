
# Node Server for Puppeteer Processes

## Overview

This server is a dedicated Node.js server used in conjunction with two Next.js applications: a marketplace and a dashboard. The primary purpose is to handle heavy computational tasks, particularly those involving Puppeteer, offloading this workload from the main applications. This approach enhances performance and scalability. The server may be extended for additional features requiring similar heavy logic in the future.

## Setup and Installation

### Prerequisites

- Node.js (versions 18 or 20 recommended for compatibility)
- Yarn as the package manager
- Any standard code editor

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `yarn install` to install dependencies.

### Environment Variables

Set the following environment variables:

- `PORT` - The port number for the server.
- `CLIENT_URL` - The URL for CORS configuration.

### Running the Server

To start the server in development mode, run `yarn dev`. A message should appear in the console indicating that the server is running on port 4000. Ensure CORS configuration is correctly set up for communication with the server from different sources.

## Usage

Currently, the server supports the following endpoint:

- **Generate PDF:** `POST http://localhost:4000/generate-pdf`
  
  Payload: A JSON object containing a `url` key with a valid URL string. This endpoint uses Puppeteer to generate a PDF from the provided webpage URL.

### Testing

Use Postman or a similar tool to test the API endpoint.

## Future Milestones

### Upcoming Features

- **CORS Configuration:** Setting up CORS for development and production environments.
- **Deployment Instructions:** Guidelines for deploying the server.
- **Eslint Configuration & Code Normalization:** Implementing Eslint for coding standards.
- **API Documentation with Swagger:** Creating Swagger-based API documentation.
- **Environment Variable Management:** Managing environment variables for different setups.
- **Enhancements in Puppeteer Usage:** Customizing Puppeteer for specific functionalities.

### Integration Plans

- **Marketplace Integration:** Integrating with Marketplace versions 2 and 3.

### Scalability

- **Scalability Planning:** Developing a plan for scaling the server capabilities.

---

**Note:** This is an internal project, and community contributions are not applicable.
