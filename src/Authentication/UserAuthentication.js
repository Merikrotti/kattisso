export const getUserData = (server, token) => {
    return fetch(server + "GetAccountData", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }})
                .then(response => response);
}