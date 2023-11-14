import React, { useState } from 'react';
import edit from '../../public/pencil.svg'

const Modal = ({ title, desc, field, field_type, openicon, api_endpoint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldValue, setFieldValue] = useState(field);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
      console.log(error)
      return; // Exit the function if localStorage is not accessible
    }
    try {
      const response = await fetch(api_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionToken
        },
        body: JSON.stringify({ fieldValue }), // Adjust this depending on your API's expected format
      });

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
        {openicon === 'edit' && <img src="../src/assets/pencil.svg" alt="Edit" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {title}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {desc}
                      </p>
                      <input type={field_type} id='edit_value' name='edit_value' value={field} className="border-2 border-gray-500 rounded-sm"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={closeModal} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-blue-500 text-base font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm text-white">
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