import React, { useState } from "react"; 
import Loading from './Loading'; // Import your Loading component

export default function Login() {
import React, { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    var xhr = new XMLHttpRequest();
    var url = 'https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/accounts/login';

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
      setIsLoading(false);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Login successful');
          // Handle successful login here
        } else {
          setError('Error during login: ' + xhr.statusText);
        }
      }
    };

    var data = JSON.stringify({
      "username": formData.email,
      "password": formData.password
    });

    xhr.send(data);
  };


  return (

    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/The_Hartford_Financial_Services_Group_logo.svg/1200px-The_Hartford_Financial_Services_Group_logo.svg.png" alt="Hartford Logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account (This application is independant from the Hartford).</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email" onChange={handleChange} required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" autoComplete="current-password" onChange={handleChange} required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>
        )}
        <div className="text-red-500 text-sm mt-2">{error}</div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">&nbsp;Create an account</a>
        </p>
      </div>
    </div>
  );
}