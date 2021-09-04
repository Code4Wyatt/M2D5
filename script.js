window.onload = () => {
    getMovies();
}


const getMovies = async () => {
    const container = document.querySelector('.genres');
    try { 
        const rawData = await fetch("https://striveschool-api.herokuapp.com/api/movies/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzAzMzM2MDUsImV4cCI6MTYzMTU0MzIwNX0.-zeuxRckaZjZy4TaND-8fOkkra59Ebbo14uttSGPkQE",
                "Content-Type": "application/json",
            },
            //body: JSON.stringify(yourBody) ONLY IF NEEDED
        });

        if (rawData.ok) {
            const categories = await rawData.json();
            console.log(categories);
            const movies = await Promise.all(
                categories.map(async (category) => {
                    const res = await fetch(
                        "https://striveschool-api.herokuapp.com/api/movies/" + category, {
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzAzMzM2MDUsImV4cCI6MTYzMTU0MzIwNX0.-zeuxRckaZjZy4TaND-8fOkkra59Ebbo14uttSGPkQE",
                        },
                    }
                    );
                    return await res.json();
                })
            );
            console.log(movies);
            movies.forEach(arr => {
                console.log(arr);
                const chunks = []
                let k = 0
                while (k < arr.length) {
                    chunks.push(arr.slice(k, (k += 6)));
                }
                console.log("chunks:", chunks)
                const gallery = `<div class="movie-gallery m-2">
            <h5 class="text-light mt-2 mb-2">${arr[0].category}</h5>
            <div id="${arr[0].category}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                ${chunks.map((chunk) => `<div class="carousel-item ${i === 1 ? "active" : ""}">
                        <div class="movie-row">
                            <div class="row">
                            ${chunk.map((movie) => `<div class="col-md-2">
                                    <img class="movie-cover" src="./assets/media/media0.jpg">
                                </div>`)}
                               

                            </div>
                        </div>
                    </div>`)
                        .join("")}

                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${arr[0].category}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#trending-now" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

        </div>`;
                container.innerHTML += gallery;
            });
        }
       
    } catch (error) {
        console.error(error)
    }
}