import React, { useState, useEffect } from 'react';
import Loading from './Loading';


const RiskFactor = ({ make, model, year }) => {
    const [riskFactor, setRiskFactor] = useState(null);
    const [riskLevel, setRiskLevel] = useState('');
    const [dotPosition, setDotPosition] = useState('0%');
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchRiskFactor = async () => {
            try {
                const sessionToken = localStorage.getItem("sessiontoken");
                if (!sessionToken) {
                    throw new Error("No session token found");
                }

                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: sessionToken,
                        "Content-Type": "application/json",
                    },
                };
                const requestURL = `https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/vehicles/risk-factor/?make=${make}&model=${model}&modelyear=${year}`;
                const response = await fetch(requestURL, requestOptions);
                const data = await response.json();

                if (response.ok && data.body && data.body.risk_factor !== undefined) {
                    setRiskFactor(data.body.risk_factor);
                    updateSafetyBar(data.body.risk_factor);
                } else {
                    throw new Error("Error fetching risk factor data");
                }
            } catch (fetchError) {
                console.error('Error fetching risk factor:', fetchError);
                setError(fetchError.message);
            }
        };
        fetchRiskFactor();
    }, [make, model, year]);

    const updateSafetyBar = (factor) => {
        const position = `${factor * 10}%`;
        const level = factor <= 3 ? 'Low' : factor <= 7 ? 'Medium' : 'High';

        setRiskLevel(level);
        setDotPosition(`calc(${position} - 10px)`); 
    };

    return (
        <div className=" items-center w-64 text-center flex">
        {error ? (
                <div className="flex justify-center items-center">
                    <p className="text-xl font-bold text-red-500">Error: {error}</p>
                </div>
            ) : riskFactor !== null ? (
            <>
                <div className="rounded-lg" style={{ position: 'relative', width: '100%', height: '30px', background: 'linear-gradient(to right, green, yellow, red)', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'  }}>
                    <div className="" style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '5px', left: dotPosition, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'  }}></div>
                </div>
                <div className="flex-none ml-4 font-medium">
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
