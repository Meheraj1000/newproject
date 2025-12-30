import React from "react";

const Banner = () => {
  const slides = [
    "https://s.agricare.club/uploads/image/2511/9b6ea9adb9de96.jpg",
    "https://s.agricare.club/uploads/image/2511/18a94b6301beea.jpg",
    "https://s.agricare.club/uploads/image/2511/37758fbfe245ba.jpg",
    "https://s.agricare.club/uploads/image/2511/05409260b646f3.png",
    "https://s.agricare.club/uploads/image/2510/df3fccbc7d9b20.jpg",
    "https://s.agricare.club/uploads/image/2511/9b6ea9adb9de96.jpg"
  ];

  return (
    <section className="w-full p-4 bg-white shadow-md ">
      <div className="carousel w-full rounded-md shadow-none">
        {slides.map((src, index) => {
          const slideId = `slide${index + 1}`;
          return (
            <div key={index} id={slideId} className="carousel-item relative w-full">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className=" w-full h-full object-contain"
              />

              {/* Dot Indicators */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, dotIndex) => (
                  <a
                    key={dotIndex}
                    href={`#slide${dotIndex + 1}`}
                    className={`w-3 h-3 rounded-full ${
                      dotIndex === index ? "bg-white" : "bg-white/50"
                    }`}
                  ></a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Banner;
