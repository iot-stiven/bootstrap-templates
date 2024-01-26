async function login() {
    const response = await fetch(`${API_ROOT_URL}/login`, {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            name: API_USERNAME,
            password: API_PASSWORD
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json()
    localStorage.setItem("token", data.access_token)
    localStorage.setItem("username", data.name)
    localStorage.setItem("role", data.role)
}

async function fetchData(url) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_ROOT_URL}/${url}`, {
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });
    return await response.json();
}

async function saveData(url, data) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_ROOT_URL}/${url}`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
    return await response.json()
}

async function updateData(url, data) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_ROOT_URL}/${url}`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
    return await response.json();
}

async function deleteData(url) {
    const token = localStorage.getItem("token");
    console.log(url)
    const response = await fetch(`${API_ROOT_URL}/${url}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
    return await response.json();
}
