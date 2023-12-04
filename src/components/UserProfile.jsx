import React, { useState, useEffect } from 'react';
import Loading from './Loading';

function UserProfile() {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        state: '',
        yearsDriving: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionToken = localStorage.getItem('sessiontoken');

        fetch('https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/accounts/profile', {
            headers: {
                'Authorization': `${sessionToken}`
            },
            credentials: "same-origin",
            mode: "cors",
        })
            .then(response => response.json())
            .then(data => {
                setProfile({
                    firstName: data.body.account.first_name,
                    lastName: data.body.account.last_name,
                    email: data.body.account.email,
                    state: data.body.account.state,
                    yearsDriving: data.body.account.years_driving
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
                setLoading(false);
            });
    }, []);


    return (
        loading ? (
            <Loading text="Loading..." />
        ) : (
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full lg:w-1/2 mt-8 mx-auto grid-flow-row items-center">
                <p className="col-span-3 lg:col-span-1 lg:text-right">First Name:</p>
                <p className="col-span-3 bg-gray-100 border border-gray-200 p-2 rounded-md">{profile.firstName}</p>
                <p className="col-span-3 lg:col-span-1 lg:text-right">Last Name:</p>
                <p className="col-span-3 bg-gray-100 border border-gray-200 p-2 rounded-md">{profile.lastName}</p>
                <p className="col-span-3 lg:col-span-1 lg:text-right">Email:</p>
                <p className="col-span-3 bg-gray-100 border border-gray-200 p-2 rounded-md">{profile.email}</p>
                <p className="col-span-3 lg:col-span-1 lg:text-right">State:</p>
                <p className="col-span-3 bg-gray-100 border border-gray-200 p-2 rounded-md">{profile.state}</p>
                <p className="col-span-3 lg:col-span-1 lg:text-right">Years Driving:</p>
                <p className="col-span-3 bg-gray-100 border border-gray-200 p-2 rounded-md">{profile.yearsDriving}</p>
            </div>
        )
    );

}

export default UserProfile;
