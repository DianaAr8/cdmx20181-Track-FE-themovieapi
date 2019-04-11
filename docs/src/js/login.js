initializeFirebase();
let db = firebase.firestore();

    document.getElementById('btn-signIn').addEventListener('click', event => {
      event.preventDefault();
      const email = document.getElementById('signIn-email').value;
      const password = document.getElementById('signIn-password').value;
      loginUser(email, password);
    });
  
    document.getElementById('btn-facebook').addEventListener('click', event => {
      event.preventDefault();
      loginWithFacebook();
    });
  
    document.getElementById('btn-google').addEventListener('click', event => {
      event.preventDefault();
      loginWithGoogle();
    });
 
    document.getElementById('btn-signUp').addEventListener('click', event => {
      event.preventDefault();
      const email = document.getElementById('signUp-email').value;
      const password = document.getElementById('signUp-password').value;
      registerUser(email, password);
    });

 
 
  