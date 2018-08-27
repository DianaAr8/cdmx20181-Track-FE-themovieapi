window.drawMovies = (moviesArray) => {
    let result = '';
    moviesArray.forEach(movie => {
        result += `<div>
        <img class="card-img-top" src="${movie.Poster}">
        <h4 class="card-title mt-4">${movie.Title}</h4>
        <h6 class="card-title mt-4">${movie.Type}</h6>
    
        <h6 class="card-title mt-4">${movie.Year}</h6>
    </div>
    </div>`;
    });
    document.getElementById('movies').innerHTML = result;
};