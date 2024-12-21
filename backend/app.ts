import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Importing routes (Uncomment when routes are available)
// import expenseRoutes from './routes/expenseRoutes';
// import incomeRoutes from './routes/incomeRoutes';
// import budgetRoutes from './routes/budgetRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Routes (Uncomment when routes are available)
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/incomes', incomeRoutes);
// app.use('/api/budget', budgetRoutes);

// Default route (to check if server is running)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Personal Finance API');
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || ''; // MongoDB URI from environment
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Stop the application if MongoDB connection fails
  }
};

// Start server
const startServer = async () => {
  await connectDB(); // Connect to the database

  const port = process.env.PORT || 5000; // Default port 5000 or from environment variable
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();

export default app; // Export app for testing purposes if needed
