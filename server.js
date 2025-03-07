const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 5000;
const projectRouter = require('./routes/project_routes');

// Enable CORS
app.use(cors()); // Add cors middleware

// Express middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/projects', projectRouter);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        message: err.message || 'Something went wrong',
        errors: err.errors || [],
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/projects')
    .then(() => { console.log('DB connected successfully'); });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});