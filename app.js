const numero = document.getElementById("numero");
const letra = document.getElementById("letra");

const cnumero = document.querySelector(".cnumero");
const cletra = document.querySelector(".cletra");


const informacionNumero = async ()=> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numero.value}&offset=0`);
    const data = await response.json();
    const {results} = data;
   
    if (numero.value !== "") {
        cnumero.textContent = ""
        for (let i = 0; i < numero.value; i++) {
            cnumero.innerHTML += `<div><b>${i + 1}</b>- ${results[i].name}</div>`
        }
    } else {
        cnumero.textContent = ""
    }
}

const informacionLetra = async ()=> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=200&offset=0`);
    const data = await response.json();
    const {results} = data;
    
    cletra.textContent = ""
    for (let i = 0; i < 200; i++) {
        if (letra.value !== "") {
            if (results[i].name.startsWith(letra.value)) {
                cletra.innerHTML += `<div>${results[i].name}</div>`
            } 
        }
        else {
            cletra.textContent = ""
        }     
    }
}

numero.addEventListener("keyup",()=> {
    if (!isNaN(numero.value)) {
        cnumero.textContent = "";
        informacionNumero();
    } else {
        cnumero.innerHTML = "<div>Ingrese un numero</div>"
    }
})
letra.addEventListener("keyup",()=> {
    if (isNaN(letra.value)) {
        informacionLetra();
    } 
    else if (letra.value === "") {
        cletra.textContent = "";
    }else {
        cletra.innerHTML = "<div>Ingrese una letra</div>"
    }
})
