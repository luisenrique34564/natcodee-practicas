using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Text;
using System.Web.Mvc;
using General.Librerias.AccesoDatos;

namespace Demo08.Controllers
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
            string cadenaConexion = ConfigurationManager.ConnectionStrings["conProvias"].ConnectionString;

            using (SqlConnection con = new SqlConnection(cadenaConexion))
            {
                con.Open();
                daSQL odaSQL = new daSQL();
                rpta = odaSQL.ejecutarConsultaCSV(con, "uspProductsCustomersSuppliersListasCsv");
            }

            return rpta;
        }
    }
}