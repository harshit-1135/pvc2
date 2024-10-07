import EventCarousel from '@/components/EventCarousel';
import Memories from '@/components/Memories';
import Nav from '@/components/Nav';
import Sidebar from '@/components/Sidebar';
import UnivInfo from '@/components/UnivInfo';
import { Carousel } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Use axios or fetch to make API requests

const Main = () => {
    const [open, setOpen] = useState(false);
    const [featuredEvents, setFeaturedEvents] = useState([]);

    // Fetch the featured events from the backend
    useEffect(() => {
        const fetchFeaturedEvents = async () => {
            try {
                const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/event/featured'); // Assuming this is your API endpoint
                setFeaturedEvents(response.data.events);
            } catch (err) {
                console.error("Error fetching featured events", err);
            }
        };

        fetchFeaturedEvents();
    }, []);

    return (
        <div>
            <Sidebar className='' open={open} setOpen={setOpen} />
            <Nav />
            <div
                className={`transition-all duration-300 ${open ? "md:ml-[16.5rem]  w-[40%] md:w-[80.2%]" : "mx-2 lg:mx-0 lg:ml-24 mr-8"} md:w-[92.100%] w-[95.5%]`}
            >
                <UnivInfo />
                <div className="lg:flex justify-between gap-4 space-y-4 lg:space-y-0 w-full h-96 px- mt-4 mb-72 lg:mb-0">
                    <div className="lg:w-full h-64 lg:h-full rounded-[2rem] overflow-hidden">
                        <Carousel slide={true} slideInterval={1000} className=''>
                            {featuredEvents.map(event => (
                                <img key={event._id} src={event.imageUrl} alt={event.name} />
                            ))}
                        </Carousel>
                    </div>
                    <EventCarousel />
                </div>
                <div className="lg:flex justify-between h- gap-4 space-y-4 lg:space-y-0 my-4">
                    <Memories />
                    <img src="./005.jpg" alt="" className=' lg:w-1/3 rounded-[2rem]' />
                </div>
            </div>
        </div>
    );
};

export default Main;
