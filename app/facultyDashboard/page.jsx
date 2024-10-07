"use client"
import FacultySidebar from '@/components/FacultySidebar'
import FacultyUnivInfo from '@/components/FacultyUnivInfo'
import MonthlyEvents from '@/components/MonthlyEvents'
import dayjs from 'dayjs'
import React, { useState,useEffect } from 'react'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import OngoingEvents from '@/components/OngoingEvents'
import FacultyNav from '@/components/FacultyNav'

const page = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const [entity, setEntity] = useState(null); // New state for entity

    useEffect(() => {
        // Fetch the entity from localStorage after the component mounts
        const storedEntity = localStorage.getItem('entity');
        setEntity(storedEntity);
    }, []);

    return (
        <div className='text-black' >
            <FacultySidebar className='' open={open} setOpen={setOpen} />
            <FacultyNav />
            <div
                className={`transition-all duration-300 ${open ? "md:ml-[16.5rem]  w-[40%] md:w-[80%]" : "mx-2 lg:mx-0 lg:ml-24 mr-8"
                    } md:w-[92.100%]  w-[95.5%]   `}
            >
                <FacultyUnivInfo />
                <div className="mt-4 lg:flex gap-4">
                    <MonthlyEvents className='' entity={entity}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className=" h-full px-8 py-4 border-2 border-gray-200 rounded-3xl">
                            <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                        </div>
                    </LocalizationProvider>
                </div>
                <OngoingEvents />
                
            </div>
        </div>
    )
}

export default page
