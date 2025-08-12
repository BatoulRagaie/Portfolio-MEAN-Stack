// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/personal', require('./routes/personalRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
