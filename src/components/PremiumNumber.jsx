import React, { useState, useEffect } from 'react';

const PremiumNumber = ({ make, model, year }) => {
    const [premium, setPremium] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let sessionToken;
            try {
                sessionToken = localStorage.getItem("sessiontoken");
                if (!sessionToken) {
                    throw new Error("No session token found");
                }
            } catch (localStorageError) {
                setError(localStorageError.message);
                return; // Exit the function if localStorage is not accessible
            }

            const headers = {
                Authorization: sessionToken,
                "Content-Type": "application/json",
            };
            
            const requestOptions = {
                method: "GET",
                headers: headers,
            };
            const request = `?make=${make}&model=${model}&modelyear=${year}`;

            try {
                const response = await fetch(
                    `https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/vehicles/premium${request}`,
                    requestOptions
                );

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                if (data && data.premium !== undefined) {
                    setPremium(data.premium);
                } else {
                    throw new Error("No premium data available");
                }
            } catch (fetchError) {
                setError(fetchError.message);
            }
        };

        fetchData();
    }, [make, model, year]);

    return (
        <div>
            {error ? (
                <p className="text-xl font-bold text-red-500">Error: {error}</p>
            ) : premium !== null ? (
                <p className="text-2xl font-bold text-white">{premium}</p>
            ) : (
                <p className="text-2xl font-bold text-white">Calculating...</p>
            )}
        </div>
    );
};

export default PremiumNumber;
