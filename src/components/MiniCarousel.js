import { useState } from "react";

function MiniCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  return (
    <div>
      <button onClick={handlePrevClick}>Prev</button>
      <img
        src={images[currentIndex]}
        alt="Carousel"
        style={{ maxWidth: "600", maxHeight: "600px" }}
      />
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
}

export default MiniCarousel;
