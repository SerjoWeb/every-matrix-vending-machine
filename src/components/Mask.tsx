import React from "react";

const Mask = (): React.ReactElement => {
  return (
    <div
      className="absolute top-0 left-0 h-full w-full bg-white/10 backdrop-blur-sm z-10"
    />
  );
};

export default Mask;
