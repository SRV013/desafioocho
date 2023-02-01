const API_BASE_URL = "https://m7-mascotas.onrender.com";

export async function userLogin(email, password) {
    const token = await fetch(API_BASE_URL + "/usuario/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
    });
    const tokenJson = await token.json();
    return tokenJson;
}

export async function userShow(token, idUser) {     
    const data = await fetch(API_BASE_URL + "/usuario/" + idUser[0], {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token[0]}`,
        }
    });
    const dataJson = await data.json();    
    return dataJson;
}