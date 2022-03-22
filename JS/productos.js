var total = 0

const articulo = [];
articulo.push("GUITARRA");
articulo.push("BAJO");
articulo.push("BATERIA");
articulo.push("PIANO");
articulo.push("UKELELE");
articulo.push("FLAUTA");

const precio = [];
precio.push(150000);
precio.push(100000);
precio.push(300000);
precio.push(250000);
precio.push(30000);
precio.push(1200);

const carrito = [];
const carritenId = [];

class Producto {
    constructor(id, articulo, precio) {
        this.id = id;
        this.articulo = articulo;
        this.precio = parseFloat(precio);
    }
}

const productos = [];
productos.push(new Producto(1, articulo[0], precio[0]));
productos.push(new Producto(2, articulo[1], precio[1]));
productos.push(new Producto(3, articulo[2], precio[2]));
productos.push(new Producto(4, articulo[3], precio[3]));
productos.push(new Producto(5, articulo[4], precio[4]));
productos.push(new Producto(6, articulo[5], precio[5]));


document.addEventListener("DOMContentLoaded", nICO);
function nICO() {
    const nICOGaleria = document.querySelector(".jps_ww_01");
    if (nICOGaleria) {
        nICOGaleria.innerHTML = "";
        for (let producto of productos) {
            const divProducto = document.createElement("div");
            const imgProducto = document.createElement("img");
            const btnProducto = document.createElement("button");
            divProducto.appendChild(imgProducto);
            imgProducto.setAttribute("src", `./Productos/prd${+producto.id}.jpg`);
            imgProducto.setAttribute("id", `${producto.id}`);
            imgProducto.setAttribute("id", `prd${+producto.id}`);
            divProducto.appendChild(btnProducto);
            nICOGaleria.appendChild(divProducto);
            btnProducto.innerText = "Comprar";
            btnProducto.addEventListener("click", function () {
                carrito.push(producto.precio);
                carritenId.push(producto.id);
                localStorage.setItem(`carriten`, JSON.stringify(carrito));
                localStorage.setItem(`carritenId`, JSON.stringify(carritenId));
                Toastify({
                    text: `Se ha agregado el articulo: ${producto.articulo}`,
                    duration: 3000,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    gravity: "bottom"
                }).showToast();
            });
        }
    }
}

