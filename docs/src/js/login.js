window.movie = { 
    initializeFirebase: () => {
        firebase.initializeApp ({
        apiKey: "AIzaSyDC2YXL1902nCIS4Bez9Bw-zPmr5TXFd8U",
        authDomain: "apimovie-58b49.firebaseapp.com",
        databaseURL: "https://apimovie-58b49.firebaseio.com",
        projectId: "apimovie-58b49",
        storageBucket: "",
        messagingSenderId: "740357602304"
    });
    },
    
    loginUser: (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result => {
            location.href = 'views/drawMovie.html';
        })
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            // Error por contraseña invalida 
            if (errorCode === 'auth/wrong-password') {
                swal({
                  confirmButtonText: 'Aceptar',
                  type: 'error',
                  title: 'Contraseña inválida',
                  text: 'Inténtalo de nuevo'
                });
                // Si el error es de usuario no encontrado o email inválido mandara la sigueinte alerta
              } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
                swal({
                  confirmButtonText: 'Aceptar',
                  type: 'error',
                  title: 'Usuario inválido',
                  text: 'Inténtalo de nuevo'
                });
              }
            });
        },
      // Ingreso de Usuario con cuenta de Google
      loginWithGoogle: () => {
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
            location.href = 'views/drawMovie.html';
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
              alert('Este correo ya fue registrado, intenta con otro');
            }
          });
      },
    
      // Registro de usuario tomando como parametros su email y password
      registerUser: (email, password) => {
        // Función de firebase para crear usuario
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(result => {
            let user = firebase.auth().currentUser;
            // Mandara un email de verificación de cuenta
            user.sendEmailVerification()
              .then(result => {
                swal({
                    confirmButtonText: 'Aceptar',
                    type: 'success',
                    title: 'Su registro fue exitoso',
                    text: 'Se ha enviado un correo de verificación a su cuenta'
                  });
                })
            // Si ocurre un error efectuara lo siguiente
            if (errorCode === 'auth/wrong-password') {
                // Se muestra alerta de error según el dato incorrecto
                swal({
                  confirmButtonText: 'Aceptar',
                  type: 'error',
                  title: 'Contraseña inválida',
                  text: 'Inténtalo de nuevo'
                });
                // Errores de usuario no encontrado o email inválido
              } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
                swal({
                  confirmButtonText: 'Aceptar',
                  type: 'error',
                  title: 'Usuario inválido',
                  text: 'Inténtalo de nuevo'
                });
                // Error de correo electrónico ya en uso
              } else if (errorCode === 'auth/email-already-in-use') {
                swal({
                  confirmButtonText: 'Aceptar',
                  type: 'error',
                  title: 'Usuario ya registrado',
                  text: 'Verifica tus datos'
                }); 
              }
            });
        },
      
      // Cerrar sesión
    
      signOut: () => {
        // Función de firebase para cerrar sesión
        firebase.auth().signOut()
          .then(result =>{
            // Enviara al usuario a la página principal (login 'index.html')
            location.href = ('../index.html');
          }).catch(error =>{
            console.log('Error al cerrar sesión', error);
          });
      }        
    };
    