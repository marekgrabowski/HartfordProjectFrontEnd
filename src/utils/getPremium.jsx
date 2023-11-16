async function getPremium(make, model, year) {
    try {
        let sessionToken;
        
        try {
            sessionToken = localStorage.getItem("sessiontoken");
            if (!sessionToken) {
                throw new Error("No session token found");
            }
        } catch (localStorageError) {
            console.error(localStorageError.message);
            throw localStorageError; // Re-throw the error to propagate it
        }

        const headers = {
            Authorization: sessionToken,
            "Content-Type": "application/json",
        };

        const requestOptions = {
            method: 'GET',
            headers: headers,
        };

        const request = `?make=${make}&model=${model}&modelyear=${year}`;
        const apiUrl = `https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/vehicles/premium${request}`;

        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.body.premium !== undefined) {
            return data.body.premium;
        } else {
            throw new Error(JSON.stringify(data));
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return "Unable to Calculate Premium";
    }
}

export default getPremium;