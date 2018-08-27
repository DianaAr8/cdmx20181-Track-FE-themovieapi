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
}

// const url = 'http://www.omdbapi.com/?s=movie&apikey=5f0598fe'
// window.onload = () => {
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         const movies = data;
//         //console.log(data);
//         getMovies(movies);
        
//       })
//       .catch(error =>{
//         console.log('Error');
//       });
//   };


// window.onload = (movie) => {
// const url = 'http://www.omdbapi.com/?s=${movie}&apikey=5f0598fe'
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         const movies = data;
//         //console.log(data);
//         getMovies(movies);
        
//       })
//       .catch(error =>{
//         console.log('Error');
//       });
//   };