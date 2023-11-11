// pages/api/fetchSlide.js

import { connectDB } from '../../../db';
import Slide from '../../../models/Slide';

connectDB();

export default async (req, res) => {
  try {
    const slideData = await Slide.find();
    res.status(200).json(slideData);
  } catch (err) {
    console.error('Error fetching slide data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
