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
  X,
  Calendar,
  HelpCircle,
  Home,
  Users,
  FileText,
  CalendarCheck,
  LogOut,
} from "lucide-react";
import { Drawer } from "@mui/material"; // Import Drawer from MUI

export default function FacultyNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer
  const [selectedItem, setSelectedItem] = useState("Explore");

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  // Updated menuItems array with the new data
  const menuItems = [
    { title: "Home", icon: <Home className="w-5 h-5" />, url: "/facultyDashboard" },
    { title: "Approved Events", icon: <Calendar className="w-5 h-5" />, url: "/facultyApprovedEvent" },
    { title: "Proposed Events", icon: <FileText className="w-5 h-5" />, url: "/" },
    { title: "Post Events", icon: <CalendarCheck className="w-5 h-5" />, url: "/" },
    { title: "Support", icon: <HelpCircle className="w-5 h-5" />, url: "" },
    { title: "Log Out", icon: <LogOut className="w-5 h-5" />, url: "" },
  ];

  const DrawerList = (
    <div className="w-64 bg-white h-full pt-16">
      {menuItems.map((item) => (
        <div
          key={item.title}
          className={`flex items-center px-4 py-3 cursor-pointer border border-b-1 transition-colors ${selectedItem === item.title
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-100"
            }`}
          onClick={() => setSelectedItem(item.title)}
        >
          <span className="mr-4">{item.icon}</span>
          <Link href={item.url} className="text-lg text-black">
            {item.title}
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
        <NavbarContent className="lg:hidden">
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

        <NavbarContent justify="center">
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
            <Button as={Link} color="primary" href="#" variant="flat">
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Drawer component */}
      <Drawer className="z-20" open={drawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
