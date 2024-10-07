"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import {
  Menu,
  Search,
  X,
  Calendar,
  Image,
  HelpCircle,
  Home,
  Briefcase,
  ClipboardList,
  FileText,
  Users,
  File,
  UserPlus,
} from "lucide-react";
import { Drawer } from "@mui/material"; // Import Drawer from MUI
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'; // Import Dialog components
import { usePathname } from "next/navigation";


export default function Nav() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer
  const [selectedItem, setSelectedItem] = useState("Explore");

  // State for controlling the dialog popup
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    uid: '',
    email: '',
    otp: ''
  });

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsDialogOpen(false); // Close dialog after submission
  };

  const menuItems = [
    { name: "Home", icon: <Home className="w-5 h-5" />, url: "/" },
    { name: "Events", icon: <Calendar className="w-5 h-5" />, url: "/event" },
    { name: "Clubs", icon: <Briefcase className="w-5 h-5" />, url: "/club" },
    { name: "Dept. Societies", icon: <ClipboardList className="w-5 h-5" />, url: "/departSociety" },
    { name: "Prof. Societies", icon: <FileText className="w-5 h-5" />, url: "/profSociety" },
    { name: "Communities", icon: <Users className="w-5 h-5" />, url: "/communities" },
    { name: "Extra Co-Curricular", icon: <Briefcase className="w-5 h-5" />, url: "/extra-co-curricular" },
    { name: "Documents", icon: <File className="w-5 h-5" />, url: "/documents" },
    { name: "FAQs", icon: <HelpCircle className="w-5 h-5" />, url: "/faqs" },
    { name: "Group", icon: <Users className="w-5 h-5" />, url: "/group" },
    { name: "Join Now", icon: <UserPlus className="w-5 h-5" />, onClick: () => setIsDialogOpen(true) }, // Open dialog on click
  ];

  const DrawerList = (
    <div className="w-64 bg-white h-full pt-16">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`flex items-center px-4 py-3 cursor-pointer border border-b-1 transition-colors ${path === item.url ? "bg-blue-400" : "bg-white"}`}
          onClick={() => {
            setSelectedItem(item.name);
            if (item.onClick) item.onClick(); // Handle onClick for Join Now
          }}
        >
          <span className="mr-4">{item.icon}</span>
          <Link href={item.url} className="text-lg text-black">
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="z-50 w-full  bg-[#f7f7f7]"
      >
        <NavbarContent className="lg:hidden" >
          {/* Open drawer button with icon */}
          <button
            onClick={toggleDrawer(!drawerOpen)}
            color="primary"
            variant="flat"
            className="bg-blue-200 text-blue-400 px-3 p-2 rounded-xl mr-4 lg:hidden"
          >
            {drawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </NavbarContent>

        <NavbarContent justify="centre">
          <NavbarBrand>
            <div className="flex gap-4">
              <img src="./CU Long.png" className="h-[35px]" alt="CU Long logo" />
              <img
                src="./NAAC.png"
                className="h-[35px] hidden lg:block"
                alt="NAAC logo"
              />
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <Home className="hidden lg:block text-blue-400" />
          <NavbarItem>
            <Button as={Link} color="primary" href="https://cuintra-frontend-bj29.vercel.app/login" variant="flat">
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Drawer component */}
      <Drawer className="z-20" open={drawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {/* Dialog for Registration Form */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-10">
        {/* Overlay */}
        <div className="fixed inset-0 mt-4 bg-black opacity-30" aria-hidden="true" />
        {/* Container */}
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
          <DialogPanel className="mx-auto w-[95%] mt-12  bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
            {/* Dialog Title */}
            <DialogTitle
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 text-center mb-4"
            >
              Join a University Body
            </DialogTitle>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Buttons for categories */}
              <div className="grid grid-cols-2 justify-center text-sm gap-x-2  mb-4">
                <button className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-auto mb-2 sm:mb-0">
                  Clubs
                </button>
                <button className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-auto mb-2 sm:mb-0">
                  Dept. Societies
                </button>
                <button className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-auto  sm:mb-0">
                  Communities
                </button>
                <button className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-auto">
                  Prof. Societies
                </button>
              </div>
              {/* Name */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              {/* UID */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">UID</label>
                <input
                  type="text"
                  name="uid"
                  value={formData.uid}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              {/* University Email */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">University Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              {/* OTP */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              {/* Join Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Join Now
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

    </>
  );
}
