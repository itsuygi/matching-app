import { useState, useEffect } from 'react';

import "./index.css"

export default function Carousel({ images }) {

  if (images == undefined) {
    console.log("images null")
    return null
  } 

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleKeyPress = (event) => {
    if (event.key == 'ArrowRight') {
      nextImage()
    } else if (event.key =='ArrowLeft') {
      prevImage()
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="carousel">
      
      <button className="prev" style={images.length > 1 ? {display: "block"} : {display: "none"}} onClick={prevImage}> <i class="fa-solid fa-arrow-left"></i> </button>
      <img 
        src={images[currentImageIndex]}
        width={300}
        height={450}
        unoptimized
      />
      <button className="next" style={images.length > 1 ? {display: "block"} : {display: "none"}} onClick={nextImage}> <i class="fa-solid fa-arrow-right"></i> </button>
    </div>
  );
};
