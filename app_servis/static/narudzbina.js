var idNarudzbine = null;
window.addEventListener("load", function(){
    var url = new URL( window.location.href );
    idNarudzbine = url.searchParams.get("id");
    console.log(idNarudzbine);

    fetch("http://localhost:9000/narudzbina/" + idNarudzbine).then( resp=>resp.json() )
    .then( data=>{
        console.log(data);
        document.getElementById("vreme").innerHTML = data.vreme_narucivanja; 
        document.getElementById("adresa").innerHTML = data.adresa; 
        document.getElementById("telefon").innerHTML = data.telefon; 
        document.getElementById("ime_prezime").innerHTML = data.ime_prezime; 
        document.getElementById("cena").innerHTML = data.cena; 
        document.getElementById("status").value = data.status;

        let ul = document.getElementById("sadrzaj");
        for(let i = 0; i < data.stavka.length; i++){
            let li = document.createElement("li");
            fetch("http://localhost:9000/proizvod/" + data.stavka[i].proizvod_id).then( resp=>resp.json() )
            .then( data=>{
                li.innerHTML += data.naziv + " ";
            })
            .then(response => {
                li.innerHTML += "x" + data.stavka[i].komada + "<br>";
            })
            .catch(err=>console.log(err));
            ul.appendChild(li);
        }  
    })
    .catch(err=>console.log(err));
});