var id = null;
window.addEventListener("load", function(){
    var url = new URL( window.location.href );
    id = url.searchParams.get("id");
    console.log(id);

    fetch("http://localhost:9000/proizvod/" + id).then( resp=>resp.json() )
    .then( data=>{
        console.log(data);
        document.getElementById("naziv").value = data.naziv; 
        document.getElementById("opis").value = data.opis; 
        document.getElementById("cena").value = data.cena;
        document.getElementById("kategorija").value = data.kategorija_id;

        // for(let i = 0; i < data.materijali.length; i++){
        //     dodajMaterijal(data.materijali[i]); //zavisno sta je u nizu, mozda vam treba .id
        // }  
    })
    .catch(err=>console.log(err));  

	document.getElementById("forma").addEventListener("submit", function(){
        var validno = true;

        if(document.getElementById("naziv").value.length < 3){
            validno = false;
            document.getElementById("naziv").classList.add("error");
            document.getElementById("naziv").classList.remove("success");
            event.preventDefault();
        }
        else{
            document.getElementById("naziv").classList.add("success");
            document.getElementById("naziv").classList.remove("error");
            sacuvaj();
        }
    
        return validno;
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
        dodajMaterijal(id);
    });

    document.getElementById("obrisi").addEventListener("click", function(){
        if( confirm("Potvrdi brisanje") ){
            fetch("http://localhost:9000/proizvod/"+id, { method:"DELETE" })
            .then( resp=>resp.json()).then(data=>{
                //response sadrzi samo id obrisanog
                alert("Obrisan je zapis "+data);
                window.location.href("/proizvod"); //predji na spisak
            })
            .catch( err=>console.log(err));
        } else {
            return;
        }
        
    });

});

function dodajMaterijal(id){   
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


