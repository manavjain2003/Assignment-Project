const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const MongoDbConnect = require('./config/db');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const cors = require('cors');

MongoDbConnect();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});