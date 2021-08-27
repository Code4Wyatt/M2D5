
const getMovies = async () => {

    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/movies/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MjkzNzE5NDIsImV4cCI6MTYzMDU4MTU0Mn0.Hkx4RB6mhAb2PvDCTK6p7W2Fe7IKxKfGllbs4jWQq84",
            },

        }
        );

        if (response.ok) {
            const categories = await response.json();
            console.log(categories);
            const movies = await Promise.all(categories.map(async (category) => {
                const result = await fetch("https://striveschool-api.herokuapp.com/api/movies/" + category,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjllNzJkNTI2MjAwMTViNmRjYTIiLCJpYXQiOjE2MjkzNzE5NDIsImV4cCI6MTYzMDU4MTU0Mn0.Hkx4RB6mhAb2PvDCTK6p7W2Fe7IKxKfGllbs4jWQq84",
                        },
                    });
                       return await result.json();
            })
        };
    
        console.log(movies);
    }
    } catch (error) {
        console.log(error);
    }
};


    window.onload = async () => {
        await getMovies();
    };