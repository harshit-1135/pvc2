"use client"
import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'

const page = () => {
    const [open, setOpen] = useState(false); 

    return (
        <div>
            <Sidebar className='' open={open} setOpen={setOpen} />
            <Nav />
            <div
                className={`transition-all duration-300 ${open ? "md:ml-[16.5rem]  w-[40%] md:w-[80.2%]" : "mx-2 lg:mx-0 lg:ml-24 mr-8"
                    } md:w-[92.100%]  w-[95.5%]   `}
            >
                Event Page
            </div>
        </div>
    )
}

export default page