"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function FacultyUnivInfo() {
  const router = useRouter();
  const [cardData, setCardData] = useState([
    {
      title: "Total Entities",
      bgColor: "bg-green-400",
      mainValue: "0",
      details: [
        { label: "Departmental Societies", value: "0" },
        { label: "Professional Societies", value: "0" },
        { label: "Clubs", value: "0" },
        { label: "Communities", value: "0" },
      ],
    },
    {
      title: "Total Events",
      bgColor: "bg-red-400",
      mainValue: "0",
      details: [
        { label: "Flagship", value: "0" },
        { label: "Monthly", value: "0" },
        { label: "Weekly", value: "0" },
      ],
    },
    {
      title: "Used Budget",
      bgColor: "bg-blue-400",
      mainValue: "0₹",
      details: [
        { label: "Total", value: "Rs. 0" },
      ],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log("Token:", token);
      if (!token) {
        console.error("No token found in localStorage");
        router.push('https://cuintra-frontend-bj29.vercel.app/login');
        return;
      }

      const toastId = toast.loading("Please wait ...");
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const [userResponse, clubs, deptSocieties, profSocieties, communities] = await Promise.all([
          axios.get('https://intracu-backend-mdl9.onrender.com/api/me', { headers }),
          axios.get('https://intracu-backend-mdl9.onrender.com/api/clubRoutes/clubs'),
          axios.get('https://intracu-backend-mdl9.onrender.com/api/deptSocieties/departmental-societies'),
          axios.get('https://intracu-backend-mdl9.onrender.com/api/proffSocieties/professional-societies'),
          axios.get('https://intracu-backend-mdl9.onrender.com/api/communitiesRoutes/communities')
        ]);

        if (userResponse.data.success) {
          if (userResponse.data.user.role !== "Faculty") {
            toast.error("Access denied. Faculty role required.");
            router.push('/login');
          } else {
            const entityRef = userResponse.data.user.entity;
            const [budget, allEvents] = await Promise.all([
              axios.get('https://intracu-backend-mdl9.onrender.com/api/event/getTotalBudgetByEntity', {
                params: { entityRef: entityRef }
              }),
              axios.get('https://intracu-backend-mdl9.onrender.com/api/event/events-count-entity', {
                params: { entityRef: entityRef }
              })
            ]);

            const newCardData = [...cardData];
            
            // Update Total Entities
            newCardData[0].mainValue = clubs.data.Entity.length + deptSocieties.data.Entities.length + communities.data.Entity.length + profSocieties.data.Entity.length;
            newCardData[0].details[0].value = deptSocieties.data.Entities.length;
            newCardData[0].details[1].value = profSocieties.data.Entity.length;
            newCardData[0].details[2].value = clubs.data.Entity.length;
            newCardData[0].details[3].value = communities.data.Entity.length;

            // Update Total Events
            newCardData[1].mainValue = allEvents.data.data.weekly + allEvents.data.data.monthly + allEvents.data.data.flagship;
            newCardData[1].details[0].value = allEvents.data.data.flagship;
            newCardData[1].details[1].value = allEvents.data.data.monthly;
            newCardData[1].details[2].value = allEvents.data.data.weekly;

            // Update Used Budget
            newCardData[2].mainValue = `${budget.data.totalBudget}₹`;
            newCardData[2].details[0].value = `Rs. ${budget.data.totalBudget}`;

            setCardData(newCardData);
          }
        } else {
          toast.error("User not found");
          router.push('/login');
        }
      } catch (error) {
        console.error("Error details:", error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 401) {
          toast.error("Session expired. Please login again.");
          router.push('/login');
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      } finally {
        toast.dismiss(toastId);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <div key={index} className={`p-4 rounded-lg ${card.bgColor}`}>
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p className="text-3xl font-bold mb-4">{card.mainValue}</p>
          {card.details.length > 0 && (
            <ul>
              {card.details.map((detail, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{detail.label}:</span>
                  <span>{detail.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}