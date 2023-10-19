import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const VehicleForm = () => {
  const [vehicleList, setVehicleList] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://13g2g9a95h.execute-api.us-east-1.amazonaws.com/test1/vehicles");
        const data = await response.json();
        setVehicleList(data.body);

        // Extract unique makes, models, and years
        const uniqueMakes = [...new Set(data.body.map(vehicle => vehicle.make))];
        const makeModels = {};
        uniqueMakes.forEach(make => {
          const uniqueModels = [...new Set(data.body.filter(vehicle => vehicle.make === make).map(vehicle => vehicle.model))];
          makeModels[make] = uniqueModels;
        });

        const modelYears = {};
        data.body.forEach(vehicle => {
          if (!modelYears[vehicle.model]) {
            modelYears[vehicle.model] = [];
          }
          modelYears[vehicle.model].push(vehicle.year);
        });

        setMakes(uniqueMakes);
        setModels(makeModels);
        setYears(modelYears);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const makeOptions = makes.map(make => ({
    value: make,
    label: make,
  }));

  const modelOptions = selectedMake
    ? models[selectedMake.value].map(model => ({
        value: model,
        label: model,
      }))
    : [];

  const yearOptions = selectedModel
    ? years[selectedModel.value].map(year => ({
        value: year,
        label: year,
      }))
    : [];

  const handleMakeChange = (selectedOption) => {
    setSelectedMake(selectedOption);
    setSelectedModel(null);
    setSelectedYear(null);
  };

  const handleModelChange = (selectedOption) => {
    setSelectedModel(selectedOption);
    setSelectedYear(null);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const handleSubmit = () => {
    if (selectedMake && selectedModel && selectedYear) {
      const url = `/vehicle/${selectedMake.value}-${selectedModel.value}-${selectedYear.value}`;
      // Redirect to the constructed URL
      window.location.href = url;
    } else {
      // Show the notification box when form validation fails
      console.log("redirect failure");
    }
  };

  const isButtonVisible = selectedMake && selectedModel && selectedYear;

  return (
    <div class="flex flex-col gap-2 p-8 items-center grow ">
      <Select
        options={makeOptions}
        value={selectedMake}
        onChange={handleMakeChange}
        placeholder="Select Make"
        className="w-full lg:w-1/2"
      />
      <Select
        options={modelOptions}
        value={selectedModel}
        onChange={handleModelChange}
        placeholder="Select Model"
        isDisabled={!selectedMake}
        className="w-full lg:w-1/2"
      />
      <Select
        options={yearOptions}
        value={selectedYear}
        onChange={handleYearChange}
        placeholder="Select Year"
        isDisabled={!selectedModel}
        className="w-full lg:w-1/2"
      />
      {isButtonVisible && (
        <button
    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded w-1/2 lg:w-1/4 opacity-0}`}
    onClick={handleSubmit}
  >
    Submit
  </button>
      )}
    </div>
  );
};

export default VehicleForm;
