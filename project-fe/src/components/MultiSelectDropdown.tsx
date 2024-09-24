import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as ArrowDown } from '../arrow-down.svg';

interface Employee {
    id: number;
    name: string;
    avatar: string; // URL for the avatar image
}

interface MultiSelectDropdownProps {
    options: Employee[];
    placeholder?: string;
    onChange: (selecteds: Employee[]) => void;
    disabled?: boolean;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
    options,
    placeholder = 'Chọn nhân viên',
    onChange,
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<Employee[]>([]);
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

    const toggleSelectOption = (option: Employee) => {
        setSelectedOptions(prevSelected => {
            const isSelected = prevSelected.some(selected => selected.id === option.id);
            const updatedOptions = isSelected
                ? prevSelected.filter(selected => selected.id !== option.id) // Remove if selected
                : [...prevSelected, option]; // Add if not selected
            console.log(updatedOptions)
            onChange(updatedOptions);
            return updatedOptions;
        });
    };

    return (
        <div className="relative">
            {/* Dropdown button */}
            <button
                type="button"
                className={`w-full p-2 border rounded-md shadow-sm text-left focus:outline-none fNaocus:ring-2 relative ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'focus:ring-blue-500'
                    }`}
                onClick={() => !disabled && setIsOpen(!isOpen)} // Only toggle if not disabled
                disabled={disabled} // Disable button if disabled is true
                ref={buttonRef}
            >
                {placeholder}
                {/* Dropdown arrow */}
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {isOpen ? <ArrowDown className='rotate-180' /> : <ArrowDown />}
                </span>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <ul ref={dropdownRef} className="absolute w-full mt-1 border rounded-md bg-white shadow-lg z-10 max-h-60 overflow-auto p-2">
                    {options.map((option) => (
                        <li
                            key={option.id}
                            className={`flex items-center my-1 p-2 cursor-pointer rounded-md ${selectedOptions.some((selected) => selected.id === option.id)
                                ? 'bg-blue-200' // Change background if selected
                                : 'hover:bg-white bg-white' // Default background if not selected
                                }`}
                            onClick={() => toggleSelectOption(option)}
                        >
                            {/* Avatar */}
                            <img
                                src={option.avatar}
                                alt={option.name}
                                className="w-6 h-6 rounded-full mr-2"
                            />
                            {/* Name */}
                            <span>{option.name}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Selected items display */}
            {selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedOptions.map((option) => (
                        <div
                            key={option.id}
                            className="flex items-center bg-blue-100 rounded-full px-3 py-1 text-sm"
                        >
                            {/* Avatar */}
                            <img
                                src={option.avatar}
                                alt={option.name}
                                className="w-5 h-5 rounded-full mr-2"
                            />
                            {/* Name */}
                            <span className="mr-2">{option.name}</span>
                            {/* Remove button */}
                            <button
                                type="button"
                                onClick={() => toggleSelectOption(option)}
                                className="position-absolute right-0 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
