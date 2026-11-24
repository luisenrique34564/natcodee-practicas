
using System.Web.Mvc;
using General.Librerias.AccesoDatos;//daSql
namespace Demo12.Controllers
{
    public class ProductoController : Controller
    {
        // GET: Producto
        public ActionResult Consulta()
        {
            return View();
        }
        public string listarCategoriasProductos()
        {
            string rpta = "";
            daSQL odaSQL = new daSQL("conProvias");
            rpta = odaSQL.EjecutarComando("uspProductsListarCsv");
            return rpta;
        }

    }
}