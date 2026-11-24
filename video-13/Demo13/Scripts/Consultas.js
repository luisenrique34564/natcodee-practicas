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
        var tieneDescripciones = (nlistas > 4);
        var descripciones = tieneDescripciones ? listas[1].split("|") : nombres;
        var offset = tieneDescripciones ? 2 : 1;
        var html = "";
        var htmlBotones = "";

        for (var i = 0; i < nombres.length; i++) {
            htmlBotones += "<button id='btn" + (i + 1) + "' class='Boton' data-title='";
            htmlBotones += descripciones[i];
            htmlBotones += "'>";
            htmlBotones += nombres[i];
            htmlBotones += "</button>";

            html += "<div id='div" + (i + 1) + "' class='Tab' style='display:none'>";
            html += "<span id='spn" + nombres[i] + "'></span>";
            html += "<div id='div" + nombres[i] + "'></div>";
            html += "</div>";
        }

        var divBotones = document.getElementById("divBotones");
        var divData = document.getElementById("divData");
        if (divBotones) divBotones.innerHTML = htmlBotones;
        if (divData) divData.innerHTML = html;

        configurarBotones();

        var nGrillas = nombres.length;
        for (var i = 0; i < nGrillas; i++) {
            var div = document.getElementById("div" + nombres[i]);
            var spn = document.getElementById("spn" + nombres[i]);
            var lista = listas[offset + i].split("¬");
            Gui.crearGrilla(lista, div, spn, nombres[i]);
        }

        var btn = document.getElementById("btn1");
        if (btn != null) btn.click();
    }
}

function configurarBotones() {
    var divBotones = document.getElementById("divBotones");
    var botones = divBotones ? divBotones.getElementsByClassName("Boton") : document.getElementsByClassName("Boton");
    var nbotones = botones.length;
    for (var i = 0; i < nbotones; i++) {
        botones[i].onclick = function () {
            ocultarTodosTabs();
            var n = this.id.substring(3, this.id.length);
            var tab = document.getElementById("div" + n);
            if (tab != null) tab.style.display = "inline";
        }
    }
}

function ocultarTodosTabs() {
    var tabs = document.getElementsByClassName("Tab");
    var ntabs = tabs.length;
    for (var i = 0; i < ntabs; i++) {
        tabs[i].style.display = "none";
    }
}
