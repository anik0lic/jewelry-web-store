window.addEventListener("load", function(){
    fetch("http://localhost:9000/kategorija/")
    .then(response => {
        let promise = response.json();

        promise.then(data => {
            for(let i = 0; i < data.length; i++){
                let option = document.createElement("option");
                option.value = data[i].id;
                option.innerHTML = data[i].naziv;
                document.getElementById("kategorija").appendChild(option);
            }
        })
    })
    .catch(err=>console.log(err));

    document.getElementById("forma").addEventListener("submit", function(event){
        event.preventDefault();
        var validno = validacija();
        if(!validno){ return; }

        var noviProizvod = {};
        noviProizvod.naziv = document.getElementById("naziv").value;
        noviProizvod.opis = document.getElementById("opis").value;
        noviProizvod.cena = document.getElementById("cena").value;
        console.log(document.getElementById("kategorija").value);
        noviProizvod.kategorija_id = document.getElementById("kategorija").value;

        fetch("http://localhost:9000/proizvod/", {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noviProizvod)
        })
        .then(succ=>succ.json())
        .then(data=>{
            location.href = "proizvodi.html";
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