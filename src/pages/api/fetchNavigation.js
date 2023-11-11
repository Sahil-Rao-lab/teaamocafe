// pages/api/navigation.js

import { connectDB } from '../../../db'; // Import the connectDB function correctly
import Navigation from '../../../models/Navigation'; // Import the Navigation model correctly

// Connect to the database
connectDB();

export default async (req, res) => {
  try {
    const navigationData = await Navigation.find(); // Fetch all navigation data from MongoDB
    res.status(200).json(navigationData);
  } catch (err) {
    console.error('Error fetching navigation data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
