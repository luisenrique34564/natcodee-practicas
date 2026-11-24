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



    Gui.crearGrilla = function (lista, div, spnTotal,tieneFiltros) {
        var matriz = [];
        var existeFiltros = (tieneFiltros == null ? true:tieneFiltros);
        crearTabla();
        filtrarMatriz();
        configurarFiltro();
        configurarBotones();
        function crearTabla() {

            if (!lista || lista.length < 2) return "";
          
            var cabeceras = lista[0].split("|");
            var ncabeceras = cabeceras.length;
            var anchos = lista[1].split("|");
            var html = "<div>";
            if (existeFiltros) {
                html += "<button id='btnLimpiarFiltros' class = 'Boton'> Limpiar Filtros</button>";
            }
             html += "</div>";
            html += "<table>";
            html += "<thead>";
            html += "<tr class='FilaCabecera'>";

            for (var j = 0; j < ncabeceras; j++) {
                html += "<th style='width:";
                html += anchos[j];
                html += "px'>";
                html += cabeceras[j];
                if (existeFiltros) { 
                html += "<br/>";
                html += "<input type='text' class ='Cabecera' style='width:90%'/>";
                }
                html += "</th>";
            }
            html += "</tr>";
            html += "</thead>";
            html += "<tbody id= 'tbData'>";
            html += "</tbody>";
            html += "</table>";
            
            div.innerHTML = html;
        }
        function crearMatriz() {
            var nregistros = lista.length;
            matriz = [];
            var campos;
            var ncampos;
            var fila = [];
            var valores = [];
            if (existeFiltros) {
                var textos = document.getElementsByClassName("Cabecera");
                var ntextos = textos.length;
                for (var j = 0; j < ntextos; j++) {
                    valores.push(textos[j].value.toLowerCase());
                }
            }
            var exito = false;
            for (var i = 2; i < nregistros; i++) {

                if (!lista[i] || lista[i].trim() === "") continue;
                campos = lista[i].split("|");
                ncampos = campos.length;
                exito = true;
                if (existeFiltros) {
                    for (var j = 0; j < ncampos; j++) {
                        exito = (valores[j] == "" || campos[j].toLowerCase().indexOf(valores[j]) > -1);
                        if (!exito) break;

                    }
                }
                
                if (exito) {
                    fila = [];
                    for (var j = 0; j < ncampos; j++) {
                        if (campos[j].substr(0, 1) == "0" || isNaN(campos[j])) fila.push(campos[j]);
                        else fila.push(+campos[j]);
                    }
                    matriz.push(fila);
                }

            }
            console.log(lista,matriz);

        }
        function mostrarMatriz() {
            var nregistros = matriz.length;
            var html = "";
            var ncampos = matriz[0].length;
             for (var i = 0; i < nregistros; i++) {

                    html += "<tr class='FilaDatos'>";
                    for (var j = 0; j < ncampos; j++) {
                        html += "<td>";
                        html += (matriz[i][j] !== undefined ? matriz[i][j] : "");
                        html += "</td>";
                    }
                    html += "</tr>";
                

            }
            document.getElementById("tbData").innerHTML = html;
            spnTotal.innerText = nregistros;

        }

        function filtrarMatriz() {
            crearMatriz();
            mostrarMatriz();
        }
        function configurarFiltro() {
            var textos = document.getElementsByClassName("Cabecera");
            var ntextos = textos.length;
            var valores = [];
            for (var j = 0; j < ntextos; j++) {
                textos[j].onkeyup = function () {
                    filtrarMatriz();
                }
            }
      
        }

        function configurarBotones() {
            var btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
            btnLimpiarFiltros.onclick = function () {
                var textos = document.getElementsByClassName("Cabecera");
                var ntextos = textos.length;
                for (var j = 0; j < ntextos; j++) {
                    textos[j].value = "";
                }
                filtrarMatriz();
            }

        }
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

    Gui.crearCombo = function (lista, cbo, primerItem) {
        var html = "";
        if (primerItem) {
            html += "<option value=''>";
            html += primerItem;
            html += "</option>";
        }
        var nregistros = lista.length;
        var campos;
        for (var i = 0; i < nregistros; i++) {
            campos = lista[i].split("|");
            html += "<option value='";
            html += campos[0];
            html += "'>";
            html += campos[1];
            html += "</option>";
        }
        cbo.innerHTML = html;
    };

    return Gui;
})();
