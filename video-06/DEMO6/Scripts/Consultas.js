var horaInicio;

window.onload = function () {
    horaInicio = new Date();
    get("Sistema/ListarTodo", mostrarRpta);
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
        spn.innerHTML = tiempo + " msg";
    }
}

function requestServer(url, metodoHttp, callBack) {
    var xhr = new XMLHttpRequest();
    xhr.open(metodoHttp, url);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            callBack(xhr.responseText);
        }
    }
    xhr.send();
}

function mostrarRpta(rpta) {
    mostrarTiempo();
    if (rpta) {
        var listas = rpta.split("~");
        var listaProductos = listas[0].split("¬");
        var listaClientes = listas[1].split("¬");
        var listaProveedores = listas[2].split("¬");
        crearTabla(listaProductos, document.getElementById("divProducto"));
        crearTabla(listaClientes, document.getElementById("divCliente"));
        crearTabla(listaProveedores, document.getElementById("divProveedor"));
    }
}

function crearTabla(lista, div) {
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
