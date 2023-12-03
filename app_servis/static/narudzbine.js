window.addEventListener("load", function(){
    fetch("http://localhost:9000/narudzbina/")
    .then(response => {
        let promise = response.json();

        promise.then(data => {
            console.log(data);

            for(let i = 0; i < data.length; i++){
                let tr = document.createElement("tr");
                let vreme_narucivanja = document.createElement("td");
                let status = document.createElement("td");
                let cena = document.createElement("td");
                let adresa = document.createElement("td");
                let stavke = document.createElement("td");
                let akcija = document.createElement("td");
    
                vreme_narucivanja.innerHTML = data[i].vreme_narucivanja;
                tr.appendChild(vreme_narucivanja);

                status.innerHTML = data[i].status;
                tr.appendChild(status);

                cena.innerHTML = data[i].cena;
                tr.appendChild(cena);

                adresa.innerHTML = data[i].adresa;
                tr.appendChild(adresa);
                
                for(let j = 0; j < data[i].stavka.length; j++){
                    fetch("http://localhost:9000/proizvod/" + data[i].stavka[j].proizvod_id).then( resp=>resp.json() )
                    .then( data=>{
                        stavke.innerHTML += data.naziv + " ";
                    })
                    .then(response => {
                        stavke.innerHTML += "x" + data[i].stavka[j].komada + "<br>";
                    })
                    .catch(err=>console.log(err));
                }

                tr.appendChild(stavke);

                let btnDetalji = document.createElement("a");
                btnDetalji.innerHTML = "Detalji";
                btnDetalji.className = "btn btn-secondary";
                btnDetalji.href = "narudzbina.html?id=" + data[i].id;
                
                akcija.appendChild(btnDetalji);
                tr.appendChild(akcija);
    
                document.getElementById("spisak").appendChild(tr);
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});