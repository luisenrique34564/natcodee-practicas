
using Demo04.Librerias.EntidadesNegocio; //beCliente
using Demo04.Librerias.AcessoDatos; //daCliente
using System.Data.SqlClient;
using System;
using System.Configuration;

namespace Demo04.Librerias.ReglasNegocio
{
    public class brListas
    {
        public beListas listarTodo()
        {
           beListas obeListas = new beListas();
            String cadenaConexion = ConfigurationManager.ConnectionStrings["conProvias"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cadenaConexion))
                try
            {
                con.Open();
                 daProducto odaProducto = new daProducto();
                 obeListas.listaProducto = odaProducto.Listar(con);
                    daCliente odaCliente = new daCliente();
                    obeListas.listaCliente = odaCliente.Listar(con);
                    daProveedor odaProveedor = new daProveedor();
                    obeListas.listaProveedor = odaProveedor.Listar(con);

                }
                catch (Exception ex) {
                    Console.WriteLine("Error: " + ex.Message);
                
                    }
            return obeListas; 
        }
    }
}
