// Author: Marek Grabowski
import { useState, useEffect } from "react";
import Select from 'react-select';


export default function VehicleForm({ makes }) {
  makes = makes.map((make) => ({
    value: make.make_name,
    label: make.make_name,
  }));
  // Pass in fetch makes list (Done in document /search/)
  // Declare other consts w/ useState to safely update
  // Lists
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);

  // Active Options
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);


  useEffect(() => {
    if (selectedMake) {
      fetchModels();
    }
  }, [selectedMake]);

  useEffect(() => {
    if (selectedModel) {
      fetchYears();
    }
  }, [selectedModel]);

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

        const response = await fetch(`https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/vehicles/models?make=${selectedMake.value}`, requestOptions);
        const data = await response.json();

        const modelOptions = data.body.map((model) => ({
          value: model.model_name,
          label: model.model_name,
        }));

        setModels(modelOptions);
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
  
        const response = await fetch(`https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/vehicles/modelyears?model=${selectedModel.value}`, requestOptions);
        const data = await response.json();
  
        // Map the years and set the state variable
        const yearOptions = data.body.map((year) => ({
          value: year.modelyear_id,
          label: year.modelyear,
        }));
  
        setYears(yearOptions);
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    }
  };

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
      const url = `/vehicle/${selectedYear.value}`;
      window.location.href = url;
    } else {
      console.log("Redirection Error");
    }
  }

  const isButtonVisible = selectedMake && selectedModel && selectedYear;

  return (
    <div className="flex flex-col gap-2 p-8 items-center grow ">
      <Select
        options={makes}
        value={selectedMake}
        onChange={handleMakeChange}
        placeholder="Select Make"
        className="w-full lg:w-1/2"
      />
      <Select
        options={models}
        value={selectedModel}
        onChange={handleModelChange}
        placeholder="Select Model"
        isDisabled={!selectedMake}
        className="w-full lg:w-1/2"
      />
      <Select
        options={years}
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