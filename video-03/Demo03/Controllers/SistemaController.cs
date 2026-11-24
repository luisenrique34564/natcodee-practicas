using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Demo02.Librerias.ReglasNegocio;
using Demo02.Librerias.EntidadesNegocio;
namespace Demo03.Controllers
{
    public class SistemaController : Controller
    {
        // GET: Sistema
        public ActionResult Consultas()
        {
            return View();
        }
        public JsonResult ListarTodo()
        {
            JsonResult jsonListas = null;
            beListas obeListas = new beListas();
            brProducto obrProducto = new brProducto();
            obeListas.listaProducto = obrProducto.Listar();
            brCliente obrCliente = new brCliente();
            obeListas.listaCliente = obrCliente.Listar();
            brProveedor obrProveedor = new brProveedor();
            obeListas.listaProveedor = obrProveedor.Listar();
            jsonListas = Json(obeListas, JsonRequestBehavior.AllowGet);

            return jsonListas;

        }
    }
}