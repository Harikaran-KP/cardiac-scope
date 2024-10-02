1. Setting up PostgreSQL
Prerequisites
Ensure PostgreSQL is installed and running on your local machine.
Instructions
Navigate to the 'cardiac-scope-postgreSQL_create_scripts.txt' file.

Run the SQL scripts to create the necessary tables:

bash (on terminal)
psql -U <your-username> -d <your-database> -f create_scripts.sql
Replace <your-username> and <your-database> with your PostgreSQL credentials.

2. Running the Backend (Node.js)
Prerequisites
Ensure you have Node.js and npm installed.
Instructions
Navigate to the 'cardiac-scope-api' folder.
bash(on terminal in VS Code)

cd cardiac-scope-api
Install dependencies:
bash(on terminal in VS Code)

npm install
Set up environment variables. Create a .env file with the following:
bash

PORT=5000
DB_HOST=<your-postgres-host>
DB_USER=<your-username>
DB_PASSWORD=<your-password>
DB_NAME=<your-database-name>
JWT_SECRET=<your-secret-key>

Start the backend:
bash(on terminal in VS Code)

node app.js

3. Running the Frontend (React.js)
Prerequisites
Ensure you have Node.js and npm installed.
Instructions
Navigate to the 'cardiac-scope-app' folder.
bash(on terminal in VS Code)

cd cardiac-scope-app
Install dependencies:
bash(on terminal in VS Code)

npm install


Update the backend API URL in src/config.js:
javascript

export const API_URL = 'http://localhost:5000';
Start the frontend:
bash(on terminal in VS Code)

npm start


4. Running the Jupyter Notebook
Prerequisites
Install Jupyter Notebook and Python dependencies.
Instructions
Navigate to the 'cardiac-scope-notebook.ipynb' Jupyter notebook.
Install dependencies:
bash

pip install -r requirements.txt
Start the notebook:
bash

jupyter notebook
Open the notebook in your browser and run the cells.

5. For Integration, use ngrok.
Once link is generated, use that link as base url inside `handleUpload` controller in authController.js in cardiac-scope-api folder (Node.js)

6. For testing image upload, please visit ACDC site (https://humanheart-project.creatis.insa-lyon.fr/database/#collection/637218c173e9f0047faa00fb)
and download dataset.
For every patient folder, frame01 is ED and Frame number with other will be ES image. 
Don't use file with 'gt' on it.
Upload Info file as well.
