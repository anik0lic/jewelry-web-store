window.addEventListener("load", function(){
    document.getElementById("forma").addEventListener("submit", function(event){
        event.preventDefault();
        var validno = validacija();	
        if(!validno){ return; }

        var noviMaterijal = {};	
        noviMaterijal.naziv = document.getElementById("naziv").value;

        fetch("http://localhost:9000/materijal/", {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noviMaterijal)
        })
        .then(succ=>succ.json())
        .then(data=>{
            location.href = "materijali.html";
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