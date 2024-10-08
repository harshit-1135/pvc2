"use client"
import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, CheckCircle, PieChart, FileText } from 'lucide-react';
import axios from 'axios';

const InfoCard = ({ icon, title, subtitle, link, linkText }) => (
  <div className="w-full lg:h-48 bg-gradient-to-r from-custom-blue-1 to-custom-blue-2 rounded-[3rem] shadow-lg text-white p-4 flex gap-2 lg:flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer">
    <div className="">
      <div className="text-6xl flex justify-center">{icon}</div>
      <h3 className="text-5xl font-bold mb-1">{title}</h3>
    </div>
    <div>
      {subtitle && <p className="text-lg">{subtitle}</p>}
    </div>
  </div>
);

export default function Component() {
  const [eventCounts, setEventCounts] = useState(null); // State for event counts
  const [entityCounts, setEntityCounts] = useState(null); // State for entity counts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventCounts = async () => {
      try {
        const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/event-counts');
        const data = response.data;
  
        if (data.success) {
          setEventCounts(data.data); // Set the event counts in state
        } else {
          setError('Failed to fetch event counts');
        }
      } catch (err) {
        console.error('Error fetching event counts:', err);
        setError('An error occurred while fetching event counts.');
      }
    };
    
    fetchEventCounts();
  }, []);

  // Fetch entity counts
  useEffect(() => {
    const fetchEntityCounts = async () => {
      try {
        const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/entity-counts');
        const data = response.data;
  
        if (data.success) {
          setEntityCounts(data.data); 
        } else {
          setError('Failed to fetch entity counts');
        }
      } catch (err) {
        console.error('Error fetching entity counts:', err);
        setError('An error occurred while fetching entity counts.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntityCounts();
  }, []);

  const defaultEventCounts = eventCounts || { approvals: 0, monthly: 0, weekly: 0, flagship: 0 };
  const defaultEntityCounts = entityCounts || { clubs: { count: 0 }, communities: { count: 0 }, departmentalSocieties: { count: 0 }, professionalSocieties: { count: 0 } };

  const infoCards = [
    {
      icon: <></>,
      title: `${defaultEntityCounts.clubs.count + defaultEntityCounts.communities.count + defaultEntityCounts.departmentalSocieties.count + defaultEntityCounts.professionalSocieties.count}+`,
      subtitle: "University Bodies",
    },
    {
      icon: <></>,
      title: `${defaultEventCounts.monthly + defaultEventCounts.weekly + defaultEventCounts.flagship}+`,
      subtitle: "Events",
    },
    {
      icon: <CheckCircle size={40} />,
      subtitle: "Event approvals",
    },
    {
      icon: <PieChart size={40} />,
      subtitle: "Credits and GP",
    },
  ];
  
  return (
    <div className="hidden lg:grid lg:grid-cols-4  gap-4 mt-6 px-6 lg:px-0">
      {infoCards.map((card, index) => (
        <InfoCard
          key={index}
          icon={card.icon}
          title={card.title}
          subtitle={card.subtitle}
        />
      ))}
    </div>
  );
}
