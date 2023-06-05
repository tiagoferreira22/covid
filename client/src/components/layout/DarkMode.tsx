import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";

const sunSvg = "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z";
const moonSvg = "M 55 27.5 C 55 42.6878 42.6878 55 25 55 C 31 51 37.389 37.993 37.478 27.485 C 37.415 17.017 31 3 25 0 C 42.6878 0 55 12.3122 55 27.5 Z";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const { animation } = useSpring({
    config: { duration: 250 },
    animation: darkMode ? 1 : 0,
  });
  const animatedSvg = animation.to({
    range: [0, 1],
    output: [sunSvg, moonSvg]
  });

  useEffect(() => {
    // Adiciona ou remove a classe 'dark-mode' ao elemento <body>
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div
      className="darkModeToggle__container"
    >
      <svg
        onClick={() => setDarkMode(!darkMode)}
        id="darkModeToggle"
        className="darkModeToggle__svgWrap"
        style={{
          filter: `drop-shadow(4px 4px 8px ${
            darkMode ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)"
          })`
        }}
        width="40"
        height="40"
        viewBox="0 0 55 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.path
          d={animatedSvg}
          transform="rotate(25, 27.5, 27.5)"
          fill={darkMode ? "#ddd" : "orange"}
          fillOpacity="1"
        />
      </svg>
    </div>
  );
};

export default DarkModeToggle;
