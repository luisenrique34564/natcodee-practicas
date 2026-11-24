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
    Http.get("/Producto/listarCategoriasProductos", mostrarRptaCatProd);

    cboCategoria.onchange = function () {
        if (this.value == '') Gui.crearTabla(lista, divProducto, spnTotal, 4, "");
        else Gui.crearTabla(lista, divProducto, spnTotal, 4, this.value);
    };
};

function mostrarRptaCatProd(rpta) {
    mostrarTiempo();
    if (rpta) {
        var listas = rpta.split("~");
        var listaCategoria = listas[0].split("¬");
        lista = listas[1].split("¬");

        Gui.crearCombo(listaCategoria, cboCategoria, "Todos");
        Gui.crearTabla(lista, divProducto, spnTotal, 4, "");
    }
}
