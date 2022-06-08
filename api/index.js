// index.js

const express = require('express');
const app = express();

// set up port
const PORT = process.env.PORT || 3000;

app.use(express.json());

// add routes
const userRouter = require('./routes/user_router.js');
app.use('/api/users', userRouter);

const reportRouter = require('./routes/report_router.js');
app.use('/api/report', reportRouter);

// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));