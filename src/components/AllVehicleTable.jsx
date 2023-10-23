import React, { useState, useEffect } from 'react';

const AllVehicleTable = () => {
    const [vehicles, setVehicles] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc'); // or 'desc' for descending
    const [sortColumn, setSortColumn] = useState('make');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Authorization': 'allow',
                    'Content-Type': 'application/json',
                };

                const requestOptions = {
                    method: 'GET',
                    headers: headers,
                };

                const response = await fetch("https://13g2g9a95h.execute-api.us-east-1.amazonaws.com/test1/vehicles", requestOptions);
                const data = await response.json();
                setVehicles(data.body);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    // Sorting function
    const sortData = (data, column, order) => {
        return data.sort((a, b) => {
            const keyA = a[column];
            const keyB = b[column];

            if (typeof keyA === 'number' && typeof keyB === 'number') {
                return order === 'asc' ? keyA - keyB : keyB - keyA;
            } else {
                const strKeyA = String(keyA).toLowerCase();
                const strKeyB = String(keyB).toLowerCase();
                return order === 'asc' ? strKeyA.localeCompare(strKeyB) : strKeyB.localeCompare(strKeyA);
            }
        });
    };

    const handleSort = (column) => {
        // Toggle sorting order if clicking on the same column, otherwise, set to 'asc'
        const newSortOrder = column === sortColumn ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
        setSortOrder(newSortOrder);
        setSortColumn(column);
        const sortedData = sortData([...vehicles], column, newSortOrder);
        setVehicles(sortedData);
    };

    if (vehicles === null) {
        return <div>Loading...</div>;
    }

    const redirectToVehicle = (make, model, year) => {
        const url = `/vehicle/${make}-${model}-${year}`;
        window.location.href = url;
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('make')} className="cursor-pointer">
                            Make {sortColumn === 'make' && sortOrder === 'asc' && '▲'}
                            {sortColumn === 'make' && sortOrder === 'desc' && '▼'}
                        </th>
                        <th onClick={() => handleSort('model')} className="cursor-pointer">
                            Model {sortColumn === 'model' && sortOrder === 'asc' && '▲'}
                            {sortColumn === 'model' && sortOrder === 'desc' && '▼'}
                        </th>
                        <th onClick={() => handleSort('year')} className="cursor-pointer">
                            Year {sortColumn === 'year' && sortOrder === 'asc' && '▲'}
                            {sortColumn === 'year' && sortOrder === 'desc' && '▼'}
                        </th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle, index) => (
                        <tr
                            key={index}
                            onClick={() => redirectToVehicle(vehicle.make, vehicle.model, vehicle.year)}
                            className="relative groupcursor-pointer"
                            role="link"
                            aria-label={`View details for ${vehicle.make} ${vehicle.model} ${vehicle.year}`}
                        >
                            <td className="border border-gray-300 py-2 px-4">
                                {vehicle.make}
                            </td>
                            <td className="border border-gray-300 py-2 px-4">
                                {vehicle.model}
                            </td>
                            <td className="border border-gray-300 py-2 px-4">
                                {vehicle.year}
                            </td>
                            <td className="border border-gray-300 py-2 px-4">
                                <div className="flex items-center justify-center">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Save
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllVehicleTable;
