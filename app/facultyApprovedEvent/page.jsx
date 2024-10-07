"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FacultySidebar from '@/components/FacultySidebar';
import FacultyUnivInfo from '@/components/FacultyUnivInfo';
import FacultyNav from '@/components/FacultyNav';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'lucide-react';

const Page = () => {
    const [open, setOpen] = useState(false);
    const [selectedEventType, setSelectedEventType] = useState('All Event Types');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [entity, setEntity] = useState(null); // New state for entity

    useEffect(() => {
        // Fetch the entity from localStorage after the component mounts
        const storedEntity = localStorage.getItem('entity');
        setEntity(storedEntity);
    }, []);

    useEffect(() => {
        if (entity) {
            fetchEvents();
        }
    }, [entity]);
    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/event/getAllEventsById',
                {params: {entityRef:entity}}
            );
            if (response.data.success) {
                setEvents(response.data.events);
            } else {
                setError('Failed to fetch events');
            }
        } catch (err) {
            setError('Error fetching events');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async (eventId, entityRef) => {
        try {
            const response = await axios.post('https://intracu-backend-mdl9.onrender.com/api/member/inviteMembersByEntity', {
                entityRef: entityRef,
                eventRef: eventId
            });
            if (response.data.success) {
                alert('Invitations sent successfully!');
                // Optionally, update the UI to reflect the published state
            } else {
                alert('Failed to send invitations: ' + response.data.message);
            }
        } catch (err) {
            console.error('Error publishing event:', err);
            alert('Error publishing event. Please try again.');
        }
    };

    const columns = [
        { name: "Name", selector: row => row.name, sortable: true },
        { name: "Date", selector: row => new Date(row.date.startDate).toLocaleDateString(), sortable: true },
        { name: "Venue", selector: row => row.venue || 'N/A', sortable: true },
        { name: "Category", selector: row => row.category || 'N/A', sortable: true },
        { name: "Event Type", selector: row => row.Eventtype || 'N/A', sortable: true },
        {
            name: "Action",
            cell: row => (
                <button 
                    className="bg-[#FF9B00] text-white uppercase rounded-xl px-2 py-2"
                    onClick={() => handlePublish(row._id, row.entity.id)}
                >
                    Publish
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const filteredEvents = events.filter(event => {
        const matchesEventType = selectedEventType === 'All Event Types' || event.eventType === selectedEventType;
        const matchesCategory = selectedCategory === 'All Categories' || event.category === selectedCategory;
        return matchesEventType && matchesCategory;
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='text-black'>
            <FacultySidebar className='' open={open} setOpen={setOpen} />
            <FacultyNav />
            <div className={`transition-all duration-300 ${open ? "md:ml-[16.5rem] w-[40%] md:w-[80%]" : "mx-2 lg:mx-0 lg:ml-24 mr-8"} md:w-[92.100%] w-[95.5%]`}>
                <FacultyUnivInfo />
                <h1 className='bg-customOrange p-2 w-full my-4 text-xl text-white font-bold text-center rounded-2xl'>Approved Events</h1>
                <div className="p-4 pt-6 border-2 rounded-3xl shadow-lg">
                    <div className="lg:flex justify-between space-y-4 lg:space-y-0 gap-4 mb-6">
                        <Dropdown>
                            <DropdownTrigger className='bg-white text-black'>
                                <Button className='px-10 w-full' variant="bordered">{selectedEventType} <ChevronDown /></Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Event Type selection">
                                <DropdownItem onClick={() => setSelectedEventType('All Event Types')}>All Event Types</DropdownItem>
                                <DropdownItem onClick={() => setSelectedEventType('Workshop')}>Workshop</DropdownItem>
                                <DropdownItem onClick={() => setSelectedEventType('Exhibition')}>Exhibition</DropdownItem>
                                <DropdownItem onClick={() => setSelectedEventType('Festival')}>Festival</DropdownItem>
                                <DropdownItem onClick={() => setSelectedEventType('Meeting')}>Meeting</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className='bg-white text-black'>
                                <Button className='lg:px-10 w-full px-6' variant="bordered">{selectedCategory}<ChevronDown /></Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Category selection">
                                <DropdownItem onClick={() => setSelectedCategory('All Categories')}>All Categories</DropdownItem>
                                <DropdownItem onClick={() => setSelectedCategory('Academic')}>Academic</DropdownItem>
                                <DropdownItem onClick={() => setSelectedCategory('Cultural')}>Cultural</DropdownItem>
                                <DropdownItem onClick={() => setSelectedCategory('Sports')}>Sports</DropdownItem>
                                <DropdownItem onClick={() => setSelectedCategory('Exhibition')}>Exhibition</DropdownItem>
                                <DropdownItem onClick={() => setSelectedCategory('Festival')}>Festival</DropdownItem>
                                <DropdownItem onClick={() => setSelectedCategory('Meeting')}>Meeting</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredEvents}
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