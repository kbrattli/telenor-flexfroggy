import React, { useEffect, useState } from "react";

const romanNumerals = ["Charge!", "I", "II", "III"];

const Countdown: React.FC = () => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const containerStyle: React.CSSProperties = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  };

  const numeralStyle: React.CSSProperties = {
    fontFamily: "'Cinzel', serif",
    fontSize: "12rem",
    fontWeight: "700",
    color: "white",
    userSelect: "none",
  };

  return (
    <div style={containerStyle}>
      <div style={numeralStyle}>{romanNumerals[count]}</div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');
        `}
      </style>
    </div>
  );
};

export default Countdown;