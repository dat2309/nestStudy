import React from 'react';
import {
    Column,
    HeaderGroup,
    Row,
    TableInstance,
    TableState,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable
} from 'react-table';

// Define data type
type EmployeeData = {
    stt: number;
    maNV: string;
    tenNV: string;
    boPhan: string;
    trangThai: string;
};

// Sample data
const data: EmployeeData[] = [
    { stt: 1, maNV: '#ADB1', tenNV: 'Wade Warren', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 2, maNV: '#ADB2', tenNV: 'Eleanor Pena', boPhan: 'Kỹ thuật', trangThai: 'Nghỉ phép' },
    { stt: 3, maNV: '#ADB3', tenNV: 'Ralph Edwards', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 4, maNV: '#ADB4', tenNV: 'Theresa Webb', boPhan: 'Hành chính', trangThai: 'Tạm nghỉ' },
    { stt: 5, maNV: '#ADB5', tenNV: 'Kurtis Green', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 6, maNV: '#ADB6', tenNV: 'Amy Moore', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 7, maNV: '#ADB7', tenNV: 'Jesse Kelly', boPhan: 'Nhân sự', trangThai: 'Nghỉ phép' },
    { stt: 8, maNV: '#ADB8', tenNV: 'Jacqueline Robinson', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 9, maNV: '#ADB9', tenNV: 'Jerome Wong', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 10, maNV: '#ADBA', tenNV: 'Diane Cooper', boPhan: 'Kỹ thuật', trangThai: 'Tạm nghỉ' },
    { stt: 11, maNV: '#ADBB', tenNV: 'Angelica Ward', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 12, maNV: '#ADBC', tenNV: 'David Carter', boPhan: 'Hành chính', trangThai: 'Nghỉ phép' },
    { stt: 13, maNV: '#ADBD', tenNV: 'Jessica Martinez', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 14, maNV: '#ADBE', tenNV: 'Christopher Murphy', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 15, maNV: '#ADBF', tenNV: 'Jennifer King', boPhan: 'Nhân sự', trangThai: 'Tạm nghỉ' },
    { stt: 16, maNV: '#ADBG', tenNV: 'Gordon Garcia', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 17, maNV: '#ADBH', tenNV: 'Martha Evans', boPhan: 'Kinh doanh', trangThai: 'Nghỉ phép' },
    { stt: 18, maNV: '#ADBI', tenNV: 'Larry Thomas', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 19, maNV: '#ADBJ', tenNV: 'Linda Perez', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 20, maNV: '#ADBK', tenNV: 'Bruce Johnson', boPhan: 'Hành chính', trangThai: 'Tạm nghỉ' },
    { stt: 21, maNV: '#ADBL', tenNV: 'Hannah Nelson', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 22, maNV: '#ADBM', tenNV: 'Samuel White', boPhan: 'Kỹ thuật', trangThai: 'Nghỉ phép' },
    { stt: 23, maNV: '#ADBN', tenNV: 'Lori Harris', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 24, maNV: '#ADBO', tenNV: 'Frank Brooks', boPhan: 'Hành chính', trangThai: 'Tạm nghỉ' },
    { stt: 25, maNV: '#ADBP', tenNV: 'Nancy Clark', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 26, maNV: '#ADBQ', tenNV: 'Timothy Lee', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 27, maNV: '#ADBR', tenNV: 'Cynthia Young', boPhan: 'Nhân sự', trangThai: 'Nghỉ phép' },
    { stt: 28, maNV: '#ADBS', tenNV: 'John Scott', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 29, maNV: '#ADBT', tenNV: 'Karen Adams', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 30, maNV: '#ADBU', tenNV: 'Matthew King', boPhan: 'Kỹ thuật', trangThai: 'Tạm nghỉ' },
    { stt: 31, maNV: '#ADBV', tenNV: 'Rachel Turner', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 32, maNV: '#ADBW', tenNV: 'Gary Hall', boPhan: 'Hành chính', trangThai: 'Nghỉ phép' },
    { stt: 33, maNV: '#ADBX', tenNV: 'Deborah Allen', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 34, maNV: '#ADBY', tenNV: 'Jose Wright', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 35, maNV: '#ADBZ', tenNV: 'Sylvia Baker', boPhan: 'Nhân sự', trangThai: 'Tạm nghỉ' },
    { stt: 36, maNV: '#ADC0', tenNV: 'Eugene Robinson', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 37, maNV: '#ADC1', tenNV: 'Alice Lee', boPhan: 'Kinh doanh', trangThai: 'Nghỉ phép' },
    { stt: 38, maNV: '#ADC2', tenNV: 'Stanley Harris', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 39, maNV: '#ADC3', tenNV: 'Megan Mitchell', boPhan: 'Nhân sự', trangThai: 'Nghỉ phép' },
    { stt: 40, maNV: '#ADC4', tenNV: 'Walter Thomas', boPhan: 'Hành chính', trangThai: 'Tạm nghỉ' },
    { stt: 41, maNV: '#ADC5', tenNV: 'Theresa Gonzalez', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 42, maNV: '#ADC6', tenNV: 'Victor Walker', boPhan: 'Kỹ thuật', trangThai: 'Nghỉ phép' },
    { stt: 43, maNV: '#ADC7', tenNV: 'Julia Campbell', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 44, maNV: '#ADC8', tenNV: 'Harold Evans', boPhan: 'Hành chính', trangThai: 'Tạm nghỉ' },
    { stt: 45, maNV: '#ADC9', tenNV: 'Denise Carter', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 46, maNV: '#ADCA', tenNV: 'Peter Collins', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 47, maNV: '#ADCB', tenNV: 'Karen Ramirez', boPhan: 'Nhân sự', trangThai: 'Nghỉ phép' },
    { stt: 48, maNV: '#ADCC', tenNV: 'Franklin Harris Franklin Harris Franklin Harris Franklin Harris', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 49, maNV: '#ADCD', tenNV: 'Marlene Price', boPhan: 'Kinh doanh', trangThai: 'Tạm nghỉ' },
    { stt: 50, maNV: '#ADCE', tenNV: 'Christopher White', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 51, maNV: '#ADCF', tenNV: 'Eleanor Rogers', boPhan: 'Nhân sự', trangThai: 'Nghỉ phép' },
    { stt: 52, maNV: '#ADC0', tenNV: 'Barbara Hall', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 53, maNV: '#ADC1', tenNV: 'Edward Johnson', boPhan: 'Kinh doanh', trangThai: 'Nghỉ phép' },
    { stt: 54, maNV: '#ADC2', tenNV: 'Nancy Adams', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 55, maNV: '#ADC3', tenNV: 'Gary Wright', boPhan: 'Nhân sự', trangThai: 'Tạm nghỉ' },
    { stt: 56, maNV: '#ADC4', tenNV: 'Lisa Martinez', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 57, maNV: '#ADC5', tenNV: 'Timothy Garcia', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 58, maNV: '#ADC6', tenNV: 'Jessica Hernandez', boPhan: 'Kỹ thuật', trangThai: 'Tạm nghỉ' },
    { stt: 59, maNV: '#ADC7', tenNV: 'Mark Robinson', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 60, maNV: '#ADC8', tenNV: 'Sandra Clark', boPhan: 'Hành chính', trangThai: 'Nghỉ phép' },
    { stt: 61, maNV: '#ADC9', tenNV: 'Jack Lewis', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 62, maNV: '#ADCA', tenNV: 'Karen Walker', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 63, maNV: '#ADCB', tenNV: 'Benjamin Scott', boPhan: 'Nhân sự', trangThai: 'Tạm nghỉ' },
    { stt: 64, maNV: '#ADCC', tenNV: 'Elizabeth Harris', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 65, maNV: '#ADCD', tenNV: 'Nancy Campbell', boPhan: 'Kinh doanh', trangThai: 'Nghỉ phép' },
    { stt: 66, maNV: '#ADCE', tenNV: 'Walter White', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 67, maNV: '#ADCF', tenNV: 'Emma Johnson', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 68, maNV: '#ADC0', tenNV: 'James Martin', boPhan: 'Hành chính', trangThai: 'Tạm nghỉ' },
    { stt: 69, maNV: '#ADC1', tenNV: 'Grace Davis', boPhan: 'Kinh doanh', trangThai: 'Nghỉ phép' },
    { stt: 70, maNV: '#ADC2', tenNV: 'Matthew Lewis', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 71, maNV: '#ADC3', tenNV: 'Sophia Young', boPhan: 'Nhân sự', trangThai: 'Tạm nghỉ' },
    { stt: 72, maNV: '#ADC4', tenNV: 'Michael Thompson', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 73, maNV: '#ADC5', tenNV: 'Olivia Hall', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 74, maNV: '#ADC6', tenNV: 'Daniel Harris', boPhan: 'Kỹ thuật', trangThai: 'Nghỉ phép' },
    { stt: 75, maNV: '#ADC7', tenNV: 'Hannah Martinez', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 76, maNV: '#ADC8', tenNV: 'Paul Scott', boPhan: 'Hành chính', trangThai: 'Tạm nghỉ' },
    { stt: 77, maNV: '#ADC9', tenNV: 'Elizabeth Clark', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 78, maNV: '#ADCA', tenNV: 'John Lee', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 79, maNV: '#ADCB', tenNV: 'Emily Wright', boPhan: 'Nhân sự', trangThai: 'Nghỉ phép' },
    { stt: 80, maNV: '#ADCC', tenNV: 'David Martin', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 81, maNV: '#ADCD', tenNV: 'Jessica Johnson', boPhan: 'Kinh doanh', trangThai: 'Tạm nghỉ' },
    { stt: 82, maNV: '#ADCE', tenNV: 'Brian Smith', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 83, maNV: '#ADCF', tenNV: 'Alyssa Brown', boPhan: 'Nhân sự', trangThai: 'Nghỉ phép' },
    { stt: 84, maNV: '#ADC0', tenNV: 'James Wilson', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 85, maNV: '#ADC1', tenNV: 'Emma Brown', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 86, maNV: '#ADC2', tenNV: 'Charles Thompson', boPhan: 'Kỹ thuật', trangThai: 'Tạm nghỉ' },
    { stt: 87, maNV: '#ADC3', tenNV: 'Ella Robinson', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 88, maNV: '#ADC4', tenNV: 'Kevin Harris', boPhan: 'Hành chính', trangThai: 'Nghỉ phép' },
    { stt: 89, maNV: '#ADC5', tenNV: 'Isabella Martinez', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 90, maNV: '#ADC6', tenNV: 'Joseph Lee', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 91, maNV: '#ADC7', tenNV: 'Samantha Wilson', boPhan: 'Nhân sự', trangThai: 'Tạm nghỉ' },
    { stt: 92, maNV: '#ADC8', tenNV: 'Anthony White', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 93, maNV: '#ADC9', tenNV: 'Mia Taylor', boPhan: 'Kinh doanh', trangThai: 'Nghỉ phép' },
    { stt: 94, maNV: '#ADCA', tenNV: 'Lucas Anderson', boPhan: 'Kỹ thuật', trangThai: 'Đang hoạt động' },
    { stt: 95, maNV: '#ADCB', tenNV: 'Zoe Thomas', boPhan: 'Nhân sự', trangThai: 'Tạm nghỉ' },
    { stt: 96, maNV: '#ADCC', tenNV: 'Jacob Robinson', boPhan: 'Hành chính', trangThai: 'Đang hoạt động' },
    { stt: 97, maNV: '#ADCD', tenNV: 'Sophia Clark', boPhan: 'Kinh doanh', trangThai: 'Đang hoạt động' },
    { stt: 98, maNV: '#ADCE', tenNV: 'Matthew Lewis', boPhan: 'Kỹ thuật', trangThai: 'Nghỉ phép' },
    { stt: 99, maNV: '#ADCF', tenNV: 'Grace Young', boPhan: 'Nhân sự', trangThai: 'Đang hoạt động' },
    { stt: 100, maNV: '#ADC0', tenNV: 'Liam Allen', boPhan: 'Hành chính', trangThai: 'Tạm nghỉ' },
];

const handleMapClick = (row: EmployeeData) => {
    console.log('Map clicked for:', row);
    // Add your map logic here
};

const handleViewClick = (row: EmployeeData) => {
    console.log('View clicked for:', row);
    // Add your view logic here
};

const handleEditClick = (row: EmployeeData) => {
    console.log('Edit clicked for:', row);
    // Add your edit logic here
};

const handleDeleteClick = (row: EmployeeData) => {
    console.log('Delete clicked for:', row);
    // Add your delete logic here
};
// Define columns
// Define columns
const columns: Column<EmployeeData>[] = [
    {
        Header: 'STT',
        accessor: 'stt',
    },
    {
        Header: 'Mã NV',
        accessor: 'maNV',
    },
    {
        Header: 'Tên NV',
        accessor: 'tenNV',
        Cell: ({ value }) => (
            <div className="flex items-center break-all">
                <img
                    src="https://via.placeholder.com/40"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                />
                {value}
            </div>
        ),
    },
    {
        Header: 'Bộ phận',
        accessor: 'boPhan',
    },
    {
        Header: 'Trạng thái',
        accessor: 'trangThai',
        Cell: ({ value }) => (
            <span
                className={`px-2 py-1 rounded-full text-sm ${value === 'Đang hoạt động'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                    }`}
            >
                <span
                    className={`inline-block w-2 h-2 mr-1 rounded-full ${value === 'Đang hoạt động' ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                ></span>
                {value}
            </span>
        ),
    },
    {
        Header: 'Action',
        id: 'actions', // Unique ID for the Action column
        Cell: ({ row }: { row: Row<EmployeeData> }) => (
            <div className="flex space-x-2">
                <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => handleMapClick(row.original)}
                >
                    Map
                </button>
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleViewClick(row.original)}
                >
                    Detail
                </button>
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleEditClick(row.original)}
                >
                    edit
                </button>
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClick(row.original)}
                >
                    delete
                </button>
            </div>
        ),
    },
];

// Extend the TableState to include pagination state
type TableStateWithPagination = TableState<EmployeeData> & {
    pageIndex: number;
    pageSize: number;
};

const EmployeeTable: React.FC = () => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable<EmployeeData>(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 } as Partial<TableStateWithPagination>,
        },
        useSortBy,
        usePagination,
        useRowSelect
    ) as TableInstance<EmployeeData> & {
        page: Row<EmployeeData>[];
        canNextPage: boolean;
        canPreviousPage: boolean;
        pageOptions: number[];
        nextPage: () => void;
        previousPage: () => void;
        setPageSize: (size: number) => void;
        state: TableStateWithPagination;
    };


    return (
        <div className="p-4 h-full w-[50%] flex flex-col">
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="bg-gray-50 sticky top-0 z-10">
                    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                        <thead>
                            {headerGroups.map((headerGroup: HeaderGroup<EmployeeData>) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps((column as any).getSortByToggleProps())}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {column.render('Header')}
                                            <span>
                                                {(column as any).isSorted
                                                    ? (column as any).isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                    </table>
                </div>
                <div className="flex-1 overflow-auto">
                    <table {...getTableProps()} className="min-w-full divide-y bg-white divide-gray-200">
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-6 py-4 whitespace-nowrap"
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <div>
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="px-3 py-1 rounded bg-gray-200 mr-2"
                    >
                        {'<'}
                    </button>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="px-3 py-1 rounded bg-gray-200"
                    >
                        {'>'}
                    </button>
                </div>
                <div>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="ml-2 border rounded p-1"
                    >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );

};

export default EmployeeTable;