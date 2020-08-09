function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}