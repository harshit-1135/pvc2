"use client"
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

export default function EventCarousel() {
  const settings = {
    dots: false,
    infinite: true, 
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // You can enable arrows if needed
    autoplay: true,
    autoplaySpeed: 2200
  };

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/event/getallApprovedEvents');  // Update this to your actual backend URL
        setEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to format the date
  const formatDate = (isoDateString) => {
    const dateObj = new Date(isoDateString);
    const day = dateObj.getDate(); // Get the day
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase(); // Get month abbreviation
    return { day, month };
  };

  return (
    <div className="max-w-sm mx-auto">
      {loading ? (
        <div>Loading events...</div>
      ) : (
        <Slider {...settings}>
          {events.map((event) => {
            const { day, month } = formatDate(event.date.startDate); // Format the date
            return (
              <div key={event._id} className="bg-white rounded-3xl">
                <div className="relative">
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="rounded-t-2xl object-cover w-full h-[18.2rem]"
                  />
                  <div className="absolute top-4 left-4 bg-white  p-2 rounded-lg shadow-lg text-center">
                    <span className="block text-3xl font-bold text-blue-600">{day}</span> {/* Day */}
                    <span className="block text-sm font-medium text-gray-600">{month}</span> {/* Month */}
                  </div>
                </div>
                <div className="p-4 rounded-b-3xl bg-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">{event.name}</h2>
                  <p className="text-blue-600 text-2xl mt-0">{event.entityName}</p> {/* Display entity name */}
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
}
