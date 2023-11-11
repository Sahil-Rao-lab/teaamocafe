// pages/api/addSlide.js

import { connectDB } from '../../../db';
import multer from 'multer';
import Slide from '../../../models/Slide';

connectDB();

// Configure multer
const upload = multer({
  storage: multer.memoryStorage(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      upload.single('slideImage')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          console.error('Multer Error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        } else if (err) {
          console.error('Unknown Error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        const { slideTitle, slideDescription, slideLinkName, slideLinkURL } = req.body;
        const slideImage = req.file.buffer;

        try {
          const slideData = await Slide.create({
            slideTitle,
            slideDescription,
            slideLinkName,
            slideLinkURL,
            slideImage,
          });

          return res.status(201).json({ message: 'Slide added successfully', data: slideData });
        } catch (error) {
          console.error('Error adding slide to the database:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      });
    } catch (err) {
      console.error('Error handling file upload:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
