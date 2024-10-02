# Cardiac Scope Project

## Prerequisites

Before getting started, ensure the following are installed on your local machine:
- **PostgreSQL** for the database.
- **Node.js** and **npm** for the backend and frontend.
- **Jupyter Notebook** for the data science part.

---

## 1. Setting up PostgreSQL

### Prerequisites
- Ensure PostgreSQL is installed and running on your local machine.

### Instructions
- Navigate to the `cardiac-scope-postgreSQL_create_scripts.txt` file.
- Run the SQL scripts to create the necessary tables:
  ```bash
  psql -U <your-username> -d <your-database> -f create_scripts.sql
Replace <your-username> and <your-database> with your PostgreSQL credentials.

## 2. Running the Backend (Node.js)

### Prerequisites
- Ensure you have Node.js and npm installed.

### Instructions

- Navigate to the `cardiac-scope-api` folder:
  ```bash
  cd cardiac-scope-api

- Install dependencies:
  ```bash
  npm install

- Set up environment variables by creating a `.env` file in the root directory with the following:
  ```bash
  CopyPORT=5000
  DB_HOST=<your-postgres-host>
  DB_USER=<your-username>
  DB_PASSWORD=<your-password>
  DB_NAME=<your-database-name>
  JWT_SECRET=<your-secret-key>
- Replace placeholders with your actual credentials.
- Start the backend server:
  ```bash
  node app.js


## 3. Running the Frontend (React.js)

### Prerequisites
- Ensure you have Node.js and npm installed.

### Instructions

- Navigate to the `cardiac-scope-app` folder:
  ```bash
  cd cardiac-scope-app

- Install dependencies:
  ```bash
  npm install

- Update the backend API URL in `src/config.js`:
  ```javascript
  export const API_URL = 'http://localhost:5000';

- Start the frontend:
  ```bash
  npm start


## 4. Running the Jupyter Notebook

### Prerequisites

- Install Jupyter Notebook and Python dependencies.

### Instructions

- Navigate to the `cardiac-scope-notebook.ipynb` Jupyter notebook.
- Install required Python packages:
  ```bash
  pip install -r requirements.txt

- Start the notebook:
  ```bash
  jupyter notebook

- Open the notebook in your browser and run the cells.

## 5. Integration with Ngrok

- Use ngrok to expose the backend server.
- Once the ngrok URL is generated, update the base URL inside the handleUpload controller in `authController.js` within the `cardiac-scope-api folder` (Node.js).

## 6. Testing Image Upload

- Visit the ACDC site to download the dataset.
For every patient folder:

- frame01 is the ED image.
- Another frame number will be the ES image.
- Do not use files with 'gt' in the name.
- Upload the Info file as well.

## Conclusion
This project integrates various technologies like PostgreSQL, Node.js, React.js, and Jupyter Notebook to provide a full-stack solution for cardiac image analysis. By following the instructions in this document, you can set up the environment and explore the capabilities of the Cardiac Scope Project.
