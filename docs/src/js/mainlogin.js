movie.initializeFirebase();

document.getElementById('btn-register').addEventListener('click', event => {
  event.preventDefault();
  let email = document.getElementById('login-email').value;
  let password = document.getElementById('login-password').value;
  movie.registerUser(email, password);
});

document.getElementById('btn-google').addEventListener('click', event => {
  event.preventDefault();
  movie.loginWithGoogle();
});

