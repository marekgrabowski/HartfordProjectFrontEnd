import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const VehicleForm = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const headers = {
          'Authorization': 'allow',
          'Content-Type': 'application/json',
        };

        const requestOptions = {
          method: 'GET',
          headers: headers,
        };

        const response = await fetch("https://13g2g9a95h.execute-api.us-east-1.amazonaws.com/test1/vehicles/GetAllMakes", requestOptions);
        const data = await response.json();
        setMakes(data.body);
      } catch (error) {
        console.error('Error fetching makes:', error);
      }
    };

    fetchMakes();
  }, [selectedMake]);
  
  const fetchModels = async () => {
    if (selectedMake) {
      try {
        const headers = {
          'Authorization': 'allow',
          'Content-Type': 'application/json',
        };

        const requestOptions = {
          method: 'GET',
          headers: headers,
        };

        const response = await fetch(`https://13g2g9a95h.execute-api.us-east-1.amazonaws.com/test1/vehicles/GetModelsForMake?make=${selectedMake.value}`, requestOptions);
        const data = await response.json();
        console.log(data)
        setModels(data.body);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    }
  };

  const fetchYears = async () => {
    if (selectedModel) {
      try {
        const headers = {
          'Authorization': 'allow',
          'Content-Type': 'application/json',
        };

        const requestOptions = {
          method: 'GET',
          headers: headers,
        };

        const response = await fetch(`YOUR_YEARS_API_ENDPOINT?make=${selectedMake.value}&model=${selectedModel.value}`, requestOptions);
        const data = await response.json();
        setYears(data.body);
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    }
  };

  const makeOptions = makes.map(make => ({
    value: make.make_id,
    label: make.make_name,
  }));

  const modelOptions = selectedMake
    ? models.map(model => ({
        value: model.model_id,
        label: model.model_name,
      }))
    : [];

  const yearOptions = selectedModel
    ? years.map(year => ({
        value: year.year_name,
        label: year.year_name,
      }))
    : [];

  const handleMakeChange = (selectedOption) => {
    setSelectedMake(selectedOption);
    setSelectedModel(null);
    setSelectedYear(null);
    fetchModels();
  };

  const handleModelChange = (selectedOption) => {
    setSelectedModel(selectedOption);
    setSelectedYear(null);
    fetchYears();
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
    <div className="flex flex-col gap-2 p-8 items-center grow">
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
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-1/2 lg:w-1/4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default VehicleForm;
