
window.onload = async () => {

    try {
      
        const response = await fetch("https://striveschool-api.herokuapp.com/api/movies/Comedy", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MjkzNzE5NDIsImV4cCI6MTYzMDU4MTU0Mn0.Hkx4RB6mhAb2PvDCTK6p7W2Fe7IKxKfGllbs4jWQq84",
            }
        })
        const fetchedMovies = await response.json()
        displayMovies(fetchedMovies)
        displayMoviesFantasy(fetchedMovies)
         
        
    } catch (err) {
        console.log(err)
    }
}

const displayMovies = (movies) => {
    const comedySection = document.getElementById("comedyOptions")
    
    if (movies) {
        movies.forEach((movie) => {
          comedySection.innerHTML += ` <div class="col px-1"><a href="#"><img src="${movie.imageUrl}" alt="movie image 1"
                    class="w-100 img-fluid mb-2 mb-lg-0"></a>
            </div>`
        })
    }

}

const displayMoviesFantasy = (movies) => {

    const fantasySection = document.getElementById("fantasyOptions")
    try {
      
        const response =  fetch("https://striveschool-api.herokuapp.com/api/movies/Fantasy", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MjkzNzE5NDIsImV4cCI6MTYzMDU4MTU0Mn0.Hkx4RB6mhAb2PvDCTK6p7W2Fe7IKxKfGllbs4jWQq84",
            }
        })
        
        
         if (movies) {
        movies.forEach((movie) => {
          fantasySection.innerHTML += `<div class="col px-1"><a href="#"><img src="${movie.imageUrl}" alt="movie image 1"
                    class="w-100 img-fluid mb-2 mb-lg-0"></a>
            </div>`
        })
    }
        
    } catch (err) {
        console.log(err)
    }
}

    

