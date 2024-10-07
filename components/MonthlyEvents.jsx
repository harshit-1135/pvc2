import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import axios from 'axios';

const chartSetting = {
    yAxis: [
        {
            label: 'Number of Events',
        },
    ],
    series: [
        {
            dataKey: 'events',
            label: 'Events',
            color: '#FFAA26',
        },
    ],
    height: 368,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
    },
};

export default function MonthlyEvents(entity) {
    const [dataset, setDataset] = useState([]);
    const [tickPlacement, setTickPlacement] = useState('middle');
    const [tickLabelPlacement, setTickLabelPlacement] = useState('middle');
    useEffect(() => {
        const fetchData = async () => {
            try {//sf
                const entityId = entity;

                const response = await axios.get('https://intracu-backend-mdl9.onrender.com/api/event/getMonthWiseEvents', {
                    params: { entityId:entityId }
                });
                setDataset(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='border-2 pl-8 rounded-3xl lg:w-9/12 mb-4 lg:mb-0'>
            {dataset.length > 0 ? (
                <BarChart
                    dataset={dataset}
                    xAxis={[
                        { scaleType: 'band', dataKey: 'month', tickPlacement, tickLabelPlacement },
                    ]}
                    {...chartSetting}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}