const { port } = require('./src/config/env');
const connectDB = require('./src/config/db');
const app = require('./src/app');

// Start accepting requests only after the database is ready. This prevents
// Mongoose from buffering every query until its 30-second timeout expires.
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch {
        process.exit(1);
    }
};

startServer();
