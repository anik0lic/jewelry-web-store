window.addEventListener("load", function(){
    fetch("http://localhost:9000/kategorija/")
    .then(response => {
        let promise = response.json();

        promise.then(data => {
            console.log(data);

            for(let i = 0; i < data.length; i++){
                let tr = document.createElement("tr");
                let naziv = document.createElement("td");
                let akcija = document.createElement("td");

                tr.dataset.id = data[i].id;

                naziv.innerHTML = data[i].naziv;
                tr.appendChild(naziv);

                let btnIzmeni = document.createElement("a");
                btnIzmeni.className = "btn btn-secondary";
                btnIzmeni.innerHTML = "Izmeni";
                btnIzmeni.href = "kategorija.html?id=" + data[i].id;
                
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