require('./tenancy/register');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerConfig');
const { allowedOrigins } = require('./config/env');
const authenticate = require('./middlewares/authenticate');

const attendanceRoutes = require('./routes/attendance');
const userRoutes = require('./routes/users');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teachers');
const adminRoutes = require('./routes/admin');
const courseRoutes = require('./routes/course');
const classroomRoutes = require('./routes/classroom');
const campusSafetyRoutes = require('./routes/campussafety');
const enrollmentRoutes = require('./routes/enrollment');
const eventRoutes = require('./routes/event');
const financeRoutes = require('./routes/financial');
const gradebookRoutes = require('./routes/gradebook');
const humanresourceRoutes = require('./routes/humanresource');
const facultyRoutes = require('./routes/faculty');
const paymentRoutes = require('./routes/payment');
const libraryRoutes = require('./routes/library');
const bookRoutes = require('./routes/book');
const sportRoutes = require('./routes/sports');
const studentTrackingRoutes = require('./routes/studenttracking');
const subscriptionRoutes = require('./routes/subscription');
const contentRoutes = require('./routes/contents/contentRoutes');
const packagesRoutes = require('./routes/packages');
const iconsRoutes = require('./routes/icons');

const app = express();
const protectedRoutes = [
  ['/api/users', userRoutes],
  ['/api/attendances', attendanceRoutes],
  ['/api/students', studentRoutes],
  ['/api/teachers', teacherRoutes],
  ['/api/admins', adminRoutes],
  ['/api/courses', courseRoutes],
  ['/api/classrooms', classroomRoutes],
  ['/api/campusSafety', campusSafetyRoutes],
  ['/api/enrollments', enrollmentRoutes],
  ['/api/events', eventRoutes],
  ['/api/finances', financeRoutes],
  ['/api/gradebook', gradebookRoutes],
  ['/api/humanresources', humanresourceRoutes],
  ['/api/faculties', facultyRoutes],
  ['/api/payments', paymentRoutes],
  ['/api/libraries', libraryRoutes],
  ['/api/books', bookRoutes],
  ['/api/sports', sportRoutes],
  ['/api/studenttracking', studentTrackingRoutes],
  ['/api/subscriptions', subscriptionRoutes],
  ['/api/icons', iconsRoutes],
];

app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(express.json({ limit: '1mb' }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    const error = new Error('Origin is not allowed by CORS.');
    error.statusCode = 403;
    return callback(error);
  },
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => res.send('Backend is running'));

for (const [mountPath, router] of protectedRoutes) {
  app.use(mountPath, authenticate, router);
}

// Package and marketing content reads are public. Their routers protect every mutation.
app.use('/api/packages', packagesRoutes);
app.use('/api', contentRoutes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
  if (statusCode >= 500) console.error(error);
  return res.status(statusCode).json({
    message: statusCode >= 500 ? 'An unexpected server error occurred.' : error.message,
    code: error.code,
  });
});

module.exports = app;
