var horaInicio;

window.onload = function () {
    horaInicio = new Date();
    get("/Sistema/ListarTodo", mostrarRpta);
}

function get(url, callBack) {
    requestServer(url, "get", callBack);
}

function post(url, callBack) {
    requestServer(url, "post", callBack);
}

function mostrarTiempo() {
    var horaFin = new Date();
    var tiempo = horaFin - horaInicio;
    var spn = document.getElementById("spnTiempo");
    if (spn) {
        spn.innerHTML = "Tiempo de Proceso: " + tiempo + " msg";
    }
}

function requestServer(url, metodoHttp, callBack) {
    var xhr = new XMLHttpRequest();
    xhr.open(metodoHttp, url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callBack(xhr.responseText);
            } else {
                console.error("Error al solicitar datos: HTTP " + xhr.status + " en " + url);
                var spn = document.getElementById("spnTiempo");
                if (spn) {
                    spn.innerHTML = "Error al cargar datos (HTTP " + xhr.status + ")";
                }
            }
        }
    }
    xhr.send();
}

function mostrarRpta(rpta) {
    mostrarTiempo();
    if (rpta) {
        var listas = rpta.split("~");
        var nlistas = listas.length;
        var nombres = listas[0].split("|");
        var html = "";
        var htmlBotones = "";
        for (var i = 1; i < nlistas; i++) {
            htmlBotones += "<button id='btn" + i + "' class='Boton'>";
            htmlBotones += nombres[i - 1];
            htmlBotones += "</button>"; 
            html += crearTabla(listas[i].split("¬"), nombres[i - 1], i);
        }
        var divBotones = document.getElementById("divBotones");
        if (divBotones) {
            divBotones.innerHTML = htmlBotones;
        }
        var divData = document.getElementById("divData");
        if (divData) {
            divData.innerHTML = html;
        }
        configurarBotones();
        var btn = document.getElementById("btn1");
        if (btn != null) btn.click();
    }
}
function configurarBotones() {
    var botones = document.getElementsByClassName("Boton");
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
function crearTabla(lista, nombreTabla, n) {
    if (!lista || lista.length < 2) return "";
    var nregistros = lista.length;
    var cabeceras = lista[0].split("|");
    var ncabeceras = cabeceras.length;
    var anchos = lista[1].split("|");
    var html = "<div id='div" + n + "' class='Tab' style='display:none'>";
   
    html += "<div class='Subtitulo'>Lista de ";
    html += nombreTabla;
    html += ": ";
    html += (nregistros - 2);
    html += "</div>";
    html += "<div>";

    html += "<table>";
    html += "<thead>";
    html += "<tr class='FilaCabecera'>";
    for (var j = 0; j < ncabeceras; j++) {
        html += "<th style='width:";
        html += anchos[j];
        html += "px'>";
        html += cabeceras[j];
        html += "</th>";
    }
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";

    var campos;
    for (var i = 2; i < nregistros; i++) {
        if (!lista[i] || lista[i].trim() === "") continue;
        campos = lista[i].split("|");
        html += "<tr class='FilaDatos'>";
        for (var j = 0; j < ncabeceras; j++) {
            html += "<td>";
            html += (campos[j] !== undefined ? campos[j] : "");
            html += "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    html += "</div>";
    html += "</div>";
    return html;
}

function crearTablaSimple(lista, div) {
    if (!lista || lista.length === 0 || !div) return;
    var nregistros = lista.length;
    var cabeceras = lista[0].split("|");
    var ncabeceras = cabeceras.length;
    
    var html = "<table>";
    html += "<thead>";
    html += "<tr class='FilaCabecera'>";
    for (var j = 0; j < ncabeceras; j++) {
        html += "<td>" + cabeceras[j] + "</td>";
    }
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    
    var campos;
    for (var i = 1; i < nregistros; i++) {
        if (!lista[i] || lista[i].trim() === "") continue;
        campos = lista[i].split("|");
        html += "<tr class='FilaDatos'>";
        for (var j = 0; j < ncabeceras; j++) {
            html += "<td>" + (campos[j] !== undefined ? campos[j] : "") + "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody>";
    html += "</table>";
    div.innerHTML = html;
}
