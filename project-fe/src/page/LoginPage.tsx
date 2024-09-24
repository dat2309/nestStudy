import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { isSuccess } from '../api/BaseResponse';
import { login } from '../api/UserApi';
import EmployeeTable from '../components/DataTable';
import DateInput from '../components/DateInput';
import DropdownSeleteOne from '../components/DropdownSeleteOne';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
interface Option {
    id: number;
    name: string;
}
interface Employee {
    id: number;
    name: string;
    avatar: string; // URL for the avatar image
}
const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await login(username, password);
            if (isSuccess(response)) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                window.location.href = '/user';
            }
            else {
                toast.error(response.message)
            }

        } catch (error) {
            console.error('Failed to fetch user details', error);
        }
    };

    const getTodayDate = (): string => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const [date, setDate] = useState<string>(getTodayDate());
    const handleDateChange = (newDate: string) => {
        setDate(newDate);
        console.log('Selected Date:', newDate);
    };
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const departments: Option[] = [
        { id: 1, name: 'HR' },
        { id: 2, name: 'Finance' },
        { id: 3, name: 'Development' },
        { id: 4, name: 'Marketing' },
    ];

    const handleDropdownChange = (selected: Option) => {
        setSelectedId(selected.id);
        console.log('Selected department ID:', selected);
    };
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);

    const employees: Employee[] = [
        { id: 1, name: 'Lê Hùng', avatar: 'path/to/avatar1.jpg' },
        { id: 2, name: 'Nguyễn Thanh Tùng', avatar: 'path/to/avatar2.jpg' },
        { id: 3, name: 'a', avatar: 'path/to/avatar3.jpg' },
        { id: 4, name: 'v', avatar: 'path/to/avatar4.jpg' },
        { id: 5, name: 'Nguyễn Thúy', avatar: 'path/to/avatar5.jpg' },
        { id: 6, name: 'Nguyễn Thúy', avatar: 'path/to/avatar5.jpg' },
        { id: 7, name: 'Nguyễn Thúy c', avatar: 'path/to/avatar5.jpg' },
        { id: 8, name: 'Nguyễn Thúy d', avatar: 'path/to/avatar5.jpg' },
    ];

    const handleDropdownMultiChange = (selecteds: Employee[]) => {
        const selectedIds = selecteds.map(employee => employee.id);
        setSelectedEmployeeIds(selectedIds);
        console.log('Selected employee IDs:', selectedIds);
    };
    const [position, setPosition] = useState({ top: '50%', left: '50%' });
    const getRandomPosition = () => {
        const x = Math.random() * 80; // Random X position (0 to 80%)
        const y = Math.random() * 80; // Random Y position (0 to 80%)
        setPosition({ top: `${y}%`, left: `${x}%` });
    };

    return (
        // <div className="flex justify-center items-center h-screen bg-gray-100">
        //     <div className="p-4">
        //         <DateInput value={date} onChange={handleDateChange} minDate="01/08/2023"
        //             maxDate={getTodayDate()}
        //         />
        //     </div>

        //     <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        //         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        //         <div className="mb-4">
        //             <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
        //                 Username
        //             </label>
        //             <input
        //                 type="text"
        //                 id="username"
        //                 value={username}
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 className="w-full p-2 border border-gray-300 rounded"
        //                 required
        //             />
        //         </div>

        //         <div className="mb-4">
        //             <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
        //                 Password
        //             </label>
        //             <div className="flex items-center border border-gray-300 rounded">
        //                 <input
        //                     type={showPassword ? 'text' : 'password'}
        //                     id="password"
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                     className="w-full p-2 rounded-l"
        //                     required
        //                 />
        //                 <button
        //                     type="button"
        //                     onClick={() => setShowPassword(!showPassword)}
        //                     className="px-3 text-gray-700"
        //                 >
        //                     {showPassword ? <FaEyeSlash /> : <FaEye />}
        //                 </button>
        //             </div>
        //         </div>

        //         <div>
        //             <DropdownSeleteOne options={departments} onChange={handleDropdownChange} />
        //             {selectedId !== null && <p>Selected ID: {selectedId}</p>}
        //         </div>

        //         <div className="mb-4">
        //             <h1 className="mb-4">Chọn nhiều</h1>
        //             <MultiSelectDropdown
        //                 options={employees}
        //                 onChange={handleDropdownMultiChange}
        //             />

        //         </div>
        //         <button
        //             type="submit"
        //             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        //         >
        //             Login
        //         </button>
        //     </form>
        // </div>
        <div className='h-screen relative'>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="p-4">
                    <DateInput value={date} onChange={handleDateChange} minDate="01/08/2023"
                        maxDate={getTodayDate()}
                    />
                </div>

                <EmployeeTable ></EmployeeTable>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center">J97</h2>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 rounded-l"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="px-3 text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <DropdownSeleteOne options={departments} onChange={handleDropdownChange} />
                        {selectedId !== null && <p>Selected ID: {selectedId}</p>}
                    </div>

                    <div className="mb-4">
                        <h1 className="mb-4">Chọn nhiều</h1>
                        <MultiSelectDropdown
                            options={employees}
                            onChange={handleDropdownMultiChange}
                        />

                    </div>


                </form>


            </div>
            <div>

                <button
                    type="submit"
                    onMouseEnter={getRandomPosition}
                    style={{
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        transform: 'translate(-50%, -50%)', // Center the button
                    }}
                    className="bg-blue-500 text-white py-2 px-4 rounded transition duration-200 hover:bg-blue-600"
                >
                    Đố bấm được

                </button>

            </div>
        </div>
    );


};

export default Login;


