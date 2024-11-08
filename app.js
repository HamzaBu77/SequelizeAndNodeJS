const Express = require('express');
const DotEnv = require('dotenv');
DotEnv.config();
const SQInstance = require('./config/database.config.js');
const EmployeeRouter = require('./routes/employees.route.js');
const DepartmentRouter = require('./routes/departments.router.js');
const DashboardRouter = require('./routes/dashboard.router.js');

const app = Express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT;

app.use(Express.json());

app.use('/employees', EmployeeRouter);
app.use('/departments', DepartmentRouter);
app.use('/dashboard', DashboardRouter);

try {
  SQInstance.authenticate();
  console.log('Connection has been established successfully.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
