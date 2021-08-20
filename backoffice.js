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
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2Mjk0NTMyNDIsImV4cCI6MTYzMDY2Mjg0Mn0.eZpE0pLL9BIN2aTGCf3Q37c89KkMb6rKzGTce_siMvU",
            }
        })

    } catch (err) {
        console.log(err);
    }

}