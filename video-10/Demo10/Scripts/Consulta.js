var horaInicio;
var lista;
var n = -1;

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
    Http.get("/Cliente/listarClientes", mostrarRptaClientes);
    txtValor.onkeyup = function () {
        if (n > -1)
            Gui.crearTabla(lista, divCliente, spnTotal, n, this.value);
    };
    cboCampo.onchange = function () {
        n = this.selectedIndex - 1;
        txtValor.focus();
    };
};

function mostrarRptaClientes(rpta) {
    mostrarTiempo();
    if (rpta) {
        lista = rpta.split("¬");
        var campos = lista[0].split("|");
        Gui.crearComboUnaColumna(campos, cboCampo, "Seleccione");
        Gui.crearTabla(lista, divCliente, spnTotal, 1, "");
    }
}
