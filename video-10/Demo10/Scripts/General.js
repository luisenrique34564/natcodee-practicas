var Http = (function () {
    function Http() {
    }
           Http.get = function (url, callBack) {
            requestServer(url, "get", callBack);
        }

Http.post = function (url, callBack) {
            requestServer(url, "post", callBack);
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
    return Http;
})();


var Gui = (function () {
    function Gui() {
    }
Gui. crearTabla=function(lista,div, spnTotal,filtroCol,filtroValor) {
    if (!lista || lista.length < 2) return "";
    var nregistros = lista.length;
    var cabeceras = lista[0].split("|");
    var ncabeceras = cabeceras.length;
    var anchos = lista[1].split("|");
    var html ="<table>";
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
    var c = 0;
    var colIdx = isNaN(filtroCol) ? cabeceras.indexOf(filtroCol) : parseInt(filtroCol);
    if (colIdx < 0 || colIdx >= ncabeceras) colIdx = 0;

    for (var i = 2; i < nregistros; i++) {
       
        if (!lista[i] || lista[i].trim() === "") continue;
        campos = lista[i].split("|");
        if (filtroValor == "" || (campos[colIdx] && campos[colIdx].toLowerCase().indexOf(filtroValor.toLowerCase()) > -1)) {
            c++
            html += "<tr class='FilaDatos'>";
            for (var j = 0; j < ncabeceras; j++) {
                html += "<td>";
                html += (campos[j] !== undefined ? campos[j] : "");
                html += "</td>";
            }
            html += "</tr>";
        }

    }
    html += "</tbody>";
    html += "</table>";
    div.innerHTML = html;
    spnTotal.innerText = c;
}



    Gui.crearComboUnaColumna = function (lista, cbo, primerItem) {
        var html = "";
        if (primerItem) {
            html += "<option>";
            html += primerItem;
            html += "</option>";
        }
        var nregistros = lista.length;
        var campo;
        for (var i = 0; i < nregistros; i++) {
            campo = lista[i];
            html += "<option>";
            html += campo;
            html += "</option>";
        }
        cbo.innerHTML = html;
    };

    return Gui;
})();
