import React, { useEffect, useState } from 'react';

interface DateInputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    minDate?: string;  // Minimum selectable date
    maxDate?: string;// Maximum selectable date
    onChange?: (date: string) => void;
}
const convertToInputDate = (dateString: string): string => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
};

// Helper function to convert a date from yyyy-MM-dd to dd/MM/yyyy
const convertToDisplayDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};
const DateInput: React.FC<DateInputProps> = ({
    label = "Ngày sinh",
    placeholder = "dd/mm/yyyy",
    value,
    minDate,
    maxDate,
    onChange }) => {
    const [internalValue, setInternalValue] = useState<string>(value ? convertToInputDate(value) : '');

    useEffect(() => {
        if (value) {
            setInternalValue(convertToInputDate(value));
        }
    }, [value]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputDate = e.target.value;
        setInternalValue(inputDate);

        // Convert input value back to dd/MM/yyyy format before passing to onChange
        if (onChange) {
            onChange(convertToDisplayDate(inputDate));
        }
    };

    return (
        <div className="flex flex-col">
            {label && <label className="mb-2 text-gray-700">{label}</label>}
            <input
                onClick={(e) => e.currentTarget.showPicker()}
                type="date"
                className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
                value={internalValue}
                min={minDate ? convertToInputDate(minDate) : undefined}
                max={maxDate ? convertToInputDate(maxDate) : undefined}
                onChange={handleDateChange}
            />
        </div>
    );
};

export default DateInput;
