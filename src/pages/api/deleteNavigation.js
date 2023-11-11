// pages/api/deleteNavigation.js

import { connectDB } from '../../../db'; // Import the connectDB function correctly
import Navigation from '../../../models/Navigation'; // Import the Navigation model correctly

// Connect to the database
connectDB();

export default async (req, res) => {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query; // Get the navigation item's ID from the request query parameters

      // Find the navigation item by ID and remove it
      const deletedNavigationItem = await Navigation.findByIdAndDelete(id);

      if (!deletedNavigationItem) {
        return res.status(404).json({ error: 'Navigation data not found' });
      }

      res.status(200).json({ message: 'Navigation data deleted successfully' });
    } catch (err) {
      console.error('Error deleting navigation data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
