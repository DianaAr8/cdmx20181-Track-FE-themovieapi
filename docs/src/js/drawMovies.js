window.drawMovies = (moviesArray) => {
    let result = '';
    moviesArray.forEach(movie => {
        result += `<div class="col-sm-6 col-md-4 col-lg-3 mt-4">
                <div class="card">
                <a type= "button" class="btn btn-primary" data-toggle="modal" data-target="#${movie.imdbID}">
                    <img class="card-img-top" src="${movie.Poster}">
                </a>
                </div>
    <div class="modal fade" id="${movie.imdbID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">D' Pelicula</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                </div>
                <img class="card-img-top" src="${movie.Poster}">
                    <h4 class="card-title mt-4">${movie.Title}</h4>
                <h6 class="card-title mt-4">${movie.Type}</h6>
               
                <h6 class="card-title mt-4">${movie.Year}</h6>
            
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`;
    });
    document.getElementById('movies').innerHTML = result;

};