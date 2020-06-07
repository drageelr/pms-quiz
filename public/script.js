let my_url = "http://localhost:3000/api/";

function test() {
    alert("TEST!");
}

async function login() {
    try {
        payload = {
            body: {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            }
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

        console.log(response);
    } catch(err) {
        console.log(err);
    }
}