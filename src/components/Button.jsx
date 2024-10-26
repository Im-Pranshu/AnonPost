import React from "react";
import rightArrow from "../assets/right-arrow.png";

const Button = ({ content, clickStatus, customClasses }) => {
  return (
    <button type="submit" className={"allBtn " + customClasses}>
      {content}{" "}
      {clickStatus ? (
        <span className="loader"></span>
      ) : (
        <img src={rightArrow} alt="" />
      )}
    </button>
  );
};

export default Button;
