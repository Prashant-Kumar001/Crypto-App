import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useToggle } from "../context/toggle/ToggleContext";

const ToggleSwitch = () => {
  const { isToggled, setIsToggled } = useToggle();

  const handleToggleSwitch = () => {
    setIsToggled(prevState => !prevState);
  };

  return (
    <div
      onClick={handleToggleSwitch}
      className={`relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${isToggled ? 'bg-green-500' : 'bg-gray-500'}`}
      role="switch"
      aria-checked={isToggled}
    >
      {/* Icon for Day Mode */}
      <div
        className={`absolute left-1  text-white  transition-opacity duration-300 ease-in-out ${isToggled ? 'opacity-110' : 'opacity-00'}`}
        // style={{ display: isToggled ? 'none' : 'block' }}
      >
         <FaMoon  className='moon ' size={20} />
      </div>
      
      {/* Icon for Night Mode */}
      <div
        className={`absolute right-1 sun  text-yellow-300 transition-opacity duration-300 ease-in-out ${isToggled ? 'opacity-0' : 'opacity-100'}`}
        // style={{ display: isToggled ? 'block' : 'none' }}
      >
        <FaSun size={20} />
      </div>
      
      <div
        className={`absolute bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${isToggled ? 'translate-x-full' : 'translate-x-0'}`}
        // style={{ transform: isToggled ? 'translateX(100%)' : 'translateX(0)' }}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
