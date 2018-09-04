const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    get: {
        value: (resource, id) => { 
            return fetch(`${remoteURL}/${resource}/${id}`)
            .then(r => r.json())
        }
    },
    getAll: {
        value: (resource) => {
            return fetch(`${remoteURL}/${resource}`)
            .then(r => r.json())
        }
    },
    delete: {
        value: (resource, id) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
                method: "DELETE"
            })
            .then(r => r.json())
        }
    },
    post: {
        value: (resource, newObject) => {
            return fetch(`${remoteURL}/${resource}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }).then(e => e.json())
        }
    },
    put: {
        value: (resource, newObject, id) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }).then(e => e.json())
        }
    },
    patch: {
        value: (resource, newObject, id) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }).then(e => e.json())
        }
    },


    // kayla's calls 
    getDataByUserId: {
        value: (userId, resource) => {
            return fetch(`${remoteURL}/users/${userId}/${resource}?_sort=date&_order=asc`)
            .then(response => response.json())
        }
    }  
    // end of Kayla's bdCalls
})