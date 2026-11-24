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
    Http.get("/Producto/listarCategoriasProductos", mostrarRptaProductos);
};

function mostrarRptaProductos(rpta) {
    mostrarTiempo();
    if (rpta) {
        lista = rpta.split("¬");
        Gui.crearGrilla(lista, divProducto, spnTotal, false);
    }
}
