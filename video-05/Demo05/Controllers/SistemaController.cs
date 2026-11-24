using System;
using System.Collections.Generic;
using Demo05.Librerias.EntidadesNegocio;
using Demo05.Librerias.ReglasNegocio;
using System.Web.Mvc;

namespace Demo05.Controllers
{
    public class SistemaController : Controller
    {
        // GET: Sistema
        public ActionResult Consultas()
        {
            return View();
        }
        public JsonResult listarTodo()
        {
            JsonResult rpta = null;
            brListas obrListas= new brListas();
            beListas obeListas= obrListas.listarTodo();
            rpta = Json(obeListas, JsonRequestBehavior.AllowGet);
            return rpta;
        }
    }
}