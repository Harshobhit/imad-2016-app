console.log('Loaded!');
var register = document.getElementById('register');
    register.onclick = function () {
        alert("hi");
        // Create a request object
        var request = new XMLHttpRequest();

        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
        // Make the request
        var username = document.getElementById('username').value;
        var emailid=document.getElementById('emailid').value;
        var password = document.getElementById('password').value;
        request.open('GET', '/createuser', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username,emailid: emailid,password: password}));
        
              }
          }              
    };
};
