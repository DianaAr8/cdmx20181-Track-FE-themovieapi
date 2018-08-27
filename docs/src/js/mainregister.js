movie.initializeFirebase();
document.getElementById('btn-register').addEventListener('click', event => {
    event.preventDefault();
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    movie.loginUser(email, password);
  });
  
  document.getElementById('btn-google').addEventListener('click', event => {
    event.preventDefault();
    movie.loginWithGoogle();
  });
  
