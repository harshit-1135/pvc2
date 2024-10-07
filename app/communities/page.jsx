"use client"; // Important for Next.js to use client-side rendering

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Sidebar from '@/components/Sidebar';
import UnivInfo from '@/components/UnivInfo';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'lucide-react';

const ClubsPage = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedClusters, setSelectedClusters] = useState([]);
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
      const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/communitiesRoutes/communities');
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

  const handleDepartmentSelect = (department) => {
    setSelectedDepartments(prev =>
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const handleClusterSelect = (cluster) => {
    setSelectedClusters(prev =>
      prev.includes(cluster)
        ? prev.filter(c => c !== cluster)
        : [...prev, cluster]
    );
  };

  const columns = [
    { 
      name: "Name", 
      selector: row => row.ProposedEntityName, 
      sortable: true,
      cell: row => (
        <Link href={`https://cuintra-frontend-bj29.vercel.app/../${row.ProposedEntityName}/membershipForm`}>
          <span className="font-bold">{row.ProposedEntityName}</span>
        </Link>
      ),
    },
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
    const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(club.EntityDepartment.name);
    const matchesCluster = selectedClusters.length === 0 || selectedClusters.includes(club.EntityCluster.name);

    return matchesSearchTerm && matchesDepartment && matchesCluster;
  });

  return (
    <div className='mb-4'>
      <Sidebar open={open} setOpen={setOpen} />
      <Nav />
      <div
        className={`transition-all duration-300 ${open ? "md:ml-[16.5rem] w-[40%] md:w-[80.2%]" : "mx-2 lg:mx-0 lg:ml-24 mr-8"
          } md:w-[92.100%] w-[95.5%]`}
      >
        <UnivInfo />
        <div className='lg:flex space-y-4 lg:space-y-0 gap-4 mt-4'>
          <div className="lg:w-1/6 space-y-4">
            <div className="h-[47%] bg-gradient-to-r from-greenCustom to-tealDark text-white p-4 lg:p-4 rounded-3xl shadow-lg">
              <h2 className="text-3xl font-bold mb-0 lg:mb-4">Communities</h2>
              <p className="text-sm hidden lg:block">Discover a world of opportunities to explore your passions and make a lasting impact on campus.</p>
            </div>
          </div>
          <div className="lg:w-5/6 p-4 pt-6 border-2 rounded-3xl shadow-lg">
            <div className="lg:flex justify-between gap-4 mb-6">
              <div className='flex w-full lg:w-2/3 bg-[#F0F1F6] py-3 px-4 border shadow-inner rounded-full'>
                <input
                  placeholder="Search by Name"
                  className="outline-none px-4 w-full bg-[#F0F1F6]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className='flex gap-4 mt-4 lg:mt-0'>
                <Dropdown>
                  <DropdownTrigger className='bg-white'>
                    <Button className='px-10' variant="bordered">
                      Department <ChevronDown />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Department selection">
                    {departments.map((department) => (
                      <DropdownItem 
                        key={department._id} 
                        onPress={() => handleDepartmentSelect(department.name)}
                      >
                        {department.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className='bg-white'>
                    <Button className='lg:px-10 px-6' variant="bordered">
                      Cluster <ChevronDown />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Cluster selection">
                    {clusters.map((cluster) => (
                      <DropdownItem 
                        key={cluster._id} 
                        onPress={() => handleClusterSelect(cluster.name)}
                      >
                        {cluster.name}
                      </DropdownItem>
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