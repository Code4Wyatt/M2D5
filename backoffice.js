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
    const container = document.querySelector('.entriesGallery');

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
                const gallery = `<div class="movie-gallery m-2 entry-div">
            <h4 class="text-light mt-2 mb-2">${arr[0].category}</h4>
            <div id="${arr[0].category}" class="">
                <div class="">
                ${chunks.map((chunk, i) => `<div class="">
                        <div class="movie-row">
                            <div class="row">
                            ${chunk.map((movie) => `<div class="col-sm-4 col-lg-1 movie-cards">
                                    <div style="color: white;">${movie.name}</div>
                                    <button class="btn-danger" onclick="deleteEntry()">Delete</button>
                                </div>`)
                            .join("")}
                               

                            </div>
                        </div>
                    </div>`)
                        .join("")}

                </div>
               
            </div>

        </div>`;
                container.innerHTML += gallery;
            })
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteEntry = async () => {

}