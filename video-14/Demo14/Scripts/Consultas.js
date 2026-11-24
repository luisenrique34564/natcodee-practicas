var horaInicio;
var nombres;

window.onload = function () {
    Http.get("/Sistema/obtenerListas", mostrarRptaListas);
}

function mostrarRptaListas(rpta) {
    if (rpta) {
        var listas = rpta.split("~");
        var nlistas = listas.length;
        nombres = listas[0].split("|");
        var html = "";
        var nGrillas = nombres.length;
        var offset = (nlistas > 4 ? 2 : 1);

        for (var i = 0; i < nGrillas; i++) {
            html += "<div id='div" + nombres[i] + "'></div>";
        }
        divData.innerHTML = html;

        for (var i = 0; i < nGrillas; i++) {
            var div = document.getElementById("div" + nombres[i]);
            var lista = listas[offset + i].split("¬");
            Gui.crearGrilla(lista, div, nombres[i], nombres[i] + " encontrados: ");
        }
    }
}
