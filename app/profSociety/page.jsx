"use client"; // Important for Next.js to use client-side rendering

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '@/components/Nav';
import Sidebar from '@/components/Sidebar';
import UnivInfo from '@/components/UnivInfo';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const ClubsPage = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedCluster, setSelectedCluster] = useState('All Clusters');
  const [clubs, setClubs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    setOpen(false);
    fetchClubs();
    fetchDepartments();
    fetchClusters();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/proffSocieties/professional-societies');
      if (response.data.success) {
        setClubs(response.data.Entity);
      }
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/departmentroutes/departments');
      if (response.data.success) {
        setDepartments(response.data.departments);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchClusters = async () => {
    try {
      const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/cluster/clusters');
      if (response.data.success) {
        setClusters(response.data.clusters);
      }
    } catch (error) {
      console.error('Error fetching clusters:', error);
    }
  };

  const columns = [
    { name: "Name", selector: row => row.ProposedEntityName, sortable: true,cell: row => (
      <Link href={`https://cuintra-frontend-bj29.vercel.app/../${row.ProposedEntityName}/membershipForm`}>
        <span className="font-bold">{row.ProposedEntityName}</span>
      </Link>
    ), },
    { name: "Department", selector: row => row.EntityDepartment.name, sortable: true },
    { name: "Institute", selector: row => row.EntityInstitute.name, sortable: true },
    { name: "Cluster", selector: row => row.EntityCluster.name, sortable: true },
    {
      name: "Action",
      cell: row => (
        <Link href={`https://cuintra-frontend-bj29.vercel.app/../${row.ProposedEntityName}/membershipForm`}>
          <Button className="border-2 border-blue-500 text-black rounded-xl px-2 py-2">
            Join now
          </Button>
        </Link>
      ),    
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredClubs = clubs.filter(club => {
    const matchesSearchTerm = club.ProposedEntityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All Departments' || club.EntityDepartment.name === selectedDepartment;
    const matchesCluster = selectedCluster === 'All Clusters' || club.EntityCluster.name === selectedCluster;

    return matchesSearchTerm && matchesDepartment && matchesCluster;
  });

  return (
    <div className='mb-4'>
      <Sidebar open={open} setOpen={setOpen} />
      <Nav />
      <div
        className={`transition-all duration-300 ${open ? "md:ml-[16.5rem] w-[40%] md:w-[80.3%]" : "mx-2 lg:mx-0 lg:ml-24 mr-8"
          } md:w-[92.100%] w-[95.5%]`}
      >
        <UnivInfo />
        <div className='lg:flex space-y-4 lg:space-y-0 gap-4 mt-4'>
          <div className="lg:w-1/6 space-y-4">
            <div className="h-[47%] bg-gradient-to-r from-darkBlue to-lightBlue text-white p-6 lg:p-4 rounded-3xl shadow-lg">
              <h2 className="text-3xl font-bold mb-0 lg:mb-4">Professional Societies</h2>
              <p className="text-sm hidden lg:block">Discover a world of opportunities to explore your passions and make a lasting impact on campus.</p>
            </div>
            <div className="h-[50%] bg-gradient-to-r from-darkBlue to-lightBlue text-white p-6 lg:p-4 rounded-3xl shadow-lg">
              <h2 className="text-3xl font-bold mb-0 lg:mb-4">Physio Society</h2>
              <p className="text-sm hidden lg:block">Discover a world of opportunities to explore your passions and make a lasting impact on campus.</p>
            </div>
          </div>
          <div className="lg:w-5/6 p-4 pt-6 border-2 rounded-3xl shadow-lg">
            <div className="lg:flex justify-between gap-4 mb-6">
              <input
                placeholder="   Search"
                className="w-full lg:w-2/3 border-2 p-2 lg:p-1 rounded-[2rem]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className='flex gap-4 mt-4 lg:mt-0'>
                <Dropdown>
                  <DropdownTrigger className='bg-white'>
                    <Button className='px-10' variant="bordered">{selectedDepartment} <ChevronDown /></Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Department selection">
                    <DropdownItem key="all" onClick={() => setSelectedDepartment('All Departments')}>All Departments</DropdownItem>
                    {departments.map((dept) => (
                      <DropdownItem key={dept._id} onClick={() => setSelectedDepartment(dept.name)}>{dept.name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className='bg-white'>
                    <Button className='lg:px-10 px-6' variant="bordered">{selectedCluster}<ChevronDown /></Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Cluster selection">
                    <DropdownItem key="all" onClick={() => setSelectedCluster('All Clusters')}>All Clusters</DropdownItem>
                    {clusters.map((cluster) => (
                      <DropdownItem key={cluster._id} onClick={() => setSelectedCluster(cluster.name)}>{cluster.name}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={filteredClubs}
              fixedHeader
              pagination
              customStyles={{
                headCells: {
                  style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'white',
                    background: '#5375D5',
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
    </div>
  )
}

export default ClubsPage;