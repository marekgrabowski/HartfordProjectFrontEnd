async function getPermission(route) {
    try {
        const headers = {
            Authorization: sessionToken,
            "Content-Type": "application/json",
        };

        const requestOptions = {
            method: 'GET',
            headers: headers,
        };

        const request = `?route=${route}`;
        const apiUrl = `https://fd1vjz5z8c.execute-api.us-east-1.amazonaws.com/api/check-route-access${request}`;
        const response = await fetch(apiUrl, requestOptions);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data.body.access;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}

export default getPermission;