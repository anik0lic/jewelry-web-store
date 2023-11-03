window.addEventListener("load", function(){
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


