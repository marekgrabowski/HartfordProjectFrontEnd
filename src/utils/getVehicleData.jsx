async function getVehicleData() {
  try {
    const headers = {
      'Authorization': 'allow',
      'Content-Type': 'application/json',
    };

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    const response = await fetch("https://13g2g9a95h.execute-api.us-east-1.amazonaws.com/api/vehicles", requestOptions);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const responseBody = await response.json();

    if (Array.isArray(responseBody.body)) {
      return responseBody.body;
    } else {
      console.error('API response body is not an array:', responseBody);
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default getVehicleData;
