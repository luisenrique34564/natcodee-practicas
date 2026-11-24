var horaInicio;
var lista;

function mostrarTiempo() {
    var horaFin = new Date();
    var tiempo = horaFin - horaInicio;
    var spn = document.getElementById("spnTiempo");
    if (spn) {
        spn.innerHTML = tiempo + " msg";
    }
}

window.onload = function () {
    horaInicio = new Date();
    Http.get("/Producto/listarProductos", mostrarRptaProductos);
    txtNombre.onkeyup = function () {
        Gui.crearTabla(lista, divProducto, spnTotal, 1, this.value);
    }
}

function mostrarRptaProductos(rpta) {
    mostrarTiempo();
    if (rpta) {
        lista = rpta.split("¬");
        Gui.crearTabla(lista, divProducto, spnTotal, 1, "");
    }
    else alert("Ocurrio un Error al obtener los Datos");
}
