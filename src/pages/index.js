import React, { useState, useEffect } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Home() {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Slide 1',
      description: 'Description for Slide 1',
    },
    {
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Slide 2',
      description: 'Description for Slide 2',
    },
    {
      image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Slide 3',
      description: 'Description for Slide 3',
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="homeSlides">
        <div className="iconLeft" onClick={() => setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)}>
          <KeyboardArrowLeftIcon />
        </div>
        {slides.map((slide, index) => (
          <div className={`homeSlide ${index === currentSlideIndex ? 'active' : ''}`} key={index}>
            <img src={slide.image} alt={`homeSlide${index + 1}`} />
            <div className='homeSlideInfo'>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <a href="/">home</a>
            </div>
          </div>
        ))}
        <div className="iconRight" onClick={() => setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)}>
          <KeyboardArrowRightIcon />
        </div>
      </div>
    </>
  );
}
