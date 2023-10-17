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

    // Filter models for the selected make
    const modelsForMake = vehicleList
      .filter((vehicle) => vehicle.make === selectedMake)
      .map((vehicle) => vehicle.model);

    setSelectedModels(modelsForMake);

    // Filter years for the selected make
    const yearsForMake = vehicleList
      .filter((vehicle) => vehicle.make === selectedMake)
      .map((vehicle) => vehicle.year);

    // Remove duplicate years and sort them
    const uniqueYears = [...new Set(yearsForMake)].sort();

    setSelectedYears(uniqueYears);
  };

  // Function to update selected year
  const handleModelChange = (e) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col text-center border border-gray-300 py-6 px-10">
        <form>
          <div class="py-4">
            <label class="pr-2" >Select Your Car's Make:</label>
            <select className="border border-gray-300" onChange={handleMakeChange}>
              <option value="">Select Make</option>
              {vehicleList.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.make}>
                  {vehicle.make}
                </option>
              ))}
            </select>
          </div>
          <div class="py-4">
            <label class="pr-2" >Select Your Car's Model:</label>
            <select className="border border-gray-300" onChange={handleModelChange}>
              <option value="">Select Model</option>
              {selectedModels.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          <div class="py-4">
            <label class="pr-2">Select Your Car's Year:</label>
            <select className="border border-gray-300" onChange={handleModelChange}>
              <option value="">Select Year</option>
              {selectedYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
