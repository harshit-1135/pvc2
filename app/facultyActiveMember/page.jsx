"use client";
import FacultySidebar from '@/components/FacultySidebar';
import FacultyUnivInfo from '@/components/FacultyUnivInfo';
import React, { useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'lucide-react';
import FacultyNav from '@/components/FacultyNav';

const Page = () => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');

    // Updated data structure
    const data = [
        {
            uid: "22BCS13070",
            name: "Alok Kumar Yadav",
            department: "CSE",
            phoneNo: "9532808188",
            mailId: "alok953280@gmail.com",
            status: "Pending" // You can change status as needed
        },
        {
            uid: "22BCS13071",
            name: "Sita Sharma",
            department: "ECE",
            phoneNo: "9876543210",
            mailId: "sita.sharma@example.com",
            status: "Pending"
        },
        {
            uid: "22BCS13072",
            name: "Rahul Singh",
            department: "ME",
            phoneNo: "1234567890",
            mailId: "rahul.singh@example.com",
            status: "Pending"
        },
        {
            uid: "22BCS13073",
            name: "Anita Gupta",
            department: "CSE",
            phoneNo: "9988776655",
            mailId: "anita.gupta@example.com",
            status: "Pending"
        }
    ];

    // Updated columns
    const columns = [
        { name: "UID", selector: row => row.uid, sortable: true,width:'190px' },
        { name: "Name", selector: row => row.name, sortable: true },
        { name: "Department", selector: row => row.department, sortable: true,width:'180px' },
        { name: "Phone No", selector: row => row.phoneNo, sortable: true },
        { name: "Mail ID", selector: row => row.mailId, sortable: true },
        {
            name: "Status",
            cell: row => (
                <div className="flex gap-2">
                    <Button color="success" size="sm" onClick={() => handleAccept(row.uid)}>Accept</Button>
                    <Button className='bg-red-500' size="sm" onClick={() => handleReject(row.uid)}>Reject</Button>
                </div>
            ),
            ignoreRowClick: true,
            allowoverflow: true,
            button: true,
            width:'160px'
        },
    ];

    const handleAccept = (uid) => {
        console.log(`Accepted ${uid}`);
        // Add your accept logic here
    };

    const handleReject = (uid) => {
        console.log(`Rejected ${uid}`);
        // Add your reject logic here
    };

    // Filtering logic
    const filteredData = data.filter(item => {
        const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = selectedDepartment === 'All Departments' || item.department === selectedDepartment;

        return matchesSearchTerm && matchesDepartment;
    });

    return (
        <div>
            <FacultySidebar className='' open={open} setOpen={setOpen} />
            <FacultyNav/>
            <div className={`transition-all duration-300 ${open ? "md:ml-[16.5rem]  w-[40%] md:w-[80%]" : "mx-2 lg:mx-0 lg:ml-24 mr-8"} md:w-[92.100%]  w-[95.5%]`}>
                <FacultyUnivInfo />
                <h1 className='bg-customOrange p-2 w-full my-4 text-xl text-white font-bold text-center rounded-2xl'>Members</h1>
                <div className="p-4 pt-6 border-2 rounded-3xl shadow-lg">
                    <div className="lg:flex justify-between space-y-2 lg:space-y-0 gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search members..."
                            className="border-2 border-gray-300 rounded-xl px-4 py-1 w-full lg:w-auto"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <Dropdown>
                            <DropdownTrigger className='bg-white text-black'>
                                <Button className='px-10 w-full' variant="bordered">{selectedDepartment} <ChevronDown /></Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Department selection">
                                <DropdownItem onClick={() => setSelectedDepartment('All Departments')}>All Departments</DropdownItem>
                                <DropdownItem onClick={() => setSelectedDepartment('CSE')}>CSE</DropdownItem>
                                <DropdownItem onClick={() => setSelectedDepartment('ECE')}>ECE</DropdownItem>
                                <DropdownItem onClick={() => setSelectedDepartment('ME')}>ME</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <button className='bg-customOrange w-full lg:w-min py-2 px-4 font-bold text-white rounded-2xl'>Submit</button>
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredData} // Use filtered data here
                        fixedHeader
                        pagination
                        customStyles={{
                            headCells: {
                                style: {
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: 'black',
                                    background: '#FFCC7C',
                                },
                            },
                            cells: {
                                style: {
                                    fontSize: '14px',
                                    color: '#4A4A4A',
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
