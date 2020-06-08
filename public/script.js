const base_url = "http://localhost:3000/api/"


async function login() {
    try {
        let req_init = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
        }
        const res = await fetch(base_url + "admin/login", req_init)
        
        if (res.ok) {
            const data = await res.json()

            if (data.statusCode != 200) {
                throw new Error((data.error !== undefined) 
                ? `${data.statusCode}: ${data.message} - ${JSON.stringify(data.error.details).replace(/[\[\]\{\}"'\\]+/g, '').split(':').pop()}`
                : `${data.statusCode}: ${data.message}`) 
            }
            
            console.log(data)
            console.log(data.token)
        }
        else {
            throw new Error(`${res.status}, ${res.statusText}`) 
        }
    }
    catch (err) {
        console.log(err.toString())
    }
}

// elements array
async function addElements(elements) {
    let data = await apiCaller(base_url + "admin/add-elements", {
        elements
    }, 200,
    data => data)
    console.log(data)
}


async function fetchElements() {
    let data = await apiCaller(base_url + "admin/fetch-elements", 
    {}, 200,
    data => data)
    console.log(data)
}


async function wipeElements() {
    let data = await apiCaller(base_url + "admin/wipe-elements", 
    {}, 200,
    data => data)
    console.log(data)
}

async function addQuestions(questions) {
    let data = await apiCaller(base_url + "admin/add-questions", {
        questions
    }, 200,
    data => data)
    console.log(data)
}


async function fetchQuestions() {
    let data = await apiCaller(base_url + "admin/fetch-questions", 
    {}, 200,
    data => data)
    console.log(data)
}


async function wipeQuestions() {
    let data = await apiCaller(base_url + "admin/wipe-questions", 
    {}, 200,
    data => data)
    console.log(data)
}



/**
API Caller helper to refactor common API code that requires bearer tokens (all http requests have POST method)

@param {string} api API URL
@param {object} body body needed for the API call (pass as empty object if not needed)
@param {number} successCode success status code e.g. 200
@param {function} dataReturner data returning function, processes data to return it in a specific format
*/

async function apiCaller(api, body, successCode, dataReturner, ) {
    try {
        let req_init = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`, 
        },
        }
        // if body is an empty object, do not include it
        if (!(Object.keys(body).length === 0 && body.constructor === Object)){
        req_init['body'] = JSON.stringify(body)
        }
        
        const res = await fetch(api, req_init)
        
        if (res.ok) {
        const data = await res.json()

        if (data.statusCode != successCode) {
            throw new Error((data.error !== undefined) 
            ? `${data.statusCode}: ${data.message} - ${JSON.stringify(data.error.details).replace(/[\[\]\{\}"'\\]+/g, '').split(':').pop()}`
            : `${data.statusCode}: ${data.message}`) 
        }
        return dataReturner(data)
        }
        throw new Error(`${res.status}, ${res.statusText}`) 
    }
    catch (err) {
        console.log(err.toString())
        return null //log the error and return null for data
    }
}
    