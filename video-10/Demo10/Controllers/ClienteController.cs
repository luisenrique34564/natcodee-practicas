
using System.Web.Mvc;
using General.Librerias.AccesoDatos; //daSQL
namespace Demo10.Controllers
{
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult Consulta()
        {
            return View();
        }
        public string listarClientes()
        {
            string rpta = "";
            daSQL odaSQL = new daSQL("conProvias");
            rpta = odaSQL.EjecutarComando("uspCustomersListarCsv");
            return rpta;
        }

    }
}