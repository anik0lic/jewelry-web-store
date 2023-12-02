window.addEventListener("load", function(){
    document.getElementById("forma").addEventListener("submit", function(event){
        event.preventDefault();	//sprecimo default ponasanje
        var validno = validacija();	//uradimo validaciju
        if(!validno){ return; }		//ako nije validno - kraj

        var noviProizvod = {};		//napravimo novi objekat jela
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
        // .then(data=>{
        //     //dobili smo objekat novounesenog jela, koje ima svoj id, super
        //     //mozemo nazad na spisak, a mozemo i na izmenu tog jela
        //     // window.location.href=`/proizvod/izmeni/${data.id}`;
        // })
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