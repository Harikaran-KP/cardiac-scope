const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serving static files from the React app
app.use(express.static(path.join(__dirname, '../cardiac-scope-app/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../cardiac-scope-app/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
