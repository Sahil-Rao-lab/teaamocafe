// pages/api/updateNavigation.js

import { connectDB } from '../../../db'; // Import the connectDB function correctly
import Navigation from '../../../models/Navigation'; // Import the Navigation model correctly

// Connect to the database
connectDB();

export default async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { id } = req.query; // Get the navigation item's ID from the request query parameters
      const { linkName, linkURL, openLinkInNewTab, linkType, linkPosition, subLinkOf } = req.body;

      // Find the navigation item by ID
      const navigationItem = await Navigation.findById(id);

      if (!navigationItem) {
        return res.status(404).json({ error: 'Navigation data not found' });
      }

      // Update the navigation item's properties
      navigationItem.linkName = linkName;
      navigationItem.linkURL = linkURL;
      navigationItem.openLinkInNewTab = openLinkInNewTab;
      navigationItem.linkType = linkType;
      navigationItem.linkPosition = linkPosition;
      navigationItem.subLinkOf = subLinkOf;

      // Save the updated navigation item
      await navigationItem.save();

      res.status(200).json({ message: 'Navigation data updated successfully' });
    } catch (err) {
      console.error('Error updating navigation data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
