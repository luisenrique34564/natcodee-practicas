
using System.Web.Mvc;
using General.Librerias.AccesoDatos;

namespace Demo09.Controllers
{
    public class ProductoController : Controller
    {
        // GET: Producto
        public ActionResult Consultas()
        {
            return View();
        }

        public string listarProductos()
        {
            string rpta = "";
            daSQL odaSQL = new daSQL("conProvias");
            rpta = odaSQL.EjecutarComando("uspProductsListarCsv");
            return rpta;
        }
    }
}