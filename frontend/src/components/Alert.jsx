import React from "react";

const Alert = ({ message, type }) => {
  if (!message) return null;

  return (
    <div
      className={`p-3 rounded-md text-white text-center ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Alert; // ✅ Ensure default export
