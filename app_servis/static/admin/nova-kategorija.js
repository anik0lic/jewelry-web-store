window.addEventListener("load", function(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById("forma").addEventListener("submit", function(event){
        event.preventDefault();
        var validno = validacija();	
        if(!validno){ return; }

        var novaKategorija = {};	
        novaKategorija.naziv = document.getElementById("naziv").value;

        fetch("http://localhost:9000/kategorija/", {
            method:"POST",
            headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(novaKategorija)
        })
        .then(succ=>succ.json())
        .then(data=>{
            location.href = "kategorije.html";
        })
        .catch(err => console.log(err));	
    });
});

function validacija(){
    var validno = true;
    if(document.getElementById("naziv").value.length < 3){
        validno = false;
        document.getElementById("naziv").classList.add("error");
        document.getElementById("naziv").classList.remove("success");
    }
    else{
        document.getElementById("naziv").classList.add("success");
        document.getElementById("naziv").classList.remove("error");
    }

    return validno;
}