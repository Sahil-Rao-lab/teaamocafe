// pages/api/updateSlide.js

import { connectDB } from '../../../db';
import Slide from '../../../models/Slide';

connectDB();

export default async (req, res) => {
  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { slideTitle, slideDescription, slideLinkName, slideLinkURL, slideImage } = req.body;

      // Find the slide by ID
      const slide = await Slide.findById(id);

      if (!slide) {
        return res.status(404).json({ error: 'Slide not found' });
      }

      // Update the slide's properties
      slide.slideTitle = slideTitle;
      slide.slideDescription = slideDescription;
      slide.slideLinkName = slideLinkName;
      slide.slideLinkURL = slideLinkURL;
      slide.slideImage = slideImage;

      // Save the updated slide
      await slide.save();

      res.status(200).json({ message: 'Slide updated successfully' });
    } catch (err) {
      console.error('Error updating slide:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
