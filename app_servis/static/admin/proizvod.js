var idProizvoda = null;
window.addEventListener("load", function(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    var url = new URL( window.location.href );
    idProizvoda = url.searchParams.get("id");
    console.log(idProizvoda);

    fetch("http://localhost:9000/kategorija/",{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
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

    fetch("http://localhost:9000/materijal/",{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        let promise = response.json();

        promise.then(data => {
            for(let i = 0; i < data.length; i++){
                let option = document.createElement("option");
                option.value = data[i].id;
                option.innerHTML = data[i].naziv;
                document.getElementById("spisak-materijala").appendChild(option);
            }
        })
    })
    .catch(err=>console.log(err));

    fetch("http://localhost:9000/proizvod/" + idProizvoda,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( resp=>resp.json() )
    .then( data=>{
        console.log(data);
        document.getElementById("naziv").value = data.naziv; 
        document.getElementById("opis").value = data.opis; 
        document.getElementById("cena").value = data.cena;
        document.getElementById("kategorija").value = data.kategorija_id;

        console.log(data.materijal);

        for(let i = 0; i < data.materijal.length; i++){
            dodajMaterijal(data.materijal[i].materijal_id, data.materijal[i].id);
        }  
    })
    .catch(err=>console.log(err));

	document.getElementById("forma").addEventListener("submit", function(){
        event.preventDefault();	
        var validno = validacija();
        if(!validno){ 
            sacuvaj();
            return;
        }	

        var noviProizvod = {};
        noviProizvod.naziv = document.getElementById("naziv").value;
        noviProizvod.opis = document.getElementById("opis").value;
        noviProizvod.cena = document.getElementById("cena").value;
        noviProizvod.kategorija_id = document.getElementById("kategorija").value;

        fetch("http://localhost:9000/proizvod/" + idProizvoda, {
            method:"PUT",
            headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(noviProizvod)
        })
        .then( response=>response.json())
        .then( data=>{
            location.href = "proizvodi.html";
        })
        .catch( err=>{
            alert("Desila se greska");
            console.log(err);
        });	
    
        return;
    });
    
    document.getElementById("naziv").addEventListener("keypress", function(){
        this.classList.remove('success'); 
        this.classList.remove('error'); 
    });
    
    document.getElementById("dodaj-materijal").addEventListener("click", function(){
        var id = document.getElementById("spisak-materijala").value;
        if(!id){
            alert("Izaberi materijal");
            return;
        }

        var noviMaterijal = {};
        noviMaterijal.proizvod_id = idProizvoda;
        console.log(idProizvoda + "proizvod");
        console.log(id + "materijal");
        noviMaterijal.materijal_id = id;

        fetch("http://localhost:9000/proizvod-materijal/", {
            method:"POST",
            headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(noviMaterijal)
        })
        .then(succ=>succ.json())
        .catch(err => console.log(err));

        dodajMaterijal(id);
    });

    document.getElementById("obrisi").addEventListener("click", function(){
        if( confirm("Potvrdi brisanje") ){
            fetch("http://localhost:9000/proizvod/" + idProizvoda, { 
                method:"DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                } 
            })
            .then( resp=>resp.json()).then(data=>{
                alert("Obrisan je zapis "+data);
                location.href = "proizvodi.html";
            })
            .catch( err=>console.log(err));
        } else {
            return;
        }  
    });

});

function dodajMaterijal(id, idProizvodMaterijal){   
    document.querySelector(`#spisak-materijala > option[value='${id}']`).disabled = true;
    document.getElementById("spisak-materijala").selectedIndex = 0;

    var naziv = document.querySelector(`#spisak-materijala > option[value='${id}']`).innerHTML;

    var span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("bg-secondary");
    span.dataset.id = id;
    span.innerHTML = naziv;

    var button = document.createElement("button");
    button.type="button";
    button.classList.add("btn");
    button.classList.add("btn-default");
    button.classList.add("btn-sm");
    button.innerHTML = "X";

    span.appendChild(button);

    document.getElementById("materijali").appendChild(span);
    document.getElementById("materijali").appendChild(document.createTextNode(" "));

    button.addEventListener("click", function(){    
        var id = this.parentNode.dataset.id;
        this.parentNode.parentNode.removeChild(this.parentNode);

        fetch("http://localhost:9000/proizvod-materijal/" + idProizvodMaterijal, {
            method:"DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(succ=>succ.json())
        .catch(err => console.log(err));

        document.querySelector(`#spisak-materijala > option[value='${id}']`).disabled = false;
    })
}

function sacuvaj(){
    var spanovi = document.querySelectorAll("#materijali > span.badge");
    var niz = [];

    for(let i=0; i<spanovi.length; i++){
        niz.push(spanovi[i].dataset.id);
     }     

     var jsonNiz = JSON.stringify(niz);
     var hiddenInput = document.getElementById("materijali-input");
     hiddenInput.value = jsonNiz;
}

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


