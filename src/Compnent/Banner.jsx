import React from "react";

const Banner = () => {
  const slides = [
    "https://i.ibb.co.com/wn1G4WN/farm-workers-day.jpg",
    "https://i.ibb.co.com/MyTyFZNP/360-F-745552793-haz9-CFRMu5m-K5m-Y0-Xi-LV9-Na0fxewu-FHR.jpg",
    "https://i.ibb.co.com/prWM75X8/potato-plantations-grow-field-vegetable-rows-farming-agriculture-landscape-1-1200x795.jpg",
    "https://i.ibb.co.com/gMk2K8zP/students-engage-various-activities-to-honor-national-agriculture-day-showcasing-beauty-farming-natur.webp",
    "https://i.ibb.co.com/qFkgTB1B/1747063226-9.jpg",
    "https://i.ibb.co.com/3yDdSHZH/bangladesh-november-25-2014-farmer-600nw-1474586672.webp"
  ];

  return (
    <section className="w-full p-4 bg-white shadow-md">
      <div className="carousel w-full rounded-md overflow-hidden">
        {slides.map((src, index) => {
          const slideId = `slide${index + 1}`;
          return (
            <div
              key={index}
              id={slideId}
              className="carousel-item relative w-full h-[400px]"
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
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
