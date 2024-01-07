window.addEventListener("load", function(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch("http://localhost:9000/proizvod/",{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
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

                tr.dataset.id = data[i].id;
    
                kategorija.innerHTML = data[i].kategorija.naziv;
                tr.appendChild(kategorija);

                naziv.innerHTML = data[i].naziv;
                tr.appendChild(naziv);

                cena.innerHTML = data[i].cena;
                tr.appendChild(cena);

                let btnPromenaCene = document.createElement("button");

                btnPromenaCene.className = "btn btn-secondary";
                btnPromenaCene.innerHTML = "Promena cene";
                btnPromenaCene.addEventListener("click", function(){
                    var c = prompt("Unesi novu cenu:");
                    var id =  this.closest("tr").dataset.id;
                    fetch(`http://localhost:9000/promeni-cenu/${id}`, {
                        method: 'PUT',
                            headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
                            body: JSON.stringify({ cena: c })
                    })
                    .then( response=>response.json() )
                    .then( data=>{
                        document.querySelectorAll(` #spisak > tr[data-id='${data.id}'] > td:nth-child(2) `).innerHTML = data.cena;
                        location.reload();
                    })
                    .catch( err=>{
                        alert("Desila se greska");
                        console.log(err);
                    });

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