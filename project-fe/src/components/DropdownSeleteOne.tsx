import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as ArrowDowm } from '../arrow-down.svg';
interface Option {
  id: number;
  name: string;
}

interface DropdownProps {
  options: Option[];
  placeholder?: string;
  onChange: (selected: Option) => void;
  disabled?: boolean;
}

const DropdownSeleteOne: React.FC<DropdownProps> = ({ options,
  placeholder = 'Chọn bộ phận',
  onChange,
  disabled = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Function to handle clicks outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`w-full p-2 border rounded-md shadow-sm text-left focus:outline-none focus:ring-2 ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'focus:ring-blue-500'
          }`}
        onClick={() => !disabled && setIsOpen(!isOpen)} // Only toggle if not disabled
        disabled={disabled} // Disable button if disabled is true
        ref={buttonRef}
      >
        {selectedOption ? selectedOption.name : placeholder}
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
          {isOpen ? <ArrowDowm className='rotate-180' /> : <ArrowDowm />}
        </span>
      </button>
      {isOpen && (
        <ul ref={dropdownRef} className="absolute w-full mt-1 border rounded-md bg-white shadow-lg z-10 max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.id}
              className={`p-2 cursor-pointer hover:bg-blue-100 ${selectedOption?.id === option.id ? 'bg-blue-200' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSeleteOne;
