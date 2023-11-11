// db.js
import { connect } from 'mongoose';
require('dotenv').config();

const mongoURI = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

export { connectDB }; // Export the function directly
