import React, { useState } from "react";
import styles from "./Bell.css";

const NotificationBell = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(true);
  };

  return (
    <div className='box' onClick={handleCheck}>
      <img 
        src="assets/bell.svg"
        alt="Bell Icon" 
        className={!isChecked ? 'bel' : ""}
      />
      <img 
        src="assets/indicator.svg"
        alt="Indicator" 
        className='count'
        style={{ display: isChecked ? "none" : "block" }} 
      />
    </div>
  );
};

export default NotificationBell;
