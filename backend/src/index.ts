import express from 'express';
import cors from 'cors';
import templateRoutes from './routes/template';
import chatRoute from './routes/chat';
import { config } from './config';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Correct CORS setup
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/template', templateRoutes);
app.use('/chat', chatRoute);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
