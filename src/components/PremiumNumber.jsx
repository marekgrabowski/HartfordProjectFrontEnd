import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Modal from './Modal';


const PremiumNumber = ({ make, model, year }) => {
    const [premium, setPremium] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPremium = async () => {
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
                const requestURL = `https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/vehicles/premium?make=${make}&model=${model}&modelyear=${year}`;

                const response = await fetch(requestURL, requestOptions);

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Unauthorized, please login again");
                    } else if (response.status === 500) {
                        throw new Error("Internal server error");
                    } else {
                        // Handle other statuses or a default case
                        throw new Error(`Error: ${response.status}`);
                    }
                }

                const data = await response.json();
                if (data && data.body && data.body.premium != null) {
                    setPremium(data.body.premium);
                } else {
                    console.log(data);
                    throw new Error(data);
                }
            } catch (fetchError) {
                setError(fetchError.message);
            }
        };

        fetchPremium();
    }, [make, model, year]);

    return (
        <div>
            {error ? (
                <div className="flex justify-center items-center">
                    <p className="text-xl font-bold text-red-500">Error: {error}</p>
                </div>
            ) : premium !== null ? (
                <div className="flex justify-center items-center">
                    <p className="text-2xl font-bold">Estimated Annual Premium: <span className=" text-green-800">${premium}</span></p>
                    {/* <Modal title='Edit Premium' desc='Override Base Permium Value' field_type='number' field={premium} openicon='edit' /> */}
                </div>
            ) : (
                <Loading text="Loading..." />
            )}
        </div>
    );
};

export default PremiumNumber;
