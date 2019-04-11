
window.drawFavorites = (id) => {
  db.collection('favorite').doc(id).get()
    .then(response => {
      drawTop(response.data().favorites, 3);
    });
};

window.checkID = (infoID, favorites) => {
  const positionElement = favorites.indexOf(infoID);
  if (positionElement === -1) {
    return true;
  } else {
    return positionElement;
  }
};

window.addFavorites = (id) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection('favorite').get()
        .then(response => {
          response.forEach(element => {
            if (user.uid === element.data().userID) {
              let userFavorites = element.data().favorites;
              console.log(element.data().favorites);
              swal({
                confirmButtonText: 'Ok',
                type: 'success',
                title: 'Se agrego a favoritos',
                icon: 'success'
              });
              
              const checkFavorites = checkID(id, element.data().favorites);
              if (checkFavorites === true) {
                userFavorites.push(`${id}`);
                db.collection('favorite').doc(element.id).update({
                  favorites: userFavorites
                }).then(() => {
                  drawFavorites(element.id);
                }).catch(() => {
                  console.log('No se pudo agregar');
                  swal({
                    confirmButtonText: 'Ok',
                    type: 'error',
                    title: 'Ooops! no se pudo agregar',
                    text: 'Intentalo de nuevo'
                  });
                });
              } else {
                userFavorites.splice(checkFavorites, 1);
                db.collection('favorite').doc(element.id).update({
                  favorites: userFavorites
                }).then(() => {
                  swal({
                    confirmButtonText: 'Ok',
                    type: 'success',
                    title: 'Se ha eliminado de favoritos',
                    icon: 'success'
                  });
                  drawFavorites(element.id);
                }).catch(() => {
                  console.log('No se pudo quitar');
                });
              }
            }
          });
        });
      };
  });
};

  
  window.getUserFavorites = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection('favorite').get()
          .then(response => {
            let i = 0;
            response.forEach(element => {
              if (user.uid === element.data().userID) {
                drawFavorites(element.id);
                i++;
              }
            });
            if (i === 0) {
              db.collection('favorite').add({
                userID: user.uid,
                favorites: []
              }).then(() => {
                console.log('hola');
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        location.href = ('index.html');
      }
    });
  };
  
  getUserFavorites();