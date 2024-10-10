"use client";
import React, { useState } from "react";
import {
  Home,
  Calendar,
  Briefcase,
  FileText,
  Users,
  File,
  HelpCircle,
  UserPlus,
  ClipboardList,
  AlignJustify,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const Sidebar = ({ open, setOpen }) => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    uid: "",
    email: "",
    otp: "",
  });

  const Menus = [
    { title: "Home", icon: <Home />, url: "/" },
    // { title: "Events", icon: <Calendar />, url: "/event" },
    { title: "Clubs", icon: <Briefcase />, url: "/club" },
    {
      title: "Dept. Societies",
      icon: <ClipboardList />,
      url: "/departSociety",
    },
    { title: "Prof. Societies", icon: <FileText />, url: "/profSociety" },
    { title: "Communities", icon: <Users />, url: "/communities" },
    {
      title: "Extra Co-Curricular",
      icon: <Briefcase />,
      url: "/extra-curricular",
    },
    {
      title: "Documents",
      icon: <File />,
      url: "https://pvcco-curricularrepo.netlify.app/",
    },
    { title: "FAQs", icon: <HelpCircle />, url: "/faqs" },
    { title: "Group", icon: <Users />, url: "/group" },
    {
      title: "Join Now",
      icon: <UserPlus />,
      url: "//",
      onClick: () => setIsOpen(true),
    }, // Set the dialog to open on click
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    setIsOpen(false); // Close the dialog after submission
  };

  return (
    <div
      className={`${
        open ? "md:w-60" : "w-20"
      }  hidden lg:block bg-dark-purple h-screen py-5  fixed duration-300 border-r-1 backdrop-blur-sm`}
    >
      <div className="mb-24">
        {open && (
          <img
            src="./CU Long.png"
            className="h-[40px] absolute right-6"
            alt="CU Long logo"
          />
        )}

        <div
          className={`absolute text-black cursor-pointer left-6 top-7 w-7 bg-white flex justify-center items-center`}
          onClick={() => setOpen(!open)}
        >
          <AlignJustify />
        </div>
      </div>

      {/* <div>
            <div
                className={`absolute text-black cursor-pointer right-6 top-9 w-7 bg-white flex justify-center items-center`}
                onClick={() => setOpen(!open)}
            >
                <AlignJustify />
            </div>
            <div className="flex pl-6 text-black items-center pb-4 ">
                <h1 className={`origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`} >
                    Discover
                </h1>
            </div>
            </div> */}

      <ul className="">
        {Menus.map((Menu, index) => (
          <Link
            key={index}
            href={Menu.url}
            onClick={Menu.onClick} // Handle onClick for Join Now
            className={`flex pl-6 pt-3 py-2 cursor-pointer hover:bg-light-white rounded-2xl m-1 text-gray-300 text-md items-center gap-x-0 ${
              path === Menu.url ? "bg-blue-400 text-white" : "bg-white"
            }`}
          >
            <div
              className={`h-[30px] w-[30px] mr-1 text-black ${
                path === Menu.url ? "text-white" : ""
              }`}
            >
              {Menu.icon}
            </div>
            <span
              className={`${!open && "hidden"} origin-left ${
                path === Menu.url ? "text-white" : "text-black"
              } font-thin hover:text-blue-700 text-base hover:text-lg duration-200`}
            >
              {Menu.title}
            </span>
          </Link>
        ))}
        <li
          className={`absolute bottom-12 flex pl-6 py-2 cursor-pointer hover:bg-light-white text-gray-300 text-md items-center gap-x-0`}
        >
          <div className="h-[30px] w-[30px] mr-1 text-black">
            <Eye />
          </div>
          <span
            className={`${
              !open && "hidden"
            } origin-left mb-1 text-gray-900 font-thin hover:text-blue-700 text-base hover:text-lg duration-200`}
          >
            Visitor Count: 123
          </span>
        </li>
      </ul>

      {/* Dialog for Registration Form */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-lg  bg-white p- p-14 rounded-2xl shadow-lg">
            <DialogTitle
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 text-center mb-4"
            >
              Join a University Body
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center text-black text-sm space-x-4 mb-4">
                <button className="border border-gray-300 rounded-md px-4 py-2">
                  Clubs
                </button>
                <button className="border border-gray-300 rounded-md px-4 py-2">
                  Dept. Societies
                </button>
                <button className="border border-gray-300 rounded-md px-4 py-2">
                  Communities
                </button>
                <button className="border border-gray-300 rounded-md px-4 py-2">
                  Prof. Societies
                </button>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  UID
                </label>
                <input
                  type="text"
                  name="uid"
                  value={formData.uid}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  University Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Register
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Sidebar;
