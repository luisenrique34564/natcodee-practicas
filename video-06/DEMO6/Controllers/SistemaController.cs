using System;
using System.Collections.Generic;
using Demo05.Librerias.EntidadesNegocio;
using Demo05.Librerias.ReglasNegocio;
using General.Librerias.CodigoUsuario;
using System.Text;
using System.Web.Mvc;

namespace Demo06.Controllers
{
    public class SistemaController : Controller
    {
        // GET: Sistema
        public ActionResult Consultas()
        {
            return View();
        }

        public string listarTodo()
        {
            brListas obrListas = new brListas();
            beListas obeListas = obrListas.listarTodo();
            
            StringBuilder sb = new StringBuilder();
            sb.Append(CsvSerializer.Serializar(obeListas.listaProducto, '|', '¬', true));
            sb.Append("~");
            sb.Append(CsvSerializer.Serializar(obeListas.listaCliente, '|', '¬', true));
            sb.Append("~");
            sb.Append(CsvSerializer.Serializar(obeListas.listaProveedor, '|', '¬', true));
            
            return sb.ToString();
        }
    }
}
