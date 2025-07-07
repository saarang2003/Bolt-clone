require('dotenv').config();
import express from 'express';
import cors from 'cors';
import templateRoutes from './routes/template';
import chatRoute from './routes/chat';
import { config } from './config';




const app = express();

// Correct CORS setup
app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});


app.use(express.json());

// Routes
app.use('/template', templateRoutes);
app.use('/chat', chatRoute);

// Start server
app.listen(config.port, () => {
  console.log(`Gemini server running on http://localhost:${config.port}`);
});
