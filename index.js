const express = require('express');
const cors = require('cors');
const { db, auth } = require('./DB/firebase');
const userRouter = require('./routes/users'); 

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
