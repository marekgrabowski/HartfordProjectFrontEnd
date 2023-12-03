function getSessionToken() {
    try {
        const sessionToken = localStorage.getItem("sessiontoken");
        return sessionToken;
    } catch (error) {
        // Not logged in
        console.error(error);
        return null;
    }
}

export default getSessionToken;