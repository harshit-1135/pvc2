"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function OngoingEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const formatDate = (isoDateString) => {
        const dateObj = new Date(isoDateString);
        const day = dateObj.getDate(); // Get the day
        const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase(); // Get month abbreviation
        return { day, month };
      };
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/event/getallApprovedEvents');
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
        fetchEvents();
    }, []);

    const handlePublish = async (eventId, entityRef) => {
        try {
            console.log(eventId);
            console.log(entityRef);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full mx-auto border-2 mt-4 rounded-3xl px-4 pt-4 mb-4">
            <h2 className="text-2xl text-center font-bold mb-4">Ongoing Events</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
                {events.map((event) => (
                    <div key={event.id} className="flex-shrink-0 w-[300px] sm:w-[350px] border rounded-3xl shadow-md overflow-hidden">
                        <div className="h-[200px]">
                            <img
                                src={event.imageUrl}
                                alt={event.name}
                                width={350}
                                height={200}
                                className="object-cover w-full h-full p-2 rounded-3xl"
                            />
                        </div>
                        <div className="p-4 flex pt-0">
                            <div className="w-9/12">
                                <h3 className="text-lg font-semibold mb-1 overflow-hidden whitespace-nowrap text-ellipsis" style={{ maxWidth: '100%' }}>
                                    {event.title}
                                </h3>
                                <p className="text-sm text-gray-500">Scheduled on: {formatDate(event.date.startDate).day + " "+ formatDate(event.date.startDate).month}</p>
                                <p className="text-sm text-gray-500">By: {event.entityName}</p>
                            </div>
                            <button 
                                className="w-full bg-customOrange hover:bg-orange-600 text-white py-1 rounded-2xl"
                                onClick={() => handlePublish(event._id, event.entity.id)}
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}