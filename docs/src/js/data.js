window.getMovies = (search) => {
    fetch(`http://www.omdbapi.com/?apikey=5f0598fe&s=${search}`)
        .then(response => response.json())
        .then(response => {
            drawMovies(response.Search);
            console.log(response.Search);

        })
        .catch(error => {
            console.log('Error', error);
        })
};