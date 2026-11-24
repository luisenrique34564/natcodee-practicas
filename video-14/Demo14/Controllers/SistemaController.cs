
using System.Web.Mvc;
using General.Librerias.AccesoDatos;
namespace Demo14.Controllers
{
    public class SistemaController : Controller
    {
        // GET: Sistema
        public ActionResult Consultas()
        {
            return View();
        }
        public string obtenerListas()
        {
            string rpta = "";
            daSQL odaSQL = new daSQL("conProvias");
            rpta = odaSQL.EjecutarComando("uspProductsCustomersSuppliersListasCsv");
            return rpta;
        }

    }
}