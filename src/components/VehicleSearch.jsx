// Author: Marek Grabowski

import React, { useState, useEffect } from 'react';

const Search = () => {
  // Store Data User Selections
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedYears, setSelectedYears] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://13g2g9a95h.execute-api.us-east-1.amazonaws.com/test1/vehicles");
        const data = await response.json();
        const vehicleList = data.body;
        setVehicleList(vehicleList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to update selected make and models based on make selection
  const handleMakeChange = (e) => {
    const selectedMake = e.target.value;
    setSelectedMake(selectedMake);

    // Filter unique models for the selected make
    const modelsForMake = [...new Set(vehicleList
      .filter((vehicle) => vehicle.make === selectedMake)
      .map((vehicle) => vehicle.model)
    )];

    setSelectedModels(modelsForMake);
    setSelectedYear('');
    setSelectedYears([]);
  };

  // Function to update selected year
  const handleModelChange = (e) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear);

    // Filter unique years for the selected make and model
    const yearsForMakeAndModel = [...new Set(vehicleList
      .filter((vehicle) => vehicle.make === selectedMake && vehicle.model === selectedModels[0])
      .map((vehicle) => vehicle.year)
    )];

    setSelectedYears(yearsForMakeAndModel);
  };
  
  const handleSubmit = () => {
  const url = `/vehicle/${selectedMake}-${selectedModels[0]}-${selectedYear}`;
  // Redirect to the constructed URL
  window.location.href = url;
};

  return (
    <div className="flex justify-center">
      <div className="flex flex-col text-center border border-gray-300 py-6 px-10">
        <form>
          <div className="py-4">
            <label className="pr-2">Select Your Car's Make:</label>
            <select className="border border-gray-300" onChange={handleMakeChange}>
              <option value="">Select Make</option>
              {[...new Set(vehicleList.map((vehicle) => vehicle.make))].map((make, index) => (
                <option key={index} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
          <div className="py-4">
            <label className="pr-2">Select Your Car's Model:</label>
            <select className="border border-gray-300" onChange={handleModelChange}>
              <option value="">Select Model</option>
              {selectedModels.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          <div className="py-4">
            <label className="pr-2">Select Your Car's Year:</label>
            <select className="border border-gray-300" onChange={handleModelChange}>
              <option value="">Select Year</option>
              {selectedYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Search;
