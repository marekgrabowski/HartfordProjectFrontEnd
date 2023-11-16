import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Modal from './Modal';


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
                console.log(response)
                console.log(response.body)

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                if (data && data.body.premium !== undefined) {
                    if(data.body.premium != null){
                        setPremium(data.body.premium);
                    }
                    else{
                        throw new Error(`Premium Returned Null`)
                    }
                } else {
                    throw new Error(JSON.stringify(data));

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
                <div className="flex justify-center items-center">
                    <p className="text-xl font-bold text-red-500">Error: {error}</p>
                </div>
            ) : premium !== null ? (
                <div className="flex justify-center items-center">
                    <p className="text-2xl font-bold">${premium}</p>
                    {/* <Modal title='Edit Premium' desc='Override Base Permium Value' field_type='number' field={premium} openicon='edit' /> */}
                </div>
            ) : (
                <Loading text="Loading..." />

            )}
        </div>
    );
};

export default PremiumNumber;
