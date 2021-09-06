window.onload = () => {
    getMovies();
}


const getMovies = async () => {
    //movie categories
    const container = document.querySelector('.genres');
    try { 
        const rawData = await fetch("https://striveschool-api.herokuapp.com/api/movies/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MzA3NzU5NTEsImV4cCI6MTYzMTk4NTU1MX0.bVwbyj0OXWNQQreEe-rKNeN5Zq68tI7aarukx9rnoWM",
                "Content-Type": "application/json",
            },
            //body: JSON.stringify(yourBody) ONLY IF NEEDED
        });
        //these are actual movies 
        if (rawData.ok) {
            const categories = await rawData.json();
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
                const chunks = []
                let k = 0
                while (k < arr.length) {
                    chunks.push(arr.slice(k, (k += 6)));
                }
                console.log("chunks:", chunks)
                // const gallery = `
                //  ${chunks.map((chunk, i) => `
                //                  ${chunk.map((movie) => `
                //                     <img class="movie-cover img-fluid" src="${movie.imageUrl}">
                //                 `)}
                               

                //              `)
                //          .join("")}
                // `
//                 const gallery = `
//                 <div class="movie-gallery m-2">
//                 <h5 class="text-light mt-2 mb-2">${arr[0].category}</h5>
//                 <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
//     <div class="carousel-inner">
//      ${chunks.map((chunk, i) => `<div class="carousel-item ${i === 1 ? "active" : ""}">
//                             <div class="movie-row">
//                               <div class="row">
//                                  ${chunk.map((movie) => `<div class="col-md-2">
//                                     <img class="movie-cover" src="${movie.imageUrl}">
//                                 </div>`)}
                               

//                              </div>
//                          </div>
//                      </div>`)
//                          .join("")}
  
//     </div>
//   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Previous</span>
//   </button>
//   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Next</span>
//   </button>
// </div>
// </div>
//                 `
                const gallery = `<div class="movie-gallery m-2">
            <h5 class="text-light mt-2 mb-2">${arr[0].category}</h5>
            <div id="${arr[0].category}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                ${chunks.map((chunk, i) => `<div class="carousel-item ${i === 1 ? "active" : ""}">
                        <div class="movie-row">
                            <div class="row">
                            ${chunk.map((movie) => `<div class="col-md-2">
                                    <img class="movie-cover" src="${movie.imageUrl}">
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