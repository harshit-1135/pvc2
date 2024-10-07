"use client"
import React from 'react';
import { Home, Calendar, Briefcase, FileText, Users, File, HelpCircle, UserPlus, ClipboardList, ChevronLeft, ChevronRight, AlignJustify, Eye, CalendarCheck, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const FacultySidebar = ({ open, setOpen }) => {
    const path = usePathname(); 
    console.log(path)
    const Menus = [
        { title: "Home", icon: <Home />, url: "/facultyDashboard" },
        { title: "Approved Events", icon: <Calendar />, url: "/facultyApprovedEvent" },
        { title: "Proposed Events", icon: <FileText />, url: "/profSociety" },
        { title: "Post Events", icon: <CalendarCheck />, url: "/club" },
        { title: "Support", icon: <HelpCircle />, url: "" },
        { title: "Log Out", icon: <LogOut />, url: "/login" },
    ];

    return (
        <div
            className={`${open ? "md:w-60" : "w-20"} mt-12 hidden lg:block bg-dark-purple h-screen py-5 pt-8 fixed duration-300  border-r-2 backdrop-blur-sm`}
        >
            <div
                className={`absolute cursor-pointer right-6 top-9 w-7  bg-white  flex justify-center items-center`}
                onClick={() => setOpen(!open)}
            >
                <AlignJustify />
            </div>
            <div className="flex pl-6 items-center pb-3 pt-1 border-b-1 ">
                <h1
                    className={`origin-left font-medium text-lg duration-200 ${!open && "scale-0"}`}
                >
                    Hi,Faculty
                </h1>
            </div>
            <ul className="">
                {Menus.map((Menu, index) => (
                    <Link
                        key={index}
                        className={`flex pl-6 py-2 cursor-pointer hover:bg-light-white text-gray-300 text-md border-b-1 items-center gap-x-0 ${path === Menu.url ? "bg-customOrange" : "bg-white"}`}
                        href={Menu.url} // Use Menu.url here
                    >
                        <div className='h-[30px] w-[30px] mr-1 text-black'>
                            {Menu.icon}
                        </div>
                        <span className={`${!open && "hidden"} origin-left text-gray-900 font-thin hover:text-blue-700 text-base hover:text-lg duration-200`}>
                            {Menu.title}
                        </span>
                    </Link>
                ))}
                <li className={`absolute   bottom-12 flex pl-6 py-2 cursor-pointer hover:bg-light-white text-gray-300 text-md  items-center gap-x-0`} >
                    <div className='h-[30px] w-[30px] mr-1 text-black'>
                        <Eye />
                    </div>
                    <span className={`${!open && "hidden"} origin-left mb-1 text-gray-900 font-thin hover:text-blue-700 text-base hover:text-lg duration-200`}>
                        Visitor Count : 123
                    </span></li>
            </ul>
        </div>
    );
};

export default FacultySidebar;
