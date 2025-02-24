import { useState, useEffect } from "react";
import WarningModal from "./WarningModal";
import "./style.css";

const categories = [
  "Edu",
  "Entertain",
  "Music",
  "Food challenges",
  "Gaming",
  "Sports",
  "News",
  "Travel",
  "Tech",
  "Style",
  "Comedy",
  "Film",
  "Blogs",
  "Activism",
  "Autos",
  "Pets",
];

const ArrowButton = ({ direction, onClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <button
      className={`arrow absolute top-1/2 transform -translate-y-1/2 ${
        direction === "prev" ? "left-2" : "right-2"
      } bg-black text-white p-2 rounded-full`}
      onClick={onClick}
    >
      {direction === "prev" ? "❮" : "❯"}
    </button>
  );
};

const HeaderSlide = () => {
  const [wModal, setWModal] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showArrows, setShowArrows] = useState({ prev: false, next: true });

  const handleSlide = (direction) => {
    const slides = document.querySelector(".slides");
    const buttons = document.querySelectorAll(".slides button");
    const slideWidth = buttons[0].offsetWidth + 20; // Adjust for button margin

    let newIndex = slideIndex + direction;

    // Ensure the index stays within bounds
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= buttons.length - 1) newIndex = buttons.length - 1;

    setSlideIndex(newIndex);
    slides.style.transform = `translateX(-${newIndex * slideWidth}px)`;

    // Update arrow visibility
    setShowArrows({
      prev: newIndex > 0,
      next: newIndex < buttons.length - 1,
    });
  };

  // Handle mouse wheel scrolling
  useEffect(() => {
    const sliderContainer = document.querySelector(".slider-container");

    const handleWheel = (event) => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY); // Get scroll direction (1 for down, -1 for up)
      handleSlide(delta); // Move slider based on scroll direction
    };

    sliderContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      sliderContainer.removeEventListener("wheel", handleWheel);
    };
  }, [slideIndex]); // Re-run effect when slideIndex changes

  return (
    <div className="slider-container relative overflow-hidden mr-0 ml-auto">
      <div className="slides flex gap-2">
        <button className="bg-black px-4 py-1.5 rounded-lg text-sm font-semibold text-white whitespace-nowrap">
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setWModal(true)}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Arrow Buttons */}
      <ArrowButton
        direction="prev"
        onClick={() => handleSlide(-1)}
        isVisible={showArrows.prev}
      />
      <ArrowButton
        direction="next"
        onClick={() => handleSlide(1)}
        isVisible={showArrows.next}
      />

      {/* Warning Modal */}
      <WarningModal wModal={wModal} setWModal={setWModal} />
    </div>
  );
};

export default HeaderSlide;
