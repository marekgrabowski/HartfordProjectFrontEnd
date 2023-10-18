async function getVehicleData() {
    try {
      const response = await fetch("https://13g2g9a95h.execute-api.us-east-1.amazonaws.com/test1/vehicles");
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data.body;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  export default getVehicleData;