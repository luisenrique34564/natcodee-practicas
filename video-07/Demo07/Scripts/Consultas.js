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
        for (var i = 1; i < nlistas; i++) {
            html += crearTabla(listas[i].split("¬"), nombres[i - 1]);
        }
        var divData = document.getElementById("divData");
        if (divData) {
            divData.innerHTML = html;
        }
    }
}

function crearTabla(lista, nombreTabla) {
    if (!lista || lista.length < 2) return "";
    var nregistros = lista.length;
    var cabeceras = lista[0].split("|");
    var ncabeceras = cabeceras.length;
    var anchos = lista[1].split("|");

    var html = "<div>";
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
