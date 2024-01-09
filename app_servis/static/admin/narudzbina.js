var idNarudzbine = null;
window.addEventListener("load", function(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    var url = new URL( window.location.href );
    idNarudzbine = url.searchParams.get("id");
    console.log(idNarudzbine);

    fetch("http://localhost:9000/narudzbina/" + idNarudzbine,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then( resp=>resp.json() )
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
            fetch("http://localhost:9000/proizvod/" + data.stavka[i].proizvod_id,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then( resp=>resp.json() )
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

function changeStatus(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    let status = document.getElementById("status").value;
    fetch("http://localhost:9000/narudzbina/status/" + idNarudzbine,{
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: status,
        })
    })
    .then( resp=>resp.json() )
    .then( data=>{
        console.log(data);
        alert("Status je promenjen!");
    })
    .catch(err=>console.log(err));
}