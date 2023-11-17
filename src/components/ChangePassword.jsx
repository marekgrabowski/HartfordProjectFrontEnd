import React, { useState } from "react";


export default function ChangePassword() {
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

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        repeatPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if new passwords match
        if (formData.newPassword !== formData.repeatPassword) {
            alert("New passwords do not match!");
            return;
        }

        // Api Request
        console.log("Password Change Requested:", formData);

        const headers = {
            Authorization: sessionToken,
            'Content-Type': 'application/json',
          };
        
          const requestOptions = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: headers,
          };

          try {
            //TODO: IMPLEMENT API ENDPOINT
            const response = await fetch(
                `https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/changepasswordapi/account/`,
                requestOptions
            );


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






        // Clear form
        setFormData({
            currentPassword: '',
            newPassword: '',
            repeatPassword: ''
        });
    };

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <div
                className="grid grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full lg:w-1/2 mt-8 mx-auto grid-flow-row items-center"
            >
                <p class="col-span-3 lg:col-span-1 lg:text-right">
                    Current Password:
                </p>
                <input
                    className="col-span-3 border border-gray-200 p-2 rounded-md"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Enter Current Password"
                    onChange={handleChange}
                    required
                />

                <p className="col-span-3 lg:col-span-1 lg:text-right">
                    New Password:
                </p>
                <input
                    className="col-span-3 border border-gray-200 p-2 rounded-md"
                    id="new-password"
                    name="new-password"
                    type="password"
                    placeholder="Enter New Password"
                    onChange={handleChange}
                    required
                />

                <p className="col-span-3 lg:col-span-1 lg:text-right">
                    Repeat New Password:
                </p>
                <input
                    className="col-span-3 border border-gray-200 p-2 rounded-md"
                    id="repeat-password"
                    name="repeat-password"
                    type="password"
                    placeholder="Re-enter New Password"
                    onChange={handleChange}
                    required
                />
                <div className="col-span-1 lg:col-span-2"></div>
                <button
                    type="submit"
                    className="col-span-2 justify-self-end rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Change Password
                </button>
            </div>
        </form>
    );
}
