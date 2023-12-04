async function getPermission(sessionToken, route) {
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
            return { access: data.body.access, role: data.body.role };
        } else {
            return { access: false, role: null };
        }
    } catch (e) {
        console.log(e);
        return { access: false, role: null };
    }
}

export default getPermission;
