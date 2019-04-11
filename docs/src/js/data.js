initializeFirebase();
let db = firebase.firestore();

window.getData = (search, page) => {
  fetch(`https://www.omdbapi.com/?apikey=42aba192&s=${search}&page=${page}`)
    .then(response => response.json())
    .then(response => {
      drawData(response.Search);
    })
    .catch((error) => {
      console.log('Error', error);
      document.getElementById('topPeliculas').style.display = 'none';
      document.getElementById('topSeries').style.display = 'none';
      document.getElementById('searchResult').innerHTML = '<div class="col offset-s4 s6"><img src="../assets/images/noResults.jpg"></div>';
    });
};

document.getElementById('search').addEventListener('keyup', event => {
  event.preventDefault();
  if (event.keyCode === 13) {
    let searchString = document.getElementById('search').value;
    let newSearchString = searchString.replace(' ', '+');
    document.getElementById('pelicula').classList.remove('active');
    document.getElementById('serie').classList.remove('active');
    getData(newSearchString, 1);
    document.getElementById('search').value = '';
  }
});

window.init = () => {
  const topPeliculas = ['tt0372784', 'tt1430132', 'tt1638002', 'tt0304415', 'tt2674426', 'tt6911608', 'tt0097165', 'tt2084970','tt0454921', 'tt1201607', 'tt0119217', 'tt3774114', 'tt4560008', 'tt0223897', 'tt0277027', 'tt0203019', 'tt0914798', 'tt1041829', 'tt0120686', 'tt0129290'];
  const topSeries = ['tt5753856', 'tt0944947', 'tt4574334', 'tt0413573', 'tt2372162', 'tt2085059', 'tt3032476', 'tt0898266', 'tt8462412', 'tt4052886', 'tt0369179', 'tt6470478', 'tt7043380', 'tt0460649', 'tt0903747', 'tt1837492', 'tt0452046', 'tt5674718', 'tt2741602', 'tt2575988'];
  drawTop(topPeliculas, 1);
  drawTop(topSeries, 2);
};

window.cleanSearchResult = () => {
  document.getElementById('searchResult').innerHTML = ' ';
};



window.drawData = (dataArray) => {
  let result = '';
  let poster = '';
  dataArray.forEach(data => {
    let type = getType(data.Type);
    if (data.Poster === 'N/A') {
      poster = '../assets/images/noPoster.jpg';
    } else {
      poster = data.Poster;
    }
    result += `<div class="col offset-s1 s10 m6 l3"><div class="card hoverable">
    <div class="card-image">
      <img class="height-img" src="${poster}">
      <a class="btn-floating halfway-fab waves-effect waves-light red darken-4" onclick="addFavorites('${data.imdbID}')" title="Add to favorites"><i class="material-icons">favorite</i></a>
    </div>
    <div class="card-content">
      <p><b>${data.Title}</b></p> ${type}
    </div>
    <div class="card-action">
     <a><button class="badge cyan accent-4 white-text pointer" onclick="getDetails('${data.imdbID}')"> Detalles </button></a>
    </div></div></div>`;
  });
  document.getElementById('topPeliculas').style.display = 'none';
  document.getElementById('topSeries').style.display = 'none';
  document.getElementById('searchResult').innerHTML = result;
};

window.getType = (type) => {
  let result = '';
  if (type === 'movie') {
    result = '<a><span class="badge black darken-4 white-text lowerCase">Pelicula</span></a>';
  }
  if (type === 'series') {
    result = '<a><span class="badge black darken-4 white-text lowerCase">Serie</span></a>';
  }
  if (type === 'game') {
    result = '<a><span class="badge black darken-4 white-text lowerCase">Videojuego</span></a>';
  }
  return result;
};

window.getDetails = (imdbID) => {
  console.log(imdbID);
  fetch(`https://www.omdbapi.com/?apikey=42aba192&i=${imdbID}`)
    .then(response => response.json())
    .then(response => {
      drawDetails(response);
    })
    .catch(error => {
      console.log('Error', error);
    });
};

window.drawDetails = (dataArray) => {
  const card = `${dataArray.Title}`;
  const card2 = `${dataArray.Rated}
`;
  const card3 = `${dataArray.Year} ${dataArray.Country}
      ${dataArray.Genre}
      ${dataArray.Plot}
  `;
  swal({
    title: card,
    type: 'info',
    html: true,
    text: card2 + card3,
    button: "Ok",
  })
};

window.drawTop = (topArray, typeOfSearch) => {
  let result = '';
  topArray.forEach(element => {
    fetch(`https://www.omdbapi.com/?apikey=42aba192&i=${element}`)
      .then(response => response.json())
      .then(data => {
        let type = getType(data.Type);
        if (data.Poster === 'N/A') {
          poster = '../assets/images/noPoster.jpg';
        } else {
          poster = data.Poster;
        }
        result += `<div class="col offset-s1 s10 m6 l3"><div class="card hoverable">
        <div class="card-image">
          <img class="height-img" src="${poster}">
          <a class="btn-floating halfway-fab waves-effect waves-light red darken-4" onclick="addFavorites('${data.imdbID}')" title="Add to favorites"><i class="material-icons"> favorite </i></a>
        </div>
        <div class="card-content">
          <p><b>${data.Title}</b></p> ${type}
        </div>
        <div class="card-action">
  <a><button class="badge cyan accent-4 white-text  pointer" onclick="getDetails('${data.imdbID}')">Detalles</button></a>
        </div></div></div>`;

        if (typeOfSearch === 1) {
          document.getElementById('topPeliculas').innerHTML = result;
        }
        if (typeOfSearch === 2) {
          document.getElementById('topSeries').innerHTML = result;
        }
        if (typeOfSearch === 3) {
          document.getElementById('favoritos').innerHTML = result;
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
  });
};

document.getElementById('sign-out').addEventListener('click', event => {
  event.preventDefault();
  signOut();
});





