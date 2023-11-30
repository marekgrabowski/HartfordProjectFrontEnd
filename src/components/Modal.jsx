import React, { useState, useEffect } from "react";
import edit from "../../public/pencil.svg";

const Modal = ({
  title,
  desc,
  field_type,
  openicon,
  api_endpoint,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState([]);

  const formatLabel = (label) => {
    return label.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api_endpoint, {
          headers: {
            "Authorization": "allow",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.body && data.body.config) {
          setFields(data.body.config.map(item => ({
            config_name: item.config_name,
            value: item.value,
            label: formatLabel(item.config_name)
          })));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [api_endpoint]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (index, newValue) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, value: newValue } : field
    );
    setFields(updatedFields);
  };

  const handleSave = async () => {
    // Perform the API call
    let sessionToken;
    try {
      sessionToken = localStorage.getItem("sessiontoken");
      if (!sessionToken) {
        throw new Error("No session token found");
      }
    } catch (error) {
      console.log(error);
      return; // Exit the function if localStorage is not accessible
    }

    try {
      const response = await fetch(api_endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "allow",
        },
        body: JSON.stringify({ config: fields }),
      });
      console.log(fields);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle the response here
      console.log("Save successful");
    } catch (error) {
      console.error("Error saving data:", error);
    }

    closeModal();
  };

  return (
    <>
      <button onClick={openModal} className="px-4 py-2 text-white rounded">
        {openicon === "edit" && (
          <img src="../src/assets/pencil.svg" alt="Edit" />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {title}
                    </h3>
                    <p className=" text-sm"> {desc}</p>
                    <div className="mt-2">
                      {fields.map((field, index) => (
                        <div className="my-2" key={index}>
                          <label htmlFor={`field-${index}`}>
                            {field.label}
                          </label>
                          <input
                            type={field_type}
                            id={`field-${index}`}
                            name={`field-${index}`}
                            value={field.value}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            className=" ml-2 border-2 border-gray-400 rounded-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-blue-500 text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm text-white"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
