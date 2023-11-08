import React, { useState, useEffect } from 'react';

const PremiumNumber = ({ make, model, year}) => {
    const [premium, setPremium] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let sessionToken;
                try {
                    // Attempt to get the session token from localStorage
                    sessionToken = localStorage.getItem("sessiontoken");
                  } catch (error) {
                    // console.error("Error accessing localStorage:", error.message);
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
                const response = await fetch(
                    `https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/vehicles/premium${request}`,
                    requestOptions
                );

                if (!response.ok) {
                    if (response.status === 400) {
                        setPremium({ premium: 0 });
                    } else {
                        throw new Error('ERROR 400, No data');
                    }
                } else {
                    const data = await response.json();
                    setPremium(data);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [make, model, year]);

    return (
        <div>
            {premium ? (
                <p className="text-2xl font-bold text-white">{premium.premium}</p>
            ) : (
                <p className="text-2xl font-bold text-white">#</p>
            )}
        </div>
    );
};

export default PremiumNumber;
