export const getUserData = (server, token) => {
    return fetch(server + "GetAccountData", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }})
                .then(response => response);
}

export function loginPost(server, json) {
    return fetch(server + "login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(json)
    }).then(response => response)
}

export function getAllRoles(server, token) {
    return fetch(server + "GetAllRoles", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }}).then(response => response)
}

export function linkingPost(server, json, token) {
    return fetch(server + "linking", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json"
        },
        body: JSON.stringify(json)
    }).then(response => response)
}

export const getRefreshToken = (server, token) => {
    return fetch(server + "refresh", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "refreshToken": token
        })})
        .then(response => response)
}