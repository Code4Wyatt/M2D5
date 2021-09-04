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