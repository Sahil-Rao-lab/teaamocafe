// pages/api/addNavigation.js

import { connectDB } from '../../../db';
import Navigation from '../../../models/Navigation';

connectDB();

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { linkName, linkURL, openLinkInNewTab, linkType, linkPosition, subLinkOf } = req.body;

      // Use the `create` method to save data to the database
      const navigationData = await Navigation.create({
        linkName,
        linkURL,
        openLinkInNewTab,
        linkType,
        linkPosition,
        subLinkOf,
      });

      res.status(201).json({ message: 'Navigation data added successfully', data: navigationData });
    } catch (err) {
      console.error('Error adding navigation data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
