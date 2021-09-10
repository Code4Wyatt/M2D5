window.onload = async () => {
    

    displayEntries();

}

const handleSubmit = async (event) => {
    event.preventDefault()

    const url = "https://striveschool-api.herokuapp.com/api/movies/"

    

    const newMovie = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        imageUrl: document.getElementById("imageUrl").value,
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newMovie),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzA3NzU5NTEsImV4cCI6MTYzMTk4NTU1MX0.bVwbyj0OXWNQQreEe-rKNeN5Zq68tI7aarukx9rnoWM",
                "username": "testusername",
                "password":"pass"
            }
        })
        
    } catch (err) {
        console.log(err);
    }

}

const displayEntries = async () => {
    const container = document.getElementsByClassName('.entriesGallery')

    try {
        const entryData = await fetch("https://striveschool-api.herokuapp.com/api/movies/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzA3NzU5NTEsImV4cCI6MTYzMTk4NTU1MX0.bVwbyj0OXWNQQreEe-rKNeN5Zq68tI7aarukx9rnoWM",
                "Content-Type": "application/json",
            },
            //body: JSON.stringify(yourBody) ONLY IF NEEDED
        });
        //now get data
        if (entryData.ok) {
            const categories = await entryData.json();
            console.log(categories);
            const movies = await Promise.all(
                categories.map(async (category) => {
                    const res = await fetch(
                        "https://striveschool-api.herokuapp.com/api/movies/" + category, {
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzA3NzU5NTEsImV4cCI6MTYzMTk4NTU1MX0.bVwbyj0OXWNQQreEe-rKNeN5Zq68tI7aarukx9rnoWM",
                        },
                    }
                    );
                    return await res.json();
                })
            );
            console.log(movies);
            movies.forEach(arr => {
                console.log(arr);
                const chunks = [];
                let k = 0
                while (k < arr.length) {
                    chunks.push(arr.slice(k, (k += 6)));
        }
                console.log(chunks);
                const entries = `<div>${movies.imageUrl}</div>`;
                container.innerHTML += entries;
            })
        }
    } catch (error) {
        console.error(error);
    }
}