var divProducto;

window.onload = function () {
    divProducto = document.getElementById("divProducto");
    Http.get("/Producto/obtenerListas", mostrarRptaListas);
}

function mostrarRptaListas(rpta) {
    if (rpta) {
        var listas = rpta.split("~");
        var nlistas = listas.length;
        var listaProducto = listas[0].split("¬");
        var indicesCombos = [];
        var listaCombos = [];
        if (nlistas>1) {
            indicesCombos = listas[1].split("|");
            for (var j = 2; j < nlistas; j++) {
                listaCombos.push(listas[j].split("¬"));
            }
         
        }
        Gui.crearGrilla(listaProducto, divProducto, "Producto", "Lista de Productos: ", indicesCombos, listaCombos);
    }
}
