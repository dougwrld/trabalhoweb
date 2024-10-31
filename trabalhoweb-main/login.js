document.getElementById("formLogin").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(username === "admin" && password === "1234") {
        alert ("Bem vindo!");
        localStorage.setItem("loggado", "true");
        window.location.href = "cadastro.html";
     } else {  
        alert ("Usuario ou senha incorreto!")
        window.location.href = "index.html"; 
    } 
})
