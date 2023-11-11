// pages/api/deleteSlide.js

import { connectDB } from '../../../db';
import Slide from '../../../models/Slide';

connectDB();

export default async (req, res) => {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      // Find the slide by ID and remove it
      const deletedSlide = await Slide.findByIdAndDelete(id);

      if (!deletedSlide) {
        return res.status(404).json({ error: 'Slide not found' });
      }

      res.status(200).json({ message: 'Slide deleted successfully' });
    } catch (err) {
      console.error('Error deleting slide:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
