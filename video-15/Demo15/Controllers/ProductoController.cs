using System.Web.Mvc;
using General.Librerias.AccesoDatos;
namespace Demo15.Controllers
{
    public class ProductoController : Controller
    {
        // GET: Producto
        public ActionResult Consulta()
        {
            return View();
        }

        public string obtenerListas()
        {
            string rpta = "";
            daSQL odaSQL = new daSQL("conProvias");
            rpta = odaSQL.EjecutarComando("uspProductsListasCsv");
            return rpta;
        }
    }
}