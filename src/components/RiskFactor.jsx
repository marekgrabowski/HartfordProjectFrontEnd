import React, { useState, useEffect } from 'react';
import Loading from './Loading';


const RiskFactor = ({ make, model, year }) => {
    const [riskFactor, setRiskFactor] = useState(null);
    const [riskLevel, setRiskLevel] = useState('');
    const [dotPosition, setDotPosition] = useState('0%');

    useEffect(() => {
        const fetchRiskFactor = async () => {
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
                const response = await fetch('https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/vehicles/risk-factor/'+ request);
                const data = await response.json();
                setRiskFactor(data.body.risk_factor);
                updateSafetyBar(data.body.risk_factor);
            } catch (error) {
                console.error('Error fetching risk factor:', error);
            }
        };
        fetchRiskFactor();
    }, []);

    const updateSafetyBar = (factor) => {
        let level;
        let position;

        position = `${factor * 10}%`;

        if (factor <= 3) {
            level = 'Low';
        } else if (factor <= 7) {
            level = 'Medium';
        } else {
            level = 'High';
        }

        setRiskLevel(level);
        setDotPosition(`calc(${position} - 10px)`); 
    };

    return (
        <div className="container mt-5 w-32 text-center">
        {riskFactor !== null ? (
            <>
                <div className="safety-bar-container rounded-lg" style={{ position: 'relative', width: '100%', height: '30px', background: 'linear-gradient(to right, green, yellow, red)', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'  }}>
                    <div className="safety-dot" style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '5px', left: dotPosition, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'  }}></div>
                </div>
                <div id="risk-factor-text" style={{ marginTop: '10px' }}>
                    {riskLevel} Risk
                </div>
            </>
        ) : (
            <div style={{ textAlign: 'center' }}>
                <Loading text="Loading..." />
            </div>
        )}
    </div>
    );
};

export default RiskFactor;
