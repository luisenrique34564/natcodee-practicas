using System;
using System.Web.Mvc;
using General.Librerias.AccesoDatos;

namespace Demo07.Controllers
{
    public class SistemaController : Controller
    {
        // GET: Sistema/Consultas
        public ActionResult Consultas()
        {
            return View();
        }

        // 1 Request, 1 Conexión, 1 Comando, 1 Cadena CSV
        public string ListarTodo()
        {
            string rpta = "";
            daSQL odaSQL = new daSQL();
            rpta = odaSQL.ejecutarConsultaCSV("uspProductsCustomersSuppliersListasCsv");

            return rpta;
        }
    }
}