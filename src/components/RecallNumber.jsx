import React, { useState, useEffect } from 'react';

const RecallTable = ({ make, model, year }) => {
    const [recalls, setRecalls] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = `?make=${make}&model=${model}&modelYear=${year}`;
                const response = await fetch(`https://api.nhtsa.gov/recalls/recallsByVehicle${request}`);

                if (!response.ok) {
                    if (response.status === 400) {
                        setRecalls({ Count: 0, results: [] });
                    } else {
                        throw new Error('ERROR 400, No data');
                    }
                } else {
                    const data = await response.json();
                    setRecalls(data);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [make, model, year]);

    return (
        <div>
            {recalls ? (
                <p className="text-2xl font-bold text-white">{recalls.Count}</p>
            ) : (
                <p className="text-2xl font-bold text-white">#</p>
            )}
        </div>
    );
};

export default RecallTable;
