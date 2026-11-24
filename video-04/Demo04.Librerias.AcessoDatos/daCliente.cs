using System; //Exception
using System.Collections.Generic; //List
using System.Data; //CommandBehavior CommandType
using System.Data.SqlClient; // SqlCommand, SqlConnection , SqlDataReader 

using Demo04.Librerias.EntidadesNegocio; //beCliente
namespace Demo04.Librerias.AcessoDatos
{
    public class daCliente
    {
        public List<beCliente> Listar(SqlConnection con)

        {
            List<beCliente> lbeCliente = null;
            
                {
                    SqlCommand cmd = new SqlCommand("uspCustomersListar", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
                    if (drd != null)
                    {
                        lbeCliente = new List<beCliente>();
                        beCliente obeCliente;
                        while (drd.Read())
                        {
                            obeCliente = new beCliente();
                            obeCliente.Codigo = drd.GetString(0);
                            obeCliente.Nombre = drd.GetString(1);
                            obeCliente.Direccion = drd.GetString(2);
                            obeCliente.Contacto = drd.GetString(3);
                            lbeCliente.Add(obeCliente);

                        }
                        drd.Close();
                    }
                }
                
            
            return lbeCliente;
        }
    }
}
