import React, { useState } from "react";
import Home from "./Home";
import JsonData from "./JsonData";

const Json = () => {
  const [showHome, setShowHome] = useState(false);
  const [showJson, setShowJson] = useState(false);

  const handleHome = () => {
    setShowHome(true);
  };
  const handleJson = () => {
    setShowJson(true);
  };

  return (
    <>
      {showHome && <Home />}
      {showJson && <JsonData />}
      {showHome || showJson === true ? (
        ""
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[24px] font-semibold mb-5">
            Data Insertion Method
          </h1>
          <div className="flex items-center justify-center gap-10 w-[90%] py-4 mt-5">
            <button
              onClick={handleHome}
              className="bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600"
              type="button"
            >
              Text Fields
            </button>
            <button
              onClick={handleJson}
              className="bg-purple-700 cursor-pointer text-white font-semibold py-2 px-5 rounded hover:bg-purple-600"
              type="button"
            >
              JSON Data
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Json;
