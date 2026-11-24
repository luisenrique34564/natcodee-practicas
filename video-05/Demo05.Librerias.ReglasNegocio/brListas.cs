
using Demo05.Librerias.EntidadesNegocio; //beCliente
using Demo05.Librerias.AcessoDatos; //daCliente
using System.Data.SqlClient;
using System;
using System.Configuration;



namespace Demo05.Librerias.ReglasNegocio
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
                 daListas odaListas = new daListas();
                    obeListas = odaListas.Listar(con);
                }
                catch (Exception ex) {
                    Console.WriteLine("Error: " + ex.Message);
                
                    }
            return obeListas; 
        }
    }
}
