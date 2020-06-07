let my_url = "http://localhost:3000/api/";

function test() {
    alert("TEST!");
}

async function login() {
    try {
        payload = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        console.log(payload);

        let response = await fetch(my_url + "admin/login", {
            credentials: 'same-origin',
            method: "POST",
            body: JSON.stringify(payload),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })

        let data = await response.json();

        console.log(data);
    } catch(err) {
        console.log(err);
    }
}