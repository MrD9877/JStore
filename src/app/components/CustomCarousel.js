"use client"
import React, { useState, useEffect } from "react";

import "../css/slider.css";

function CustomCarousel({ children, height, width }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)


  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };


  function checkDirection(e) {
    if (touchEndX < touchStartX) {
      e.preventDefault();
      slideNext();
    }
    if (touchEndX > touchStartX) {
      e.preventDefault();
      slidePrev();
    }
  }

  const handleTouchStart = e => {
    setTouchStartX(e.changedTouches[0].screenX)
  }
  const handleTouchEnd = e => {
    setTouchEndX(e.changedTouches[0].screenX)
    checkDirection(e)
  }

  return (
    <div
      className="container__slider"
      onMouseEnter={AutoPlayStop}
      style={{ height: height, width: width, marginTop: 0 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children.map((item, index) => {
        if (index > 7) return
        return (
          <div
            className={"slider__item slider__item-active-" + (activeIndex + 1)}
            key={index}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default CustomCarousel;
