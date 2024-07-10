const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { routes: eventRoutes } = require('./src/routes/events/eventRoutes');
const { routes: authRoutes } = require('./src/routes/auth/authRoutes');
const { routes: reportRoutes } = require('./src/routes/reports/reportRoutes');
const { routes: rmRoutes } = require('./src/routes/users/rmRoutes');
const { routes: flRoutes } = require('./src/routes/users/flCoordinatinStaffRoutes');
const { routes: participantRoutes } = require('./src/routes/participants/participantRoutes');
const { routes: userRoutes } = require('./src/routes/users/userRoutes');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./src/utils/swagger');
const sequelize = require('./src/db/db');
// const User = require('./src/models/user');
const { authenticateJWT } = require('./src/middleware/auth');

//const Event = require('./src/models/Events');

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // (async () => {
  //   await sequelize.sync(); // Use { force: true } only in development to reset the database
  // })();
sequelize.sync() // Ensure models match the database schema without dropping tables
  .then(() => {
    console.log('Database synchronized!');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Add your existing routes
app.use('/authenticate', authRoutes);
app.use('/event', eventRoutes);
app.use('/reports', reportRoutes);
app.use('/rm', rmRoutes);
app.use('/fl', flRoutes);
app.use('/participants', participantRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/users", userRoutes)
app.get('/admin', authenticateJWT(['Admin']), (req, res) => {
  res.json({ message: 'This is an admin route', user: req.user });
});
// Swagger UI route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Error handling middleware
// app.use((err, req, res, next) => {
//   return res.status(500).send({ message: err.message });
// });

app.listen(3001, () => console.log('Server Started at Port 3000'));

