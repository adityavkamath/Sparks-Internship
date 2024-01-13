---

# Banking Web Application

## Overview

This is a simple web application for managing customer information and transactions in a banking system. The application is built using Node.js, Express.js, and MongoDB. It allows users to view customer details, transfer money between customers, and keeps a record of all transactions.

## Features

### Customer Management

- **View All Customers:**
  - Navigate to the "View all Customers" page to see a list of all registered customers.
  - Each customer's name is a clickable link leading to their individual details page.

- **View Customer Details:**
  - Click on a customer's name to view detailed information, including email and current balance.
  - From the customer details page, users can initiate money transfers or navigate back to the list of all customers.

### Money Transfer

- **Initiate Money Transfer:**
  - From a customer's details page, users can click on the "Transfer Money" link to initiate a money transfer.
  - Users select the recipient from a list of available customers and specify the transfer amount.

- **Transaction History:**
  - All money transfers are recorded in a transfers table, including details such as the sender, receiver, and transfer amount.
  - Users can view the complete transaction history on the "Transfers" page.

## Technologies Used

- **Node.js:**
  - Server-side runtime for executing JavaScript code.
  - Used in conjunction with the Express.js framework for building the backend of the web application.

- **Express.js:**
  - Web application framework for Node.js.
  - Handles routing, middleware, and server setup.

- **MongoDB:**
  - NoSQL database used to store customer information and transaction records.

- **EJS (Embedded JavaScript):**
  - Template engine for rendering dynamic HTML content.

- **HTML/CSS:**
  - Frontend components and styling for the web application.

- **Docker:**
  - Containerization technology for packaging the application into a Docker container.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/banking-web-app.git
   ```

2. **Install Dependencies:**
   ```bash
   cd banking-web-app
   npm install
   ```

3. **Configure MongoDB:**
   - Ensure MongoDB is installed and running.
   - Update the MongoDB connection string in the `app.js` file.

4. **Seed Database:**
   ```bash
   npm run seed
   ```

5. **Run the Application:**
   ```bash
   npm start
   ```

6. **Access the Application:**
   - Open a web browser and navigate to `http://localhost:3000`.

## Contribution

- Contributions are welcome! Feel free to open issues, submit pull requests, or suggest improvements.

## License

- This project is licensed under the [MIT License](LICENSE).

---
