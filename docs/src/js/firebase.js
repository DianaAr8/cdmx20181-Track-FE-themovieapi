window.initializeFirebase = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyAk448dEuKcYUgfJM96t4O4h8jBPhYwOfo",
      authDomain: "movies-ee23e.firebaseapp.com",
      databaseURL: "https://movies-ee23e.firebaseio.com",
      projectId: "movies-ee23e",
      storageBucket: "",
      messagingSenderId: "819706592086"
    });
  };

    // Función para ingreso de usuaro ya registrado con email y contraseña
    window.loginUser = (email, password) => {
      // función ya dada por firebase para verificar usuario y conraseña
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          // De ser correcta la información de usuario se le enviara a la pagina de news(muro donde estarán los post/comentarios)
          location.href = 'userView.html';
        }).catch(error => {
        let errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          swal({
            confirmButtonText: 'Ok',
            type: 'error',
            title: 'Contraseña invalida',
            text: 'Intentalo de nuevo'
          });
        } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
          swal({
            confirmButtonText: 'Aceptar',
            type: 'error',
            title: 'Email invalido',
            text: 'Por favor intenta de nuevo'
          });
        }
      });
  };
                      
    // Ingreso de Usuario con cuenta de Google
    window.loginWithGoogle = () => {
      // Función predeterminada por firebase
      let provider = new firebase.auth.GoogleAuthProvider();
      // Se conecta a la API DE Google
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // Manda a otra ventana más pequeña para poder acceder por medio de Google
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          // Nos proporciona un token de acceso de Google para acceder a la API de Google
          let token = result.credential.accessToken;
          let user = result.user;
          // De ser correcta la información de usuario se le enviara a la pagina de news(muro donde estarán los post/comentarios)
          location.href = 'userView.html';
          console.log(result);
          // Si contiene algun error verificara y mandará lo siguiente
        }).catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;
          // Error de cuenta existente con otra credencial
          if (errorCode === 'auth/account-exists-with-different-credential') {
            // Mandara la siguiente alerta
            swal({
              confirmButtonText: 'Aceptar',
              type: 'error',
              title: 'Este email ya fue registrado',
              text: 'Por favor intenta con otro'
            });
          }
        });
    };
  
    // Ingreso de usuario con Facebook 
  
    window.loginWithFacebook = () => {
      // Función predeterminada por firebase para el acceso con Facebook
      let provider = new firebase.auth.FacebookAuthProvider();
      // Manda a otra ventana más pequeña para poder acceder por medio de Google
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          let token = result.credential.accessToken;
          let user = result.user;
          location.href = 'userView.html';
        }).catch(error => { 
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
             swal({
              confirmButtonText: 'Aceptar',
              type: 'error',
              title: 'Este usario ya fue registrado',
              text: 'Por favor intenta con otro'
            });
          }
         
        });
    },
  
    // Registro de usuario tomando como parametros su email y password
    window.registerUser = (email, password) => {
      // Función de firebase para crear usuario
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          let user = firebase.auth().currentUser;
          // Mandara un email de verificación de cuenta
          user.sendEmailVerification()
            .then(result => {
              location.href = ('userView.html')
              console.log('Correo enviado');
              swal({
                confirmButtonText: 'Aceptar',
                type: 'success',
                title: 'Ha sido enviado un email de verificación a tu cuenta',
                icon: 'success'
              });
            });
          // Si ocurre un error efectuara lo siguiente
        }).catch(error => {
          let errorCode = error.code;
          if (errorCode === 'auth/invalid-email') {
            swal({
              confirmButtonText: 'Ok',
              type: 'error',
              title: 'Dirección de email invalida',
              text: 'Por favor intenta de nuevo'
            });
          } else if (errorCode === 'auth/weak-password') {
            swal({
              confirmButtonText: 'Ok',
              type: 'error',
              title: 'Esta cuenta ya esta en uso',
              text: 'Por favor intenta con una nueva'
            });
          } else if (errorCode === 'auth/email-already-in-use') {
            swal({
              confirmButtonText: 'Ok',
              type: 'error',
              title: 'Esta cuenta ya esta en uso',
              text: 'Por favor intenta con una nueva'
            });
          }
        });
    };
            

    // Cerrar sesión
  
    window.signOut = () => {
      // Función de firebase para cerrar sesión
      firebase.auth().signOut()
        .then(result =>{
          // Enviara al usuario a la página principal (login 'index.html')
          location.href = ('index.html');
        }).catch(error =>{
          console.log('Error al cerrar sesión', error);
        });
    };