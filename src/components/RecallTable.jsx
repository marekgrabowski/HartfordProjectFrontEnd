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
          // Handle the situation where the status code is 400 (Bad Request)
          if (response.status === 400) {
            setRecalls({ Count: 0, results: [] });
          } else {
            throw new Error(`Network response was not ok. Status: ${response.status} - ${response.statusText}`);
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
    <div className="grid grid-cols-4 gap-2">
      {error ? (
        <p>Error: {error}</p>
      ) : recalls !== null ? (
        recalls.Count === 0 ? (
          <p>No recalls found</p>
        ) : (
          recalls.results.map((result, index) => (
            <><div key={index} className="col-span-1 flex items-center justify-end">
              <p className="mr-2">{result.ReportReceivedDate}:</p>
            </div><div className="col-span-3 rounded bg-gray-100 border border-gray-200 p-2">
                <p className="pl-2 w-max">{result.Component}</p>
              </div></>
          ))
        )
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RecallTable;
