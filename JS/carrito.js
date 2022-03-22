const enviosProvincias = document.getElementById(`enviosProvincias`);
const carritoPrecios = JSON.parse(localStorage.getItem(`carriten`)) ?? [];
const carritoImg = JSON.parse(localStorage.getItem(`carritenId`)) ?? [];
console.log(carritoImg.length);

if (carritoImg.length === 0) {
    document.addEventListener("DOMContentLoaded", nICOcarritoVacio);
    function nICOcarritoVacio() {
        const nicoCarritoVacio = document.querySelector(".main_carrito");
        if (nicoCarritoVacio) {
            nicoCarritoVacio.innerHTML = "";
            const tituloVacio = document.createElement("h5");
            nicoCarritoVacio.appendChild(tituloVacio);
            tituloVacio.innerHTML = "";
            const activoVacio = document.createElement("div");
            nicoCarritoVacio.appendChild(activoVacio);
            activoVacio.setAttribute("class", "carousel-item active");
            const imgVacio = document.createElement("img");
            imgVacio.setAttribute("src", "./img/carritoVacio1.png");
            activoVacio.appendChild(imgVacio);
        }
    }
} else {
    document.addEventListener("DOMContentLoaded", nICOcarrito);
    function nICOcarrito() {
        const nicoCarrito = document.querySelector(".main_carrito");
        if (nicoCarrito) {
            nicoCarrito.innerHTML = "";
            const titulo = document.createElement("h5");
            nicoCarrito.appendChild(titulo);
            titulo.innerHTML = "";
            const activo = document.createElement("div");
            nicoCarrito.appendChild(activo);
            activo.setAttribute("class", "carousel-item active");
            for (let carrito of carritoImg) {
                console.dir(carrito);
                const divCarrito = document.createElement("div");
                divCarrito.setAttribute("id", `${carrito}`);
                /*divCarrito.getElementById(`${carrito}`).innerHTML = `<img src="./Productos/prd${+carrito}.jpg">`;*/
                const imgCarrito = document.createElement("img");
                divCarrito.appendChild(imgCarrito);
                divCarrito.setAttribute("class", "carousel-item");
                imgCarrito.setAttribute("src", `./Productos/prd${+carrito}.jpg`);
                imgCarrito.setAttribute("id", `${carrito}`);
                imgCarrito.setAttribute("class", `prd${+carrito}son`);
                nicoCarrito.appendChild(divCarrito);
            }
        }
    }
}
//Subtotal
if (carritoPrecios.length !== 0) {
    const subtotal = (accumulator, curr) => accumulator + curr;
    const subTot = JSON.stringify(localStorage.setItem(`SUBTOTAL`, carritoPrecios.reduce(subtotal)));
}
const subTotalCarrito = JSON.parse(localStorage.getItem(`SUBTOTAL`)) ?? [];
//


//FETCH

enviosProvincias.innerHTML = ` <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`
fetch('prov/provincias.json')
    .then((respuesta) => {
        return respuesta.json()
    }).then((datos) => {
        enviosProvincias.innerHTML =
            `<h3>Subtotal = $ ${subTotalCarrito}</h3>
                                    <h4>Info del Envio</h4>
                                    <select id="provFiltro"></select> 
                                    <select id="munFiltro"></select>
                                    <button id="btnEnvio">Enviar</button>`;
        const provFiltro = document.getElementById('provFiltro');
        for (const provincia of datos.provincias) {
            provFiltro.innerHTML += `<option value="${provincia.id}">${provincia.nombre}</option>`;
        }
        provFiltro.onchange = () => {
            let idProvincia = provFiltro.value;
            console.log(idProvincia);
            let rutaBusqueda = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${idProvincia}&campos=id,nombre&max=100`;
            fetch(rutaBusqueda)
                .then(respuesta => respuesta.json())
                .then(datos => {
                    console.log(datos);
                    let munFiltro = document.getElementById('munFiltro');
                    munFiltro.innerHTML = "";
                    for (const municipio of datos.municipios) {
                        munFiltro.innerHTML += `<option value="${municipio.id}">${municipio.nombre}</option>`;
                    }
                    document.getElementById('btnEnvio').onclick = () => {
                        console.log("ENVIAR A " + munFiltro.value + " EN  PROVINCIA ID " + idProvincia);
                        fetch('https://jsonplaceholder.typicode.com/posts', {
                            method: 'POST',
                            body: JSON.stringify({
                                carrito: carritoPrecios,
                                idProvincia: idProvincia,
                                idMunicipio: munFiltro.value
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        }).then(respuesta => respuesta.json())
                            .then(data => {
                                Swal.fire(
                                    'Compra Confirmada',
                                    "PEDIDO N° " + data.id + " EN CAMINO",
                                    'success'
                                )
                            })
                    }
                })
        }
    })
    .catch((mensaje) => { console.log(mensaje) })

async function procesarEnvio() {
    productosCarrito.innerHTML = `<div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span></div>`
    //----------------------------Provincias------------------------------------------
    const fetchProvincias = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
    const jsonProvincias = await fetchProvincias.json();
    productosCarrito.innerHTML = `<h3>Info del Envio</h3>
    <select id="provFiltro"></select> 
    <select id="munFiltro"></select>
    <button id="btnEnvio">Enviar</button>`;
    const provFiltro = document.getElementById("provFiltro");
    for (const provincia of jsonProvincias.provincias) {
        provFiltro.innerHTML += `<option value="${provincia.id}">${provincia.nombre}</option>`
    }
}
const limpiarCarrito = document.querySelector(".limpiador");
const btnLimpiar = document.createElement("button");
limpiarCarrito.appendChild(btnLimpiar);
btnLimpiar.innerText = "Limpiar carrito";
btnLimpiar.addEventListener("click", function () {
    carritoImg.splice(0, 1000000000);
    carritoPrecios.splice(0, 1000000000);
    localStorage.clear();
});
