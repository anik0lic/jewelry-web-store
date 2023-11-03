window.addEventListener("load", function(){
    fetch('/proizvodi')
    .then(response => {
        let promise = response.json();

        promise.then(data => {
            console.log(data);

            for(let i = 0; i < data.length; i++){
                let tr = document.createElement("tr");
                let kategorija = document.createElement("td");
                let naziv = document.createElement("td");
                let cena = document.createElement("td");
                let akcija = document.createElement("td");
    
                kategorija.innerHTML = data[i].kategorija;
                tr.appendChild(kategorija);

                naziv.innerHTML = data[i].naziv;
                tr.appendChild(naziv);

                cena.innerHTML = data[i].cena;
                tr.appendChild(cena);

                let btnPromenaCene = document.createElement("button");

                btnPromenaCene.className = "btn btn-secondary";
                btnPromenaCene.innerHTML = "Promena cene";
                btnPromenaCene.addEventListener("click", function(){
                    console.log("klik");
                });

                let btnIzmeni = document.createElement("a");
                btnIzmeni.className = "btn btn-secondary";
                btnIzmeni.innerHTML = "Izmeni";
                btnIzmeni.href = "proizvod.html?id=" + data[i].id;
                
                akcija.appendChild(btnPromenaCene);
                akcija.appendChild(btnIzmeni);
                tr.appendChild(akcija);
    
                document.getElementById("spisak").appendChild(tr);
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});