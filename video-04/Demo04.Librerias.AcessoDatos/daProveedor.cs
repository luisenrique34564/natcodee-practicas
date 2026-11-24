using System; //Exception
using System.Collections.Generic; //List
using System.Data; //CommandBehavior CommandType
using System.Data.SqlClient; // SqlCommand, SqlConnection , SqlDataReader 

using Demo04.Librerias.EntidadesNegocio; //beProveedor
namespace Demo04.Librerias.AcessoDatos
{
    public class daProveedor
    {
        public List<beProveedor> Listar(SqlConnection con)

        {
            List<beProveedor> lbeProveedor = null;
        
            {
               
                    SqlCommand cmd = new SqlCommand("uspSuppliersListar", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
                    if (drd != null)
                    {
                        lbeProveedor = new List<beProveedor>();
                        beProveedor obeProveedor;
                        while (drd.Read())
                        {
                            obeProveedor = new beProveedor();
                            obeProveedor.Codigo = drd.GetInt32(0);
                            obeProveedor.Nombre = drd.GetString(1);
                            obeProveedor.Direccion = drd.GetString(2);
                            obeProveedor.Contacto = drd.GetString(3);
                            lbeProveedor.Add(obeProveedor);

                        }
                        drd.Close();
                    }
                }

            
            return lbeProveedor;
        }
    }
}
